import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 100030d9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 20 feet, bounce to half height each time, height after 3rd bounce: 2.5]
 * - Difficulty factors: [Geometric sequence, bounce counting]
 * - Distractor patterns: [Various miscounts of bounces]
 * - Constraints: [After nth bounce, height = initial / 2^n]
 * - Question type: [No Figure→Fill in the Blank]
 * - Figure generation: [None - word problem]
 */

export const generator_100030d9 = {
  metadata: {
    // id: "100030d9",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 20 feet, half each bounce, after 3rd bounce = 2.5
    // Randomize: initial height (16-32, divisible by 8), fraction (1/2 or 1/3)
    const initial = getRandomInt(2, 4) * 8; // 16, 24, or 32
    const fraction = 2; // Keep as half for simplicity (or could randomize)
    const bounceNum = 3; // After 3rd bounce
    
    // STEP 2: Calculate height after 3rd bounce
    const heightAfter3Bounces = initial / Math.pow(fraction, bounceNum);
    
    // STEP 3: Build question text
    const questionText = `A rubber ball bounces upward one-half the height that it falls each time it hits the ground. If the ball was originally dropped from a distance of ${initial}.0 feet above the ground, what was its maximum height above the ground, in feet, between the third and fourth time it hit the ground?`;
    
    // STEP 4: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: `${heightAfter3Bounces}`,
      explanation: `After hitting the ground once, the ball bounces to ${initial}/${fraction} = ${initial/fraction} feet. After hitting the ground a second time, it bounces to ${initial/fraction}/${fraction} = ${initial/(fraction*fraction)} feet. After hitting the ground for the third time, it bounces to ${initial/(fraction*fraction)}/${fraction} = ${heightAfter3Bounces} feet. Note that ${heightAfter3Bounces} and ${initial}/${Math.pow(fraction, bounceNum)} are equivalent ways to enter the answer.`
    };
  }
};

/**
 * Question ID: 7ba694f3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [bacteria doubles every day, initial: 44000, y = 44000(2)^t]
 * - Difficulty factors: [Exponential growth with doubling time, base recognition]
 * - Distractor patterns: [A/B: wrong structure, C: decay instead of growth]
 * - Constraints: [Doubling means base = 2]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - word problem]
 */