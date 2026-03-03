import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



export const generator_f28944ff = {
  metadata: {
    // id: "f28944ff",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const initial = getRandomInt(4, 10) * 8;
    const base = getRandomInt(2, 4);
    
    const valNeg1 = initial / base;
    const val0 = initial;
    const val1 = initial * base;
    
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">$x$</th><th style="border: 1px solid currentColor; padding: 8px;">$q(x)$</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">-1</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${valNeg1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">0</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${val0}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">1</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${val1}</td></tr></tbody></table>`;
    
    const questionText = `Which table gives three values of $x$ and their corresponding values of $q(x)$ for function $q(x) = ${initial}(${base}^x)$?`;
    
    const optionsData = [
      { text: `$x$: -1, 0, 1; $q(x)$: -${val1}, 0, ${val1}`, isCorrect: false, reason: "incorrect negative values and zero" },
      { text: `$x$: -1, 0, 1; $q(x)$: ${valNeg1/2}, 2, ${val1}`, isCorrect: false, reason: "incorrect values for x=0 and x=-1" },
      { text: `$x$: -1, 0, 1; $q(x)$: ${valNeg1 + 100}, ${initial/4}, ${val1}`, isCorrect: false, reason: "incorrect arbitrary values" },
      { text: `$x$: -1, 0, 1; $q(x)$: ${valNeg1}, ${val0}, ${val1}`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$x$: -1, 0, 1; $q(x)$: ${valNeg1}, ${val0}, ${val1}`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. Substituting $-1$ for $x$ yields $q(-1)=${initial}(${base})^{-1} = ${valNeg1}$. Substituting $0$ yields $q(0)=${initial}(1)=${val0}$. Substituting $1$ yields $q(1)=${initial}(${base})=${val1}$. The table in Choice ${correctLetter} matches these values. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};