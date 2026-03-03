import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 43926bd9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(1)=a, f(2)=a^5, f(3)=a^9, f(k)=a^29]
 * - Difficulty factors: [Exponential pattern recognition, solving for k]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Pattern: f(x) = a^(4x-3), so 4k-3=29, k=8]
 * - Question type: [Table→Fill-in-the-blank]
 * - Figure generation: [HTML Table required]
 */

export const generator_43926bd9 = {
  metadata: {
    // id: "43926bd9",
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
    
    const target = start + 7 * diff;
    
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
          <td style="border: 1px solid #ccc; padding: 12px;">$a^{${f1_exp}}$</td>
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
    
    const k = (target - start) / diff + 1;
    
    return {
      questionText: `For exponential $f$, the table shows values where $a>1$. If $f(k)=a^{${target}}$, what is $k$?`,
      figureCode: tableCode,
      options: null,
      correctAnswer: k.toString(),
      explanation: `The pattern shows $f(x)=a^{${start}+${diff}(x-1)}=a^{${diff}x+${start-diff}}$. Setting ${diff}k+${start-diff}=${target}$ gives $k=${k}$.`
    };
  }
};

/**
 * Question ID: f25a34aa
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area = x², base = 2x+22, height = x-10]
 * - Difficulty factors: [Triangle area, quadratic equation]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must solve ½(2x+22)(x-10) = x²]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */