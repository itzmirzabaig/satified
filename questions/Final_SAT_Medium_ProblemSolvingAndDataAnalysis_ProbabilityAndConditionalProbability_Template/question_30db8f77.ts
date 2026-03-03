import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 30db8f77
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total 275, probA 0.44, probB 0.24]
 * - Difficulty factors: [Probability to count conversion, fill-in-blank]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [P(C) = 1 - P(A) - P(B), count = total × P(C)]
 * - Question type: [Word Problem→Fill in the Blank]
 * - Figure generation: [No figure needed]
 */

export const generator_30db8f77 = {
  metadata: {
    // id: "30db8f77",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters (similar to 1fc4f47b but fill-in-blank)
    const totalAttendees = getRandomInt(250, 300);
    const probA = parseFloat((getRandomInt(40, 50) / 100).toFixed(2));
    const probB = parseFloat((getRandomInt(20, 30) / 100).toFixed(2));
    const probC = parseFloat((1 - probA - probB).toFixed(2));

    // STEP 2: Calculate
    const countA = Math.round(totalAttendees * probA);
    const countB = Math.round(totalAttendees * probB);
    const countC = totalAttendees - countA - countB;

    return {
      questionText: `At a conference, there are a total of ${totalAttendees} attendees. Each attendee is assigned to either group A, group B, or group C. If one of these attendees is selected at random, the probability of selecting an attendee who is assigned to group A is ${probA} and the probability of selecting an attendee who is assigned to group B is ${probB}. How many attendees are assigned to group C?`,
      figureCode: null,
      options: null,
      correctAnswer: countC.toString(),
      explanation: `The correct answer is ${countC}. The probability of selecting an attendee in group C is 1 - ${probA} - ${probB} = ${probC}. Therefore, the number of attendees in group C is ${probC} × ${totalAttendees} = ${countC}.`
    };
  }
};

/**
 * Question ID: 38a9ac45
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [daily rate 1200, days 5, total accounts 60000]
 * - Difficulty factors: [Proportion/rate problem, fraction simplification]
 * - Distractor patterns: [1/5 = days/total days needed, 1/12 = reverse of correct, 1/50 = 1200/60000 raw]
 * - Constraints: [Calculate accounts in 5 days, divide by total, simplify]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [No figure needed]
 */