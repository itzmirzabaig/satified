import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 978
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [density: 230 people/mi², population: 85,100, find area]
 * - Difficulty factors: [Rearranging density formula, division of large numbers]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must result in integer answer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_978 = {
  metadata: {
    id: "978",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 230 people/mi², 85,100 people, area = 370
    const area = getRandomInt(100, 800);
    const density = getRandomInt(50, 400);
    const population = area * density; // ensures clean division
    
    return {
      questionText: `The population density of Cedar County is $${density}$ people per square mile. The county has a population of $${population.toLocaleString()}$ people. What is the area, in square miles, of Cedar County?`,
      figureCode: null,
      options: null,
      correctAnswer: area.toString(),
      explanation: `The correct answer is ${area}. It's given that the population density of Cedar County is $${density}$ people per square mile and the county has a population of $${population.toLocaleString()}$ people. Based on the population density, it follows that the area of Cedar County is $\\frac{${population.toLocaleString()} \\text{ people}}{${density} \\text{ people per square mile}}$, or ${area} square miles.`
    };
  }
};
