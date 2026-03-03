import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 7392dfc1
*
* ORIGINAL ANALYSIS:
* - Number ranges: [factor: 2-4, xCoeff: 4-8, const1: 4-20]
* - Difficulty factors: [Equivalent equations, dividing by common factor]
* - Distractor patterns: [A: wrong division, B: divided by 4, C: divided by 3]
* - Constraints: [Must have common factor]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_7392dfc1 = {
  metadata: {
    // id: "7392dfc1",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const factor = getRandomInt(2, 4);
    const xCoeff = factor * 2;
    const const1 = factor * getRandomInt(2, 5);
    const rightSide = factor * getRandomInt(3, 8);

    const optionsData = [
      { text: `$${xCoeff / 2}x + ${const1 / 2} = ${rightSide / 2}$`, isCorrect: false, reason: "not equivalent to dividing by ${factor}" },
      { text: `$${xCoeff / 4}x + ${const1 / 4} = ${rightSide / 4}$`, isCorrect: false, reason: "dividing by 4 doesn't give clean integers" },
      { text: `$${Math.floor(xCoeff / 3)}x + ${Math.floor(const1 / 3)} = ${Math.floor(rightSide / 3)}$`, isCorrect: false, reason: "dividing by 3 doesn't work evenly" },
      { text: `$${xCoeff / factor}x + ${const1 / factor} = ${rightSide / factor}$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Which of the following is equivalent to $${xCoeff}x + ${const1} = ${rightSide}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${xCoeff / factor}x + ${const1 / factor} = ${rightSide / factor}$`,
      explanation: `Dividing by ${factor}: $\\frac{${xCoeff}x + ${const1}}{${factor}} = \\frac{${rightSide}}{${factor}}$ gives $${xCoeff / factor}x + ${const1 / factor} = ${rightSide / factor}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 93954cfa
*
* ORIGINAL ANALYSIS:
* - Number ranges: [unitPrice: 2-8]
* - Difficulty factors: [Unit rate, variable expression]
* - Distractor patterns: [B: addition, C: division, D: inverse rate]
* - Constraints: [Simple proportional reasoning]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
