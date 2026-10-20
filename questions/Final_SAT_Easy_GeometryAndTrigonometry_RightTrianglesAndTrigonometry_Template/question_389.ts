import { getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 389
 * Skill: Right Triangles And Trigonometry
 *
 * FIXED:
 * - The old Mafs figure sat on a black box, labeled the horizontal side with
 *   the word "Adjacent", and was not drawn to the same scale on both axes.
 *   The wrong choices were 1 over the hypotenuse, the difference of two sides
 *   over the hypotenuse, and their sum over the hypotenuse (a value greater
 *   than 1, which no sine can be).
 * - The triangle now comes from a primitive Pythagorean triple (either leg can
 *   be opposite x), is drawn to scale as an SVG, and labels all three sides.
 *   The wrong choices are cos x, tan x, and the hypotenuse over the opposite
 *   side.
 */
export const generator_389 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const triple = getRandomElement([[5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [12, 35, 37], [28, 45, 53], [33, 56, 65], [48, 55, 73], [36, 77, 85], [39, 80, 89], [65, 72, 97]]);
    const swap = Math.random() < 0.5;
    const opposite = swap ? triple[1] : triple[0];
    const adjacent = swap ? triple[0] : triple[1];
    const hypotenuse = triple[2];

    // Right angle at the bottom left; x is at the bottom right, so the
    // vertical leg is opposite x. The longer leg is 200 px.
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
  <text x="${Math.round(x0 + w / 2 + 16)}" y="${Math.round(yB - h / 2 - 6)}" text-anchor="start" font-size="17" fill="currentColor">${hypotenuse}</text>
  <text x="${lx}" y="${ly + 6}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">x°</text>
</svg></div>`;

    const optionsData = [
      { text: `$\\frac{${adjacent}}{${hypotenuse}}$`, isCorrect: false, reason: `it is the ratio of the side adjacent to the angle to the hypotenuse, which is $\\cos x^{\\circ}$` },
      { text: `$\\frac{${opposite}}{${adjacent}}$`, isCorrect: false, reason: `it is the ratio of the side opposite the angle to the side adjacent to it, which is $\\tan x^{\\circ}$` },
      { text: `$\\frac{${opposite}}{${hypotenuse}}$`, isCorrect: true, reason: '' },
      { text: `$\\frac{${hypotenuse}}{${opposite}}$`, isCorrect: false, reason: `it is the ratio of the hypotenuse to the opposite side, which is the reciprocal of $\\sin x^{\\circ}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "In the right triangle shown, what is the value of $\\sin x^{\\circ}$?",
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The sine of an acute angle in a right triangle is the ratio of the length of the side opposite the angle to the length of the hypotenuse. In the figure, the side opposite the angle with measure $x^{\\circ}$ has length ${opposite}, and the hypotenuse has length ${hypotenuse}. Therefore, $\\sin x^{\\circ} = \\frac{${opposite}}{${hypotenuse}}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
