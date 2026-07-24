/* ═══════════════════════════════════════════════════════════════════
   SATIFIED — landing engine
   Horizontal world (GSAP pinned track) · spine line · WebGL hero
   counter. All effects re-implemented from scratch.
   ═══════════════════════════════════════════════════════════════════ */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
/* single source of truth: the inline head script tags <html> with .vertical.
   JS and CSS read the SAME flag, so their modes can never disagree. */
if (!document.documentElement.classList.contains('vertical') &&
    (matchMedia('(hover: none), (pointer: coarse)').matches || innerWidth < 761 || ('ontouchstart' in window))) {
  document.documentElement.classList.add('vertical');
}
const TOUCH = document.documentElement.classList.contains('vertical');
const HORIZONTAL = !TOUCH;   /* touch devices get a normal vertical page */
const vw = () => window.innerWidth;
const vh = () => window.innerHeight;

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

const track   = $('#track');
const wrap    = $('.track-wrap');
const header  = $('#site-header');
const spine   = $('#spine');

/* ────────────────────────────────────────────────────────────────────
   0 · CRASH TRAP — registered before anything can die. Whatever
       happens, the visitor gets a scrollable page with content, and
       on private networks the error prints on screen for diagnosis.
   ──────────────────────────────────────────────────────────────────── */
const DEV_HOST = /^(localhost|127\.|192\.168\.|10\.)/.test(location.hostname);
function crashRecover(err) {
  try {
    if (document.body.dataset.crashed) return;
    document.body.dataset.crashed = '1';
    if (DEV_HOST && err) {
      const d = document.createElement('div');
      d.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:99999;background:#b00020;color:#fff;font:12px/1.5 monospace;padding:10px;white-space:pre-wrap;word-break:break-all';
      d.textContent = 'JS crash: ' + ((err && (err.stack || err.message)) || err);
      document.body.appendChild(d);
    }
    if (TOUCH) document.body.classList.add('vertical');
    document.body.classList.add('no-gl');
    const dc = document.getElementById('hero-counter-dom'); if (dc) dc.textContent = '1600';
    gsap.set(['.site-header', '.hero-tag', '.hero-foot', '#hero-script'], { autoAlpha: 1, y: 0 });
  } catch (_) {}
}
addEventListener('error', e => {
  if (!document.body.dataset.entrance) crashRecover(e.error || (e.message + ' @ ' + (e.filename || '') + ':' + (e.lineno || '')));
});
addEventListener('unhandledrejection', e => {
  if (!document.body.dataset.entrance) crashRecover(e.reason);
});
setTimeout(() => {
  if (!document.body.dataset.entrance) {
    try { introReady = true; drawCounterTex(0); drawNum(); startCounter(); } catch (err) { crashRecover(err); }
  }
}, 4000);

/* ────────────────────────────────────────────────────────────────────
   1 · ENTRANCE — black screen, the 1600 count, the tagline, then the
       living math background and everything else fades in.
   ──────────────────────────────────────────────────────────────────── */
const reveal = { v: 0 };   /* 0 = pure black + number only · 1 = full scene */
const ENTRANCE_HIDDEN = ['.site-header', '.hero-tag', '.hero-foot'];

/* ────────────────────────────────────────────────────────────────────
   2 · HORIZONTAL ENGINE — native vertical scroll → track translateX.
       Works with mouse, trackpad and touch, portrait & landscape.
   ──────────────────────────────────────────────────────────────────── */
const dist = () => Math.max(1, track.scrollWidth - vw());

let ready = false;   /* guards onScrollUpdate until boot() finishes (TDZ safety) */

const mainTween = HORIZONTAL ? gsap.to(track, {
  x: () => -dist(),
  ease: 'none',
  scrollTrigger: {
    trigger: wrap,
    pin: true,
    scrub: REDUCED ? true : 1.1,
    start: 'top top',
    end: () => '+=' + dist(),
    invalidateOnRefresh: true,
    anticipatePin: 1,
    onUpdate: self => onScrollUpdate(self)
  }
}) : null;

/* panel lookup for header theme + spine geometry */
let panels = [];
function measurePanels() {
  panels = $$('.panel').map(p => ({
    el: p, left: p.offsetLeft, width: p.offsetWidth,
    theme: p.dataset.theme || 'light', id: p.id
  }));
}

