/*
  Satified tutor endpoint: a Cloudflare Pages Function served at POST /api/tutor.
  Free tier LLM chain: Gemini first, then Groq, then Cerebras. Optional Turnstile
  verification when the secret is configured.
  Uses only Web APIs available in the Workers runtime: fetch and URLSearchParams.
  No Node APIs.
*/

const GEMINI_MODEL = 'gemini-2.5-flash';
const GROQ_MODEL = 'llama-3.3-70b-versatile';
const CEREBRAS_MODEL = 'llama-3.3-70b';

const REST_MESSAGE = 'The tutor is resting. Try again in a minute.';

const LIMITS = {
  messages: 8,
  messageChars: 2000,
  stemChars: 6000,
  figureChars: 8000,
  optionChars: 600,
  options: 8,
  explanationChars: 4000,
  smallField: 200
};

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status: status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

/* Coerce to string and truncate. Never rejects, only clips. */
function asText(value, max) {
  if (typeof value !== 'string') value = value == null ? '' : String(value);
  return value.length > max ? value.slice(0, max) : value;
}

function normalizeContext(raw) {
  const src = raw && typeof raw === 'object' ? raw : {};
  const options = Array.isArray(src.options)
    ? src.options.slice(0, LIMITS.options).map(function (o) { return asText(o, LIMITS.optionChars); })
    : [];
  return {
    stem: asText(src.stem, LIMITS.stemChars),
    options: options,
    correct: asText(src.correct, LIMITS.optionChars),
    explanation: asText(src.explanation, LIMITS.explanationChars),
    skill: asText(src.skill, LIMITS.smallField),
    difficulty: asText(src.difficulty, LIMITS.smallField),
    figure: asText(src.figure, LIMITS.figureChars)
  };
}

function normalizeMessages(raw) {
  if (!Array.isArray(raw)) return [];
  const recent = raw.slice(-LIMITS.messages);
  const out = [];
  for (const item of recent) {
    if (!item || typeof item !== 'object') continue;
    const content = asText(item.content, LIMITS.messageChars);
    if (!content) continue;
    out.push({ role: item.role === 'assistant' ? 'assistant' : 'user', content: content });
  }
  return out;
}

function buildSystemPrompt(ctx) {
  const lines = [];
  lines.push('You are the Satified tutor, a patient SAT Math coach. The student is working on this exact question.');
  lines.push('Question: ' + ctx.stem);
  if (ctx.options.length) {
    const labeled = ctx.options.map(function (opt, i) {
      return String.fromCharCode(65 + i) + '. ' + opt;
    });
    lines.push('Choices: ' + labeled.join('   '));
  } else {
    lines.push('Choices: student produced response, the student types the answer into a box.');
  }
  lines.push('The verified correct answer is: ' + (ctx.correct || 'not provided') + '.');
  if (ctx.explanation) lines.push('Official explanation: ' + ctx.explanation);
  lines.push('Skill: ' + (ctx.skill || 'SAT Math') + ', difficulty: ' + (ctx.difficulty || 'unknown') + '.');
  if (ctx.figure) {
    lines.push('The question includes this figure, provided as SVG source; read coordinates, labels and shapes from it: ' + ctx.figure);
  }
  lines.push('HARD RULES:');
  lines.push('(1) The verified correct answer above is ground truth. Never assert a different final answer. If your own derivation seems to disagree, recheck your work assuming the verified answer is right, and guide the student toward it.');
  lines.push('(2) Teach step by step in short paragraphs. Prefer guiding questions first, and give the full walkthrough when the student asks for it directly or is stuck twice.');
  lines.push('(3) Write math in LaTeX between $ signs, the interface renders it.');
  lines.push('(4) Stay on SAT math and this question; politely decline anything else.');
  lines.push('(5) Never use em dashes or en dashes in your writing.');
  lines.push('(6) Keep replies under 250 words unless a full walkthrough is requested.');
  return lines.join('\n');
}

async function verifyTurnstile(secret, token, ip) {
  try {
    const form = new URLSearchParams();
    form.set('secret', secret);
    form.set('response', typeof token === 'string' ? token : '');
    if (ip) form.set('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form
    });
    if (!res.ok) return false;
    const data = await res.json();
    return !!(data && data.success);
  } catch (err) {
    return false;
  }
}

