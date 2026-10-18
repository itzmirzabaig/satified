import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 236
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-6, intercept: 1-5 negative, x: 8-15]
 * - Difficulty factors: [Function evaluation with negative intercept]
 * - Distractor patterns: [subtracted before multiplying, forgot intercept, added intercept]
 * - Constraints: [Ensure negative intercept]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_236 = {
  metadata: {
    id: "236",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(2, 6);

    const intercept = -getRandomInt(1, 5);

    const xValue = getRandomInt(8, 15);

    const result = slope * xValue + intercept;

    const c = Math.abs(intercept);

    // Every wrong choice is a real evaluation slip. The old "sign error" choice
    // was the negative of slope * x, which no one gets by evaluating f.
    // The four values are distinct: slope * (x - c) < slope * x - c because
    // slope >= 2.
    const optionsData = [
      { text: (slope * (xValue - c)).toString(), isCorrect: false, reason: `it results from subtracting ${c} from ${xValue} before multiplying by ${slope}, which gives $${slope}(${xValue} - ${c})$ instead of $${slope}(${xValue}) - ${c}$` },
      { text: result.toString(), isCorrect: true, reason: '' },
      { text: (slope * xValue).toString(), isCorrect: false, reason: `it is the value of $${slope}(${xValue})$; ${c} must still be subtracted` },
      { text: (slope * xValue + c).toString(), isCorrect: false, reason: `it results from adding ${c} instead of subtracting it` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x) = ${slope}x - ${c}$. What is the value of $f(${xValue})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$ in the given function yields $f(${xValue}) = ${slope}(${xValue}) - ${c}$, or $f(${xValue}) = ${slope * xValue} - ${c} = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
