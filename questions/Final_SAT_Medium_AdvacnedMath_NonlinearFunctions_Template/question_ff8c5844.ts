import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

export const generator_ff8c5844 = {
  metadata: {
    // id: "ff8c5844",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const denominator = getRandomInt(2, 6);
    // Use single backslash - will be properly escaped when inserted
    const baseFraction = `\\frac{1}{${denominator}}`;
    
    const valNeg1 = denominator;
    const val0 = 1;
    const val1 = `\\frac{1}{${denominator}}`;
    const val2 = `\\frac{1}{${denominator * denominator}}`;
    
    // Wrap fractions in $...$ for math mode in table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">$x$</th><th style="border: 1px solid currentColor; padding: 8px;">$g(x)$</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">-1</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${valNeg1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">0</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${val0}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">1</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${val1}$</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">2</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${val2}$</td></tr></tbody></table>`;
    
    const questionText = `For the exponential function $g$, the table shows four values of $x$ and their corresponding values of $g(x)$. Which equation defines $g$?`;
    
    const optionsData = [
      { text: `$g(x) = -${denominator}^x$`, isCorrect: false, reason: "incorrectly adds a negative sign in front of the base" },
      { text: `$g(x) = -\\left(${baseFraction}\\right)^x$`, isCorrect: false, reason: "incorrectly adds a negative sign in front of the base" },
      { text: `$g(x) = ${denominator}^x$`, isCorrect: false, reason: "uses the reciprocal base, which would represent growth instead of decay" },
      { text: `$g(x) = \\left(${baseFraction}\\right)^x$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$g(x) = \\left(${baseFraction}\\right)^x$`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. It's given that function $g$ is exponential. Therefore, an equation defining $g$ can be written in the form $g(x) = a(b)^x$, where $a$ and $b$ are constants. The table shows that when $x=0$, $g(x) = 1$. Substituting $0$ for $x$ and $1$ for $g(x)$ yields $1 = a(b)^0$, which is equivalent to $1 = a$. Substituting $1$ for $a$ yields $g(x) = (b)^x$. The table also shows that when $x=1$, $g(x) = $${val1}$. Substituting $1$ for $x$ and $${val1}$ for $g(x)$ yields $${val1} = (b)^1$, which is equivalent to $${val1} = b$. Substituting $${val1}$ for $b$ yields $g(x) = \\left(${baseFraction}\\right)^x$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};