/* ────────────────────────────────────────────────────────────────────
   3 · SPINE LINE — hand-drawn wavy path across the whole track,
       generated to fit the real layout. Dashed guide + solid draw-on copy.
   ──────────────────────────────────────────────────────────────────── */
const dashPath  = $('#spine-dash');
const solidPath = $('#spine-solid');
const dotsGroup = $('#spine-dots');
let solidLen = 0;

/* deterministic pseudo-random for a stable hand-drawn feel */
const wob = i => Math.sin(i * 12.9898) * .5 + Math.sin(i * 4.1414) * .5;

function buildSpine() {
  measurePanels();
  const H = vh();
  const W = track.scrollWidth;
  spine.setAttribute('viewBox', `0 0 ${W} ${H}`);
  spine.setAttribute('width', W);
  spine.setAttribute('height', H);

  const yAt = {                       /* viewport-height fractions per chapter */
    'p-hero': .57, 'p-manifesto': .94, 'p-stats': .18,
    'p-algebra': .86, 'p-advmath': .80, 'p-psda': .86, 'p-geo': .80,
    'p-test': .12, 'p-faq': .88, 'p-end': .55
  };
  const get = id => panels.find(p => p.id === id);

  /* build waypoint list: [x, y] pairs; null = pen up (gap) */
  const pts = [];
  const hero = get('p-hero'), end = get('p-end');

  pts.push([hero.left + hero.width * .62, H * yAt['p-hero']]);
  pts.push([hero.left + hero.width, H * (yAt['p-hero'] - .015)]);
  /* dive low before the manifesto text so the line never crosses the heading */
  pts.push([get('p-manifesto').left - vw() * .01, H * .97]);

  const chapters = ['p-manifesto', 'p-stats', 'p-algebra', 'p-advmath', 'p-psda', 'p-geo', 'p-test', 'p-faq'];
  chapters.forEach((id, ci) => {
    const p = get(id); if (!p) return;
    const y = H * yAt[id];
    const n = Math.max(2, Math.round(p.width / (vw() * .5)));
    for (let i = 0; i <= n; i++) {
      const x = p.left + (p.width * i) / n;
      pts.push([x, y + wob(ci * 7 + i) * H * .045]);
    }
  });
  pts.push([end.left + vw() * .10, H * yAt['p-end']]);

  /* Catmull-Rom → cubic bézier, honouring pen-up gaps */
  const segs = [];
  let cur = [];
  pts.forEach(pt => { if (pt === null) { if (cur.length) segs.push(cur); cur = []; } else cur.push(pt); });
  if (cur.length) segs.push(cur);

  const d = segs.map(seg => {
    if (seg.length < 2) return '';
    let s = `M ${seg[0][0].toFixed(1)} ${seg[0][1].toFixed(1)}`;
    for (let i = 0; i < seg.length - 1; i++) {
      const p0 = seg[Math.max(0, i - 1)], p1 = seg[i], p2 = seg[i + 1], p3 = seg[Math.min(seg.length - 1, i + 2)];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      s += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return s;
  }).join(' ');

  dashPath.setAttribute('d', d);
  solidPath.setAttribute('d', d);
  solidLen = solidPath.getTotalLength();
  solidPath.style.strokeDasharray = solidLen;
  solidPath.style.strokeDashoffset = solidLen;

  /* chapter dots on the line */
  dotsGroup.innerHTML = '';
  chapters.forEach(id => {
    const p = get(id); if (!p) return;
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', p.left); c.setAttribute('cy', H * yAt[id]);
    c.setAttribute('r', 5); c.setAttribute('class', 'spine-dot');
    dotsGroup.appendChild(c);
  });
}

/* ────────────────────────────────────────────────────────────────────
   4 · HERO — WebGL counter with liquid mouse displacement + halftone.
   ──────────────────────────────────────────────────────────────────── */
const glCanvas   = $('#hero-gl');
const heroPanel  = $('#p-hero');
const domCounter = $('#hero-counter-dom');
const counter = { v: 0 };
let gl = null, glProg = null, glTex = null, texCanvas = null, texCtx = null;
let uMouseLoc, uResLoc, uTimeLoc, uRevealLoc;
const mouse = { x: .5, y: .45, tx: .5, ty: .45 };
let heroVisible = true, startT = performance.now();
/* adaptive performance: degrade resolution + scene rate on slow machines */
let perfScale = TOUCH ? .85 : 1, sceneEvery = TOUCH ? 3 : 2, texW = 0, texH = 0, introReady = false;
let glTexNum = null, numCanvas = null, numCtx = null, numW = 0, numH = 0;

const FRAG = `
precision mediump float;
uniform sampler2D uTex;
uniform sampler2D uNum;
uniform vec2 uMouse; uniform vec2 uRes; uniform float uTime;
uniform float uReveal;

vec2 displace(vec2 suv, vec2 p, vec2 m, vec2 asp, float t){
  float d = distance(p, m);
  float force = exp(-d * d * 9.0);
  vec2 dir = (p - m) / max(d, 1e-3);
  vec2 duv = suv - (dir * force * 0.085 * uReveal) / asp;
  duv += vec2(sin(t * .6 + suv.y * 6.283), cos(t * .45 + suv.x * 6.283)) * 0.0035 * uReveal;
  return vec2(duv.x, 1.0 - duv.y);
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 asp = vec2(uRes.x / uRes.y, 1.0);
  vec2 p = uv * asp;
  vec2 m = uMouse * asp;
  float d = distance(p, m);
  float force = exp(-d * d * 9.0);

  /* bead lattice — the beads ARE the display */
  float cells = 84.0;
  vec2 gp = p * cells;
  vec2 id = floor(gp);
  vec2 cuv = fract(gp) - 0.5;

  /* one scene sample at the bead's centre decides how much it swells */
  vec2 centre = (id + 0.5) / cells;         /* in p-space */
  vec2 texC = displace(centre / asp, centre, m, asp, uTime);
  vec4 cTex = texture2D(uTex, texC);
  float lumC = cTex.a * max(max(cTex.r, cTex.g), cTex.b);

  /* per-pixel sample keeps the content readable through the lattice */
  vec2 texP = displace(uv, p, m, asp, uTime);
  vec4 tex = texture2D(uTex, texP);
  float lumP = tex.a * max(max(tex.r, tex.g), tex.b);

  float r = (0.11 + lumC * 0.34 + force * 0.15) * uReveal;   /* everything but the number obeys the reveal */
  float bead = smoothstep(r, r - 0.09, length(cuv)) * uReveal;

  vec3 bg   = mix(vec3(0.0), vec3(0.040, 0.035, 0.004), uReveal);   /* pure black entrance */
  vec3 base = vec3(0.128, 0.118, 0.082);
  vec3 lit  = mix(base, tex.rgb, clamp(lumP * 1.9, 0.0, 1.0));
  vec3 col  = mix(bg, lit, bead);

  /* the 1600 rides its own crisp layer — solid, liquid-distorted, above the beads */
  vec4 num = texture2D(uNum, texP);
  col = mix(col, num.rgb, num.a);
  gl_FragColor = vec4(col, 1.0);
}`;
const VERT = `attribute vec2 aPos; void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`;

function initGL() {
  try {
    gl = glCanvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return false;
    const sh = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(s);
      return s;
    };
    glProg = gl.createProgram();
    gl.attachShader(glProg, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(glProg, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(glProg);
    if (!gl.getProgramParameter(glProg, gl.LINK_STATUS)) throw 'link';
    gl.useProgram(glProg);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(glProg, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const mkTex = () => {
      const t = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      return t;
    };
    glTex = mkTex();
    glTexNum = mkTex();
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, glTex);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, glTexNum);
    gl.uniform1i(gl.getUniformLocation(glProg, 'uTex'), 0);
    gl.uniform1i(gl.getUniformLocation(glProg, 'uNum'), 1);
    uMouseLoc = gl.getUniformLocation(glProg, 'uMouse');
    uResLoc   = gl.getUniformLocation(glProg, 'uRes');
    uTimeLoc  = gl.getUniformLocation(glProg, 'uTime');
    uRevealLoc = gl.getUniformLocation(glProg, 'uReveal');
    texCanvas = document.createElement('canvas');
    texCtx = texCanvas.getContext('2d');
    numCanvas = document.createElement('canvas');
    numCtx = numCanvas.getContext('2d');
    document.body.classList.add('has-gl');
    return true;
  } catch (e) { gl = null; return false; }
}

function sizeGL() {
  if (!gl) return;
  const dpr = Math.min(devicePixelRatio || 1, 1.5) * perfScale;
  const tdpr = Math.min(devicePixelRatio || 1, 1) * .8 * perfScale;  /* scene layer re-uploads often */
  const ndpr = Math.min(devicePixelRatio || 1, 1.5) * Math.max(perfScale, .8);
  const w = heroPanel.offsetWidth, h = heroPanel.offsetHeight;
  glCanvas.width = Math.max(2, Math.round(w * dpr));
  glCanvas.height = Math.max(2, Math.round(h * dpr));
  texCanvas.width = Math.max(2, Math.round(w * tdpr));
  texCanvas.height = Math.max(2, Math.round(h * tdpr));
  numCanvas.width = Math.max(2, Math.round(w * ndpr));
  numCanvas.height = Math.max(2, Math.round(h * ndpr));
  texW = 0; texH = 0; numW = 0; numH = 0;               /* force full texture respec */
  gl.viewport(0, 0, glCanvas.width, glCanvas.height);
  drawCounterTex(0);
  drawNum();
}

/* crisp counter layer — only redrawn while the number changes */
function drawNum() {
  if (!gl) return;
  const w = numCanvas.width, h = numCanvas.height;
  numCtx.clearRect(0, 0, w, h);
  const fs = Math.min(w * .33, h * .52);
  numCtx.font = `400 ${fs}px "Instrument Serif", Georgia, serif`;
  numCtx.textAlign = 'center';
  numCtx.textBaseline = 'middle';
  numCtx.fillStyle = '#E5E1D3';
  numCtx.fillText(String(Math.round(counter.v)), w / 2, h * .47);
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, glTexNum);
  if (w === numW && h === numH) {
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, numCanvas);
  } else {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, numCanvas);
    numW = w; numH = h;
  }
  gl.activeTexture(gl.TEXTURE0);
}

