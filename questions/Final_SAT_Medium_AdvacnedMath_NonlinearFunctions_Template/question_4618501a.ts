import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_4618501a = {
  metadata: {
    // id: "4618501a",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const initial = getRandomInt(20, 50) * 100;
    const decayFactor = (getRandomInt(70, 85) / 100);
    const percentDecrease = Math.round((1 - decayFactor) * 100);
    
    const endValue = Math.round(initial * Math.pow(decayFactor, 8));
    
    const questionText = `A conservation scientist implemented a program to reduce the population of a certain species in an area. The function $f(x)=${initial}(${decayFactor})^{x}$ estimates this species' population $x$ years after 2008, where $x \\\\leq 8$. Which of the following is the best interpretation of ${initial} in this context?`;
    
    const optionsData = [
      { text: `The estimated percent decrease in the population for this species and area every 8 years after 2008`, isCorrect: false, reason: `the percent decrease over 8 years would be approximately ${Math.round((1 - Math.pow(decayFactor, 8)) * 100)}%, not ${initial}` },
      { text: `The estimated percent decrease in the population for this species and area each year after 2008`, isCorrect: false, reason: `the estimated percent decrease each year is ${percentDecrease}%, not ${initial}` },
      { text: `The estimated population for this species and area 8 years after 2008`, isCorrect: false, reason: `the estimated population 8 years after 2008 would be approximately ${endValue}, not ${initial}` },
      { text: `The estimated initial population for this species and area in 2008`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `The estimated initial population for this species and area in 2008`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. Substituting 0 for $x$ in the given equation yields $f(0)=${initial}(${decayFactor})^{0}=${initial}(1)=${initial}$. It's given that the function estimates the species' population $x$ years after 2008, so the estimated population in 2008 (when $x=0$) is ${initial}. Therefore, the best interpretation of ${initial} is the estimated initial population in 2008. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};