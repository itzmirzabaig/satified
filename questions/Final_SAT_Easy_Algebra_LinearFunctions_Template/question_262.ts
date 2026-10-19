import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 262
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5 negative, intercept: 50-70, xValue: 5-10 negative]
 * - Difficulty factors: [Evaluating with negative values]
 * - Distractor patterns: [sign of product, forgot intercept, did not multiply by the slope]
 * - Constraints: [Ensure negative xValue]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_262 = {
  metadata: {
    id: "262",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Every wrong choice is a real evaluation slip; the old choices were the
    // answer minus 10, minus 5 and plus 3, each "a calculation error".
    // Redraw until the four values differ.
    let slope = -2, intercept = 50, xValue = -5;
    let product = 10, result = 60;
    do {
      slope = -getRandomInt(2, 5);
      intercept = getRandomInt(50, 70);
      xValue = -getRandomInt(5, 10);
      product = slope * xValue;
      result = product + intercept;
    } while (new Set([result, intercept - product, product, intercept + xValue]).size < 4);

    const optionsData = [
      { text: (intercept - product).toString(), isCorrect: false, reason: `it results from taking $${slope}(${xValue})$ to be $-${product}$; the product of two negative numbers is positive` },
      { text: product.toString(), isCorrect: false, reason: `it is the value of $${slope}(${xValue})$; ${intercept} must still be added` },
      { text: (intercept + xValue).toString(), isCorrect: false, reason: `it results from adding $${xValue}$ to ${intercept} without first multiplying $${xValue}$ by $${slope}$` },
      { text: result.toString(), isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x) = ${slope}x + ${intercept}$. What is the value of $f(x)$ when $x = ${xValue}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting $${xValue}$ for $x$ in the given function yields $f(${xValue}) = ${slope}(${xValue}) + ${intercept}$, or $f(${xValue}) = ${product} + ${intercept} = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