/* ambient math scene — everything below gets liquid-distorted by the shader */
const EXPRS = [
  ['sin²θ + cos²θ = 1',            .06, .13, .7],
  ['f(x) = A·sin(Bx + C)',         .67, .10, 1.1],
  ['∫₀¹ x² dx = ⅓',                .07, .47, .9],
  ['tan θ = sin θ / cos θ',        .70, .60, .6],
  ['e^iπ + 1 = 0',                 .45, .07, 1.3],
  ['y = mx + b',                   .26, .09, .8],
  ['a² + b² = c²',                 .90, .40, 1.0],
  ['Δy / Δx',                      .93, .70, .75],
  ['(x−h)² + (y−k)² = r²',         .13, .88, .65],
  ['P(A∣B) = P(A∩B) / P(B)',       .52, .90, .85],
  ['2π rad = 360°',                .04, .68, 1.15],
  ['x = (−b ± √(b²−4ac)) / 2a',    .68, .84, .5]
];

function drawMathScene(c, w, h, t) {
  const u = Math.min(w, h) / 900;
  c.lineWidth = 5 * u;

  /* sine + cosine waves along the lower band */
  const yMid = h * .78, A = h * .05;
  c.strokeStyle = 'rgba(150,138,95,.8)';
  c.beginPath();
  for (let x = 0; x <= w; x += 7) { const y = yMid + A * Math.sin(x / (w / 15) + t * 1.05); x ? c.lineTo(x, y) : c.moveTo(x, y); }
  c.stroke();
  c.strokeStyle = 'rgba(232,185,0,.6)';
  c.beginPath();
  for (let x = 0; x <= w; x += 7) { const y = yMid + A * Math.cos(x / (w / 15) + t * .8); x ? c.lineTo(x, y) : c.moveTo(x, y); }
  c.stroke();

  /* unit circle, rotating terminal side + swept arc (top right) */
  const cx = w * .855, cy = h * .225, R = Math.min(w, h) * .1;
  c.strokeStyle = 'rgba(150,138,95,.85)';
  c.beginPath(); c.arc(cx, cy, R, 0, 6.2832); c.stroke();
  c.strokeStyle = 'rgba(150,138,95,.55)';
  c.beginPath(); c.moveTo(cx - R * 1.25, cy); c.lineTo(cx + R * 1.25, cy);
  c.moveTo(cx, cy - R * 1.25); c.lineTo(cx, cy + R * 1.25); c.stroke();
  const th = t * .55;
  c.strokeStyle = 'rgba(232,185,0,.85)';
  c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + R * Math.cos(th), cy - R * Math.sin(th)); c.stroke();
  c.beginPath(); c.arc(cx, cy, R * .32, -th, 0); c.stroke();
  /* sin projection */
  c.setLineDash([6 * u, 7 * u]);
  c.strokeStyle = 'rgba(232,185,0,.55)';
  c.beginPath();
  c.moveTo(cx + R * Math.cos(th), cy - R * Math.sin(th));
  c.lineTo(cx + R * Math.cos(th), cy);
  c.stroke();
  c.setLineDash([]);

  /* parabola with sweeping area-under-curve (top left) */
  const px = w * .14, py = h * .32, s2 = Math.min(w, h) * .15;
  const sweep = (Math.sin(t * .5) + 1) / 2;
  c.strokeStyle = 'rgba(150,138,95,.8)';
  c.beginPath();
  for (let i = 0; i <= 40; i++) { const X = -1 + 2 * i / 40; const sx = px + X * s2, sy = py - X * X * s2 * .9; i ? c.lineTo(sx, sy) : c.moveTo(sx, sy); }
  c.stroke();
  c.strokeStyle = 'rgba(150,138,95,.5)';
  c.beginPath(); c.moveTo(px - s2 * 1.15, py); c.lineTo(px + s2 * 1.15, py); c.stroke();
  const xe = -1 + 2 * sweep;
  c.beginPath(); c.moveTo(px - s2, py);
  for (let i = 0; i <= 30; i++) { const X = -1 + (xe + 1) * i / 30; c.lineTo(px + X * s2, py - X * X * s2 * .9); }
  c.lineTo(px + xe * s2, py); c.closePath();
  c.fillStyle = 'rgba(200,150,90,.45)'; c.fill();

  /* drifting formulas, breathing in and out — sized to read through the beads */
  c.textAlign = 'left'; c.textBaseline = 'middle';
  EXPRS.forEach(([txt, fx, fy, sp], i) => {
    const a = .3 + .35 * (0.5 + 0.5 * Math.sin(t * sp + i * 1.7));
    c.font = `500 ${(i % 3 === 0 ? 30 : 25) * u}px "DM Mono", monospace`;
    c.fillStyle = i % 4 === 0 ? `rgba(232,185,0,${a})` : `rgba(205,195,155,${a})`;
    c.fillText(txt, fx * w, fy * h + Math.sin(t * .35 + i) * 6 * u);
  });

  /* numbers relentlessly counting up */
  c.font = `500 ${22 * u}px "DM Mono", monospace`;
  c.fillStyle = 'rgba(205,195,155,.6)';
  c.fillText('n = ' + String(Math.floor((t * 61) % 10000)).padStart(4, '0'), w * .055, h * .30);
  c.fillText('Σ = ' + String(Math.floor(200 + (t * 43) % 600)), w * .885, h * .56);
  c.fillStyle = 'rgba(232,185,0,.55)';
  c.fillText('score → ' + String(Math.floor((t * 97) % 1601)).padStart(4, ' '), w * .075, h * .62);
}

