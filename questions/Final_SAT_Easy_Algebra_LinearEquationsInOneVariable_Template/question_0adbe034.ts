import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 0adbe034
*
* ORIGINAL ANALYSIS:
* - Number ranges: [divisor: 2-5, x: 1-10, constant: 10-50]
* - Difficulty factors: [Dividing all terms to simplify, recognizing equivalent expression]
* - Distractor patterns: [A: original left side value, B/C: calculation errors]
* - Constraints: [Result must be integer, const2 must be positive to avoid double negative]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_0adbe034 = {
  metadata: {
    // id: "0adbe034",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const divisor = getRandomInt(2, 5);
    const x = getRandomInt(1, 10);
    const const1 = divisor * getRandomInt(5, 10);
    
    // Ensure const2 is positive to avoid double negative in equation
    // const2 = const1 - divisor * x, so we need const1 > divisor * x
    // Since x can be up to 10 and divisor up to 5, divisor * x can be up to 50
    // const1 is divisor * (5-10), so max is 50. We need to constrain x.
    const maxX = Math.floor((const1 - 1) / divisor); // Ensure divisor * x < const1
    const safeX = getRandomInt(1, Math.max(1, maxX));
    
    const const2 = const1 - divisor * safeX;
    const result = -const2 / divisor;

    const optionsData = [
      { text: (-const2).toString(), isCorrect: false, reason: "is the value of the original right side, not the simplified expression" },
      { text: (result + 2).toString(), isCorrect: false, reason: "may result from conceptual or calculation errors" },
      { text: result.toString(), isCorrect: true },
      { text: (result - 5).toString(), isCorrect: false, reason: "may result from conceptual or calculation errors" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If \\( ${divisor}x - ${const1} = -${const2} \\), what is the value of \\( x - ${const1 / divisor} \\)?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctLetter} is correct. Dividing all terms in the given equation by ${divisor} yields \\( \\frac{${divisor}x}{${divisor}} - \\frac{${const1}}{${divisor}} = -\\frac{${const2}}{${divisor}} \\), or \\( x - ${const1 / divisor} = ${result} \\). Therefore, the value of \\( x - ${const1 / divisor} \\) is ${result}. Choice ${incorrectOptions[0].letter} is incorrect. This is the value of the right side divided by the coefficient. Choice ${incorrectOptions[1].letter} is incorrect and may result from conceptual or calculation errors. Choice ${incorrectOptions[2].letter} is incorrect and may result from conceptual or calculation errors.`
    };
  }
};

/**
* Question ID: baca4a4c
*
* ORIGINAL ANALYSIS:
* - Number ranges: [outerCoeff: 2-9, innerCoeff: 2-5, innerConst: 2-8]
* - Difficulty factors: [Dividing equation by coefficient, equivalent equations]
* - Distractor patterns: [B: multiplied instead of divided, C/D: distributed incorrectly]
* - Constraints: [Result must be clean integer division]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/