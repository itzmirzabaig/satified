import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 937
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 115, percent greater: 40%, result: 161]
 * - Difficulty factors: [Percent greater calculation]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [result = base * (1 + percent/100)]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [No figure]
 */

export const generator_937 = {
  metadata: {
    id: "937",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: 40% greater than 115 = 161
    // Base is a multiple of 10 so that base * (1 + percent/100) is always an
    // exact integer for every percent in {20,30,40,50} (grid-in must be exact).
    const base = getRandomInt(8, 15) * 10; // 80, 90, ..., 150
    const percent = getRandomInt(2, 5) * 10; // 20, 30, 40, 50

    // STEP 2: Calculate answer with integer arithmetic.
    // base and percent are both multiples of 10, so the increase
    // (base/10) * (percent/10) is an exact integer — no float artifacts.
    const multiplier = 1 + percent / 100; // 1.2, 1.3, 1.4, 1.5 (display only)
    const increase = (base / 10) * (percent / 10);
    const result = base + increase; // exact integer

    const correctAnswer = result.toString();
    
    // STEP 3: Return question data
    return {
      questionText: `What number is ${percent}% greater than ${base}?`,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. For a number to be ${percent}% greater than ${base}, it follows that the number is (100% of ${base}) + (${percent}% of ${base}), which can be written as \\( \\frac{100}{100}(${base})+\\frac{${percent}}{100}(${base}) \\). This expression is equivalent to \\( 1(${base})+${percent/100}(${base}) \\), or \\( ${multiplier}(${base}) \\), which is equal to ${correctAnswer}. Therefore, ${correctAnswer} is ${percent}% greater than ${base}.`
    };
  }
};
