import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 7b52985c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [point1: (2, 6), point2: (4, 15), rate: 4.5]
 * - Difficulty factors: [Calculating rate of change from two points, interpreting in context]
 * - Constraints: [Average rate of change = (y2-y1)/(x2-x1)]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Simple scatter plot with two labeled points]
 */

export const generator_7b52985c = {
  metadata: {
    // id: "7b52985c",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Use while loop instead of recursion to ensure valid values
    let attempts = 0;
    const maxAttempts = 100;
    
    while (attempts < maxAttempts) {
      // STEP 1: Generate random values
      const x1 = getRandomInt(1, 5);
      const x2 = x1 + getRandomInt(2, 4); // ensure difference of 2-4
      
      const y1 = getRandomInt(3, 12);
      // Calculate y2 such that we get a clean rate (halves or integers)
      const rateOptions = [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5];
      const rate = getRandomElement(rateOptions);
      const y2 = y1 + rate * (x2 - x1);
      
      // Ensure y2 is reasonable
      if (y2 <= 50 && y2 >= 0) {
        // Randomize base date
        const baseDay = getRandomInt(5, 15);
        const date1 = `January ${baseDay + x1}`;
        const date2 = `January ${baseDay + x2}`;
        
        // STEP 2: Calculate viewBox bounds
        const xMin = x1 - 1;
        const xMax = x2 + 1;
        const yMin = Math.min(y1, y2) - 2;
        const yMax = Math.max(y1, y2) + 2;
        
        // STEP 3: Build Mafs code
        const mafsCode = null;
        
        // STEP 4: Calculate answer
        const answer = (y2 - y1) / (x2 - x1);
        const answerFraction = `${y2 - y1}/${x2 - x1}`;
        
        // STEP 5: Return question data (fill-in-the-blank)
        return {
          questionText: `The scatterplot shows the relationship between the length of time, in hours, a certain bird spent in flight and the number of days after January ${baseDay}.

What is the average rate of change, in hours per day, of the length of time the bird spent in flight on ${date1} to the length of time the bird spent in flight on ${date2}?`,
          figureCode: null,
          options: null, // Fill-in-the-blank
          correctAnswer: answer % 1 === 0 ? answer.toString() : `${answer}, ${answerFraction}`,
          explanation: `${date1} is ${x1} days after Jan ${baseDay} ($x=${x1}$), and flight time is ${y1} hours. ${date2} is ${x2} days after Jan ${baseDay} ($x=${x2}$), and flight time is ${y2} hours. The average rate of change is $\\\\frac{${y2}-${y1}}{${x2}-${x1}} = \\\\frac{${y2 - y1}}{${x2 - x1}} = ${answer}$.`
        };
      }
      
      attempts++;
    }
    
    // Fallback if max attempts reached (shouldn't happen with these constraints)
    throw new Error('Failed to generate valid values for generator_7b52985c');
  }
};

/**
 * Question ID: d0430601
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 57, temperature increase: 5, answer: 285]
 * - Difficulty factors: [Interpreting slope as rate per unit, scaling to different interval]
 * - Constraints: [slope = visitors per degree, multiply by 5 for 5 degrees]
 * - Question type: [Figure→Fill-in-the-blank (grid-in)]
 * - Figure generation: [Scatter plot with line of best fit]
 */