import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 104
*
* ORIGINAL ANALYSIS:
* - Number ranges: [divisor: 2-5, k = const1/divisor: 5-10, x: 1..k-1]
* - Difficulty factors: [Dividing all terms to simplify, recognizing equivalent expression]
* - Distractor patterns: [left-side value before dividing, value of x itself, sign error]
* - Constraints: [Integer result, const2 > 0 to avoid double negative, 2x != k so distractors never collide]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_104 = {
  metadata: {
    id: "104",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const divisor = getRandomInt(2, 5);
    const k = getRandomInt(5, 10); // const1 / divisor, so the equation divides cleanly
    const const1 = divisor * k;

    // Solution for x. Keep 1 <= safeX <= k - 1 so const2 > 0 (no double negative
    // in the printed equation). Guard 2 * safeX !== k so the sign-error
    // distractor (k - safeX) can never equal the value-of-x distractor (safeX).
    let safeX = getRandomInt(1, k - 1);
    if (2 * safeX === k) safeX += 1; // still <= k - 1 because k >= 5

    const const2 = const1 - divisor * safeX; // divisor * (k - safeX), always positive
    const result = safeX - k; // value of x - k, always a negative integer

    // Option values are pairwise distinct for every draw:
    // result < 0, divisor * result < result, safeX > 0, k - safeX > 0,
    // and safeX !== k - safeX by the guard above.
    const optionsData = [
      { text: (-const2).toString(), isCorrect: false, reason: `is the value of ${divisor}x - ${const1}, the left-hand side of the given equation, before dividing by ${divisor}` },
      { text: safeX.toString(), isCorrect: false, reason: `is the value of \\( x \\) itself, not the value of \\( x - ${k} \\)` },
      { text: result.toString(), isCorrect: true },
      { text: (k - safeX).toString(), isCorrect: false, reason: `may result from a sign error when simplifying to find \\( x - ${k} \\)` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If \\( ${divisor}x - ${const1} = -${const2} \\), what is the value of \\( x - ${k} \\)?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctLetter} is correct. Dividing each term of the given equation by ${divisor} yields \\( \\frac{${divisor}x}{${divisor}} - \\frac{${const1}}{${divisor}} = -\\frac{${const2}}{${divisor}} \\), which simplifies to \\( x - ${k} = ${result} \\). Therefore, the value of \\( x - ${k} \\) is ${result}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
