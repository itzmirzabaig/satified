import { getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 388
 * Skill: Right Triangles And Trigonometry
 *
 * FIXED:
 * - The old Mafs figure sat on a black box and its axes were not to the same
 *   scale, so the triangle's shape did not match its side lengths. Two of the
 *   wrong choices were 1 over the hypotenuse and the hypotenuse itself.
 * - The triangle now comes from a primitive Pythagorean triple (either leg can
 *   be opposite angle A) and is drawn to scale as an SVG with all three sides
 *   labeled. The wrong choices are cos A (adjacent over hypotenuse), tan A
 *   (opposite over adjacent), and the hypotenuse over the opposite side.
 */
export const generator_388 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const triple = getRandomElement([[5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [12, 35, 37], [28, 45, 53], [33, 56, 65], [48, 55, 73], [36, 77, 85], [39, 80, 89], [65, 72, 97]]);
    const swap = Math.random() < 0.5;
    const opposite = swap ? triple[1] : triple[0];   // side BC
    const adjacent = swap ? triple[0] : triple[1];   // side AC
    const hypotenuse = triple[2];                    // side AB

    // Right angle at C (bottom left), A at the bottom right, B at the top.
    // The longer leg is 200 px.
    const k = 200 / Math.max(opposite, adjacent);
    const x0 = 80, yB = 235, w = Math.round(adjacent * k), h = Math.round(opposite * k);
    const t = (x: number, y: number, s: string, extra = '') =>
      `<text x="${x}" y="${y}" text-anchor="middle" font-size="16"${extra} fill="currentColor">${s}</text>`;
    const figureCode = `<div style="width:100%;max-width:380px;margin:0 auto;"><svg viewBox="0 0 380 270" style="width:100%;height:auto;display:block;font-family:serif;" xmlns="http://www.w3.org/2000/svg">
  <polygon points="${x0},${yB} ${x0 + w},${yB} ${x0},${yB - h}" fill="#3b82f6" fill-opacity="0.12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <polyline points="${x0},${yB - 14} ${x0 + 14},${yB - 14} ${x0 + 14},${yB}" fill="none" stroke="currentColor" stroke-width="1.5"/>
  ${t(x0 - 12, yB + 18, 'C', ' font-style="italic"')}
  ${t(x0 + w + 14, yB + 6, 'A', ' font-style="italic"')}
  ${t(x0, yB - h - 10, 'B', ' font-style="italic"')}
  ${t(x0 + w / 2, yB + 22, `${adjacent}`)}
  ${t(x0 - 22, Math.round(yB - h / 2 + 6), `${opposite}`)}
  <text x="${Math.round(x0 + w / 2 + 14)}" y="${Math.round(yB - h / 2 - 6)}" text-anchor="start" font-size="16" fill="currentColor">${hypotenuse}</text>
</svg></div>`;

    const optionsData = [
      { text: `$\\frac{${adjacent}}{${hypotenuse}}$`, isCorrect: false, reason: `it is the ratio of the side adjacent to angle $A$ to the hypotenuse, which is $\\cos A$` },
      { text: `$\\frac{${opposite}}{${hypotenuse}}$`, isCorrect: true, reason: '' },
      { text: `$\\frac{${hypotenuse}}{${opposite}}$`, isCorrect: false, reason: `it is the ratio of the hypotenuse to the side opposite angle $A$, which is the reciprocal of $\\sin A$` },
      { text: `$\\frac{${opposite}}{${adjacent}}$`, isCorrect: false, reason: `it is the ratio of the side opposite angle $A$ to the side adjacent to angle $A$, which is $\\tan A$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "In the right triangle shown, what is the value of $\\sin A$?",
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The sine of an acute angle in a right triangle is the ratio of the length of the side opposite that angle to the length of the hypotenuse. In right triangle $ABC$, side $BC$ is opposite angle $A$ and side $AB$ is the hypotenuse. The length of side $BC$ is ${opposite} and the length of side $AB$ is ${hypotenuse}. Therefore, $\\sin A = \\frac{${opposite}}{${hypotenuse}}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
