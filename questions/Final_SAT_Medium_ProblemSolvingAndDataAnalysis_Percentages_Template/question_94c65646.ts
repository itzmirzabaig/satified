import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 94c65646
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [part: 432, percent: 96%, whole: 450]
 * - Difficulty factors: [Finding the whole given the part and percentage]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [whole = part / (percent/100)]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [No figure]
 */

export const generator_94c65646 = {
  metadata: {
    // id: "94c65646",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: 432 is 96% of 450
    // Generate whole first, then calculate part for clean numbers
    const whole = getRandomInt(20, 50) * 10; // 200-500
    const percent = getRandomInt(85, 98); // High percentage 85-98%
    
    // Calculate part
    const part = Math.round((percent / 100) * whole);
    
    // STEP 2: Calculate answer (should match whole)
    const correctAnswer = whole.toString();
    
    // STEP 3: Return question data
    return {
      questionText: `${part} is ${percent}% of what number?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. Let x represent the number that ${part} is ${percent}% of. This can be written as \\( \\frac{${percent}}{100}x = ${part} \\), or \\( ${(percent/100).toFixed(2).replace(/^0\./, '0.')}x = ${part} \\). Dividing both sides of this equation by ${(percent/100).toFixed(2).replace(/^0\./, '0.')} yields \\( x = ${correctAnswer} \\). Therefore, ${part} is ${percent}% of ${correctAnswer}.`
    };
  }
};
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
