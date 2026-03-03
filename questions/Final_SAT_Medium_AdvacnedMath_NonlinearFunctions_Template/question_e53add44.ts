import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_e53add44 = {
  metadata: {
    // id: "e53add44",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const rate = getRandomInt(3, 8);
    const rateDecimal = rate / 100;
    const growthFactor = 1 + rateDecimal;
    
    const questionText = `The function $S$ models the annual salary, in dollars, of an employee $n$ years after starting a job, where $a$ is a constant. If the employee's salary increases by ${rate}\\% each year, what is the value of $a$?`;
    
    const optionsData = [
      { text: `$${rateDecimal.toFixed(2).replace(/^0\./, '0.')}$`, isCorrect: false, reason: "this is the growth rate $r$ itself, not the growth factor $1+r$" },
      { text: `$${(rateDecimal * 10).toFixed(1)}$`, isCorrect: false, reason: "results from a decimal point error" },
      { text: `$${growthFactor.toFixed(2)}$`, isCorrect: true },
      { text: `$${(1 + rate/10).toFixed(1)}$`, isCorrect: false, reason: `this would represent a ${rate * 10}% increase, not ${rate}%` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `${growthFactor.toFixed(2)}`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The general form of an exponential growth function is $y = P(1 + r)^t$, where $r$ is the growth rate as a decimal. Here, the growth rate is ${rate}\\\\% = ${rateDecimal.toFixed(2).replace(/^0\./, '0.')}$. The growth factor (the constant $a$) is $1 + r = 1 + ${rateDecimal.toFixed(2).replace(/^0\./, '0.')} = ${growthFactor.toFixed(2)}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};