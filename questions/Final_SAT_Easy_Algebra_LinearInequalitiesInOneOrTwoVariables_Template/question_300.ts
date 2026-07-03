import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 300
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [hourly: $60, course: $10, budget: $280]
 * - Difficulty factors: [Linear inequality solving, discrete whole number constraint]
 * - Distractor patterns: [Fill-in-the-blank, exact calculation vs rounded down]
 * - Constraints: [Must round down to whole number since h <= 4.5]
 * - Question type: [Word Problem→Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_300 = {
  metadata: {
    id: "300",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const hourlyRate = getRandomInt(40, 80);
    const fixedCost = getRandomInt(5, 20);
    const budget = getRandomInt(150, 300);
    const maxHoursExact = (budget - fixedCost) / hourlyRate;
    const maxHoursWhole = Math.floor(maxHoursExact);

    const explanation = `The inequality $${hourlyRate}h + ${fixedCost} \\le ${budget}$ represents the situation, where h is the number of hours. Solving this inequality gives $${maxHoursExact.toFixed(2)} \\ge h$. Since the boat can be rented only for a whole number of hours, the maximum is ${maxHoursWhole}.`;

    return {
      questionText: `A customer plans to rent a boat. The boat rental costs \\$${hourlyRate} per hour, and the customer will also have to pay for a water safety course that costs \\$${fixedCost}. The customer wants to spend no more than \\$${budget} for the rental and the course. If the boat rental is available only for a whole number of hours, what is the maximum number of hours for which the customer can rent the boat?`,
      figureCode: null,
      options: [],
      correctAnswer: maxHoursWhole.toString(),
      explanation: explanation
    };
  }
};
