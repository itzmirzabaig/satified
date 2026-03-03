import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 7b17f86a
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [denominator: 5-15, numerator: 1 to den-1, xValue: 1-10]
 * - Difficulty factors: [Fraction arithmetic in function evaluation]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Fill in blank]
 * - Figure generation: null
 */

export const generator_7b17f86a = {
  metadata: {
    // id: "7b17f86a",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const denominator = getRandomInt(5, 15);

    const numerator = getRandomInt(1, denominator - 1);

    const xValue = getRandomInt(1, 10);

    const resultValue = xValue + numerator;

    const finalAnswer = resultValue === denominator ? "1" : `${resultValue}/${denominator}`;

    return {
      questionText: `The function $f$ is defined by $f(x) = x + \\frac{${numerator}}{${denominator}}$. What is the value of $f\\left(\\frac{${xValue}}{${denominator}}\\right)$?`,
      figureCode: null,
      options: null,
      correctAnswer: finalAnswer,
      explanation: `Substituting $\\frac{${xValue}}{${denominator}}$ for $x$ in the function definition: $f\\left(\\frac{${xValue}}{${denominator}}\\right) = \\frac{${xValue}}{${denominator}} + \\frac{${numerator}}{${denominator}}$. Since the denominators are the same, we add the numerators: $\\frac{${xValue} + ${numerator}}{${denominator}} = \\frac{${resultValue}}{${denominator}}$. ${resultValue === denominator ? "Simplifying gives 1." : ""}`
    };
  }
};

/**
 * Question ID: adf60b28
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [growthRate: 6-12, initialHeight: 2-6]
 * - Difficulty factors: [Interpreting y-intercept]
 * - Distractor patterns: [time period confusion, maximum value, slope as intercept]
 * - Constraints: [None]
 * - Question type: [Interpretation→Multiple Choice Text]
 * - Figure generation: null
 */

