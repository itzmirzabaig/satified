import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 103
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficient: 2-9, constants: 100-300 (multiple of coefficient), multiplier: 10-50]
* - Difficulty factors: [Two-step equation solving, larger numbers]
* - Distractor patterns: [subtraction-instead-of-division error, added instead of subtracted, right-hand side copied]
* - Constraints: [Result must be a positive integer; constant is a multiple of the coefficient so every distractor is an integer; bounded retry guarantees all four options are distinct]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_103 = {
  metadata: {
    id: "103",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    let coeff = 0;
    let const1 = 0;
    let total = 0;
    let answer = 0;
    let distractorB = 0;
    let distractorC = 0;
    let distractorD = 0;
    let tries = 0;

    do {
      coeff = getRandomInt(2, 9);
      // const1 is a multiple of coeff (kept within 100-300) so that
      // (total + const1) / coeff below is always an integer.
      const1 = coeff * getRandomInt(Math.ceil(100 / coeff), Math.floor(300 / coeff));
      answer = getRandomInt(10, 50);
      total = const1 + coeff * answer;

      distractorB = total - const1 - coeff;      // subtracted coeff instead of dividing by it
      distractorC = (total + const1) / coeff;    // added const1 instead of subtracting it
      distractorD = total;                       // copied the right-hand side
    } while (
      new Set([answer, distractorB, distractorC, distractorD]).size < 4 &&
      ++tries < 50
    );

    const optionsData = [
      { text: answer.toString(), isCorrect: true, reason: "" },
      { text: distractorB.toString(), isCorrect: false, reason: `it results from subtracting ${const1} from ${total} to get ${total - const1}, and then subtracting ${coeff} instead of dividing by ${coeff}` },
      { text: distractorC.toString(), isCorrect: false, reason: `it results from adding ${const1} to ${total} instead of subtracting, and then dividing ${total + const1} by ${coeff}` },
      { text: distractorD.toString(), isCorrect: false, reason: `it is simply the value on the right-hand side of the equation, not the value of $p$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What value of $p$ satisfies the equation $ ${coeff}p + ${const1} = ${total}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: answer.toString(),
      explanation: `To solve $ ${coeff}p + ${const1} = ${total}$ for $p$, first subtract ${const1} from both sides, which gives $ ${coeff}p = ${total - const1}$. Then divide both sides by ${coeff}: $p = \\frac{${total - const1}}{${coeff}} = ${answer}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
