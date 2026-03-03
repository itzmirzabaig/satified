import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: b7cd6ca6
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential function initial value interpretation
 * - Number ranges: Initial 65, growth 1.03, year 8, value ~82
 * - Difficulty: Medium - interpreting initial value in context
 */

export const generator_b7cd6ca6 = {
  metadata: {
    // id: "b7cd6ca6",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const initialValue = getRandomInt(50, 80);
    const growthRate = 1 + (getRandomInt(2, 5) / 100); // 1.02 to 1.05
    const years = getRandomInt(5, 12);
    const finalValue = Math.round(initialValue * Math.pow(growthRate, years));
    
    const questionText = `Immanuel purchased a certain rare coin on January 1. The function $f(x)=${initialValue}(${growthRate.toFixed(2)})^{x}$, where $0 \\leq x \\leq 10$, gives the predicted value, in dollars, of the rare coin $x$ years after Immanuel purchased it. What is the best interpretation of the statement "$f(${years})$ is approximately equal to ${finalValue}$" in this context?`;
    
    const correctAnswer = `${years} years after Immanuel purchased the rare coin, its predicted value is approximately $${finalValue}.`;
    
    const optionsData = [
      { text: `When the rare coin's predicted value is approximately $${finalValue}, it is greater than the predicted value, in dollars, on January 1 of the previous year.`, isCorrect: false, reason: "misinterprets the function input and output relationship" },
      { text: `When the rare coin's predicted value is approximately $${finalValue}, it is ${years} times the predicted value, in dollars, on January 1 of the previous year.`, isCorrect: false, reason: "confuses the input x with a multiplicative factor" },
      { text: `From the day Immanuel purchased the rare coin to ${years} years after Immanuel purchased the coin, its predicted value increased by a total of approximately $${finalValue}.`, isCorrect: false, reason: "interprets the final value as the increase rather than the total value" },
      { text: `${years} years after Immanuel purchased the rare coin, its predicted value is approximately $${finalValue}.`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. The function $f(x)$ gives the value $x$ years after purchase. So $f(${years}) \\approx ${finalValue}$ means that after ${years} years, the value is approximately $${finalValue}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
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
 * Question ID: 0af701e7
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Absolute value function with solving
 * - Number ranges: f(x) = |x - 4x| = |-3x| = 3|x|
 * - Difficulty: Medium - simplifying absolute value and solving
 */