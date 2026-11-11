import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 516
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 1-6, y: exponential growth 5-80]
 * - Difficulty factors: [Identifying exponential curve model]
 * - Distractor patterns: [Linear options (A,B), wrong curve description (C)]
 * - Constraints: [Exponential growth curve]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Exponential scatterplot with model curve]
 */

export const generator_516 = {

  metadata: {
    id: "516",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {

    const base = getRandomInt(3, 6);
    const growthRate = (1.4 + Math.random() * 0.4).toFixed(1);
    const rate = parseFloat(growthRate);
    const maxX = getRandomInt(5, 7);

    // Build the scatter by jittering each point off the exact model value
    // base*rate^x by a signed amount, so the data genuinely straddles the
    // dashed model curve (some points strictly above, some strictly below).
    // This makes the "both above and below" description true for EVERY draw.
    // A bounded retry guarantees at least one point on each side.
    let points: { x: number; y: number }[] = [];
    let tries = 0;
    do {
      points = [];
      for (let x = 1; x <= maxX; x++) {
        const exact = base * Math.pow(rate, x);
        // Jitter grows with the model value so points stay visibly off the
        // curve at larger x; at least +/-1 so rounding can't erase the offset.
        // Offsets of 10% to 18% of the model value (was up to 8%, which left
        // the dots visually on the curve so "above and below" was unreadable).
        const dir = Math.random() < 0.5 ? -1 : 1;
        const mag = Math.max(1, Math.round(exact * (0.1 + 0.08 * Math.random())));
        const y = Math.max(1, Math.round(exact) + dir * mag);
        points.push({ x, y });
      }
      // Require the split among the last four (largest) points, where the
      // offsets are big enough to see on the graph.
    } while (
      tries++ < 50 &&
      !(points.slice(-4).some(p => p.y > base * Math.pow(rate, p.x)) &&
        points.slice(-4).some(p => p.y < base * Math.pow(rate, p.x)))
    );

    // The figure used to be a Mafs snippet that rendered as an empty black
    // box on the site. It is now a hand-made SVG drawn to scale: solid dots
    // for the data and a dashed curve for the model y = base * rate^x.
    const xTop = maxX + 1;
    const rawTop = Math.max(...points.map(p => p.y), base * Math.pow(rate, xTop));
    const yStep = [5, 10, 20, 25, 50, 100].find(s => Math.ceil(rawTop / s) <= 8) ?? 100;
    const yTop = Math.ceil(rawTop / yStep) * yStep;

    const W = 450, H = 300;
    const mg = { top: 16, right: 20, bottom: 40, left: 52 };
    const pw = W - mg.left - mg.right;
    const ph = H - mg.top - mg.bottom;
    const sx = (x: number) => mg.left + (x / xTop) * pw;
    const sy = (y: number) => mg.top + ph - (y / yTop) * ph;

    let grid = '';
    for (let v = 0; v <= yTop; v += yStep) {
      grid += `<line x1="${mg.left}" y1="${sy(v).toFixed(1)}" x2="${W - mg.right}" y2="${sy(v).toFixed(1)}" stroke="currentColor" stroke-opacity="0.15"/>`;
      grid += `<text x="${mg.left - 8}" y="${(sy(v) + 4).toFixed(1)}" text-anchor="end" font-size="12" fill="currentColor">${v}</text>`;
    }
    for (let v = 0; v <= xTop; v++) {
      grid += `<line x1="${sx(v).toFixed(1)}" y1="${mg.top}" x2="${sx(v).toFixed(1)}" y2="${mg.top + ph}" stroke="currentColor" stroke-opacity="0.15"/>`;
      grid += `<text x="${sx(v).toFixed(1)}" y="${mg.top + ph + 18}" text-anchor="middle" font-size="12" fill="currentColor">${v}</text>`;
    }

    // Model curve, clipped where it leaves the plot area.
    const curvePts: string[] = [];
    for (let i = 0; i <= 120; i++) {
      const x = (xTop * i) / 120;
      const y = base * Math.pow(rate, x);
      if (y > yTop) break;
      curvePts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
    }

    const dots = points
      .map(p => `<circle cx="${sx(p.x).toFixed(1)}" cy="${sy(p.y).toFixed(1)}" r="4.5" fill="currentColor"/>`)
      .join('');

    const mafsCode = `<div style="width:100%;max-width:460px;margin:0 auto;">
      <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;font-family:sans-serif;color:currentColor;" role="img" aria-label="Scatterplot with a dashed model curve">
        ${grid}
        <line x1="${mg.left}" y1="${mg.top}" x2="${mg.left}" y2="${mg.top + ph}" stroke="currentColor" stroke-width="1.5"/>
        <line x1="${mg.left}" y1="${mg.top + ph}" x2="${W - mg.right}" y2="${mg.top + ph}" stroke="currentColor" stroke-width="1.5"/>
        <polyline points="${curvePts.join(' ')}" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="7 5"/>
        ${dots}
        <text x="${mg.left + pw / 2}" y="${H - 4}" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">x</text>
        <text x="14" y="${mg.top + ph / 2}" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">y</text>
      </svg></div>`;

    // Before: the three wrong-choice reasons were assigned by shuffled
    // position, so "A decreasing line" could get the "not linear" reason and
    // so on. Each reason now travels with its own choice.
    const optionsData = [
      { text: "A straight line", isCorrect: false, reason: 'the data points bend upward more and more steeply, so they do not follow a straight line' },
      { text: "A decreasing line", isCorrect: false, reason: 'the data points increase from left to right, and they curve rather than follow a line' },
      { text: "An increasing curve with all data points below the model", isCorrect: false, reason: 'some data points lie above the dashed curve, so they are not all below it' },
      { text: "An increasing curve with data points both above and below the model", isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      // The stem used to ask which model "best fits the scatter plot data"
      // without mentioning the dashed curve that the choices refer to.
      questionText: "The scatterplot shows a set of data points and a dashed curve that models the data. Which of the following best describes the model and the data?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: "An increasing curve with data points both above and below the model",
      explanation: `Choice ${correctOption.letter} is correct. The data points increase from left to right and rise more steeply as $x$ increases, so they follow an increasing curve. The dashed model passes through the middle of the data, with some points above it and some below it. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };

  }

};
