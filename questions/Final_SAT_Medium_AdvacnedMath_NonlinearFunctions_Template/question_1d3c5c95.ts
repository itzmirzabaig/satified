import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



export const generator_1d3c5c95 = {
  metadata: {
    // id: "1d3c5c95",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const initial = getRandomInt(20, 80) * 100;
    const decayBase = (getRandomInt(70, 90) / 100);
    const percentDecrease = Math.round((1 - decayBase) * 100);
    
    const endValue = Math.round(initial * Math.pow(decayBase, 7));
    
    const questionText = `An entomologist recommended a program to reduce a certain invasive beetle population in an area. The function $f(x)=${initial}(${decayBase})^{x}$ estimates this beetle species' population $x$ years after 2012, where $x \\\\leq 7$. Which of the following is the best interpretation of ${initial} in this context?`;
    
    const optionsData = [
      { text: `The estimated initial beetle population for this species and area in 2012`, isCorrect: true },
      { text: `The estimated beetle population for this species and area 7 years after 2012`, isCorrect: false, reason: `the estimated population 7 years after 2012 would be approximately ${endValue}, not ${initial}` },
      { text: `The estimated percent decrease in the beetle population for this species and area each year after 2012`, isCorrect: false, reason: `the estimated percent decrease each year is ${percentDecrease}%, not ${initial}` },
      { text: `The estimated percent decrease in the beetle population for this species and area every 7 years after 2012`, isCorrect: false, reason: `the estimated percent decrease over 7 years would be approximately ${Math.round((1 - Math.pow(decayBase, 7)) * 100)}%, not ${initial}` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `The estimated initial beetle population for this species and area in 2012`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. For an exponential function in the form $f(x)=a(b)^{x}$, where $a$ and $b$ are positive constants and $b<1$, the initial value of $f(x)$, or the value of $f(x)$ when $x=0$, is $a$. In the function $f(x)=${initial}(${decayBase})^{x}$, substituting $x=0$ yields $f(0)=${initial}(${decayBase})^{0}=${initial}(1)=${initial}$. Therefore, the best interpretation of ${initial} is the estimated initial beetle population in 2012. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};