import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 732
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [1991: 57, 2011: 224, find 2015]
 * - Difficulty factors: [Linear extrapolation over time]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - multi-step calculation]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */

export const generator_732 = {
  metadata: {
    id: "732",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Start year: 1990-2000
    const startYear = getRandomInt(1990, 2000);
    // Mid year: startYear + 15-25
    const midYear = startYear + getRandomInt(15, 25);
    // End year: midYear + 3-6
    const endYear = midYear + getRandomInt(3, 6);
    
    // Populations
    const startPop = getRandomInt(40, 80);
    const midPop = getRandomInt(180, 280);
    // Calculate rate
    const yearsDiff = midYear - startYear;
    const popDiff = midPop - startPop;
    const rate = popDiff / yearsDiff;
    
    // Calculate end population
    const endPop = Math.round(midPop + rate * (endYear - midYear));
    
    // STEP 2: Return question data
    return {
      questionText: `A linear model estimates the population of a city from ${startYear} to ${endYear}. The model estimates the population was ${startPop} thousand in ${startYear}, ${midPop} thousand in ${midYear}, and $x$ thousand in ${endYear}. To the nearest whole number, what is the value of $x$?`,
      figureCode: null,
      options: [],
      correctAnswer: endPop.toString(),
      explanation: `The rate of change is $\\frac{${midPop} - ${startPop}}{${midYear} - ${startYear}} = \\frac{${popDiff}}{${yearsDiff}} = ${rate.toFixed(2)}$ thousand per year. From ${midYear} to ${endYear} is ${endYear - midYear} years, so the increase is ${rate.toFixed(2)} × ${endYear - midYear} = ${(rate * (endYear - midYear)).toFixed(2)}. Thus $x = ${midPop} + ${Math.round(rate * (endYear - midYear))} = ${endPop}$.`
    };
  }
};
