import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 765
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [earnings: 215, fraction: 2/5, weeks: 9]
 * - Difficulty factors: [Fraction multiplication, multi-step calculation]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - straightforward calculation]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */

export const generator_765 = {
  metadata: {
    id: "765",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Weekly earnings: 180-250
    const weeklyEarnings = getRandomInt(180, 250);
    // Fraction numerator: 1-3, denominator: 3-6
    const num = getRandomInt(1, 3);
    const denom = getRandomInt(3, 6);
    // Weeks: 6-12
    const weeks = getRandomInt(6, 12);
    
    // STEP 2: Calculate answer
    // Ensure integer answer for clean SAT grid-in
    // Find a multiple of denom within range
    const adjustedWeeklyEarnings = Math.ceil(weeklyEarnings / denom) * denom;
    const adjustedWeeklySavings = (num * adjustedWeeklyEarnings) / denom;
    const adjustedTotalSavings = adjustedWeeklySavings * weeks;
    
    // STEP 3: Return question data
    return {
      questionText: `Brian saves $\\frac{${num}}{${denom}}$ of the $${adjustedWeeklyEarnings} he earns each week from his job. If Brian continues to save at this rate, how much money, in dollars, will Brian save in ${weeks} weeks?`,
      figureCode: null,
      options: null,
      correctAnswer: adjustedTotalSavings.toString(),
      explanation: `Brian saves $\\frac{${num}}{${denom}}$ of $${adjustedWeeklyEarnings} = $${adjustedWeeklySavings} per week. Over ${weeks} weeks, he saves $${adjustedWeeklySavings} \\times ${weeks} = $${adjustedTotalSavings}.`
    };
  }
};
