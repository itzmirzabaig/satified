import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1307
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (0, k), radius: r, shift: down `shift`]
 * - Difficulty factors: [Vertical translation, negative direction]
 * - Distractor patterns: [Wrong sign on shift, shifting wrong direction, horizontal shift]
 * - Constraints: [Downward shift decreases y-coordinate]
 * - Question type: [Figure->Multiple Choice Text]
 * - Figure generation: [Two circles stacked vertically]
 */

export const generator_1307 = {
  metadata: {
    id: "1307",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const h = 0; // Circle A is centered on the y-axis for visual clarity
    const k = getRandomInt(2, 6);
    const r = getRandomInt(5, 10);
    const shift = getRandomInt(2, 5);

    // STEP 2: Calculate new center (shift down decreases the y-coordinate)
    const newK = k - shift; // ranges over [-3, 4]

    // Helper: render (y - c)^2 in canonical form (drop "- 0", flip sign for negatives)
    const yTerm = (c: number): string => {
      if (c === 0) return `y^{2}`;
      return c > 0 ? `(y-${c})^{2}` : `(y+${Math.abs(c)})^{2}`;
    };
    const xTerm = (c: number): string => {
      if (c === 0) return `x^{2}`;
      return c > 0 ? `(x-${c})^{2}` : `(x+${Math.abs(c)})^{2}`;
    };

    // STEP 3: Build figure (plain SVG, equal aspect so circles stay round)
    const xmin = -(r + 2), xmax = (r + 2);
    const ymin = Math.min(newK - r, k - r) - 2;
    const ymax = Math.max(newK + r, k + r) + 2;
    const W = 440, H = 300, P = 34;
    const sx = (W - 2 * P) / (xmax - xmin);
    const sy = (H - 2 * P) / (ymax - ymin);
    const s = Math.min(sx, sy);
    const ox = P + (W - 2 * P - s * (xmax - xmin)) / 2;
    const oy = P + (H - 2 * P - s * (ymax - ymin)) / 2;
    const MX = (x: number): number => Math.round((ox + (x - xmin) * s) * 10) / 10;
    const MY = (y: number): number => Math.round((H - (oy + (y - ymin) * s)) * 10) / 10;
    const rPx = Math.round(r * s * 10) / 10;

    // axis tick labels (x-axis and y-axis), skipping the origin
    const xStep = Math.max(2, Math.ceil((xmax - xmin) / 8));
    let xTicks = '';
    for (let x = Math.ceil(xmin / xStep) * xStep; x <= xmax; x += xStep) {
      if (x === 0) continue;
      xTicks += `<text x="${MX(x)}" y="${MY(0) + 12}" text-anchor="middle" font-size="9" fill="currentColor">${x}</text>`;
    }
    const yStep = Math.max(2, Math.ceil((ymax - ymin) / 8));
    let yTicks = '';
    for (let y = Math.ceil(ymin / yStep) * yStep; y <= ymax; y += yStep) {
      if (y === 0) continue;
      yTicks += `<text x="${MX(0) - 6}" y="${MY(y) + 3}" text-anchor="end" font-size="9" fill="currentColor">${y}</text>`;
    }

    const figureCode = `<div style="width:100%;max-width:440px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<line x1="${P}" y1="${MY(0)}" x2="${W - P}" y2="${MY(0)}" stroke="currentColor" stroke-width="1.5"/>` +
      `<line x1="${MX(0)}" y1="${P}" x2="${MX(0)}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>` +
      xTicks + yTicks +
      `<circle cx="${MX(h)}" cy="${MY(k)}" r="${rPx}" fill="none" stroke="#3b82f6" stroke-width="2"/>` +
      `<text x="${MX(h)}" y="${MY(k)}" text-anchor="middle" font-size="11" fill="#3b82f6">A</text>` +
      `<circle cx="${MX(h)}" cy="${MY(newK)}" r="${rPx}" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5 4"/>` +
      `<text x="${MX(h)}" y="${MY(newK)}" text-anchor="middle" font-size="11" fill="currentColor">B</text>` +
      `</svg></div>`;

    // STEP 4: Generate options
    const correctText = `${xTerm(h)}+${yTerm(newK)}=${r * r}`;

    // Distractors — each keeps radius r but moves the center incorrectly.
    const distHoriz = `${xTerm(shift)}+${yTerm(k)}=${r * r}`;      // shifted right instead of down
    const distUp = `${xTerm(h)}+${yTerm(k + shift)}=${r * r}`;     // shifted up instead of down
    const distHalf = `${xTerm(h)}+${yTerm(k - 2 * shift)}=${r * r}`; // over-shifted down by 2*shift

    const optionsData = [
      { text: correctText, isCorrect: true, kind: 'correct' },
      { text: distHoriz, isCorrect: false, kind: 'horiz' },
      { text: distUp, isCorrect: false, kind: 'up' },
      { text: distHalf, isCorrect: false, kind: 'over' }
    ];

    // Guard against any string collision (distinct constructions, but stay safe for every draw).
    const seen = new Set(optionsData.map(o => o.text));
    if (seen.size !== 4) {
      // Fallback: nudge the over-shoot distractor to a value that cannot collide.
      const alt = k - shift - 1; // one below the correct center
      optionsData[3].text = `${xTerm(h)}+${yTerm(alt)}=${r * r}`;
    }

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const letterOf = (kind: string): string => shuffledOptions.find(o => o.kind === kind)!.letter;

    return {
      questionText: `The equation $${xTerm(h)}+${yTerm(k)}=${r * r}$ represents circle A. Circle B is obtained by shifting circle A down ${shift} units in the $xy$-plane. Which of the following equations represents circle B?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Circle A has center $(${h}, ${k})$ and radius $r=${r}$. A vertical shift changes only the $y$-coordinate of the center; shifting down ${shift} units gives $k_{new}=${k}-${shift}=${newK}$, so the new center is $(${h}, ${newK})$ with the same radius $r=${r}$. The equation is $${correctText}$. Choice ${letterOf('horiz')} is incorrect; it shifts the circle horizontally instead of vertically. Choice ${letterOf('up')} is incorrect; it shifts the circle up ${shift} units instead of down. Choice ${letterOf('over')} is incorrect; it moves the center too far down.`
    };
  }
};
