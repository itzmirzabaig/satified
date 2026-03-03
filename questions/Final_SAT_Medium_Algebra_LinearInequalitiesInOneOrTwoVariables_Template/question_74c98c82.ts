import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 74c98c82
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [venue: 35, per attendee: 10.25, budget: 200]
 * - Difficulty factors: [Same as b78cd5df but with different values, rounding down]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [35 + 10.25x ≤ 200, x ≤ 16.098... → 16]
 * - Question type: [Word Problem→Fill in the Blank]
 * - Figure generation: [None]
 */

export const generator_74c98c82 = {
  metadata: {
    // id: "74c98c82",
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
    
    // STEP 2: Calculate
    const maxAttendeesExact = (budget - venueFee) / costPerAttendee;
    const maxAttendees = Math.floor(maxAttendeesExact);
    
    // STEP 3: Return
    return {
      questionText: `An event planner is planning a party. It costs the event planner a onetime fee of ${venueFee} to rent the venue and ${costPerAttendee.toFixed(2)} per attendee. The event planner has a budget of $${budget}. What is the greatest number of attendees possible without exceeding the budget?`,
      figureCode: null,
      options: null,
      correctAnswer: maxAttendees.toString(),
      explanation: `The total cost is $${venueFee} + ${costPerAttendee.toFixed(2)}x \\le ${budget}$. Solving: $${costPerAttendee.toFixed(2)}x \\le ${budget - venueFee}$, so $x \\le ${maxAttendeesExact.toFixed(3)}$. The greatest whole number is ${maxAttendees}.`
    };
  }
};
/**
 * Question ID: e9ef0e6b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [daily miles: 72-77, days: 16]
 * - Difficulty factors: [Range multiplication, compound inequality]
 * - Distractor patterns: [A=addition instead of multiplication, C=added to x, D=divided by days]
 * - Constraints: [72*16 ≤ x ≤ 77*16]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/LinearInequalitiesInOneOrTwoVariables/e9ef0e6b.ts