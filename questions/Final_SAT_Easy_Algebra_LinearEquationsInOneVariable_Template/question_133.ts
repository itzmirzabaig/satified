import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 133
*
* ORIGINAL ANALYSIS:
* - Number ranges: [factor: 2-4, reduced x-coefficient: 2-5, reduced constant: 2-5, reduced right side: 6-9]
* - Difficulty factors: [Equivalent equations, dividing every term by a common factor]
* - Distractor patterns: [left side divided but right side not, constant term not divided, x-term not divided]
* - Constraints: [Equation built from the reduced form so dividing by the factor is always exact; reduced constant and right side use disjoint ranges so the x-term distractor is never equivalent; all four options differ structurally for every draw]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_133 = {
  metadata: {
    id: "133",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const factor = getRandomInt(2, 4);
    const a = getRandomInt(2, 5); // reduced x-coefficient
    const b = getRandomInt(2, 5); // reduced constant term
    const c = getRandomInt(6, 9); // reduced right side; range disjoint from b so c !== b

    const xCoeff = factor * a;
    const const1 = factor * b;
    const rightSide = factor * c;

    const correctText = `$${a}x + ${b} = ${c}$`;

    const optionsData = [
      { text: correctText, isCorrect: true, reason: "" },
      { text: `$${a}x + ${b} = ${rightSide}$`, isCorrect: false, reason: `it results from dividing the left side of the equation by ${factor} but leaving the right side as ${rightSide}` },
      { text: `$${a}x + ${const1} = ${c}$`, isCorrect: false, reason: `it results from dividing the x-term and the right side by ${factor} but leaving the constant term as ${const1}` },
      { text: `$${xCoeff}x + ${b} = ${c}$`, isCorrect: false, reason: `it results from dividing the constant term and the right side by ${factor} but leaving the x-term as ${xCoeff}x` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Which of the following equations is equivalent to $ ${xCoeff}x + ${const1} = ${rightSide}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Every term of the equation $ ${xCoeff}x + ${const1} = ${rightSide}$ has a common factor of ${factor}, so dividing each side by ${factor} produces an equivalent equation: $\\frac{${xCoeff}x + ${const1}}{${factor}} = \\frac{${rightSide}}{${factor}}$, which simplifies to $ ${a}x + ${b} = ${c}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
