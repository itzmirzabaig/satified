import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1173
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -p/q proper fraction, y-intercept of shifted graph: integer, vertical shift: 10..20]
 * - Difficulty factors: [Understanding vertical shift, reverse engineering f(x)]
 * - Distractor patterns: [correct: line - shift; B: line + shift (added); C: line (no shift); D: only -shift]
 * - Constraints: [y = f(x) + shift means f(x) = (graphed line) - shift]
 * - Question type: [Figure -> Multiple Choice Text]
 * - Figure generation: [Line through (0, bShifted) and (xIntercept, 0)]
 *
 * Answer-first construction: the x-intercept is chosen as a multiple of the
 * slope denominator so BOTH the x-intercept and the y-intercept are integers
 * (no float artifacts). bShifted = slopeNum * t >= 1, so the correct constant
 * (bShifted - shift) is always negative and can never collide with any
 * distractor across the whole range (see guard analysis in code comments).
 */

export const generator_1173 = {
  metadata: {
    id: "1173",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Pick a reduced proper negative slope -slopeNum/slopeDen.
    const slopeDen = getRandomInt(2, 5);
    let slopeNum = getRandomInt(1, slopeDen - 1);
    // Reduce to coprime so the displayed fraction is in lowest terms.
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    let tries = 0;
    while (gcd(slopeNum, slopeDen) !== 1 && tries++ < 50) {
      slopeNum = getRandomInt(1, slopeDen - 1);
    }
    if (gcd(slopeNum, slopeDen) !== 1) slopeNum = 1; // slopeDen prime-safe fallback

    // STEP 2: x-intercept = slopeDen * t so y-intercept is an integer.
    const t = getRandomInt(1, 3);
    const xIntercept = slopeDen * t;          // integer, >= 2
    const bShifted = slopeNum * t;            // integer y-intercept of shifted line, 1..9

    const shift = getRandomInt(10, 20);       // vertical shift, integer
    const bOriginal = bShifted - shift;       // constant of f(x); always negative here

    const slopeStr = `-\\frac{${slopeNum}}{${slopeDen}}`;

    // Format "<slope>x <signed constant>" cleanly (avoids "+ -" glitches).
    const term = (c: number) => (c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`);
    const eqn = (c: number) => `f(x) = ${slopeStr}x ${term(c)}`;

    // Distractor constants (all compared on the constant term; slope identical).
    const cCorrect = bOriginal;            // negative:  [1*1-20 .. 3*3-10] = [-19 .. -1]
    const cAdd = bShifted + shift;         // positive:  [11 .. 29]  (added instead of subtracted)
    const cNoShift = bShifted;             // positive:  [1 .. 9]    (ignored the shift)
    const cOnlyShift = -shift;             // negative:  [-20 .. -10] (subtracted shift only)
    // Guard analysis (no collisions possible):
    //   cCorrect vs cOnlyShift: differ by bShifted >= 1  -> never equal
    //   cCorrect vs cAdd/cNoShift: negative vs positive  -> never equal
    //   cAdd vs cNoShift: differ by shift >= 10          -> never equal
    //   cOnlyShift vs positives: negative vs positive    -> never equal

    const optionsData = [
      { text: `$${eqn(cCorrect)}$`, isCorrect: true },
      { text: `$${eqn(cAdd)}$`, isCorrect: false, reason: "adds the shift instead of subtracting it" },
      { text: `$${eqn(cNoShift)}$`, isCorrect: false, reason: "gives the graphed line without undoing the vertical shift" },
      { text: `$${eqn(cOnlyShift)}$`, isCorrect: false, reason: "subtracts the shift but drops the graph's y-intercept" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const displayOptions = shuffledOptions.map(o => ({ text: `${o.letter}. ${o.text}` }));

    // STEP 3: Plain-SVG figure of the shifted line through (0, bShifted) and (xIntercept, 0).
    const W = 460, H = 260, pad = 34;
    const xMin = -2, xMax = xIntercept + 2;
    const yMin = -2, yMax = bShifted + 2;
    const sx = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * (W - 2 * pad);
    const sy = (y: number) => H - pad - ((y - yMin) / (yMax - yMin)) * (H - 2 * pad);
    const x0 = sx(0), y0 = sy(0);
    // Endpoints of the drawn segment (the two intercept points).
    const p1x = sx(0), p1y = sy(bShifted);
    const p2x = sx(xIntercept), p2y = sy(0);

    const figureCode = `<div style="text-align:center;">
<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;color:currentColor;">
  <line x1="${pad}" y1="${y0.toFixed(1)}" x2="${W - pad}" y2="${y0.toFixed(1)}" stroke="currentColor" stroke-width="1"/>
  <line x1="${x0.toFixed(1)}" y1="${pad}" x2="${x0.toFixed(1)}" y2="${H - pad}" stroke="currentColor" stroke-width="1"/>
  <text x="${(W - pad + 4).toFixed(1)}" y="${(y0 + 4).toFixed(1)}" font-size="12" fill="currentColor">x</text>
  <text x="${(x0 - 10).toFixed(1)}" y="${(pad - 6).toFixed(1)}" font-size="12" fill="currentColor">y</text>
  <line x1="${p1x.toFixed(1)}" y1="${p1y.toFixed(1)}" x2="${p2x.toFixed(1)}" y2="${p2y.toFixed(1)}" stroke="#3b82f6" stroke-width="2.5"/>
  <circle cx="${p1x.toFixed(1)}" cy="${p1y.toFixed(1)}" r="4" fill="#3b82f6"/>
  <circle cx="${p2x.toFixed(1)}" cy="${p2y.toFixed(1)}" r="4" fill="#3b82f6"/>
  <text x="${(p1x + 6).toFixed(1)}" y="${(p1y - 6).toFixed(1)}" font-size="12" fill="currentColor">(0, ${bShifted})</text>
  <text x="${(p2x + 6).toFixed(1)}" y="${(p2y + 16).toFixed(1)}" font-size="12" fill="currentColor">(${xIntercept}, 0)</text>
</svg>
</div>`;

    return {
      questionText: `The graph of $y = f(x) + ${shift}$ is shown. Which equation defines function $f$?`,
      figureCode,
      options: displayOptions,
      correctAnswer: correctOption ? `${correctOption.letter}. ${correctOption.text}` : "",
      explanation: `Choice ${correctLetter} is correct. The line shown has slope $${slopeStr}$ and passes through $(0, ${bShifted})$, so its equation is $y = ${slopeStr}x + ${bShifted}$. Since $y = f(x) + ${shift}$, we have $f(x) + ${shift} = ${slopeStr}x + ${bShifted}$, so $f(x) = ${slopeStr}x + ${bShifted} - ${shift} = ${slopeStr}x ${term(bOriginal)}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
