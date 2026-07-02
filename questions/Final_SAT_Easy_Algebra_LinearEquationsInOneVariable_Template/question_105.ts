import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 105
*
* ORIGINAL ANALYSIS:
* - Number ranges: [x: 5-15, addend: 15-30]
* - Difficulty factors: [Simple substitution]
* - Distractor patterns: [A: subtraction, B: constant only, D: doubling error]
* - Constraints: [Simple integer arithmetic]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_105 = {
  metadata: {
    id: "105",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const x = getRandomInt(5, 15);
    const addend = getRandomInt(15, 30);
    const result = x + addend;

    const optionsData = [
      { text: (addend - x).toString(), isCorrect: false, reason: "results from subtracting instead of adding" },
      { text: addend.toString(), isCorrect: false, reason: "ignores the variable" },
      { text: result.toString(), isCorrect: true },
      { text: (2 * x + addend).toString(), isCorrect: false, reason: "results from doubling x incorrectly" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If \\( x = ${x} \\), what is the value of \\( x + ${addend} \\)?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Substitute: ${x} + ${addend} = ${result}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
