import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

export const generator_617 = {
  metadata: {
    id: "617",
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
      { text: `$g(x) = -${denominator}^x$`, isCorrect: false, reason: `uses the reciprocal of the correct base and includes a negative sign, so it gives a negative value of $g(x)$ for every value of $x$, but every value of $g(x)$ in the table is positive` },
      { text: `$g(x) = -\\left(${baseFraction}\\right)^x$`, isCorrect: false, reason: `includes a negative sign, so it gives a negative value of $g(x)$ for every value of $x$, but every value of $g(x)$ in the table is positive` },
      { text: `$g(x) = ${denominator}^x$`, isCorrect: false, reason: `uses the reciprocal of the correct base, which represents exponential growth, but the table shows that $g(x)$ decreases as $x$ increases; for example, this equation gives $g(1) = ${denominator}$ rather than $g(1) = ${val1}$` },
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
    const explanation = `Choice ${correctLetter} is correct. It's given that the function $g$ is exponential, so an equation defining $g$ can be written in the form $g(x) = a(b)^x$, where $a$ and $b$ are constants. The table shows that when $x = 0$, the value of $g(x)$ is 1. Substituting these values into the equation yields $a(b)^0 = 1$. Since $(b)^0 = 1$, it follows that $a = 1$, so the equation becomes $g(x) = (b)^x$. The table also shows that when $x = 1$, $g(x) = ${val1}$. Substituting these values yields $(b)^1 = ${val1}$, so $b = ${val1}$. Therefore, an equation that defines $g$ is $g(x) = \\left(${baseFraction}\\right)^x$. As a check, this equation also gives $g(-1) = ${denominator}$ and $g(2) = ${val2}$, matching the table. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};