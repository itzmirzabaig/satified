import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



export const generator_6205421d = {
  metadata: {
    // id: "6205421d",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const baseNum = getRandomInt(12, 20);
    const base = baseNum / 10;
    const c = getRandomInt(20, 50);
    
    const altA_coef = Math.round((c / base) * 100) / 100;
    const altB_coef = Math.round((c * base) * 100) / 100;
    const altC_coef = Math.round((c * base * base) * 100) / 100;
    
    const questionText = `For the exponential function $f$, the value of $f(0)$ is $c$, where $c$ is a constant. Of the following equations that define the function $f$, which equation shows the value of $c$ as the coefficient?`;
    
    const optionsData = [
      { text: `$f(x)=${altA_coef.toFixed(2).replace(/\.00$/, '')}(${base.toFixed(1)})^{x+1}$`, isCorrect: false, reason: "while equivalent, the coefficient is not c" },
      { text: `$f(x)=${c}(${base.toFixed(1)})^x$`, isCorrect: true },
      { text: `$f(x)=${altB_coef.toFixed(2).replace(/\.00$/, '')}(${base.toFixed(1)})^{x-1}$`, isCorrect: false, reason: "while equivalent, the coefficient is not c" },
      { text: `$f(x)=${altC_coef.toFixed(2).replace(/\.00$/, '')}(${base.toFixed(1)})^{x-2}$`, isCorrect: false, reason: "while equivalent, the coefficient is not c" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$f(x)=${c}(${base.toFixed(1)})^x$`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. First, we find $c = f(0)$ using any of the equations. Testing with the form in choice ${correctLetter}: $f(0) = ${c}(${base.toFixed(1)})^0 = ${c}(1) = ${c}$. So $c = ${c}$. The question asks which equation shows this value as the coefficient. Only choice ${correctLetter} has ${c} as the coefficient of the exponential term. The other equations are mathematically equivalent (representing horizontal shifts), but their coefficients are not equal to $c$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};