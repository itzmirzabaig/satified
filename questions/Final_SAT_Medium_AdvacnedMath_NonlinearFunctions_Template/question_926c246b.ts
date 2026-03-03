import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_926c246b = {
  metadata: {
    // id: "926c246b",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const initial = getRandomInt(30, 80) * 100;
    const growthRate = getRandomInt(70, 95);
    const growthFactor = 1 + growthRate / 100;
    
    const questionText = `The equation $D = ${initial}(${growthFactor.toFixed(1)})^t$ estimates the global data traffic $D$, in terabytes, for the year that is $t$ years after 2010. What is the best interpretation of the number ${initial} in this context?`;
    
    const optionsData = [
      { text: `The estimated amount of increase of data traffic, in terabytes, each year`, isCorrect: false, reason: "since the equation is exponential, the amount of increase each year is not constant" },
      { text: `The estimated percent increase in the data traffic, in terabytes, each year`, isCorrect: false, reason: `the percent increase each year is ${growthRate}%, not ${initial}` },
      { text: `The estimated data traffic, in terabytes, for the year that is $t$ years after 2010`, isCorrect: false, reason: "the estimated data traffic is represented by $D$, not the number ${initial}" },
      { text: `The estimated data traffic, in terabytes, in 2010`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `The estimated data traffic, in terabytes, in 2010`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. Since $t$ represents the number of years after 2010, the estimated data traffic in 2010 can be calculated when $t=0$. Substituting 0 for $t$ in the given equation yields $D=${initial}(${growthFactor.toFixed(1)})^{0}=${initial}(1)=${initial}$. Thus, ${initial} represents the estimated data traffic in 2010. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};