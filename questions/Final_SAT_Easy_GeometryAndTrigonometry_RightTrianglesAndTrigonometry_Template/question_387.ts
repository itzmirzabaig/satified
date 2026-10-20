import { getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 387
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [primitive Pythagorean triples with leg ratio between 0.3 and 3.3]
 * - Difficulty factors: [Tangent as opposite over adjacent]
 * - Distractor patterns: [Adjacent over opposite, sine, cosine]
 * - Question type: [Figure→Multiple Choice Text]
 *
 * FIXED:
 * - The old Mafs figure was a fixed 3-by-4 triangle on a black box labeled
 *   with random legs (20 to 30 and 5 to 10), so the side labeled 22 drew
 *   shorter than the side labeled 7. The wrong choices were 1 over the
 *   opposite side, the difference over the opposite side, and the sum over
 *   the adjacent side.
 * - The triangle now comes from a primitive Pythagorean triple (either leg can
 *   be opposite x), is drawn to scale, and labels all three sides. The wrong
 *   choices are adjacent over opposite, sine (opposite over hypotenuse), and
 *   cosine (adjacent over hypotenuse); a primitive triple keeps every ratio
 *   in lowest terms.
 */

export const generator_387 = {
  metadata: {
    id: "387",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const triple = getRandomElement([[3, 4, 5], [5, 12, 13], [8, 15, 17], [20, 21, 29], [12, 35, 37], [28, 45, 53], [33, 56, 65], [48, 55, 73]]);
    const swap = Math.random() < 0.5;
    const opposite = swap ? triple[1] : triple[0];
    const adjacent = swap ? triple[0] : triple[1];
    const hyp = triple[2];

    // Right angle at the bottom left; the opposite side is vertical and the
    // adjacent side horizontal, so x is at the bottom right. The longer leg
    // is 200 px.
    const k = 200 / Math.max(opposite, adjacent);
    const x0 = 70, yB = 240, w = Math.round(adjacent * k), h = Math.round(opposite * k);
    const xAngle = Math.atan(opposite / adjacent) * 180 / Math.PI;
    const d = Math.max(30, 15 / Math.sin((xAngle / 2) * Math.PI / 180));
    const bis = (180 - xAngle / 2) * Math.PI / 180;
    const lx = Math.round(x0 + w + d * Math.cos(bis)), ly = Math.round(yB - d * Math.sin(bis));
    const figureCode = `<div style="width:100%;max-width:360px;margin:0 auto;"><svg viewBox="0 0 360 275" style="width:100%;height:auto;display:block;font-family:serif;" xmlns="http://www.w3.org/2000/svg">
  <polygon points="${x0},${yB} ${x0 + w},${yB} ${x0},${yB - h}" fill="#3b82f6" fill-opacity="0.12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <polyline points="${x0},${yB - 14} ${x0 + 14},${yB - 14} ${x0 + 14},${yB}" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="${x0 + w / 2}" y="${yB + 24}" text-anchor="middle" font-size="17" fill="currentColor">${adjacent}</text>
  <text x="${x0 - 12}" y="${yB - h / 2 + 6}" text-anchor="end" font-size="17" fill="currentColor">${opposite}</text>
  <text x="${Math.round(x0 + w / 2 + 16)}" y="${Math.round(yB - h / 2 - 6)}" text-anchor="start" font-size="17" fill="currentColor">${hyp}</text>
  <text x="${lx}" y="${ly + 6}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">x°</text>
</svg></div>`;

    const optionsData = [
      { text: `$\\frac{${adjacent}}{${opposite}}$`, isCorrect: false, reason: `it is the ratio of the adjacent side to the opposite side, which is the reciprocal of $\\tan x^{\\circ}$` },
      { text: `$\\frac{${opposite}}{${hyp}}$`, isCorrect: false, reason: `it is the ratio of the opposite side to the hypotenuse, which is $\\sin x^{\\circ}$` },
      { text: `$\\frac{${opposite}}{${adjacent}}$`, isCorrect: true, reason: '' },
      { text: `$\\frac{${adjacent}}{${hyp}}$`, isCorrect: false, reason: `it is the ratio of the adjacent side to the hypotenuse, which is $\\cos x^{\\circ}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "In the triangle shown, what is the value of $\\tan x^{\\circ}$?",
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The tangent of an acute angle in a right triangle is the ratio of the length of the side opposite the angle to the length of the side adjacent to the angle. In the triangle shown, the side opposite the angle with measure $x^{\\circ}$ has length ${opposite}, and the side adjacent to it (not the hypotenuse) has length ${adjacent}. Therefore, $\\tan x^{\\circ} = \\frac{${opposite}}{${adjacent}}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
