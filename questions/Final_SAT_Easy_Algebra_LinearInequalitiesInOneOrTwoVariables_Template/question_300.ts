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
    // The budget left after the course is not a multiple of the hourly rate,
    // so the answer requires rounding down. The explanation used to skip the
    // steps and state a rounded bound with h written as plain text.
    let hourlyRate = 40, fixedCost = 5, budget = 150;
    do {
      hourlyRate = getRandomInt(40, 80);
      fixedCost = getRandomInt(5, 20);
      budget = getRandomInt(150, 300);
    } while ((budget - fixedCost) % hourlyRate === 0);
    const remaining = budget - fixedCost;
    const maxHoursWhole = Math.floor(remaining / hourlyRate);
    const next = maxHoursWhole + 1;

    const explanation = `The correct answer is ${maxHoursWhole}. If $h$ is the number of hours, the total cost is $${hourlyRate}h + ${fixedCost}$ dollars, so the situation is represented by $${hourlyRate}h + ${fixedCost} \\le ${budget}$. Subtracting ${fixedCost} from both sides of this inequality yields $${hourlyRate}h \\le ${remaining}$, and dividing both sides by ${hourlyRate} yields $h \\le \\frac{${remaining}}{${hourlyRate}}$, which is about ${(remaining / hourlyRate).toFixed(2)}. Since the boat can be rented only for a whole number of hours, the maximum is ${maxHoursWhole}. Renting for ${next} hours would cost $${hourlyRate}(${next}) + ${fixedCost} = ${hourlyRate * next + fixedCost}$ dollars, which is more than \\$${budget}.`;

    return {
      questionText: `A customer plans to rent a boat. The boat rental costs \\$${hourlyRate} per hour, and the customer will also have to pay for a water safety course that costs \\$${fixedCost}. The customer wants to spend no more than \\$${budget} for the rental and the course. If the boat rental is available only for a whole number of hours, what is the maximum number of hours for which the customer can rent the boat?`,
      figureCode: null,
      options: [],
      correctAnswer: maxHoursWhole.toString(),
      explanation: explanation
    };
  }
};
