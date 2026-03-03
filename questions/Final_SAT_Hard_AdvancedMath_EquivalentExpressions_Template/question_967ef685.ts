import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 967ef685
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [single fraction addition]
 * - Difficulty factors: [Common denominator, factoring, combining terms]
 * - Distractor patterns: [Adding denominators, wrong factoring, forgetting to multiply second term]
 * - Constraints: [k > 0]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_967ef685 = {
  metadata: {
    // id: "967ef685",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const n = getRandomInt(30, 50);
    const a = getRandomInt(1, 5);
    
    // STEP 2: Create options
    const correctAnswer = `\\frac{${n}a(k^{2}+1)}{k}`;
    
    const optionsData = [
      { text: `\\frac{${2 * n}a}{k}`, isCorrect: false, reason: "this would be equivalent to $\\frac{${n}a}{k} + \\frac{${n}a}{k}$" },
      { text: `\\frac{${2 * n}ak^{2}}{k}`, isCorrect: false, reason: "results from conceptual errors in handling the variable terms" },
      { text: `\\frac{${n}a(k+1)}{k}`, isCorrect: false, reason: "this would be equivalent to $\\frac{${n}a}{k} + ${n}a$" },
      { text: correctAnswer, isCorrect: true }
    ];
    
    // STEP 3: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Question text
    const questionText = `Which expression is equivalent to $\\frac{${n}a}{k} + ${n}ak$, where $k > 0$?`;
    
    // STEP 5: Explanation
    const explanation = `Choice ${correctLetter} is correct. To add these terms, rewrite them with a common denominator.

Since $\\frac{k}{k} = 1$, multiply the second term by $\\frac{k}{k}$:
$$${n}ak \\cdot \\frac{k}{k} = \\frac{${n}ak^{2}}{k}$$

Now add:
$$\\frac{${n}a}{k} + \\frac{${n}ak^{2}}{k} = \\frac{${n}a + ${n}ak^{2}}{k}$$

Factor out ${n}a from the numerator:
$$\\frac{${n}a(1 + k^{2})}{k} = \\frac{${n}a(k^{2}+1)}{k}$$

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 2c88af4d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [negative and fractional exponents]
 * - Difficulty factors: [Exponent rules, combining exponents, converting back to radicals]
 * - Distractor patterns: [Wrong exponent arithmetic, wrong radical conversion, sign errors]
 * - Constraints: [x > 1, y > 1]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */