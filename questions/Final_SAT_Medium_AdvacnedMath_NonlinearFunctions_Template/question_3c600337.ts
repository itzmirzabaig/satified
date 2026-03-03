import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 3c600337
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential function evaluation at x=0
 * - Number ranges: Coefficient 200-300, base 0.1
 * - Difficulty: Medium - understanding f(0) for exponential
 * - Distractor patterns: f(1) instead of f(0), calculation errors
 */

export const generator_3c600337 = {
  metadata: {
    // id: "3c600337",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const coefficient = getRandomInt(200, 300);
    const base = 0.1; // Fixed base from original
    
    const questionText = `The function $f$ is defined by $f(x)=${coefficient}(${base})^{x}$. What is the value of $f(0)$?`;
    
    const correctAnswer = coefficient.toString(); // Any number to power 0 is 1
    
    const optionsData = [
      { text: "0", isCorrect: false, reason: "incorrectly thinks anything times 0 is 0" },
      { text: "1", isCorrect: false, reason: "forgets to multiply by the coefficient" },
      { text: (coefficient * base).toString(), isCorrect: false, reason: "calculates f(1) instead of f(0)" },
      { text: correctAnswer, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. To find $f(0)$, substitute $x=0$: $f(0)=${coefficient}(${base})^{0}=${coefficient}(1)=${coefficient}$, since any non-zero number to the power of 0 equals 1. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
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
 * Question ID: 4209aefe
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential function interpretation f(5) ≈ 243
 * - Number ranges: Initial 206, growth factor 1.034, year difference 5
 * - Difficulty: Medium - interpreting function notation in context
 * - Distractor patterns: Confusing input/output, linear vs exponential thinking
 */