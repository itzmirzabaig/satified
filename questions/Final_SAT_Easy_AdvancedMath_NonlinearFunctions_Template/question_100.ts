import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 100
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cVal: 1.25, dVal: 40-60, xVal: 10-30]
 * - Difficulty factors: [Evaluating a factored quadratic expression at a point]
 * - Distractor patterns: [Arithmetic errors, missing terms, random values]
 * - Constraints: [Substitution result is an integer]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_100 = {
  metadata: {
    id: "100",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const cVal = 1.25;

    const dVal = getRandomInt(40, 60);

    // xVal must be a multiple of 4 so that (5/4)*xVal is an integer and
    // f(xVal) = (5/4 * xVal)(dVal - xVal) is exact (never a half-integer).
    const xVal = getRandomInt(3, 7) * 4; // 12, 16, 20, 24, 28

    const coeffTimesX = cVal * xVal;          // integer by construction
    const result = coeffTimesX * (dVal - xVal); // integer

    const optionsData = [
      { text: `${result}`, isCorrect: true },
      { text: `${coeffTimesX * dVal - 50}`, isCorrect: false },
      { text: `${xVal * (dVal - xVal)}`, isCorrect: false },
      { text: `${result + 100}`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    const cStr = "\\frac{5}{4}";

    return {
      questionText: `The function $f$ is defined by $f(x)=(${cStr}x)(${dVal}-x)$. What is the value of $f(${xVal})$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xVal} for $x$: $f(${xVal})=(${cStr} \\cdot ${xVal})(${dVal}-${xVal}) = (${coeffTimesX})(${dVal - xVal}) = ${result}$.`
    };
  }
};