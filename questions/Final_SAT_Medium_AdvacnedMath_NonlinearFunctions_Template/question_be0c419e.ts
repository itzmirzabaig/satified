import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

export const generator_be0c419e = {
  metadata: {
    // id: "be0c419e",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const initial = getRandomInt(4, 10) * 10;
    const rate = getRandomInt(2, 5);
    const growthFactor = 1 + rate/100;
    const time = getRandomInt(5, 12);
    const finalValue = Math.round(initial * Math.pow(growthFactor, time));
    
    // Fixed: \\leq instead of \\\\leq
    const questionText = `Immanuel purchased a certain rare coin on January 1. The function $f(x)=${initial}(${growthFactor.toFixed(2)})^{x}$, where $0 \\leq x \\leq 10$, gives the predicted value, in dollars, of the rare coin $x$ years after Immanuel purchased it. What is the best interpretation of the statement "$f(${time})$ is approximately equal to ${finalValue}" in this context?`;
    
    const optionsData = [
      { text: `When the rare coin's predicted value is approximately $${finalValue}$ dollars, it is greater than the predicted value, in dollars, on January 1 of the previous year.`, isCorrect: false, reason: "this describes a comparison, not what the function notation means" },
      { text: `When the rare coin's predicted value is approximately $${finalValue}$ dollars, it is ${growthFactor.toFixed(2)} times the predicted value, in dollars, on January 1 of the previous year.`, isCorrect: false, reason: "this describes a growth calculation, not what f(time) represents" },
      { text: `From the day Immanuel purchased the rare coin to ${time} years after Immanuel purchased the coin, its predicted value increased by a total of approximately $${finalValue - initial}$ dollars.`, isCorrect: false, reason: "this describes the total increase, not the value at a specific time" },
      { text: `${time} years after Immanuel purchased the rare coin, its predicted value is approximately $${finalValue}$ dollars.`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `${time} years after Immanuel purchased the rare coin, its predicted value is approximately $${finalValue}$ dollars.`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The function $f(x)=${initial}(${growthFactor.toFixed(2)})^{x}$ gives the predicted value $x$ years after purchase. The value $f(${time})$ represents the predicted value when $x=${time}$. Therefore, the statement means that ${time} years after Immanuel purchased the rare coin, its predicted value is approximately $${finalValue}$ dollars. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};