function drawCounterTex(t) {
  if (!gl) return;
  const w = texCanvas.width, h = texCanvas.height;
  texCtx.clearRect(0, 0, w, h);
  drawMathScene(texCtx, w, h, t || 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, glTex);
  if (w === texW && h === texH) {
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, texCanvas);
  } else {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texCanvas);
    texW = w; texH = h;
  }
}

let frameN = 0, lastFrameT = 0, ftAccum = 0, ftSamples = 0, degraded = 0;
function renderGL(ts) {
  requestAnimationFrame(renderGL);
  if (!gl || !heroVisible || !introReady) return;

  /* frame-time watchdog: two-stage degrade on weak GPUs */
  if (lastFrameT) { ftAccum += ts - lastFrameT; ftSamples++; }
  lastFrameT = ts;
  if (ftSamples >= 60) {
    const avg = ftAccum / ftSamples; ftAccum = 0; ftSamples = 0;
    if (avg > 36 && degraded < 2) {
      degraded++; sceneEvery += 2; perfScale *= .68;
      sizeGL();
    }
  }

  frameN++;
  const tNow = (performance.now() - startT) / 1000;
  if (!REDUCED && frameN % sceneEvery === 0) drawCounterTex(tNow);   /* living math scene */
  mouse.x += (mouse.tx - mouse.x) * .075;
  mouse.y += (mouse.ty - mouse.y) * .075;
  gl.uniform2f(uMouseLoc, mouse.x, 1 - mouse.y);
  gl.uniform2f(uResLoc, glCanvas.width, glCanvas.height);
  gl.uniform1f(uTimeLoc, REDUCED ? 0 : tNow);
  gl.uniform1f(uRevealLoc, REDUCED ? 1 : reveal.v);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

let entranceStarted = false;
function startCounter() {
  if (entranceStarted) return;
  entranceStarted = true;
  document.body.dataset.entrance = '1';   /* tells the crash trap all is well */
  const useGL = !!gl;
  /* skip the cinematic when reduced motion is set or the page restored mid-scroll */
  if (REDUCED || scrollY > 60) {
    counter.v = 1600; reveal.v = 1;
    if (useGL) drawNum(); else domCounter.textContent = '1600';
    gsap.set(['#hero-script', ...ENTRANCE_HIDDEN], { autoAlpha: 1, y: 0 });
    return;
  }
  /* 1 · black screen, the number counts to 1600 */
  gsap.to(counter, {
    v: 1600, duration: 2, ease: 'power3.out',
    onUpdate: () => { if (gl) drawNum(); else domCounter.textContent = String(Math.round(counter.v)); },
    onComplete: () => {
      /* 2 · the tagline arrives */
      gsap.fromTo('#hero-script', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .9, ease: 'power2.out' });
      /* 3 · a beat later, the living math background and everything else */
      gsap.delayedCall(.7, () => {
        gsap.to(reveal, { v: 1, duration: 1.6, ease: 'power2.inOut' });
        gsap.to(ENTRANCE_HIDDEN, { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out', stagger: .12 });
      });
    }
  });
}

/* pointermove covers mouse AND touch; passive, so it can never block
   scrolling. On touch, the browser scrolls natively (touch-action pan-y)
   while these events keep the beads reacting under the finger. */
addEventListener('pointermove', e => {
  mouse.tx = e.clientX / vw();
  mouse.ty = e.clientY / vh();
}, { passive: true });

/* ────────────────────────────────────────────────────────────────────
   5 · PER-TICK UPDATE — header theme, spine draw.
   ──────────────────────────────────────────────────────────────────── */
function onScrollUpdate(self) {
  if (!ready) return;
  const trackX = gsap.getProperty(track, 'x');

  /* header theme: which panel sits under the header logo */
  const probe = -trackX + 60;
  let theme = 'light';
  for (const p of panels) if (probe >= p.left && probe < p.left + p.width) { theme = p.theme; break; }
  header.classList.toggle('on-dark', theme === 'dark');

  /* solid spine draws itself just ahead of the viewport centre */
  if (solidLen) {
    const lead = Math.min(1, self.progress * 1.12);
    solidPath.style.strokeDashoffset = solidLen * (1 - lead);
  }

  heroVisible = -trackX < vw() * 1.2;
}

/* ────────────────────────────────────────────────────────────────────
   6 · PANEL CONTENT REVEALS (containerAnimation triggers)
   ──────────────────────────────────────────────────────────────────── */
function buildReveals() {
  if (REDUCED) return;
  const sets = [
    ['#p-manifesto', ['.eyebrow', '.manifesto-h', '.manifesto-cols p', '.manifesto-sig']],
    ['#p-stats',     ['.stats-giant', '.stats-list li', '.stats-note']],
    ['#p-algebra',   ['.eyebrow', '.domain-h', '.domain-skills li', '.domain-cta']],
    ['#p-advmath',   ['.eyebrow', '.domain-h', '.domain-skills li', '.domain-cta']],
    ['#p-psda',      ['.eyebrow', '.domain-h', '.domain-skills li', '.domain-cta']],
    ['#p-geo',       ['.eyebrow', '.domain-h', '.domain-skills li', '.domain-cta']],
    ['#p-test',      ['.eyebrow', '.test-h', '.test-copy', '.test-chips li', '.test-cta']],
    ['#p-faq',       ['.eyebrow', '.faq-h', '.faq-item']],
    ['#p-end',       ['.end-h', '.end-cta']]
  ];
  sets.forEach(([panelSel, parts]) => {
    const panel = $(panelSel); if (!panel) return;
    const targets = parts.flatMap(sel => $$(sel, panel));
    if (!targets.length) return;
    gsap.fromTo(targets,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1, y: 0, duration: .85, ease: 'power3.out', stagger: .06,
        scrollTrigger: {
          trigger: panel,
          containerAnimation: HORIZONTAL ? mainTween : undefined,
          start: HORIZONTAL ? 'left 78%' : 'top 78%',
          toggleActions: 'play none none none'
        }
      });
  });
}

/* stats panel: 1,483 counts itself up on entry */
function buildStatsCounter() {
  const el = $('#stats-num');
  if (!el || REDUCED) return;
  const obj = { v: 0 };
  ScrollTrigger.create({
    trigger: '#p-stats',
    containerAnimation: HORIZONTAL ? mainTween : undefined,
    start: HORIZONTAL ? 'left 80%' : 'top 80%',
    once: true,
    onEnter: () => {
      el.style.minWidth = el.offsetWidth + 'px';   /* no layout shift while counting */
      gsap.to(obj, {
        v: 1483, duration: 1.9, ease: 'power3.out',
        onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('en-US'); }
      });
    }
  });
}

