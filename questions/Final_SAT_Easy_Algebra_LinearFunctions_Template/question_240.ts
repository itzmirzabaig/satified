import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 240
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [intercept: 60-100, slope: 4-8 negative, x: 5-10]
 * - Difficulty factors: [Function evaluation]
 * - Distractor patterns: [arithmetic errors, subtraction error, addition error]
 * - Constraints: [Ensure negative slope]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_240 = {
  metadata: {
    id: "240",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    let intercept = 0;
    let slope = 0;
    let xValue = 0;
    let result = 0;
    let wrongSign = 0;
    let noX = 0;
    let onlyProduct = 0;

    // Bounded retry: guarantee the correct value and all three distractors are
    // mutually distinct for the drawn parameters. Over the full declared ranges
    // the natural error values never collide, but the guard keeps any future
    // range change safe (house rule: bounded retry <= 50).
    let tries = 0;
    do {
      intercept = getRandomInt(60, 100);        // f(0), always positive
      slope = -getRandomInt(4, 8);              // negative slope: -8..-4
      xValue = getRandomInt(5, 10);

      result = slope * xValue + intercept;      // correct: f(x) = mx + b

      wrongSign = intercept - slope * xValue;   // treats the slope as positive
      noX = intercept + slope;                  // forgets to multiply the slope by x
      onlyProduct = slope * xValue;             // forgets to add the intercept
      tries++;
    } while (
      new Set([result, wrongSign, noX, onlyProduct]).size !== 4 &&
      tries < 50
    );

    const optionsData = [
      { text: wrongSign.toString(), isCorrect: false, reason: `it results from adding ${Math.abs(slope) * xValue} to ${intercept} instead of subtracting it` },
      { text: result.toString(), isCorrect: true, reason: '' },
      { text: noX.toString(), isCorrect: false, reason: `it results from subtracting ${Math.abs(slope)} from ${intercept} without first multiplying ${Math.abs(slope)} by ${xValue}` },
      { text: onlyProduct.toString(), isCorrect: false, reason: `it is the value of the $x$-term alone, $-${Math.abs(slope)}(${xValue})$; ${intercept} must still be added to it` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x) = ${intercept} - ${Math.abs(slope)}x$. What is the value of $f(${xValue})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$ in the given function yields $f(${xValue}) = ${intercept} - ${Math.abs(slope)}(${xValue})$, or $f(${xValue}) = ${intercept} - ${Math.abs(slope) * xValue} = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
