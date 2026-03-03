import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 0aaef7aa
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Cubic function solve for input
 * - Number ranges: Coefficient 7, p(n)=56, find n
 * - Difficulty: Medium - solving cubic equation
 */

export const generator_0aaef7aa = {
  metadata: {
    // id: "0aaef7aa",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const coefficient = getRandomInt(3, 10);
    const nValue = getRandomInt(2, 4);
    const targetValue = coefficient * Math.pow(nValue, 3);
    
    const questionText = `The function $p$ is defined by $p(n) = ${coefficient}n^3$. What is the value of $n$ when $p(n)$ is equal to $${targetValue}$?`;
    
    const correctAnswer = nValue.toString();
    
    const optionsData = [
      { text: nValue.toString(), isCorrect: true },
      { text: (targetValue / coefficient).toString(), isCorrect: false, reason: "divides but forgets to take cube root" },
      { text: coefficient.toString(), isCorrect: false, reason: "returns the coefficient instead of solving" },
      { text: (nValue + 5).toString(), isCorrect: false, reason: "makes arithmetic error" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Set $p(n) = ${targetValue}$: ${coefficient}n^3 = ${targetValue}$. Divide by ${coefficient}: $n^3 = ${targetValue/coefficient}$. Take the cube root: $n = \\sqrt[3]{${targetValue/coefficient}} = ${nValue}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
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
 * Question ID: b7cd6ca6
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential function initial value interpretation
 * - Number ranges: Initial 65, growth 1.03, year 8, value ~82
 * - Difficulty: Medium - interpreting initial value in context
 */