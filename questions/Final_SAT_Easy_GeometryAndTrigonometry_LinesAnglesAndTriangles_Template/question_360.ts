import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 360
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [apex angle a: even, 40-58]
 * - Difficulty factors: [Isosceles triangle base angles, triangle angle sum]
 * - Distractor patterns: [Sum of base angles, assumes all angles equal, treats a as a base angle]
 * - Constraints: [a is even so b = (180 - a) / 2 is whole; a < 60 so the triangle is not equilateral]
 * - Question type: [Figure→Multiple Choice Text]
 *
 * FIXED:
 * - The old Mafs figure was a gridded black box with the apex drawn near 86
 *   degrees whatever its label. The explanation had raw newlines, explained
 *   only two of the three wrong choices, and called the choice equal to a
 *   "assumes equilateral"; another choice was 90 - a, labeled a calculation
 *   error.
 * - The figure is now an SVG drawn to the true apex angle, with tick marks
 *   perpendicular to the congruent sides. The wrong choices are 180 - a,
 *   a, and 180 - 2a, which collide only at a = 60.
 */

export const generator_360 = {
  metadata: {
    id: "360",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(20, 29) * 2; // apex angle: 40, 42, ... 58
    const bValue = (180 - a) / 2;

    // Isosceles triangle with apex T at the top and base from L to R.
    const W = 360, H = 240, apexY = 25, baseY = 200;
    const half = (baseY - apexY) * Math.tan((a / 2) * Math.PI / 180);
    const T = [180, apexY], L = [180 - half, baseY], R = [180 + half, baseY];
    const r1 = (v: number) => Math.round(v * 10) / 10;
    // A short tick across the midpoint of segment P-Q, perpendicular to it.
    const tick = (P: number[], Q: number[]) => {
      const mx = (P[0] + Q[0]) / 2, my = (P[1] + Q[1]) / 2;
      const len = Math.hypot(Q[0] - P[0], Q[1] - P[1]);
      const nx = -(Q[1] - P[1]) / len * 7, ny = (Q[0] - P[0]) / len * 7;
      return `<line x1="${r1(mx - nx)}" y1="${r1(my - ny)}" x2="${r1(mx + nx)}" y2="${r1(my + ny)}" stroke="currentColor" stroke-width="2"/>`;
    };
    // Label for the base angle at R sits on its bisector, inside the triangle.
    const bisR = (180 - bValue / 2) * Math.PI / 180;
    const bLabel = [r1(R[0] + 34 * Math.cos(bisR)), r1(R[1] - 34 * Math.sin(bisR))];
    const figureCode = `<div style="width:100%;max-width:${W}px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:serif;" xmlns="http://www.w3.org/2000/svg">
  <polygon points="${r1(T[0])},${T[1]} ${r1(L[0])},${L[1]} ${r1(R[0])},${R[1]}" fill="#3b82f6" fill-opacity="0.12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  ${tick(T, L)}
  ${tick(T, R)}
  <text x="180" y="${apexY + 52}" text-anchor="middle" font-size="16" fill="currentColor">${a}°</text>
  <text x="${bLabel[0]}" y="${bLabel[1] + 5}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">b°</text>
</svg></div>`;

    const correctAnswer = bValue.toString();
    const optionsData = [
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: (180 - a).toString(), isCorrect: false, reason: `${180 - a} is the sum of the measures of the two base angles, $180 - ${a}$; this sum must be divided by 2 to find the measure of one base angle` },
      { text: a.toString(), isCorrect: false, reason: `it assumes all three angles of the triangle have the same measure; only the two angles opposite the congruent sides are congruent` },
      { text: (180 - 2 * a).toString(), isCorrect: false, reason: `it results from treating the ${a}° angle as a base angle, so that $b = 180 - 2(${a})$; the ${a}° angle is between the congruent sides, so it is the angle that is not a base angle` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the triangle shown, the sides with tick marks are congruent. What is the value of $b$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The tick marks show that the triangle is isosceles, so the two angles opposite the congruent sides, the base angles, are congruent. Each base angle has measure $b^{\\circ}$. The sum of the measures of the angles of a triangle is $180^{\\circ}$, so $b + b + ${a} = 180$, or $2b = ${180 - a}$. Dividing both sides by 2 gives $b = ${bValue}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
