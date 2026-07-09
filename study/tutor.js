/*
  Satified: Ask the tutor panel for the study page.
  Plain browser script: no modules, no build step, no dependencies.
  Injects a Tutor key into the toolbar cluster, mounts a slide in panel, and
  talks to the Cloudflare Pages Function at /api/tutor. The live question is
  read from window.__tutorContext, which app.ts publishes on every render.
*/
(function () {
  'use strict';

  var API_URL = '/api/tutor';
  var HISTORY_CAP = 6;
  var INPUT_CAP = 2000;

  var els = {};
  var state = { messages: [], stem: null, busy: false, notedEmpty: false };
  var ts = { scriptRequested: false, widget: null, token: null, waiters: [], timer: null };

  /* string helpers */

  function trimText(s) {
    return String(s == null ? '' : s).replace(/^\s+|\s+$/g, '');
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* MathJax: typeset one node after its escaped content is in the DOM */
  function typesetNode(node) {
    try {
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([node]).catch(function () {});
      }
    } catch (err) {}
  }

  /* message rendering: escape first, then let MathJax handle $...$ */

  function appendMessage(role, text) {
    var div = document.createElement('div');
    div.className = 'tutor-msg ' + role;
    div.innerHTML = escapeHtml(text).replace(/\n/g, '<br>');
    els.list.appendChild(div);
    els.list.scrollTop = els.list.scrollHeight;
    typesetNode(div);
    return div;
  }

  function showTyping() {
    hideTyping();
    var t = document.createElement('div');
    t.className = 'tutor-typing';
    t.id = 'tutor-typing';
    t.innerHTML = '<span></span><span></span><span></span>';
    els.list.appendChild(t);
    els.list.scrollTop = els.list.scrollHeight;
  }

  function hideTyping() {
    var t = document.getElementById('tutor-typing');
    if (t && t.parentNode) t.parentNode.removeChild(t);
  }

  /* question context */

  function currentContext() {
    var c = window.__tutorContext;
    return (c && c.stem) ? c : null;
  }

  function contextLabel(c) {
    if (!c) return 'No question loaded';
    var bits = [];
    if (c.skill) bits.push(String(c.skill));
    if (c.difficulty) bits.push(String(c.difficulty));
    return bits.length ? bits.join(', ') : trimText(c.stem).slice(0, 64);
  }

  /* Refresh the context line; when the stem changed, start a fresh thread */
  function syncContext() {
    var c = currentContext();
    els.ctx.textContent = contextLabel(c);
    if (c && state.stem !== c.stem) {
      state.stem = c.stem;
      state.messages = [];
      state.notedEmpty = false;
      els.list.innerHTML = '';
      appendMessage('sys', 'Tutor ready for this question. Ask for a hint, a first step, or a full walkthrough.');
    }
    return c;
  }

  /* panel open and close */

  function openPanel() {
    els.panel.classList.add('open');
    els.panel.setAttribute('aria-hidden', 'false');
    els.btn.setAttribute('aria-expanded', 'true');
    var c = syncContext();
    if (!c && !state.notedEmpty) {
      state.notedEmpty = true;
      appendMessage('sys', 'Open a question first, then ask me anything about it.');
    }
    if (c) setTimeout(function () { try { els.input.focus(); } catch (err) {} }, 380);
  }

  function closePanel() {
    els.panel.classList.remove('open');
    els.panel.setAttribute('aria-hidden', 'true');
    els.btn.setAttribute('aria-expanded', 'false');
  }

  function togglePanel() {
    if (els.panel.classList.contains('open')) closePanel();
    else openPanel();
  }

  /* Turnstile: active only when the page carries a site key in its meta tag */

  function siteKey() {
    var m = document.querySelector('meta[name="turnstile-sitekey"]');
    return m ? trimText(m.getAttribute('content')) : '';
  }

  function flushWaiters(token) {
    if (ts.timer) { clearTimeout(ts.timer); ts.timer = null; }
    var w = ts.waiters;
    ts.waiters = [];
    for (var i = 0; i < w.length; i++) { try { w[i](token); } catch (err) {} }
  }

  function onToken(token) {
    if (ts.waiters.length) flushWaiters(token || '');
    else ts.token = token || null;
  }

  function loadTurnstileScript(done) {
    if (window.turnstile) { done(); return; }
    if (!ts.scriptRequested) {
      ts.scriptRequested = true;
      var s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.onerror = function () { flushWaiters(''); };
      document.head.appendChild(s);
    }
    var tries = 0;
    var poll = setInterval(function () {
      tries += 1;
      if (window.turnstile) { clearInterval(poll); done(); }
      else if (tries > 40) { clearInterval(poll); flushWaiters(''); }
    }, 250);
  }

  function requestToken(key) {
    if (!window.turnstile) { flushWaiters(''); return; }
    if (ts.widget !== null) {
      /* tokens are single use: reset triggers a fresh callback */
      try { window.turnstile.reset(ts.widget); } catch (err) { flushWaiters(''); }
      return;
    }
    var holder = document.createElement('div');
    holder.id = 'tutor-turnstile';
    holder.style.width = '0';
    holder.style.height = '0';
    holder.style.overflow = 'hidden';
    document.body.appendChild(holder);
    try {
      ts.widget = window.turnstile.render(holder, {
        sitekey: key,
        callback: onToken,
        'error-callback': function () { onToken(''); },
        'expired-callback': function () { ts.token = null; }
      });
    } catch (err) {
      flushWaiters('');
    }
  }

  function getToken(cb) {
    var key = siteKey();
    if (!key) { cb(''); return; }
    if (ts.token) { var t = ts.token; ts.token = null; cb(t); return; }
    ts.waiters.push(cb);
    if (ts.timer) clearTimeout(ts.timer);
    ts.timer = setTimeout(function () { flushWaiters(''); }, 12000);
    loadTurnstileScript(function () { requestToken(key); });
  }

  /* send flow */

  function setBusy(b) {
    state.busy = b;
    els.send.disabled = b;
  }

  function send() {
    if (state.busy) return;
    var text = trimText(els.input.value).slice(0, INPUT_CAP);
    if (!text) return;
    var c = syncContext();
    if (!c) {
      appendMessage('sys', 'Open a question first, then ask me anything about it.');
      return;
    }
    els.input.value = '';
    autoGrow();
    state.messages.push({ role: 'user', content: text });
    appendMessage('user', text);
    setBusy(true);
    showTyping();
    getToken(function (token) { postMessages(c, token); });
  }

  function postMessages(c, token) {
    var payload = {
      context: {
        stem: c.stem,
        options: c.options || [],
        correct: c.correct,
        explanation: c.explanation,
        skill: c.skill,
        difficulty: c.difficulty,
        figure: c.figure
      },
      messages: state.messages.slice(-HISTORY_CAP)
    };
    if (token) payload.turnstileToken = token;

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.json().then(
        function (data) { return { status: res.status, ok: res.ok, data: data }; },
        function () { return { status: res.status, ok: res.ok, data: null }; }
      );
    }).then(function (r) {
      hideTyping();
      setBusy(false);
      if (r.ok && r.data && r.data.reply) {
        state.messages.push({ role: 'assistant', content: String(r.data.reply) });
        appendMessage('assistant', String(r.data.reply));
      } else if (r.status === 429) {
        appendMessage('sys', 'You are asking faster than the tutor can think. Give it a minute.');
      } else {
        var msg = (r.data && r.data.error) ? String(r.data.error) : 'The tutor hit a snag. Try again in a moment.';
        appendMessage('sys', msg);
      }
    }).catch(function () {
      hideTyping();
      setBusy(false);
      appendMessage('sys', 'The tutor could not be reached. Check your connection and try again.');
    });
  }

  /* composer */

  function autoGrow() {
    els.input.style.height = 'auto';
    var h = Math.min(els.input.scrollHeight, 120);
    els.input.style.height = h + 'px';
  }

  /* build the button and the panel */

  function buildUI() {
    var btn = document.createElement('button');
    btn.id = 'tutor-btn';
    btn.className = 'tutor-btn';
    btn.type = 'button';
    btn.textContent = 'Tutor';
    btn.setAttribute('aria-controls', 'tutor-panel');
    btn.setAttribute('aria-expanded', 'false');
    var corner = document.querySelector('.topbar .theme-corner');
    if (corner) {
      var sw = corner.querySelector('.switch-container');
      if (sw) corner.insertBefore(btn, sw);
      else corner.appendChild(btn);
    } else {
      document.body.appendChild(btn);
    }

    var panel = document.createElement('aside');
    panel.id = 'tutor-panel';
    panel.setAttribute('aria-hidden', 'true');
    panel.setAttribute('aria-label', 'Tutor');
    panel.innerHTML =
      '<div class="tutor-head">' +
        '<h2 class="tutor-title">Tutor</h2>' +
        '<button class="tutor-close" id="tutor-close" type="button" aria-label="Close tutor">&#10005;</button>' +
      '</div>' +
      '<div class="tutor-context" id="tutor-context">No question loaded</div>' +
      '<div class="tutor-messages" id="tutor-messages" aria-live="polite"></div>' +
      '<div class="tutor-compose">' +
        '<textarea class="tutor-input" id="tutor-input" rows="1" maxlength="2000" placeholder="Ask about this question" aria-label="Message the tutor"></textarea>' +
        '<button class="tutor-send" id="tutor-send" type="button">Send</button>' +
      '</div>';
    document.body.appendChild(panel);

    els.btn = btn;
    els.panel = panel;
    els.close = panel.querySelector('#tutor-close');
    els.ctx = panel.querySelector('#tutor-context');
    els.list = panel.querySelector('#tutor-messages');
    els.input = panel.querySelector('#tutor-input');
    els.send = panel.querySelector('#tutor-send');
  }

  function init() {
    if (!document.body) return;
    buildUI();
    els.btn.addEventListener('click', togglePanel);
    els.close.addEventListener('click', closePanel);
    els.send.addEventListener('click', send);
    els.input.addEventListener('input', autoGrow);
    els.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && els.panel.classList.contains('open')) closePanel();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
