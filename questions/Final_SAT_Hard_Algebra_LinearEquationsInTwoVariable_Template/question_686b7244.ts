import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 686b7244
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [hours: 10, 15, 85]
 * - Difficulty factors: [Interpreting coefficients in context]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Difference of coefficients]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */

export const generator_686b7244 = {
  metadata: {
    // id: "686b7244",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const onSiteHours = getRandomInt(5, 20);
    const onlineHours = getRandomInt(onSiteHours + 5, onSiteHours + 20);
    const totalCourses = getRandomInt(50, 150);
    
    // Ensure total is divisible by GCD of coefficients for integer solutions
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const g = gcd(onSiteHours, onlineHours);
    const total = Math.round(totalCourses / g) * g;
    
    const difference = onlineHours - onSiteHours;
    
    return {
      questionText: `A certain apprentice has enrolled in ${total} hours of training courses. The equation $${onSiteHours}x+${onlineHours}y=${total}$ represents this situation, where $x$ is the number of on-site training courses and $y$ is the number of online training courses this apprentice has enrolled in. How many more hours does each online training course take than each on-site training course?`,
      figureCode: null,
      options: null,
      correctAnswer: difference.toString(),
      explanation: `In the equation $${onSiteHours}x+${onlineHours}y=${total}$, the coefficient ${onSiteHours} represents hours per on-site course and ${onlineHours} represents hours per online course. The difference is $${onlineHours}-${onSiteHours}=${difference}$ hours.`
    };
  }
};

/**
 * Question ID: db422e7f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4, 8, 6]
 * - Difficulty factors: [Finding perpendicular slope]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Negative reciprocal]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */