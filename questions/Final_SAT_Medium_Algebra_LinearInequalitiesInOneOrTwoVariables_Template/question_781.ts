import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
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
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: fee 35, per person 10.25, budget 300
    // Generate similar structure
    const venueFee = getRandomInt(20, 50);
    // Generate cost per attendee with 2 decimal places
    const costPerAttendee = getRandomInt(800, 1500) / 100; // 8.00 to 15.00
    const budget = getRandomInt(200, 400);
    
    // STEP 2: Calculate maximum attendees
    // Solve: venueFee + costPerAttendee * x ≤ budget
    // x ≤ (budget - venueFee) / costPerAttendee
    const maxAttendeesExact = (budget - venueFee) / costPerAttendee;
    const maxAttendees = Math.floor(maxAttendeesExact);
    
    // STEP 3: Return question data
    return {
      questionText: `An event planner is planning a party. It costs the event planner a onetime fee of ${venueFee} to rent the venue and ${costPerAttendee.toFixed(2)} per attendee. The event planner has a budget of $${budget}. What is the greatest number of attendees possible without exceeding the budget?`,
      figureCode: null,
      options: null, // Fill in the blank
      correctAnswer: maxAttendees.toString(),
      explanation: `The total cost is $${venueFee} + ${costPerAttendee.toFixed(2)}x$ where $x$ is the number of attendees. The budget constraint is $${venueFee} + ${costPerAttendee.toFixed(2)}x \\le ${budget}$. Subtracting ${venueFee} gives $${costPerAttendee.toFixed(2)}x \\le ${budget - venueFee}$. Dividing by ${costPerAttendee.toFixed(2)} gives $x \\le ${maxAttendeesExact.toFixed(3)}$. Since the question asks for the greatest whole number of attendees, the answer is ${maxAttendees}.`
    };
  }
};
