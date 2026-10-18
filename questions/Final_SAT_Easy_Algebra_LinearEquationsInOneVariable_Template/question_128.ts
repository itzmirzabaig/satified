import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 128
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-12, result: 5-20]
* - Difficulty factors: [Simple division]
* - Distractor patterns: [B: subtraction, C: addition, D: multiplication]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_128 = {
  metadata: {
    id: "128",
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
      { text: distractorB.toString(), isCorrect: false, reason: `results from subtracting ${coeff} from ${rightSide} instead of dividing` },
      { text: distractorC.toString(), isCorrect: false, reason: `results from adding ${coeff} to ${rightSide} instead of dividing` },
      { text: distractorD.toLocaleString('en-US'), isCorrect: false, reason: `results from multiplying ${rightSide} by ${coeff} instead of dividing` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is the solution to the equation $${coeff}x = ${rightSide}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctLetter} is correct. Dividing both sides of the given equation by ${coeff} yields $x = \\frac{${rightSide}}{${coeff}}$, or $x = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`).join(' ')}`
    };
  }
};
