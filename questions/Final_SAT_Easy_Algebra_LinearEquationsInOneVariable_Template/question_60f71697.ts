import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 60f71697
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-12, result: 5-20]
* - Difficulty factors: [Simple division]
* - Distractor patterns: [B: subtraction, C: addition, D: multiplication]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_60f71697 = {
  metadata: {
    // id: "60f71697",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 12);
    const result = getRandomInt(5, 20);
    const rightSide = coeff * result;

    const distractorB = rightSide - coeff;
    const distractorC = rightSide + coeff;
    const distractorD = rightSide * coeff;

    const optionsData = [
      { text: result.toString(), isCorrect: true },
      { text: distractorB.toString(), isCorrect: false, reason: "results from subtracting ${coeff} from ${rightSide}" },
      { text: distractorC.toString(), isCorrect: false, reason: "results from adding ${coeff} to ${rightSide}" },
      { text: distractorD.toString(), isCorrect: false, reason: "results from multiplying ${rightSide} by ${coeff}" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `$${coeff}x = ${rightSide}$ What value of $x$ is the solution to the given equation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Divide by ${coeff}: $x = \\frac{${rightSide}}{${coeff}} = ${result}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 4de87c9a
*
* ORIGINAL ANALYSIS:
* - Number ranges: [multiplier: 2-12, addend: 2-10, result: 10-200]
* - Difficulty factors: [Translating words to equation]
* - Distractor patterns: [A: mult notation wrong, B: wrong operation, C: swapped coeffs]
* - Constraints: [Proper algebraic translation]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
