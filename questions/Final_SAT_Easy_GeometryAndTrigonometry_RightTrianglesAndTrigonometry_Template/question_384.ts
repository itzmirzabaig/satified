import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 384
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [leg: even, 10-40]
 * - Difficulty factors: [45-45-90 triangle has congruent legs]
 * - Distractor patterns: [Hypotenuse L√2, half the leg (30-60-90 rule), the angle measure]
 * - Question type: [Figure→Multiple Choice Text]
 *
 * FIXED:
 * - The old Mafs figure sat on a black box and its x axis was stretched, so
 *   the "45°" angle of the isosceles right triangle drew at about 32 degrees.
 *   It is now an SVG with equal legs and a right-angle mark.
 * - Two wrong choices were twice the leg and 45 plus the leg. They are now
 *   the hypotenuse (leg times the square root of 2) and half the leg (the
 *   30-60-90 rule applied to the wrong triangle). The leg is even so half of
 *   it is a whole number.
 */

export const generator_384 = {
  metadata: {
    id: "384",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const legValue = 2 * getRandomInt(5, 20);

    // Isosceles right triangle: right angle at the bottom left, legs 190 px.
    const x0 = 80, yB = 225, s = 190;
    const figureCode = `<div style="width:100%;max-width:360px;margin:0 auto;"><svg viewBox="0 0 360 260" style="width:100%;height:auto;display:block;font-family:serif;" xmlns="http://www.w3.org/2000/svg">
  <polygon points="${x0},${yB} ${x0 + s},${yB} ${x0},${yB - s}" fill="#3b82f6" fill-opacity="0.12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <polyline points="${x0},${yB - 16} ${x0 + 16},${yB - 16} ${x0 + 16},${yB}" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="${x0 + s / 2}" y="${yB + 24}" text-anchor="middle" font-size="17" fill="currentColor">${legValue}</text>
  <text x="${x0 - 16}" y="${yB - s / 2 + 6}" text-anchor="middle" font-size="17" font-style="italic" fill="currentColor">x</text>
  <text x="${x0 + s - 52}" y="${yB - 10}" text-anchor="middle" font-size="16" fill="currentColor">45°</text>
</svg></div>`;

    const optionsData = [
      { text: `${legValue}`, isCorrect: true, reason: '' },
      { text: `45`, isCorrect: false, reason: `45 is the measure of the acute angle, in degrees, not a side length` },
      { text: `$${legValue}\\sqrt{2}$`, isCorrect: false, reason: `$${legValue}\\sqrt{2}$ is the length of the hypotenuse, which is $\\sqrt{2}$ times the length of a leg; $x$ is the length of a leg` },
      { text: `${legValue / 2}`, isCorrect: false, reason: `it results from taking half of ${legValue}, as for the side opposite the $30^{\\circ}$ angle in a 30-60-90 triangle; this triangle is a 45-45-90 triangle, so its legs are congruent` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "In the triangle shown, what is the value of $x$?",
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The figure shows a right triangle with one acute angle measuring $45^{\\circ}$. Since the sum of the measures of the angles of a triangle is $180^{\\circ}$, the other acute angle measures $180^{\\circ} - 90^{\\circ} - 45^{\\circ} = 45^{\\circ}$. A triangle with two congruent angles has congruent sides opposite those angles, so the two legs have the same length. Therefore, $x = ${legValue}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
