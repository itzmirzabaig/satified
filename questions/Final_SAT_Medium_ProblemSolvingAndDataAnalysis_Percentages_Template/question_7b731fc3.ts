import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 7b731fc3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 115, percent greater: 40%, result: 161]
 * - Difficulty factors: [Percent greater calculation]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [result = base * (1 + percent/100)]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [No figure]
 */

export const generator_7b731fc3 = {
  metadata: {
    // id: "7b731fc3",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: 40% greater than 115 = 161
    const base = getRandomInt(80, 150);
    const percent = getRandomInt(2, 5) * 10; // 20, 30, 40, 50
    
    // STEP 2: Calculate answer
    const multiplier = 1 + percent / 100;
    const result = Math.round(base * multiplier);
    
    const correctAnswer = result.toString();
    
    // STEP 3: Return question data
    return {
      questionText: `What number is ${percent}% greater than ${base}?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. For a number to be ${percent}% greater than ${base}, it follows that the number is (100% of ${base}) + (${percent}% of ${base}), which can be written as \\( \\frac{100}{100}(${base})+\\frac{${percent}}{100}(${base}) \\). This expression is equivalent to \\( 1(${base})+${percent/100}(${base}) \\), or \\( ${multiplier}(${base}) \\), which is equal to ${correctAnswer}. Therefore, ${correctAnswer} is ${percent}% greater than ${base}.`
    };
  }
};
/**
 * Question ID: e9f4521a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [part: 13, whole: 25, percent: 52]
 * - Difficulty factors: [Finding percent given part and whole]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [p = (part/whole) * 100]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [No figure]
 */
