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
    const b = getRandomInt(2, 6);
    const root = getRandomInt(1, 5); // the single x-solution
    const finalD = b + 2 * root;
    const c = getRandomInt(-10, -3); // always negative
    const e = root * root - c; // e >= root^2 + 3, always positive

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

    const optionsData = [
      { text: `There are exactly 4 solutions.`, isCorrect: false, reason: "assumes a line and a parabola can intersect more than twice, which is impossible" },
      { text: `There are exactly 2 solutions.`, isCorrect: false, reason: "would require a positive discriminant, but the discriminant equals zero" },
      { text: `There is exactly 1 solution.`, isCorrect: true, reason: "" },
      { text: `There are no solutions.`, isCorrect: false, reason: "would require a negative discriminant, but the discriminant equals zero" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const p = finalD - b; // = 2*root, always positive
    const q = c + e; // = root^2, always positive

    const explanation = `Choice ${correctLetter} is correct. Solving the second equation for $y$ gives $y = ${finalD}x - ${e}$. Setting the two expressions for $y$ equal gives $x^2 + ${b}x - ${-c} = ${finalD}x - ${e}$, which rearranges to $x^2 - ${p}x + ${q} = 0$. The discriminant is $(-${p})^2 - 4(1)(${q}) = ${p * p} - ${4 * q} = 0$. Because the discriminant equals zero, the quadratic equation has exactly one solution, so the system has exactly one solution.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `How many solutions are there to the system of equations shown?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
