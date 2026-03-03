import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 98124239
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential model from two points
 * - Number ranges: Initial ~36100, final ~68071 after 13 years
 * - Difficulty: Medium - deriving exponential equation from data points
 * - Distractor patterns: Wrong initial value, decay instead of growth
 */

export const generator_98124239 = {
  metadata: {
    // id: "98124239",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // Generate realistic values for compound interest
    const initialAmount = getRandomInt(30000, 40000);
    const years = getRandomInt(10, 15);
    const growthRate = 0.05; // 5% growth
    const finalAmount = Math.round(initialAmount * Math.pow(1 + growthRate, years));
    
    const questionText = `A company opens an account with an initial balance of $${initialAmount.toLocaleString()}.00. The account earns interest, and no additional deposits or withdrawals are made. The account balance is given by an exponential function $A$, where $A(t)$ is the account balance, in dollars, $t$ years after the account is opened. The account balance after $${years}$ years is $${finalAmount.toLocaleString()}.93$. Which equation could define $A$?`;
    
    const correctAnswer = `A(t)=${initialAmount.toLocaleString()}.00(1.05)^{t}`;
    
    const wrongInitial = finalAmount - initialAmount;
    
    const optionsData = [
      { text: `A(t)=${initialAmount.toLocaleString()}.00(1.05)^{t}`, isCorrect: true },
      { text: `A(t)=${wrongInitial.toLocaleString()}.93(1.05)^{t}`, isCorrect: false, reason: "uses the difference between final and initial as initial value" },
      { text: `A(t)=${wrongInitial.toLocaleString()}.93(0.05)^{t}`, isCorrect: false, reason: "uses wrong initial value and decay instead of growth" },
      { text: `A(t)=${initialAmount.toLocaleString()}.00(0.05)^{t}`, isCorrect: false, reason: "uses decay factor instead of growth factor" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. The initial balance is $${initialAmount.toLocaleString()}, so the coefficient is ${initialAmount.toLocaleString()}.00. The growth rate is approximately 5%, giving a factor of 1.05. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
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
 * Question ID: 295175
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential decay table matching
 * - Number ranges: Initial 5, halving each step
 * - Difficulty: Medium - identifying exponential decay pattern
 */