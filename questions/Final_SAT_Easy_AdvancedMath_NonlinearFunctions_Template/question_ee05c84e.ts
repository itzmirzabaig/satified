import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: ee05c84e
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cVal: 1.25, dVal: 40-60, xVal: 10-30]
 * - Difficulty factors: [Evaluating a factored quadratic expression at a point]
 * - Distractor patterns: [Arithmetic errors, missing terms, random values]
 * - Constraints: [Substitution result is an integer]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_ee05c84e = {
  metadata: {
    // id: "ee05c84e",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const cVal = 1.25;

    const dVal = getRandomInt(40, 60);

    const xVal = getRandomInt(10, 30);

    const result = Math.round(cVal * xVal * (dVal - xVal));

    const optionsData = [
      { text: `${result}`, isCorrect: true },
      { text: `${Math.round(cVal * xVal * dVal) - 50}`, isCorrect: false },
      { text: `${Math.round(xVal * (dVal - xVal))}`, isCorrect: false },
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
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xVal} for $x$: $f(${xVal})=(${cStr} \\cdot ${xVal})(${dVal}-${xVal}) = (${Math.round(cVal * xVal)})(${dVal - xVal}) = ${result}$.`
    };
  }
};