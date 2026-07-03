import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 214
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeff: 2-6, answer: 2-8]
 * - Difficulty factors: [Solving for input given output]
 * - Constraints: [Clean division]
 * - Question type: [Solve for x→Fill in blank]
 * - Figure generation: null
 */

export const generator_214 = {
  metadata: {
    id: "214",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coefficient = getRandomInt(2, 6);

    const answer = getRandomInt(2, 8);

    const result = coefficient * answer;

    return {
      questionText: `The function $f$ is defined by $f(x) = ${coefficient}x$. For what value of $x$ does $f(x) = ${result}$?`,
      figureCode: null,
      options: [],
      correctAnswer: answer.toString(),
      explanation: `Setting $f(x) = ${result}$ gives $${coefficient}x = ${result}$. Dividing both sides by ${coefficient} yields $x = ${answer}$.`
    };
  }
};
