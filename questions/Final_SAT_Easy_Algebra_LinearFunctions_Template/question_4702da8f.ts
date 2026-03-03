import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 4702da8f
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [intercept: 60-100, slope: 4-8 negative, x: 5-10]
 * - Difficulty factors: [Function evaluation]
 * - Distractor patterns: [arithmetic errors, subtraction error, addition error]
 * - Constraints: [Ensure negative slope]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_4702da8f = {
  metadata: {
    // id: "4702da8f",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const intercept = getRandomInt(60, 100);

    const slope = -getRandomInt(4, 8);

    const xValue = getRandomInt(5, 10);

    const result = slope * xValue + intercept;

    const distractor1 = intercept + slope - xValue;

    const distractor2 = intercept - slope;

    const distractor3 = intercept + slope + xValue;

    const optionsData = [
      { text: Math.abs(distractor1).toString(), isCorrect: false, reason: "results from incorrect arithmetic operations" },
      { text: result.toString(), isCorrect: true },
      { text: distractor2.toString(), isCorrect: false, reason: "results from subtracting the slope instead of multiplying" },
      { text: distractor3.toString(), isCorrect: false, reason: "results from adding instead of multiplying" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x)=${intercept}${slope}x$. What is the value of $f(${xValue})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$: $f(${xValue}) = ${intercept} + (${slope})(${xValue}) = ${intercept} + (${slope * xValue}) = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 13294295
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rate: 30-50, time1: 2-4]
 * - Difficulty factors: [Calculating rate from graph]
 * - Distractor patterns: [time as rate, total amount as rate, arbitrary value]
 * - Constraints: [None]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 */

