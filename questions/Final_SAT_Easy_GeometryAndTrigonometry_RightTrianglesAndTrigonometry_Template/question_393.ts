import { getRandomInt, shuffle, round } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 393
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [leg1: single-digit, leg2: single-digit]
 * - Difficulty factors: [Pythagorean theorem, square root estimation]
 * - Distractor patterns: [sqrt(difference), average of legs, product of legs]
 * - Constraints: [Must satisfy a^2 + b^2 = c^2]
 * - Question type: [Figure -> Multiple Choice Text]
 * - Figure generation: [Right triangle with two legs labeled]
 *
 * FIXED:
 * - DUP_OPTIONS: legs 3 & 5 made sqrt(|a^2-b^2|)=4.0 equal the average (a+b)/2=4.0.
 *   Now the four displayed values are re-drawn (bounded, <=50 tries) until all
 *   four are distinct both as strings and numerically.
 * - Uniform formatting: all four options render to one decimal place so the
 *   "closest to" set reads coherently (was mixed integer/decimal).
 * - DOLLAR_RISK cleared: every math segment starts with a letter ($a.., $c..),
 *   so no '$' is ever immediately followed by a digit.
 * - Figure rebuilt as a plain SVG right triangle (house style); drawn leg
 *   lengths are scaled from the live values and the labels match every draw.
 */

export const generator_393 = {
  metadata: {
    id: "393",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Draw single-digit legs; re-draw (bounded) if any two of the four
    // displayed values would collide as strings or numerically.
    let leg1 = 0, leg2 = 0;
    let hypotenuse = "", distractorA = "", distractorB = "", distractorD = "";
    let tries = 0;
    const numEq = (x: string, y: string) => Math.abs(parseFloat(x) - parseFloat(y)) < 1e-9;

    do {
      leg1 = getRandomInt(2, 9);
      leg2 = getRandomInt(2, 9);

      const hypotenuseSquared = leg1 * leg1 + leg2 * leg2;
      hypotenuse = round(Math.sqrt(hypotenuseSquared), 1).toFixed(1);
      distractorA = round(Math.sqrt(Math.abs(leg1 * leg1 - leg2 * leg2)), 1).toFixed(1);
      distractorB = round((leg1 + leg2) / 2, 1).toFixed(1);
      distractorD = round(leg1 * leg2, 1).toFixed(1);

      const vals = [hypotenuse, distractorA, distractorB, distractorD];
      let distinct = true;
      for (let a = 0; a < vals.length && distinct; a++) {
        for (let b = a + 1; b < vals.length; b++) {
          if (vals[a] === vals[b] || numEq(vals[a], vals[b])) { distinct = false; break; }
        }
      }
      if (distinct) break;
    } while (tries++ < 50);

    const hypotenuseSquared = leg1 * leg1 + leg2 * leg2;

    // --- Figure: plain SVG right triangle (right angle at bottom-left) ---
    const W = 260, H = 200, pad = 34;
    const maxLeg = Math.max(leg1, leg2);
    const drawW = (leg2 / maxLeg) * (W - 2 * pad); // horizontal leg length in px
    const drawH = (leg1 / maxLeg) * (H - 2 * pad); // vertical leg length in px
    const x0 = pad, y0 = H - pad;                  // right-angle corner (origin)
    const xR = x0 + drawW;                         // far end of horizontal leg
    const yT = y0 - drawH;                         // top end of vertical leg
    const m = 10;                                  // right-angle marker size
    const figureCode = `
      <div style="display:flex;justify-content:center;">
        <svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:300px;height:auto;font-family:sans-serif;user-select:none;">
          <polygon points="${x0},${y0} ${xR},${y0} ${x0},${yT}" fill="#3b82f6" fill-opacity="0.1" stroke="currentColor" stroke-width="2" />
          <path d="M ${x0 + m} ${y0} L ${x0 + m} ${y0 - m} L ${x0} ${y0 - m}" fill="none" stroke="currentColor" stroke-width="1.5" />
          <text x="${x0 + drawW / 2}" y="${y0 + 20}" text-anchor="middle" font-size="16" fill="currentColor">${leg2}</text>
          <text x="${x0 - 12}" y="${y0 - drawH / 2}" text-anchor="middle" dominant-baseline="middle" font-size="16" fill="currentColor">${leg1}</text>
        </svg>
      </div>
    `;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "may result from taking the square root of the difference of the squares of the legs instead of the sum" },
      { text: distractorB, isCorrect: false, reason: "may result from averaging the leg lengths instead of applying the Pythagorean theorem" },
      { text: hypotenuse, isCorrect: true },
      { text: distractorD, isCorrect: false, reason: "may result from multiplying the leg lengths instead of applying the Pythagorean theorem" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "The lengths of the legs of a right triangle are shown. Which of the following is closest to the length of the triangle's hypotenuse?",
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The Pythagorean theorem states that for a right triangle, $a^2 + b^2 = c^2$, where $c$ is the hypotenuse. The legs shown have lengths ${leg1} and ${leg2}, so $c^2 = ${leg1}^2 + ${leg2}^2 = ${leg1 * leg1} + ${leg2 * leg2} = ${hypotenuseSquared}$. Taking the positive square root gives $c = \\sqrt{${hypotenuseSquared}} \\approx ${hypotenuse}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
