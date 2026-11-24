import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1111
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(1)=a, f(2)=a^5, f(3)=a^9, f(k)=a^29]
 * - Difficulty factors: [Exponential pattern recognition, solving for k]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Pattern: f(x) = a^(4x-3), so 4k-3=29, k=8]
 * - Question type: [Table→Fill-in-the-blank]
 * - Figure generation: [HTML Table required]
 */

export const generator_1111 = {
  metadata: {
    id: "1111",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const start = getRandomInt(1, 4);
    const diff = getRandomInt(3, 6);
    
    const f1_exp = start;
    const f2_exp = start + diff;
    const f3_exp = start + 2 * diff;
    
    // Previously k was always 8 and the table could show a^{1}; k now varies and a^1 prints as a.
    const answerK = getRandomInt(5, 10);
    const target = start + (answerK - 1) * diff;
    const power = (e: number) => (e === 1 ? 'a' : `a^{${e}}`);

    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; text-align: center;">
      <thead>
        <tr>
          <th style="border: 1px solid #ccc; padding: 12px;">$x$</th>
          <th style="border: 1px solid #ccc; padding: 12px;">$f(x)$</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">1</td>
          <td style="border: 1px solid #ccc; padding: 12px;">$${power(f1_exp)}$</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">2</td>
          <td style="border: 1px solid #ccc; padding: 12px;">$a^{${f2_exp}}$</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">3</td>
          <td style="border: 1px solid #ccc; padding: 12px;">$a^{${f3_exp}}$</td>
        </tr>
      </tbody>
    </table>`;
    
    const k = answerK;

    // Expanded exponent is diff*x + b, where b = start - diff.
    // Format the constant term with a proper leading sign (or omit when 0).
    const b = start - diff;
    const bTerm = b > 0 ? ` + ${b}` : b < 0 ? ` - ${Math.abs(b)}` : ``;

    return {
      questionText: `The table shows three values of $x$ and their corresponding values of $f(x)$ for the exponential function $f$, where $a$ is a constant greater than 1. If $f(k)=a^{${target}}$, what is the value of $k$?`,
      figureCode: tableCode,
      options: [],
      correctAnswer: k.toString(),
      explanation: `The correct answer is ${k}. The exponents increase by ${diff} each time $x$ increases by 1, so $f(x)=a^{${diff}(x-1)+${start}}=a^{${diff}x${bTerm}}$. Since $f(k)=a^{${target}}$ and $a>1$, the exponents must be equal, so $${diff}k${bTerm}=${target}$. ${b === 0 ? '' : `This gives $${diff}k=${target - b}$. `}Dividing both sides by ${diff} gives $k=${k}$.`
    };
  }
};
