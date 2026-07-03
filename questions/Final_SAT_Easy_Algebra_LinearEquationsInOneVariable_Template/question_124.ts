import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 124
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-8, const1: 2-10, solution: 2-5 (rightSide derived: coeff*solution + const1)]
* - Difficulty factors: [Number of solutions concept]
* - Distractor patterns: [no solution confusion, wrong count, infinite confusion]
* - Constraints: [Linear equation always has exactly one solution; answer-first so the solution is a clean integer]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_124 = {
  metadata: {
    id: "124",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 8);
    const const1 = getRandomInt(2, 10);
    const solution = getRandomInt(2, 5);
    const rightSide = coeff * solution + const1;

    const optionsData = [
      { text: "None", isCorrect: false, reason: "an equation has no solution only when it reduces to a false statement such as 0 = 5, which does not happen here" },
      { text: "Exactly 1", isCorrect: true },
      { text: "Exactly 3", isCorrect: false, reason: "a linear equation in one variable can never have exactly 3 solutions" },
      { text: "Infinitely many", isCorrect: false, reason: "an equation has infinitely many solutions only when it reduces to an identity that is true for every value, which does not happen here" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `How many solutions exist to the equation $${rightSide} = ${coeff}x + ${const1}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: "Exactly 1",
      explanation: `Subtracting ${const1} from both sides and then dividing by ${coeff} gives $x = \\frac{${rightSide - const1}}{${coeff}} = ${solution}$, so the equation is true for exactly one value. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
