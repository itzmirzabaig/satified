import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: c841e8e8
*
* ORIGINAL ANALYSIS:
* - Number ranges: [addend: 5-20, result: 200-400]
* - Difficulty factors: [Simple subtraction]
* - Distractor patterns: [A: division, C: addition, D: multiplication]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_c841e8e8 = {
  metadata: {
    // id: "c841e8e8",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const addend = getRandomInt(5, 20);
    const result = getRandomInt(200, 400);
    const rightSide = result + addend;

    const optionsData = [
      { text: Math.floor(rightSide / addend).toString(), isCorrect: false, reason: "division error" },
      { text: result.toString(), isCorrect: true },
      { text: (rightSide + addend).toString(), isCorrect: false, reason: "addition error" },
      { text: (rightSide * addend).toString(), isCorrect: false, reason: "multiplication error" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is the solution to the given equation? $$k + ${addend} = ${rightSide}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Subtract ${addend}: k = ${rightSide} - ${addend} = ${result}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: fbb0ea7f
*
* ORIGINAL ANALYSIS:
* - Number ranges: [rate: 3000-8000, time: 15-30, remaining: 200000-400000]
* - Difficulty factors: [Large numbers, rate calculation, word problem]
* - Distractor patterns: [B: wrong division, C: miscalc, D: total not rate]
* - Constraints: [Integer division result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