/* ────────────────────────────────────────────────────────────────────
   7 · NAV JUMPS
   ──────────────────────────────────────────────────────────────────── */
function jumpTo(id) {
  const el = document.getElementById(id); if (!el) return;
  if (!HORIZONTAL) {
    gsap.to(window, { scrollTo: el.offsetTop, duration: REDUCED ? 0 : 1.1, ease: 'power3.inOut' });
    return;
  }
  const p = panels.find(x => x.id === id); if (!p) return;
  const st = mainTween.scrollTrigger;
  const target = st.start + (p.left / dist()) * (st.end - st.start);
  gsap.to(window, { scrollTo: Math.min(target, st.end), duration: REDUCED ? 0 : 1.4, ease: 'power3.inOut' });
}
$$('.nav-jump').forEach(b => b.addEventListener('click', () => jumpTo('p-' + b.dataset.jump)));

/* ────────────────────────────────────────────────────────────────────
   8 · FULL SITE MENU (burger)
   ──────────────────────────────────────────────────────────────────── */
const burger = $('#burger');
const menuOverlay = $('#menu-overlay');
function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  if (burger) burger.setAttribute('aria-expanded', String(open));
  if (menuOverlay) menuOverlay.setAttribute('aria-hidden', String(!open));
}
if (burger) {
  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
}

