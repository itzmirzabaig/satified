import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 152
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 10-20, const1: 20-50, result: 50-300]
* - Difficulty factors: [Equivalent equations, subtraction]
* - Distractor patterns: [A: wrong constant, B: wrong sub, D: ignored constant]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_152 = {
  metadata: {
    id: "152",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(10, 20);

    // Draw the constant and the right-hand side so that the four option values
    // (const1, wrongSub, result, rightSide) are all distinct. result = coeff*m
    // is always >= 50, and rightSide = const1 + result is always strictly
    // greater than both const1 and result, so the only collisions to guard are
    // const1 vs result and the "wrong subtraction" value vs the other three.
    let const1 = 0, rightSide = 0, result = 0, wrongSub = 0, tries = 0;
    do {
      const1 = getRandomInt(20, 50);
      rightSide = const1 + coeff * getRandomInt(5, 15);
      result = rightSide - const1;
      // "Wrong subtraction": student subtracts an extra amount. Keep it positive
      // and distinct from every other option value.
      wrongSub = result - getRandomInt(10, Math.min(result - 1, 40));
    } while (
      (const1 === result ||
        wrongSub <= 0 ||
        wrongSub === const1 ||
        wrongSub === result ||
        wrongSub === rightSide) &&
      tries++ < 50
    );

    const optionsData = [
      { text: `$$${coeff}x = ${const1}$$`, isCorrect: false, reason: "kept the wrong constant" },
      { text: `$$${coeff}x = ${wrongSub}$$`, isCorrect: false, reason: "subtracted the wrong amount" },
      { text: `$$${coeff}x = ${result}$$`, isCorrect: true },
      { text: `$$${coeff}x = ${rightSide}$$`, isCorrect: false, reason: "ignored the constant" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `$$${coeff}x + ${const1} = ${rightSide}$$ Which equation has the same solution as the given equation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$$${coeff}x = ${result}$$`,
      explanation: `Subtract ${const1}: ${coeff}x = ${rightSide} - ${const1} = ${result}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
