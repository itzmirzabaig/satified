import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1249
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 7, 6, 5, 6, constants: 25, 23, target: 17x+18y]
 * - Difficulty factors: [Clever combination without solving, 17=7+10, 18=6+12]
 * - Distractor patterns: [Individual solving, wrong combination]
 * - Constraints: [Combination must give integer answer]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: null (table only)
 */

export const generator_1249 = {
  metadata: {
    id: "1249",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Two equations sharing the same y-coefficient so the target combination
    // (Eq1 + 2*Eq2) has clean integer coefficients. The student answers by
    // combining the equations, never solving for x and y individually.
    let a1 = 0, b1 = 0, a2 = 0, c1 = 0, c2 = 0;
    let correct = 0, dAdd = 0, dDouble = 0, dSub = 0;

    let tries = 0;
    do {
      a1 = getRandomInt(5, 10);
      b1 = getRandomInt(4, 8);
      a2 = getRandomInt(3, 7);
      c1 = getRandomInt(20, 40);
      c2 = getRandomInt(15, 35);

      // Correct: Eq1 + 2*Eq2  ->  value = c1 + 2*c2
      correct = c1 + 2 * c2;
      // Distractor errors, each computed from the live constants:
      dAdd = c1 + c2;        // added the equations without doubling the second
      dDouble = 2 * c1 + c2; // doubled the first equation instead of the second
      dSub = c1 - c2;        // subtracted instead of combining
      tries++;
    } while (
      // All four displayed values must be pairwise distinct.
      (correct === dAdd || correct === dDouble || correct === dSub ||
       dAdd === dDouble || dAdd === dSub || dDouble === dSub) &&
      tries < 50
    );

    const b2 = b1; // same y-coefficient (documented intent)
    const targetCoeff = a1 + 2 * a2;
    const targetY = b1 + 2 * b2;

    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">System of Equations</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${a1}x + ${b1}y = ${c1}$</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${a2}x + ${b2}y = ${c2}$</td>
    </tr>
  </tbody>
</table>`;

    const optionsData = [
      { text: dAdd.toString(), isCorrect: false, reason: "adds the two equations without doubling the second equation" },
      { text: dDouble.toString(), isCorrect: false, reason: "doubles the first equation instead of the second equation" },
      { text: dSub.toString(), isCorrect: false, reason: "subtracts the equations instead of forming the required combination" },
      { text: correct.toString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The solution to the given system of equations is $(x, y)$. What is the value of $${targetCoeff}x + ${targetY}y$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correct.toString(),
      explanation: `Choice ${correctLetter} is correct. Adding the first equation to twice the second equation gives $(${a1}x + ${b1}y) + 2(${a2}x + ${b2}y) = ${c1} + 2(${c2})$, which simplifies to $${targetCoeff}x + ${targetY}y = ${correct}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
