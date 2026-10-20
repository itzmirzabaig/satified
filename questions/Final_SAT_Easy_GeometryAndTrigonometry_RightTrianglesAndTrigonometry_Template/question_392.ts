import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 392
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [legs a and b: 2-6]
 * - Difficulty factors: [Pythagorean theorem expression setup]
 * - Distractor patterns: [Sum of legs, square root of the sum of legs, sum of squares without the root]
 * - Constraints: [Must show expression]
 * - Question type: [Figure→Multiple Choice Text]
 *
 * FIXED:
 * - The Mafs figure had no wrapper or viewBox, so it was clipped, and it had
 *   no right-angle mark. It is now an SVG drawn in proportion with a
 *   right-angle mark and the labels a, b, and c.
 * - The square root of the product of the legs was not a real slip; it is
 *   replaced by the sum of the squares without the square root.
 */

export const generator_392 = {
  metadata: {
    id: "392",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(2, 6);
    const b = getRandomInt(2, 6);

    // Right angle at the bottom left; a vertical, b horizontal, scaled so the
    // longer leg is 200 px. The box fits the triangle's height.
    const k = 200 / Math.max(a, b);
    const x0 = 60, w = Math.round(b * k), h = Math.round(a * k);
    const yB = h + 25, H = h + 55;
    const figureCode = `<div style="width:100%;max-width:320px;margin:0 auto;"><svg viewBox="0 0 320 ${H}" style="width:100%;height:auto;display:block;font-family:serif;" xmlns="http://www.w3.org/2000/svg">
  <polygon points="${x0},${yB} ${x0 + w},${yB} ${x0},${yB - h}" fill="#3b82f6" fill-opacity="0.12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <polyline points="${x0},${yB - 14} ${x0 + 14},${yB - 14} ${x0 + 14},${yB}" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="${x0 + w / 2}" y="${yB + 24}" text-anchor="middle" font-size="18" font-style="italic" fill="currentColor">b</text>
  <text x="${x0 - 12}" y="${yB - h / 2 + 6}" text-anchor="end" font-size="18" font-style="italic" fill="currentColor">a</text>
  <text x="${Math.round(x0 + w / 2 + 12)}" y="${Math.round(yB - h / 2 - 8)}" text-anchor="start" font-size="18" font-style="italic" fill="currentColor">c</text>
</svg></div>`;

    const optionsData = [
      { text: `$${a}+${b}$`, isCorrect: false, reason: `it is the sum of the leg lengths; the Pythagorean theorem relates the squares of the side lengths` },
      { text: `$${a}^2+${b}^2$`, isCorrect: false, reason: `it is the value of $c^2$, not $c$; the square root of this sum must be taken` },
      { text: `$\\sqrt{${a}+${b}}$`, isCorrect: false, reason: `it is the square root of the sum of the leg lengths, not the sum of their squares` },
      { text: `$\\sqrt{${a}^2+${b}^2}$`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `For the right triangle shown, $a=${a}$ and $b=${b}$. Which expression represents the value of $c$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. By the Pythagorean theorem, $a^2 + b^2 = c^2$, where $c$ is the length of the hypotenuse. Substituting $a = ${a}$ and $b = ${b}$ gives $${a}^2 + ${b}^2 = c^2$. Since $c$ is a length, it is positive, so $c = \\sqrt{${a}^2 + ${b}^2}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
