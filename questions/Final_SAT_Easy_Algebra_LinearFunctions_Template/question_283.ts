import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 283
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [xValue: 3-8, result: 3-8, constant: calculated]
 * - Difficulty factors: [Fraction evaluation, order of operations]
 * - Distractor patterns: [forgot 1/2, multiplied by 2, halved only x]
 * - Constraints: [Ensure integer result]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 *
 * Answer-first construction: choose the answer result and the input xValue,
 * then set constant = 2*result - xValue so that
 * f(xValue) = (1/2)(xValue + constant) = result is an exact integer.
 */

export const generator_283 = {
  metadata: {
    id: "283",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Every wrong choice is a real evaluation slip. The old fillers were the
    // answer plus or minus 1 or 2 ("an arithmetic error"). Halving only x
    // gives xValue/2 + constant, which can end in .5. Redraw until the
    // constant is positive and the four values differ.
    let xValue = 3, result = 3, constant = 3;
    do {
      xValue = getRandomInt(3, 8);
      result = getRandomInt(3, 8);
      constant = 2 * result - xValue;
    } while (constant < 1 || new Set([result, 2 * result, 4 * result, xValue / 2 + constant]).size < 4);
    const sumInside = xValue + constant;
    const halfX = xValue / 2;

    const optionsData = [
      { text: result.toString(), isCorrect: true, reason: '' },
      { text: sumInside.toString(), isCorrect: false, reason: `${sumInside} is the value of $${xValue} + ${constant}$; it must still be multiplied by $\\frac{1}{2}$` },
      { text: (2 * sumInside).toString(), isCorrect: false, reason: `it results from multiplying $${xValue} + ${constant}$ by 2 instead of by $\\frac{1}{2}$` },
      { text: (halfX + constant).toString(), isCorrect: false, reason: `it results from multiplying only ${xValue} by $\\frac{1}{2}$, which gives $\\frac{1}{2}(${xValue}) + ${constant}$; the $\\frac{1}{2}$ multiplies the entire sum $${xValue} + ${constant}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x)=\\frac{1}{2}(x+${constant})$. What is the value of $f(${xValue})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$ in the given function yields $f(${xValue}) = \\frac{1}{2}(${xValue} + ${constant})$, or $f(${xValue}) = \\frac{1}{2}(${sumInside}) = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
