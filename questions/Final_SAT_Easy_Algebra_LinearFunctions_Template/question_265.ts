import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 265
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 8-12, intercept: 5-10, x: 6-10]
 * - Difficulty factors: [Simple evaluation]
 * - Distractor patterns: [added instead of multiplied, forgot constant, multiplied both terms]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_265 = {
  metadata: {
    id: "265",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(8, 12);

    const intercept = getRandomInt(5, 10);

    const xValue = getRandomInt(6, 10);

    const result = slope * xValue + intercept;
    const product = slope * xValue;

    // Every wrong choice is a real evaluation slip. The old choices were 0,
    // the input and the slope. The four values are always distinct:
    // slope + intercept + x <= 32 < product < result < slope * (x + intercept).
    const optionsData = [
      { text: (slope + intercept + xValue).toString(), isCorrect: false, reason: `it results from adding ${xValue} to ${slope} instead of multiplying ${slope} by ${xValue}` },
      { text: product.toString(), isCorrect: false, reason: `it is the value of $${slope}(${xValue})$; ${intercept} must still be added` },
      { text: (slope * (xValue + intercept)).toString(), isCorrect: false, reason: `it results from multiplying both ${xValue} and ${intercept} by ${slope}, which gives $${slope}(${xValue} + ${intercept})$; only ${xValue} is multiplied by ${slope}` },
      { text: result.toString(), isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $g$ is defined by $g(x) = ${slope}x + ${intercept}$. What is the value of $g(x)$ when $x = ${xValue}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$ in the given function yields $g(${xValue}) = ${slope}(${xValue}) + ${intercept}$, or $g(${xValue}) = ${product} + ${intercept} = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
