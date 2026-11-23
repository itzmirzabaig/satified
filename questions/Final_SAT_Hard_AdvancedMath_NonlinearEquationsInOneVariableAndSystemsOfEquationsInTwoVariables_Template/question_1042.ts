import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1042
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system in table: y=x²+3x-7 and 5x-y=8]
 * - Difficulty factors: [System with table presentation, substitution, discriminant]
 * - Distractor patterns: [A: 4, B: 2, C: 1/correct, D: 0]
 * - Constraints: [Table format, substitution gives one solution (discriminant=0)]
 * - Question type: [Multiple choice text with table]
 * - Figure generation: [HTML table]
 */

export const generator_1042 = {
  metadata: {
    id: "1042",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Pattern: y = x^2 + bx + c and Dx - y = e, engineered so substitution
    // yields a perfect-square quadratic (discriminant 0) => exactly 1 solution.
    //
    // Substituting y = Dx - e gives x^2 + (b - D)x + (c + e) = 0.
    // Force b - D = -2*root and c + e = root^2, so it becomes (x - root)^2 = 0.
    //
    // Before: the answer was "exactly 1 solution" on every draw. The count is
    // now drawn from 0, 1, or 2 by moving the constant q = c + e:
    //   q = h^2       => (x - h)^2 = 0, discriminant 0, 1 solution
    //   q = h^2 - s^2 => roots h +/- s, discriminant 4s^2 > 0, 2 solutions
    //   q = h^2 + t   => discriminant -4t < 0, no solutions
    const solutionCount = getRandomInt(0, 2);
    const b = getRandomInt(2, 6);
    // h >= 2 so that q = h^2 - s^2 stays positive with 1 <= s <= h - 1.
    const root = getRandomInt(solutionCount === 2 ? 2 : 1, 5);
    const finalD = b + 2 * root;
    const c = getRandomInt(-10, -3); // always negative
    const qValue = solutionCount === 1
      ? root * root
      : solutionCount === 2
        ? root * root - getRandomInt(1, root - 1) ** 2
        : root * root + getRandomInt(1, 6);
    const e = qValue - c; // q > 0 and c < 0, so e is always positive

    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid #ccc; padding: 8px;">System of Equations</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">$y = x^2 + ${b}x - ${-c}$</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">$${finalD}x - y = ${e}$</td>
    </tr>
  </tbody>
</table>`;

    const p = finalD - b; // = 2*root, always positive
    const q = c + e; // = qValue, always positive
    const disc = p * p - 4 * q;
    const discTex = `$${disc}$`;

    const optionsData = [
      { text: `There are exactly 4 solutions.`, isCorrect: false, reason: `4 solutions cannot occur, since substituting leaves a quadratic equation, which has at most 2 real solutions` },
      { text: `There are exactly 2 solutions.`, isCorrect: solutionCount === 2, reason: solutionCount === 2 ? '' : `2 solutions would require a positive discriminant, but the discriminant is ${discTex}` },
      { text: `There is exactly 1 solution.`, isCorrect: solutionCount === 1, reason: solutionCount === 1 ? '' : `1 solution would require a discriminant of $0$, but the discriminant is ${discTex}` },
      { text: `There are no solutions.`, isCorrect: solutionCount === 0, reason: solutionCount === 0 ? '' : `no solutions would require a negative discriminant, but the discriminant is ${discTex}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const conclusion = solutionCount === 2
      ? `Because the discriminant is positive, the quadratic equation has 2 real solutions. Each value of $x$ gives one value of $y$, so the system has exactly 2 solutions.`
      : solutionCount === 1
        ? `Because the discriminant equals $0$, the quadratic equation has exactly 1 real solution, so the system has exactly 1 solution.`
        : `Because the discriminant is negative, the quadratic equation has no real solutions, so the system has no solutions.`;

    const explanation = `Choice ${correctOption.letter} is correct. Solving the second equation for $y$ gives $y = ${finalD}x - ${e}$. Setting the two expressions for $y$ equal gives $x^2 + ${b}x - ${-c} = ${finalD}x - ${e}$, which rearranges to $x^2 - ${p}x + ${q} = 0$. The discriminant is $(-${p})^2 - 4(1)(${q}) = ${p * p} - ${4 * q} = ${disc}$. ${conclusion} ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `How many solutions are there to the system of equations shown?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
