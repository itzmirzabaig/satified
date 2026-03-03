import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 400798d6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [triangle sides: x, x, y, perimeter: 37]
 * - Difficulty factors: [Interpreting perimeter equation in geometric context]
 * - Distractor patterns: [Confusing sum with difference]
 * - Constraints: [Clear interpretation of constant]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_400798d6 = {
  metadata: {
    // id: "400798d6",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const perimeter = getRandomInt(20, 50);
    
    // STEP 2: Create options
    const optionsData = [
      { text: `The difference, in centimeters, between the lengths of sides QR and SQ`, isCorrect: false },
      { text: `The difference, in centimeters, between the lengths of sides QR and RS`, isCorrect: false },
      { text: `The sum of the lengths, in centimeters, of the three sides of the triangle`, isCorrect: true },
      { text: `The length, in centimeters, of one of the two sides of equal length`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `In triangle QRS, sides QR and RS each have a length of x centimeters and side SQ has a length of y centimeters. The equation 2x + y = ${perimeter} represents this situation. Which of the following is the best interpretation of ${perimeter} in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. The expression 2x represents the sum of lengths of sides QR and RS (both x cm). The expression y represents the length of side SQ. Therefore, 2x + y represents the sum of all three sides, which is the perimeter of the triangle. Since 2x + y = ${perimeter}, the value ${perimeter} represents the perimeter of the triangle.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-9ed4c1a2.ts
/**
 * Question ID: 9ed4c1a2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1/4, 27, 15, 7]
 * - Difficulty factors: [Distributing and combining like terms with fraction]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Clean fraction result]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */
