import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1123
 *
 * ORIGINAL ANALYSIS:
 * - Difficulty factors: [Projectile motion, vertex form of quadratic]
 * - Constraints: [h = -5(t - p)^2 + 5p^2, so h = 0 at t = 0 and at t = 2p]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * Before, a was Math.round(-max/p^2), so the "correct" equation did not pass
 * through (0, 0) and the explanation showed a rounded value as exact. The
 * heights (up to 80 meters) were also unrealistic for a softball. Now the
 * maximum height is built from a = -5, so every value is exact, and the wrong
 * choices are real slips instead of equations of an unrelated shape.
 */

export const generator_1123 = {
  metadata: {
    id: "1123",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Peak time p = T/10 seconds with T even, so 5p^2 = T^2/20 has one decimal.
    const T = 2 * getRandomInt(6, 12);
    const p = T / 10;              // time of maximum height
    const total = T / 5;           // landing time, 2p
    const maxH = (T * T) / 20;     // 5p^2, exact
    const pSquared = (T * T) / 100;
    const startIfNoCoef = Number(((T * T) / 25).toFixed(2)); // maxH - p^2 = 4p^2

    const correctEq = `h=-5(t-${p})^{2}+${maxH}`;
    const unitEq = `h=-(t-${p})^{2}+${maxH}`;
    const landingVertexEq = `h=-5(t-${total})^{2}+${maxH}`;
    const landingCoefEq = `h=-1.25(t-${p})^{2}+${maxH}`;

    const optionsData = [
      { text: `$${correctEq}$`, isCorrect: true, reason: '' },
      { text: `$${unitEq}$`, isCorrect: false, reason: `$${unitEq}$ assumes a leading coefficient of $-1$, so at $t=0$ the height would be ${startIfNoCoef} meters instead of 0` },
      { text: `$${landingVertexEq}$`, isCorrect: false, reason: `$${landingVertexEq}$ places the maximum height at the landing time of ${total} seconds instead of at ${p} seconds` },
      { text: `$${landingCoefEq}$`, isCorrect: false, reason: `$${landingCoefEq}$ uses the landing time ${total} instead of ${p} when solving for the leading coefficient, which gives $-1.25$ instead of $-5$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A machine launches a softball from ground level. The softball reaches a maximum height of $${maxH}$ meters above the ground ${p} seconds after it is launched and hits the ground ${total} seconds after it is launched. Which equation represents the height above ground $h$, in meters, of the softball $t$ seconds after it is launched?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The maximum height of ${maxH} meters occurs at $t=${p}$, so the vertex of the parabola is $(${p}, ${maxH})$ and $h=a(t-${p})^{2}+${maxH}$ for some constant $a$. The softball starts at ground level, so $h=0$ when $t=0$. Substituting gives $0=a(${p})^{2}+${maxH}$, or $${pSquared}a=-${maxH}$, so $a=-5$. Therefore, $${correctEq}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
