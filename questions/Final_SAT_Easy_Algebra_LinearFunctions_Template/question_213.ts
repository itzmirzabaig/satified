import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 213
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeff: 4-12, ans: 5-15]
 * - Difficulty factors: [Solving for input given output]
 * - Constraints: [Clean division]
 * - Question type: [Solve for x→Fill in blank]
 * - Figure generation: null
 */

export const generator_213 = {
  metadata: {
    id: "213",
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
      options: [],
      correctAnswer: answer.toString(),
      explanation: `Substituting ${result} for $g(x)$ in the given function yields $${result} = ${coefficient}x$. Dividing both sides of this equation by ${coefficient} yields $x = ${answer}$.`
    };
  }
};
