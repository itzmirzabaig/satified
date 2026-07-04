import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 991
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [distance: 11 miles, time: 26 minutes]
 * - Difficulty factors: [Speed calculation, minutes to hours conversion]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Round to nearest tenth]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_991 = {
  metadata: {
    id: "991",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 11 miles in 26 minutes
    const distance = getRandomInt(5, 20); // miles
    const minutes = getRandomInt(15, 45); // time in minutes
    
    // STEP 2: Calculate speed
    // miles per minute → miles per hour (multiply by 60)
    const mph = (distance / minutes) * 60;
    
    return {
      questionText: `A messenger rode a horse from one town to another. Riding straight to the destination without stopping, the messenger traveled $${distance}$ miles in $${minutes}$ minutes. What was the average speed of the horse, to the nearest tenth of a mile per hour?`,
      figureCode: null,
      options: [],
      correctAnswer: mph.toFixed(1),
      explanation: `The correct answer is ${mph.toFixed(1)}. The average speed is the total distance divided by the total time. The total distance is $${distance}$ miles and the total time is $${minutes}$ minutes. Thus, the average speed is $\\frac{${distance}}{${minutes}}$ miles per minute. The question asks for the average speed in miles per hour, and there are 60 minutes in an hour; converting miles per minute to miles per hour gives the following: $\\frac{${distance}}{${minutes}} \\times 60 = \\frac{${distance * 60}}{${minutes}} \\approx ${mph.toFixed(2)}$ miles per hour. Therefore, to the nearest tenth of a mile per hour, the average speed of the horse was ${mph.toFixed(1)} miles per hour.`
    };
  }
};
