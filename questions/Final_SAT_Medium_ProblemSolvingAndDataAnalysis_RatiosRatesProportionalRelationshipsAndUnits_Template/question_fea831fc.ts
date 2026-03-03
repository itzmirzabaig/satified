import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: fea831fc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [distance: 11 miles, time: 26 minutes]
 * - Difficulty factors: [Speed calculation, minutes to hours conversion]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Round to nearest tenth]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_fea831fc = {
  metadata: {
    // id: "fea831fc",
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
      questionText: `On April 18, 1775, Paul Revere set off on his midnight ride from Charlestown to Lexington. If he had ridden straight to Lexington without stopping, he would have traveled $${distance}$ miles in $${minutes}$ minutes. In such a ride, what would the average speed of his horse have been, to the nearest tenth of a mile per hour?`,
      figureCode: null,
      options: null,
      correctAnswer: mph.toFixed(1),
      explanation: `The correct answer is ${mph.toFixed(1)}. The average speed is the total distance divided by the total time. The total distance is $${distance}$ miles and the total time is $${minutes}$ minutes. Thus, the average speed is $\\frac{${distance}}{${minutes}}$ miles per minute. The question asks for the average speed in miles per hour, and there are 60 minutes in an hour; converting miles per minute to miles per hour gives the following: $\\frac{${distance}}{${minutes}} \\times 60 = \\frac{${distance * 60}}{${minutes}} \\approx ${mph.toFixed(2)}$ miles per hour. Therefore, to the nearest tenth of a mile per hour, the average speed of Paul Revere's ride would have been ${mph.toFixed(1)} miles per hour.`
    };
  }
};

/**
 * Question ID: 181cc4d6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Rect A: 15×w, Rect B: 20×?, same ratio]
 * - Difficulty factors: [Proportion with geometric dimensions, algebraic manipulation]
 * - Distractor patterns: [B: w+5 (additive), C: 3/4 w (inverted ratio), D: w-5 (subtractive)]
 * - Constraints: [Must maintain aspect ratio]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/181cc4d6.ts