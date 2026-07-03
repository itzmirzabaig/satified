import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 882
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 25-45 degrees for acute angles in right triangles]
 * - Difficulty factors: [Similar right triangles, complementary angles, trigonometric ratios]
 * - Distractor patterns: [A: swapped ratio, C: wrong angle pair, D: wrong angle pair]
 * - Constraints: [Triangles are similar via AA, angles sum to 90]
 * - Question type: [Figure->Multiple Choice Text]
 * - Figure generation: [Two right triangles with labeled acute angles]
 *
 * REBUILD NOTES:
 * - Right triangle ABC has the right angle at C, so AB is the hypotenuse.
 *   angle A = a (25..45), angle B = 90 - a.
 *   BC is opposite angle A, so BC/AB = sin(A).
 * - Right triangle DEF has the right angle at F. It is given that angle D = 90 - a,
 *   hence angle E = a. So angle E corresponds to angle A (A <-> E, B <-> D, C <-> F).
 *   sin of the angle equal to A is sin(E) = DF/DE (DF is opposite E, DE the hyp).
 *   Therefore BC/AB = DF/DE  (correct answer).
 * - All four options are fixed distinct strings, so no duplicate-option risk.
 * - Legacy nested-IIFE figure (with broken ${angleA^°} leftovers) rebuilt as a
 *   plain SVG template literal; the drawn angle values match angleA / angleD.
 */

export const generator_882 = {
  metadata: {
    id: "882",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Angles. A = a in [25,45]; complementary partner B = 90 - a.
    const angleA = getRandomInt(25, 45);
    const angleB = 90 - angleA;   // angle B in triangle ABC
    const angleD = angleB;        // given: angle D corresponds to angle B
    const angleE = 90 - angleD;   // = angleA; corresponds to angle A

    // STEP 2: Figure — two right triangles (right angles at C and F) as plain SVG.
    // Triangle ABC: C bottom-left, B bottom-right, A top-left (legs CB, CA).
    // Triangle DEF: F bottom-left, E bottom-right, D top-left (legs FE, FD).
    const Cx = 55, Cy = 155, Bx = 175, Ay = 55;              // ABC vertices
    const Fx = 275, Fy = 155, Ex = 395, Dy = 55;             // DEF vertices
    const rightMark = (x: number, y: number, dx: number, dy: number) =>
      `<path d="M ${x + dx} ${y} L ${x + dx} ${y + dy} L ${x} ${y + dy}" fill="none" stroke="currentColor" stroke-width="1.2"/>`;

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 450 210" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      // Triangle ABC
      `<polygon points="${Cx},${Cy} ${Bx},${Cy} ${Cx},${Ay}" fill="none" stroke="currentColor" stroke-width="1.6"/>` +
      rightMark(Cx, Cy, 14, -14) +
      `<text x="${Cx - 8}" y="${Cy + 15}" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">C</text>` +
      `<text x="${Bx + 8}" y="${Cy + 15}" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">B</text>` +
      `<text x="${Cx - 8}" y="${Ay - 4}" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">A</text>` +
      `<text x="${Cx + 22}" y="${Ay + 24}" text-anchor="start" font-size="12" fill="currentColor">${angleA}°</text>` +
      // Triangle DEF
      `<polygon points="${Fx},${Fy} ${Ex},${Fy} ${Fx},${Dy}" fill="none" stroke="currentColor" stroke-width="1.6"/>` +
      rightMark(Fx, Fy, 14, -14) +
      `<text x="${Fx - 8}" y="${Fy + 15}" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">F</text>` +
      `<text x="${Ex + 8}" y="${Fy + 15}" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">E</text>` +
      `<text x="${Fx - 8}" y="${Dy - 4}" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">D</text>` +
      `<text x="${Fx + 22}" y="${Dy + 24}" text-anchor="start" font-size="12" fill="currentColor">${angleD}°</text>` +
      `</svg></div>`;

    // STEP 3: Options (fixed, distinct). Correct: DF/DE = sin(E) = sin(A).
    const optionsData = [
      {
        text: `$\\frac{DE}{DF}$`,
        isCorrect: false,
        reason: "is the reciprocal of the correct ratio (the cosecant), not the sine"
      },
      {
        text: `$\\frac{DF}{DE}$`,
        isCorrect: true
      },
      {
        text: `$\\frac{DF}{EF}$`,
        isCorrect: false,
        reason: "is the tangent of the matching angle (opposite leg over adjacent leg), not the sine"
      },
      {
        text: `$\\frac{EF}{DE}$`,
        isCorrect: false,
        reason: "is the cosine of the matching angle (adjacent leg over hypotenuse), not the sine"
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Right triangles $ABC$ and $DEF$ are shown above, with right angles at $C$ and $F$. Which of the following is equal to the ratio $\\frac{BC}{AB}$ ?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$\\frac{DF}{DE}$`,
      explanation: `Choice ${correctOption.letter} is correct. In right triangle $ABC$ the right angle is at $C$, so $AB$ is the hypotenuse and $BC$ is the leg opposite angle $A$. Therefore $\\frac{BC}{AB}=\\sin(A)=\\sin(${angleA}^{\\circ})$. In right triangle $DEF$ the right angle is at $F$, and it is given that $m\\angle D=${angleD}^{\\circ}$, so $m\\angle E=90^{\\circ}-${angleD}^{\\circ}=${angleE}^{\\circ}$. Angle $E$ has the same measure as angle $A$, and in $\\triangle DEF$ the side opposite angle $E$ is $DF$ while the hypotenuse is $DE$, so $\\sin(${angleA}^{\\circ})=\\frac{DF}{DE}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
