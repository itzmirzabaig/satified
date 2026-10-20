import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 366
 *
 * FIX ANALYSIS:
 * - The figure is an SVG right triangle drawn to its true angles, with a
 *   right-angle mark. The given angle runs from 20 to 35 so it is never too
 *   flat to label (the old Mafs figure was a fixed 3-4-5 shape on a black box).
 * - Wrong choices: the given angle, 90, and 180 - g (forgetting the right angle).
 */

export const generator_366 = {
  metadata: {
    id: "366",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The given angle runs from 20 to 35 (it was 10 to 35); a 10 degree angle
    // draws too flat to label.
    const acuteAngle1 = getRandomInt(20, 35);
    const acuteAngle2 = 90 - acuteAngle1;

    // Right triangle drawn to its true angles (the old Mafs figure was a fixed
    // 3-4-5 shape on a black box): right angle at the bottom left, the given
    // angle at the bottom right, and a at the top.
    const W = 400, H = 240, x0 = 50, yB = 210;
    const rad = (d: number) => (d * Math.PI) / 180;
    const base = Math.min(300, 180 / Math.tan(rad(acuteAngle1)));
    const height = base * Math.tan(rad(acuteAngle1));
    const r1 = (v: number) => Math.round(v * 10) / 10;
    const at = (x: number, y: number, deg: number, d: number) => [r1(x + d * Math.cos(rad(deg))), r1(y - d * Math.sin(rad(deg)))];
    const BR = [x0 + base, yB], TOP = [x0, yB - height];
    const [glx, gly] = at(BR[0], BR[1], 180 - acuteAngle1 / 2, Math.max(32, 15 / Math.sin(rad(acuteAngle1 / 2))));
    const [alx, aly] = at(TOP[0], TOP[1], 270 + acuteAngle2 / 2, Math.max(30, 15 / Math.sin(rad(acuteAngle2 / 2))));
    const figureCode = `<div style="width:100%;max-width:${W}px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:serif;" xmlns="http://www.w3.org/2000/svg">
  <polygon points="${x0},${yB} ${r1(BR[0])},${yB} ${x0},${r1(TOP[1])}" fill="#3b82f6" fill-opacity="0.12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <polyline points="${x0},${yB - 14} ${x0 + 14},${yB - 14} ${x0 + 14},${yB}" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="${glx}" y="${gly + 5}" text-anchor="middle" font-size="16" fill="currentColor">${acuteAngle1}°</text>
  <text x="${alx}" y="${aly + 5}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">a°</text>
</svg></div>`;

    // Each wrong choice is a real slip. The values 90 - g (55 to 70), g
    // (20 to 35), 90, and 180 - g (145 to 160) never collide.
    const correctAnswer = acuteAngle2.toString();
    const optionsData = [
      { text: acuteAngle1.toString(), isCorrect: false, reason: `${acuteAngle1} is the measure of the given acute angle, not the other acute angle` },
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: "90", isCorrect: false, reason: `90 is the measure of the right angle, not the angle with measure $a^{\\circ}$` },
      { text: (180 - acuteAngle1).toString(), isCorrect: false, reason: `it results from subtracting ${acuteAngle1} from 180 without also subtracting the 90° right angle` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the right triangle shown, what is the value of $a$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The sum of the interior angles of a triangle is $180^{\\circ}$. In a right triangle, the two acute angles are complementary (sum to $90^{\\circ}$). Therefore, $${acuteAngle1} + a = 90$, which results in $a = ${correctAnswer}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};