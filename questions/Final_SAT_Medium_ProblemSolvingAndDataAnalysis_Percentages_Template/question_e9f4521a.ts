import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_e9f4521a = {
  metadata: {
    // id: "e9f4521a",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Generate values where part/whole gives clean integer percentage
    const whole = getRandomInt(10, 50);
    const percent = getRandomInt(20, 80); // Clean percentage
    const part = Math.round((percent / 100) * whole);
    
    // Ensure part is not zero and makes sense
    if (part === 0) {
      return this.generate(); // Regenerate if invalid
    }
    
    // STEP 2: Calculate answer
    const calculatedPercent = Math.round((part / whole) * 100);
    const correctAnswer = calculatedPercent.toString();
    
    // STEP 3: Return question data
    return {
      questionText: `${part} is p% of ${whole}. What is the value of p?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. It's given that ${part} is \\( p \\% \\) of ${whole}. It follows that \\( \\frac{${part}}{${whole}}=\\frac{p}{100} \\). Multiplying both sides of this equation by 100 gives \\( ${correctAnswer}=p \\). Therefore, the value of \\( p \\) is ${correctAnswer}.`
    };
  }
};
/**
 * Question ID: dccdb20c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 450, percent: 6%, result: 27]
 * - Difficulty factors: [Simple percentage of a number]
 * - Distractor patterns: [N/A - fill in blank, but format shows empty options]
 * - Constraints: [result = total * percent / 100]
 * - Question type: [Text→Fill-in-the-blank (no options shown)]
 * - Figure generation: [No figure]
 */
