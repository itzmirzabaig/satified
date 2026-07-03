import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 781
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [venue fee: 35, per attendee: 10.25, budget: 300]
 * - Difficulty factors: [Real-world rounding down, inequality solving]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [35 + 10.25x ≤ 300, x must be integer]
 * - Question type: [Word Problem→Fill in the Blank]
 * - Figure generation: [None]
 */

export const generator_781 = {
  metadata: {
    id: "781",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const venueFee = getRandomInt(20, 50);
    // Cost per attendee with exactly two decimal places (8.00 .. 15.00).
    const costCents = getRandomInt(800, 1500);            // integer cents
    const costPerAttendee = costCents / 100;
    const budget = getRandomInt(200, 400);

    // Solve venueFee + costPerAttendee * x <= budget  =>  x <= (budget - venueFee)/costPerAttendee.
    // Work in cents to avoid float error, then floor to the greatest whole attendee count.
    const remainingCents = (budget - venueFee) * 100;      // integer
    const maxAttendees = Math.floor(remainingCents / costCents);

    const costStr = costPerAttendee.toFixed(2);
    const remainingDollars = budget - venueFee;

    return {
      questionText: `An event planner is organizing a party. It costs a one-time fee of \\$${venueFee} to rent the venue plus \\$${costStr} per attendee. The event planner has a budget of \\$${budget}. What is the greatest number of attendees possible without exceeding the budget?`,
      figureCode: null,
      options: [], // Fill in the blank
      correctAnswer: maxAttendees.toString(),
      explanation: `Let $x$ be the number of attendees. The total cost is $${venueFee} + ${costStr}x$ dollars, and it must not exceed the budget: $${venueFee} + ${costStr}x \\le ${budget}$. Subtracting $${venueFee}$ from both sides gives $${costStr}x \\le ${remainingDollars}$. Dividing both sides by $${costStr}$ gives $x \\le ${(remainingDollars / costPerAttendee).toFixed(2)}$. Since the number of attendees must be a whole number, the greatest possible value is $${maxAttendees}$.`
    };
  }
};
