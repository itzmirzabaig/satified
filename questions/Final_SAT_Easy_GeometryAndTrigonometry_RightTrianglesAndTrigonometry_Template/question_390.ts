import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 390
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [leg: 6-12, hypotenuse: 14-22, at least 3 more than the leg]
 * - Difficulty factors: [Pythagorean theorem equation setup, identifying legs vs hypotenuse]
 * - Distractor patterns: [b treated as the hypotenuse, no squares, squares the sum]
 * - Constraints: [Hypotenuse must be the largest side]
 * - Question type: [Figure→Multiple Choice Text]
 *
 * FIXED:
 * - The Mafs figure had no wrapper or viewBox, so it was clipped to a corner
 *   of one leg, and it had no right-angle mark. It is now an SVG drawn in
 *   proportion with a right-angle mark and all three labels.
 * - The wrong choices "8b = 20" and "8^2 - b^2 = 20^2" are replaced by the
 *   equation that treats b as the hypotenuse and the one that squares the sum
 *   of the legs.
 */

export const generator_390 = {
  metadata: {
    id: "390",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const leg1 = getRandomInt(6, 12);
    const hypotenuse = getRandomInt(Math.max(14, leg1 + 3), 22);
    const adj = Math.sqrt(hypotenuse ** 2 - leg1 ** 2);

    // Right angle at the bottom left; leg1 vertical, b horizontal, scaled so
    // the longer leg is 220 px.
    const k = 220 / Math.max(leg1, adj);
    const x0 = 60, w = Math.round(adj * k), h = Math.round(leg1 * k);
    const yB = h + 25, H = h + 55; // the box fits the triangle, so flat ones do not sit low in empty space
    const figureCode = `<div style="width:100%;max-width:340px;margin:0 auto;"><svg viewBox="0 0 340 ${H}" style="width:100%;height:auto;display:block;font-family:serif;" xmlns="http://www.w3.org/2000/svg">
  <polygon points="${x0},${yB} ${x0 + w},${yB} ${x0},${yB - h}" fill="#3b82f6" fill-opacity="0.12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <polyline points="${x0},${yB - 14} ${x0 + 14},${yB - 14} ${x0 + 14},${yB}" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="${x0 + w / 2}" y="${yB + 24}" text-anchor="middle" font-size="17" font-style="italic" fill="currentColor">b</text>
  <text x="${x0 - 12}" y="${yB - h / 2 + 6}" text-anchor="end" font-size="17" fill="currentColor">${leg1}</text>
  <text x="${Math.round(x0 + w / 2 + 12)}" y="${Math.round(yB - h / 2 - 8)}" text-anchor="start" font-size="17" fill="currentColor">${hypotenuse}</text>
</svg></div>`;

    const optionsData = [
      { text: `$${leg1}^{2}+${hypotenuse}^{2}=b^{2}$`, isCorrect: false, reason: `it treats $b$ as the length of the hypotenuse; the hypotenuse is the side opposite the right angle, which has length ${hypotenuse}` },
      { text: `$${leg1}+b=${hypotenuse}$`, isCorrect: false, reason: `the Pythagorean theorem relates the squares of the side lengths, not the side lengths themselves` },
      { text: `$${leg1}^{2}+b^{2}=${hypotenuse}^{2}$`, isCorrect: true, reason: '' },
      { text: `$(${leg1}+b)^{2}=${hypotenuse}^{2}$`, isCorrect: false, reason: `it squares the sum of the leg lengths instead of adding the squares of the leg lengths; $(${leg1}+b)^{2}$ is not equal to $${leg1}^{2}+b^{2}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "Which equation shows the relationship between the side lengths of the right triangle shown?",
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The Pythagorean theorem states that in a right triangle, the sum of the squares of the lengths of the two legs is equal to the square of the length of the hypotenuse. In the triangle shown, the legs have lengths ${leg1} and $b$, and the hypotenuse, the side opposite the right angle, has length ${hypotenuse}. Therefore, $${leg1}^{2}+b^{2}=${hypotenuse}^{2}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
