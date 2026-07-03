import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 774
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [venue: 35, per attendee: 10.25, budget: 200]
 * - Difficulty factors: [Same as b78cd5df but with different values, rounding down]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [35 + 10.25x ≤ 200, x ≤ 16.098... → 16]
 * - Question type: [Word Problem→Fill in the Blank]
 * - Figure generation: [None]
 */

export const generator_774 = {
  metadata: {
    id: "774",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const venueFee = getRandomInt(25, 45);
    const costPerAttendee = getRandomInt(8, 15) + getRandomInt(0, 99) / 100;
    const budget = getRandomInt(180, 250);
    const perAttendee = costPerAttendee.toFixed(2);

    // STEP 2: Calculate. budget - venueFee is always positive
    // (budget >= 180, venueFee <= 45), so maxAttendees >= 9 for every draw.
    const remaining = budget - venueFee;
    const maxAttendeesExact = remaining / costPerAttendee;
    const maxAttendees = Math.floor(maxAttendeesExact);

    // STEP 3: Return. Currency is escaped as \$ so MathJax never pairs the
    // dollar signs; the only true math segments use x and \le.
    return {
      questionText: `An event planner is organizing a party. It costs a onetime fee of \\$${venueFee} to rent the venue plus \\$${perAttendee} per attendee. The planner has a budget of \\$${budget}. What is the greatest number of attendees possible without exceeding the budget?`,
      figureCode: null,
      options: [],
      correctAnswer: maxAttendees.toString(),
      explanation: `Let $x$ be the number of attendees. The total cost must satisfy $${venueFee} + ${perAttendee}x \\le ${budget}$. Subtracting ${venueFee} from both sides gives $${perAttendee}x \\le ${remaining}$, and dividing by ${perAttendee} gives $x \\le ${maxAttendeesExact.toFixed(3)}$. Since the number of attendees must be a whole number, the greatest possible value is ${maxAttendees}.`
    };
  }
};
