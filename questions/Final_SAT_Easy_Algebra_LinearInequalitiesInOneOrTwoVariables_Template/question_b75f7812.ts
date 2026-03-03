import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: b75f7812
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [hourly: $60, course: $10, budget: $280]
 * - Difficulty factors: [Linear inequality solving, discrete whole number constraint]
 * - Distractor patterns: [Fill-in-the-blank, exact calculation vs rounded down]
 * - Constraints: [Must round down to whole number since h <= 4.5]
 * - Question type: [Word Problem→Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_b75f7812 = {
  metadata: {
    // id: "b75f7812",
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

    const explanation = `The inequality $${hourlyRate}h + ${fixedCost} \\le ${budget}$ represents the situation. Solving: $h \\le ${maxHoursExact.toFixed(2)}$. Since only whole numbers are allowed, the maximum is ${maxHoursWhole}.`;

    return {
      questionText: `Maria plans to rent a boat. The boat rental costs ${hourlyRate} per hour, and she will also have to pay for a water safety course that costs ${fixedCost}. Maria wants to spend no more than ${budget} for the rental and the course. If the boat rental is available only for a whole number of hours, what is the maximum number of hours for which Maria can rent the boat?`,
      figureCode: null,
      options: null,
      correctAnswer: maxHoursWhole.toString(),
      explanation: explanation
    };
  }
};

/**
 * Question ID: b64e2c7f
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min temp: 55.0, current: 51.3]
 * - Difficulty factors: [Decimal subtraction, "at least" interpretation]
 * - Distractor patterns: [A=wrong base temp, B=correct difference, C=wrong base, D=wrong base]
 * - Constraints: [Result is 55.0 - 51.3 = 3.7]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */