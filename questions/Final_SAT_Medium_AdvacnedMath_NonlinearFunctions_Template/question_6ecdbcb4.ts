import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



export const generator_6ecdbcb4 = {
  metadata: {
    // id: "6ecdbcb4",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const r1 = -1 * getRandomInt(4, 8);
    const r2 = -1 * getRandomInt(2, 3);
    const r3 = getRandomInt(2, 6);
    const shift = getRandomInt(2, 5);
    
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">$x$</th><th style="border: 1px solid currentColor; padding: 8px;">$y$</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${r1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">-${shift}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${r2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">-${shift}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${r3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">-${shift}</td></tr></tbody></table>`;
    
    const sign1 = r1 >= 0 ? '-' : '+';
    const sign2 = r2 >= 0 ? '-' : '+';
    const sign3 = r3 >= 0 ? '-' : '+';
    
    const questionText = `The function $f$ is given by $f(x)=(x${sign1}${Math.abs(r1)})(x${sign2}${Math.abs(r2)})(x${sign3}${Math.abs(r3)})$. Which table of values represents $y=f(x)-${shift}$?`;
    
    return {
      questionText: questionText,
      figureCode: tableCode,
      options: null,
      correctAnswer: `The table with all y-values equal to -${shift}`,
      explanation: `Given $f(x)=(x${sign1}${Math.abs(r1)})(x${sign2}${Math.abs(r2)})(x${sign3}${Math.abs(r3)})$, then $y=f(x)-${shift} = (x${sign1}${Math.abs(r1)})(x${sign2}${Math.abs(r2)})(x${sign3}${Math.abs(r3)})-${shift}$. At $x=${r1}$, $x=${r2}$, or $x=${r3}$, we have $f(x)=0$, so $y=0-${shift}=-${shift}$. The correct table shows $y=-${shift}$ at all three x-values.`
    };
  }
};