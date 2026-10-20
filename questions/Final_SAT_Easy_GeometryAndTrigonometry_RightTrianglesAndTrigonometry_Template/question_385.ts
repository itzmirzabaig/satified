import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 385
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [legs: 5-12, different lengths]
 * - Difficulty factors: [Pythagorean theorem, square root estimation]
 * - Distractor patterns: [Sum of legs, c squared, subtracts the squares]
 * - Constraints: [Must estimate sqrt]
 * - Question type: [Figure→Multiple Choice Text]
 *
 * FIXED:
 * - The Mafs figure had no wrapper or viewBox, so the triangle was clipped:
 *   no hypotenuse showed and a leg label was cut off. It is now an SVG right
 *   triangle drawn in proportion with a right-angle mark.
 * - The explanation's \Rightarrow had a single backslash in the template, so
 *   it rendered as "Rightarrow". Whole numbers showed as "202.0".
 * - The "average of the legs" choice is replaced by the square root of the
 *   difference of the squares (treating c as a leg). Legs differ, and the
 *   draw is redone until the four rounded values differ.
 */

export const generator_385 = {
  metadata: {
    id: "385",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Shows a value to the nearest tenth, without ".0" for whole numbers.
    const show = (v: number) => { const r = Math.round(v * 10) / 10; return Number.isInteger(r) ? `${r}` : r.toFixed(1); };
    let leg1 = 5, leg2 = 6, sumSquares = 61, hyp = 0, diff = 0;
    do {
      leg1 = getRandomInt(5, 12);
      leg2 = getRandomInt(5, 12);
      sumSquares = leg1 * leg1 + leg2 * leg2;
      hyp = Math.sqrt(sumSquares);
      diff = Math.sqrt(Math.abs(leg1 * leg1 - leg2 * leg2));
    } while (leg1 === leg2 || new Set([show(hyp), show(leg1 + leg2), show(sumSquares), show(diff)]).size < 4);

    // Right triangle: right angle at the bottom left, leg1 vertical, leg2
    // horizontal, scaled so the longer leg is 190 px.
    const k = 190 / Math.max(leg1, leg2);
    const x0 = 70, yB = 225, w = Math.round(leg2 * k), h = Math.round(leg1 * k);
    const figureCode = `<div style="width:100%;max-width:340px;margin:0 auto;"><svg viewBox="0 0 340 260" style="width:100%;height:auto;display:block;font-family:serif;" xmlns="http://www.w3.org/2000/svg">
  <polygon points="${x0},${yB} ${x0 + w},${yB} ${x0},${yB - h}" fill="#3b82f6" fill-opacity="0.12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <polyline points="${x0},${yB - 14} ${x0 + 14},${yB - 14} ${x0 + 14},${yB}" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="${x0 + w / 2}" y="${yB + 24}" text-anchor="middle" font-size="17" fill="currentColor">${leg2}</text>
  <text x="${x0 - 16}" y="${yB - h / 2 + 6}" text-anchor="middle" font-size="17" fill="currentColor">${leg1}</text>
  <text x="${Math.round(x0 + w / 2 + 14)}" y="${Math.round(yB - h / 2 - 8)}" text-anchor="middle" font-size="17" font-style="italic" fill="currentColor">c</text>
</svg></div>`;

    const optionsData = [
      { text: show(hyp), isCorrect: true, reason: '' },
      { text: show(leg1 + leg2), isCorrect: false, reason: `${leg1 + leg2} is the sum of the leg lengths, $${leg1} + ${leg2}$; the hypotenuse is found from the squares of the legs, not their sum` },
      { text: show(sumSquares), isCorrect: false, reason: `${sumSquares} is the value of $c^2$, not $c$` },
      { text: show(diff), isCorrect: false, reason: `it results from subtracting the squares of the legs, $\\sqrt{${Math.max(leg1, leg2) ** 2} - ${Math.min(leg1, leg2) ** 2}}$, as if $c$ were a leg instead of the hypotenuse` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "In the right triangle shown, which of the following is closest to the value of $c$?",
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. By the Pythagorean theorem, the square of the length of the hypotenuse equals the sum of the squares of the lengths of the legs, so $c^2 = ${leg1}^2 + ${leg2}^2 = ${leg1 * leg1} + ${leg2 * leg2} = ${sumSquares}$. Therefore, $c = \\sqrt{${sumSquares}}$, which is approximately ${show(hyp)}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
