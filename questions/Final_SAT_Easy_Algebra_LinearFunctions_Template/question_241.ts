import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 241
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, intercept: 5-10 negative, x: 5-10]
 * - Difficulty factors: [Evaluation with negative intercept]
 * - Distractor patterns: [wrong intercept sign, forgot intercept, sign error]
 * - Constraints: [Ensure negative intercept]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_241 = {
  metadata: {
    id: "241",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    let slope = 0;
    let intercept = 0;
    let xValue = 0;
    let result = 0;
    let dropSign = 0;
    let forgetIntercept = 0;
    let signError = 0;

    // Bounded retry: keep the three intended error types (subtract the intercept
    // instead of adding, forget the intercept, flip the sign of the result) and
    // guarantee all four values are distinct. The only colliding draw across the
    // full range is result === 0 (then -result === result), which the guard skips.
    let tries = 0;
    do {
      slope = getRandomInt(2, 5);
      intercept = -getRandomInt(5, 10);         // negative intercept: -10..-5
      xValue = getRandomInt(5, 10);

      result = slope * xValue + intercept;      // correct: f(x) = mx + b

      dropSign = slope * xValue - intercept;    // subtracts the (negative) intercept -> adds |b|
      forgetIntercept = slope * xValue;         // ignores the intercept term
      signError = -result;                      // negates the final result
      tries++;
    } while (
      new Set([result, dropSign, forgetIntercept, signError]).size !== 4 &&
      tries < 50
    );

    const optionsData = [
      { text: dropSign.toString(), isCorrect: false, reason: "subtracts the intercept instead of adding it" },
      { text: result.toString(), isCorrect: true },
      { text: forgetIntercept.toString(), isCorrect: false, reason: "forgets to add the intercept" },
      { text: signError.toString(), isCorrect: false, reason: "has a sign error in the final result" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x) = ${slope}x - ${Math.abs(intercept)}$. What is the value of $f(${xValue})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$: $f(${xValue}) = ${slope}(${xValue}) - ${Math.abs(intercept)} = ${slope * xValue} - ${Math.abs(intercept)} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
