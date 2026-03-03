import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 0b332f00
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeff: 4-12, ans: 5-15]
 * - Difficulty factors: [Solving for input given output]
 * - Constraints: [Clean division]
 * - Question type: [Solve for x→Fill in blank]
 * - Figure generation: null
 */

export const generator_0b332f00 = {
  metadata: {
    // id: "0b332f00",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coefficient = getRandomInt(4, 12);

    const answer = getRandomInt(5, 15);

    const result = coefficient * answer;

    return {
      questionText: `The function $g$ is defined by $g(x) = ${coefficient}x$. For what value of $x$ is $g(x) = ${result}$?`,
      figureCode: null,
      options: null,
      correctAnswer: answer.toString(),
      explanation: `Substituting ${result} for $g(x)$ in the given function yields ${result} = ${coefficient}x$. Dividing both sides of this equation by ${coefficient} yields $x = ${answer}$.`
    };
  }
};

/**
 * Question ID: c10ad793
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 1-4, xInt: 8-20]
 * - Difficulty factors: [Reading x-intercept from table]
 * - Distractor patterns: [origin, reciprocal slope, positive version of negative intercept]
 * - Constraints: [Ensure negative x-intercept]
 * - Question type: [Table reading→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

