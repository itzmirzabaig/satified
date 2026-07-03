import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 898
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Leg=6, Hypotenuse=21 (double-digit, not clean Pythagorean triple)]
 * - Difficulty factors: [Pythagorean theorem, solving for unknown leg, algebraic expression]
 * - Distractor patterns: [Correct radical form, squared form, simple subtraction, no square root]
 * - Constraints: [Must satisfy a² + b² = c², leg < hypotenuse]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with unknown side labeled 'a']
 */

export const generator_898 = {
  metadata: {
    id: "898",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Right triangle: right angle at origin, horizontal leg b, vertical leg a (unknown),
    // hypotenuse c. Choose b and c so that a = sqrt(c^2 - b^2) is irrational (requires a
    // radical answer), which is the point of the "no square root" distractors.
    let b = getRandomInt(5, 12);   // known leg
    let c = getRandomInt(15, 25);  // hypotenuse (always > b since min c = 15 > max b = 12)

    // Bounded retry: guarantee a is NOT a perfect square so the answer is a genuine radical.
    let aSquared = c * c - b * b;
    let tries = 0;
    while (Number.isInteger(Math.sqrt(aSquared)) && tries++ < 50) {
      b = getRandomInt(5, 12);
      c = getRandomInt(15, 25);
      aSquared = c * c - b * b;
    }

    const a = Math.sqrt(aSquared); // irrational; used only for figure scaling

    // ----- Figure: plain SVG template literal (house style) -----
    // Data coordinates: A=(0,0) right angle, B=(b,0) horizontal leg end, C=(0,a) top.
    const W = 400, H = 350, P = 48;
    const xMin = -2, xMax = b + 2;
    const yMin = -2, yMax = a + 2;
    const mx = (x: number) => P + (x - xMin) / (xMax - xMin) * (W - 2 * P);
    const my = (y: number) => H - P - (y - yMin) / (yMax - yMin) * (H - 2 * P);

    // Triangle vertices in pixel space.
    const Ax = mx(0), Ay = my(0);
    const Bx = mx(b), By = my(0);
    const Cx = mx(0), Cy = my(a);

    // Right-angle marker at the origin (small square inside the triangle).
    const m = 12;
    const rightAngle =
      `<polyline points="${Ax + m},${Ay} ${Ax + m},${Ay - m} ${Ax},${Ay - m}" ` +
      `fill="none" stroke="currentColor" stroke-width="1.2"/>`;

    const figureCode =
      `<div style="width:100%;max-width:400px;margin:0 auto;">` +
      `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
        // Triangle
        `<polygon points="${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}" ` +
        `fill="#3b82f6" fill-opacity="0.12" stroke="#3b82f6" stroke-width="2"/>` +
        rightAngle +
        // Label a: vertical leg (left of it, mid-height)
        `<text x="${mx(0) - 16}" y="${my(a / 2)}" text-anchor="middle" ` +
        `font-size="15" font-style="italic" fill="currentColor">a</text>` +
        // Label b: horizontal leg (below it, mid-length)
        `<text x="${mx(b / 2)}" y="${my(0) + 20}" text-anchor="middle" ` +
        `font-size="15" fill="currentColor">${b}</text>` +
        // Label c: hypotenuse midpoint, offset outward (up-right)
        `<text x="${(Bx + Cx) / 2 + 12}" y="${(By + Cy) / 2 - 6}" text-anchor="middle" ` +
        `font-size="15" fill="currentColor">${c}</text>` +
      `</svg></div>`;

    // ----- Options -----
    const correctExpr = `\\sqrt{${c}^2 - ${b}^2}`;
    const optionsData = [
      { text: correctExpr, isCorrect: true, reason: "" },
      { text: `${c}^2 - ${b}^2`, isCorrect: false, reason: "gives the squared value $a^2$ without taking the square root" },
      { text: `\\sqrt{${c} - ${b}}`, isCorrect: false, reason: "subtracts the side lengths before squaring them, instead of subtracting their squares" },
      { text: `${c} - ${b}`, isCorrect: false, reason: "simply subtracts the leg from the hypotenuse, which does not follow from the Pythagorean theorem" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation =
      `Choice ${correctLetter} is correct. In a right triangle the legs and hypotenuse satisfy ` +
      `$a^2 + b^2 = c^2$. Here the known leg has length $b = ${b}$ and the hypotenuse has ` +
      `length $c = ${c}$, so $a^2 + ${b}^2 = ${c}^2$. Solving for $a$ gives ` +
      `$a^2 = ${c}^2 - ${b}^2$, and therefore $a = \\sqrt{${c}^2 - ${b}^2}$. ` +
      `Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. ` +
      `Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. ` +
      `Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: "For the right triangle shown, which expression represents the value of $a$?",
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctExpr,
      explanation: explanation
    };
  }
};