async function callGemini(apiKey, system, messages) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + GEMINI_MODEL + ':generateContent?key=' + encodeURIComponent(apiKey);
  const body = {
    systemInstruction: { parts: [{ text: system }] },
    contents: messages.map(function (m) {
      return { role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] };
    }),
    generationConfig: {
      maxOutputTokens: 1024,
      temperature: 0.4,
      thinkingConfig: { thinkingBudget: 0 }
    }
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('gemini http ' + res.status);
  const data = await res.json();
  const candidate = data && data.candidates && data.candidates[0];
  const parts = (candidate && candidate.content && candidate.content.parts) || [];
  let text = '';
  for (const part of parts) {
    if (part && typeof part.text === 'string') text += part.text;
  }
  text = text.trim();
  if (!text) throw new Error('gemini empty reply');
  return text;
}

async function callOpenAiCompatible(url, apiKey, model, system, messages) {
  const body = {
    model: model,
    messages: [{ role: 'system', content: system }].concat(messages),
    max_tokens: 1024,
    temperature: 0.4
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(model + ' http ' + res.status);
  const data = await res.json();
  const choice = data && data.choices && data.choices[0];
  const text = choice && choice.message && typeof choice.message.content === 'string'
    ? choice.message.content.trim()
    : '';
  if (!text) throw new Error(model + ' empty reply');
  return text;
}

async function askProviders(env, system, messages) {
  const attempts = [];
  if (env.GEMINI_API_KEY) {
    attempts.push(function () {
      return callGemini(env.GEMINI_API_KEY, system, messages);
    });
  }
  if (env.GROQ_API_KEY) {
    attempts.push(function () {
      return callOpenAiCompatible('https://api.groq.com/openai/v1/chat/completions', env.GROQ_API_KEY, GROQ_MODEL, system, messages);
    });
  }
  if (env.CEREBRAS_API_KEY) {
    attempts.push(function () {
      return callOpenAiCompatible('https://api.cerebras.ai/v1/chat/completions', env.CEREBRAS_API_KEY, CEREBRAS_MODEL, system, messages);
    });
  }
  for (const attempt of attempts) {
    try {
      const reply = await attempt();
      if (reply) return reply;
    } catch (err) {
      /* any failure, including 429 and 5xx, falls through to the next provider */
    }
  }
  return null;
}

export async function onRequestPost(context) {
  try {
    const request = context.request;
    const env = context.env || {};

    let body;
    try {
      body = await request.json();
    } catch (err) {
      return jsonResponse({ error: 'Send JSON with a context and messages.' }, 400);
    }
    if (!body || typeof body !== 'object') {
      return jsonResponse({ error: 'Send JSON with a context and messages.' }, 400);
    }

    const ctx = normalizeContext(body.context);
    if (!ctx.stem) {
      return jsonResponse({ error: 'Missing question stem.' }, 400);
    }
    const messages = normalizeMessages(body.messages);
    if (!messages.length) {
      return jsonResponse({ error: 'Send at least one message.' }, 400);
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

    /* Turnstile: enforced only when the secret is configured, so local dev works */
    if (env.TURNSTILE_SECRET) {
      const human = await verifyTurnstile(env.TURNSTILE_SECRET, body.turnstileToken, ip);
      if (!human) {
        return jsonResponse({ error: 'Human check failed. Refresh the page and try again.' }, 403);
      }
    }

    /* No app level rate limiting. Schools and libraries put many students
       behind one public IP, so a per IP limit would block a whole class at
       once. The free model tiers have their own daily caps, and when those
       are spent the tutor degrades gracefully to the resting message below.
       No reply caching either: stems carry regenerated numbers, so the tutor
       always answers the live conversation. */
    const system = buildSystemPrompt(ctx);
    const reply = await askProviders(env, system, messages);
    if (!reply) {
      return jsonResponse({ error: REST_MESSAGE }, 503);
    }

    return jsonResponse({ reply: reply }, 200);
  } catch (err) {
    return jsonResponse({ error: 'Unexpected tutor error. Try again.' }, 500);
  }
}
