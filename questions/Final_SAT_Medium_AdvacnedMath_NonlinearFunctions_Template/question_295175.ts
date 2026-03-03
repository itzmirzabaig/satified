import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 295175
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential decay table matching
 * - Number ranges: Initial 5, halving each step
 * - Difficulty: Medium - identifying exponential decay pattern
 */

export const generator_295175 = {
  metadata: {
    // id: "295175",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const initialValue = getRandomInt(3, 8) * 2 - 1; // Odd number 5, 7, 9, etc. or use 5 as in original
    
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">$x$</th><th style="border: 1px solid currentColor; padding: 8px;">$f(x)$</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">0</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${initialValue}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">1</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${initialValue/2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">2</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${initialValue/4}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">3</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${initialValue/8}</td></tr></tbody></table>`;
    
    const questionText = `The table above gives the values of the function $f$ for some values of $x$. Which of the following equations could define $f$?`;
    
    const correctAnswer = `$f(x)=${initialValue}\\left(2^{-x}\\right)$`;
    
    const optionsData = [
      { text: `$f(x)=${initialValue}\\left(2^{x+1}\\right)$`, isCorrect: false, reason: "represents growth, not decay" },
      { text: `$f(x)=${initialValue}\\left(2^{x}\\right)$`, isCorrect: false, reason: "represents growth, not decay" },
      { text: `$f(x)=${initialValue}\\left(2^{-(x+1)}\\right)$`, isCorrect: false, reason: "gives wrong values (half of correct at each point)" },
      { text: `$f(x)=${initialValue}\\left(2^{-x}\\right)$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. When $x=0$, $f(0)=${initialValue}(2^{0})=${initialValue}$. When $x=1$, $f(1)=${initialValue}(2^{-1})=${initialValue}/2=${initialValue/2}$. This matches the table. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer,
      explanation
    };
  }
};

/**
 * Question ID: cbc4c163
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Quadratic function vertex evaluation
 * - Number ranges: Coefficient 5, inner term (1/4 - x)², constant 11/4
 * - Difficulty: Medium - evaluating at vertex x-value
 */