import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: ce314070
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 4, constant: -1/2, right side: -5]
 * - Difficulty factors: [Manipulating equation to target expression, working with fractions]
 * - Distractor patterns: [A is wrong sign, B is miscalculation, C is half of right side]
 * - Constraints: [Target expression 8x-1 is exactly 2×(4x - 1/2)]
 * - Question type: [Multiple Choice Text]
 */

export const generator_ce314070 = {
  metadata: {
    // id: "ce314070",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation of form ax - b = c where we want 2a*x - 2b
    const a = getRandomInt(2, 6);
    const b = getRandomInt(1, 4);
    const c = getRandomInt(-8, -2);
    
    // Target is 2*(ax - b) = 2ax - 2b
    const targetValue = 2 * c;
    
    // Distractors
    const distractorA = Math.abs(targetValue) / 2;
    const distractorB_num = -2 * a - 1;
    const distractorB = `\\(-\\frac{${Math.abs(distractorB_num)}}{${2*a}}\\)`;
    const distractorC = (c / 2).toFixed(1);
    
    const correctText = `${targetValue}`;
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false },
      { text: distractorB, isCorrect: false },
      { text: `$${distractorC}$`, isCorrect: false },
      { text: `$${targetValue}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    
    return {
      questionText: `If $${a}x-\\frac{1}{${2}}=${c}$, what is the value of $${2*a}x-1$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Notice that the expression $${2*a}x-1$ is exactly $2$ times the left-hand side of the given equation: $2 \\cdot (${a}x - \\frac{1}{${2}}) = ${2*a}x - 1$. Therefore, multiply both sides of the original equation by $2$: $2 \\cdot (${a}x-\\frac{1}{${2}}) = 2 \\cdot (${c})$, which gives $${2*a}x - 1 = ${targetValue}$.`
    };
  }
};

/**
 * Question ID: feb78194
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [revenue per unit: 14, expenses: 112, profit: 406]
 * - Difficulty factors: [Word problem, profit equation setup]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Profit = Revenue - Expenses, solve for quantity]
 * - Question type: [Fill-in-the-blank]
 */