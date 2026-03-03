import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 99269e03
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential function table evaluation
 * - Number ranges: Small integers (1-3 for x, resulting y values 11-35)
 * - Difficulty: Medium - requires evaluating exponential function
 * - Distractor patterns: Calculation errors, wrong exponent operations
 */

export const generator_99269e03 = {
  metadata: {
    // id: "99269e03",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // Generate base and shift for y = a(2^x) + b
    const a = getRandomInt(2, 5);
    const b = getRandomInt(1, 5);
    
    // Calculate values for x = 1, 2, 3
    const x1 = 1, y1 = a * Math.pow(2, 1) + b;
    const x2 = 2, y2 = a * Math.pow(2, 2) + b;
    const x3 = 3, y3 = a * Math.pow(2, 3) + b;
    
    const questionText = `The table shows three values of $x$ and their corresponding values of $y$ for the equation $y=${a}(2)^{x}+${b}$. In the table, $a$ is a constant. What is the value of $a$ when $x=3$?`;
    
    const correctAnswer = y3.toString();
    
    // Create distractors based on common errors
    const distractor1 = (a * Math.pow(2, 3)).toString(); // Forgot to add b
    const distractor2 = (a + b).toString(); // Added instead of multiplied
    const distractor3 = (Math.pow(2, 3) + b).toString(); // Forgot coefficient a
    
    const optionsData = [
      { text: (y3 + 32).toString(), isCorrect: false, reason: "adds extra value" },
      { text: distractor1, isCorrect: false, reason: "forgets to add the constant term" },
      { text: distractor2, isCorrect: false, reason: "incorrectly adds instead of multiplying" },
      { text: correctAnswer, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Substituting $x=3$ into $y=${a}(2)^{x}+${b}$: $y=${a}(2)^{3}+${b}=${a}(8)+${b}=${a*8}+${b}=${y3}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer,
      explanation
    };
  }
};

/**
 * Question ID: e1391dd6
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential growth (Moore's Law)
 * - Number ranges: Years 1985-1994, doubling every 2 years
 * - Difficulty: Medium - requires understanding doubling time
 * - Distractor patterns: Wrong year calculation, incorrect doubling periods
 */