/* ────────────────────────────────────────────────────────────────────
   BOOT
   ──────────────────────────────────────────────────────────────────── */
/* vertical (touch) mode: normal page scroll,
   per panel header theming, no spine, no pin */
function setupVertical() {
  document.body.classList.add('vertical');
  measurePanels();
  panels.forEach(p => ScrollTrigger.create({
    trigger: p.el, start: 'top 72px', end: 'bottom 72px',
    onToggle: self => { if (self.isActive) header.classList.toggle('on-dark', p.theme === 'dark'); }
  }));
  addEventListener('scroll', () => { heroVisible = scrollY < vh() * 1.2; }, { passive: true });
}

function boot() {
  /* entrance: hide everything except the counter before first paint */
  if (!REDUCED) gsap.set([...ENTRANCE_HIDDEN, '#hero-script'], { autoAlpha: 0, y: 8 });
  const glOK = initGL();
  if (!glOK) document.body.classList.add('no-gl');   /* DOM counter takes over */
  /* recover gracefully if the GPU resets (window moves between displays, driver hiccups) */
  glCanvas.addEventListener('webglcontextlost', e => {
    e.preventDefault(); gl = null;
    document.body.classList.add('no-gl');
    domCounter.textContent = String(Math.round(counter.v));
  });
  glCanvas.addEventListener('webglcontextrestored', () => {
    if (initGL()) { document.body.classList.remove('no-gl'); sizeGL(); drawNum(); }
  });
  if (HORIZONTAL) buildSpine(); else setupVertical();
  sizeGL();
  buildReveals();
  buildStatsCounter();
  ScrollTrigger.addEventListener('refreshInit', () => { if (HORIZONTAL) buildSpine(); sizeGL(); });
  ready = true;
  ScrollTrigger.refresh();
  if (glOK) renderGL();

  const fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise(r => setTimeout(r, 1200))]).then(() => {
    drawCounterTex(0);
    drawNum();
    introReady = true;
    startCounter();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { try { boot(); } catch (err) { crashRecover(err); } });
} else {
  try { boot(); } catch (err) { crashRecover(err); }
}

/* re-measure once webfonts + all assets have settled the layout */
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}
addEventListener('load', () => ScrollTrigger.refresh());

/* orientation changes re-measure everything */
addEventListener('orientationchange', () => setTimeout(() => ScrollTrigger.refresh(), 350));

