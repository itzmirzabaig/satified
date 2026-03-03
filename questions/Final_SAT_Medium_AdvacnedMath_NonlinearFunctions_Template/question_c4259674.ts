import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

export const generator_c4259674 = {
  metadata: {
    // id: "c4259674",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 8);
    const xVal = getRandomInt(15, 30);
    
    const result = coeff / xVal;
    
    const questionText = `The function $f$ is defined by $f(x)=${coeff}x^{-1}$. What is the value of $f(${xVal})$?`;
    
    const wrongA = -1 * coeff * xVal;
    const wrongB = 1 / (coeff * xVal);
    const wrongD = xVal / coeff;
    
    // Fixed: \\frac instead of \\\\frac
    const optionsData = [
      { text: `$${wrongA}$`, isCorrect: false, reason: `results from treating $f(x)$ as $-${coeff}x$ instead of $${coeff}x^{-1}$` },
      { text: `$\\frac{1}{${coeff * xVal}}$`, isCorrect: false, reason: `results from treating $f(x)$ as $(${coeff}x)^{-1}$ instead of $${coeff}x^{-1}$` },
      { text: `$\\frac{${coeff}}{${xVal}}$`, isCorrect: true },
      { text: `$\\frac{${xVal}}{${coeff}}$`, isCorrect: false, reason: `results from treating $f(x)$ as $(${coeff}^{-1})x$ instead of $${coeff}x^{-1}$` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    // Fixed: \\frac instead of \\\\frac
    const correctAnswer = `$\\frac{${coeff}}{${xVal}}$`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    // Fixed: \\frac instead of \\\\frac throughout
    const explanation = `Choice ${correctLetter} is correct. To find $f(${xVal})$, substitute $x = ${xVal}$ into $f(x) = ${coeff}x^{-1}$. Recall that $x^{-1} = \\frac{1}{x}$. Therefore, $f(${xVal}) = ${coeff} \\cdot \\frac{1}{${xVal}} = \\frac{${coeff}}{${xVal}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};