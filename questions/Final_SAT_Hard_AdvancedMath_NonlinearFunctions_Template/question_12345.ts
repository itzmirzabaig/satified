import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 12345
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: -2, -1, 0, 1, 2 with p(x): 5, 0, -3, -1, 0]
 * - Difficulty factors: [Factor theorem, table analysis]
 * - Distractor patterns: [A: (x-3), B: (x+3), C: (x-1)(x+2), D: (x+1)(x-2)]
 * - Constraints: [p(-1)=0 and p(2)=0 means (x+1) and (x-2) are factors]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table required]
 */

export const generator_12345 = {
  metadata: {
    // id: "12345",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const root1 = -getRandomInt(1, 3);
    const root2 = getRandomInt(2, 4);
    
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; text-align: center;">
      <thead>
        <tr>
          <th style="border: 1px solid #ccc; padding: 12px;">$x$</th>
          <th style="border: 1px solid #ccc; padding: 12px;">$p(x)$</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">${root1 - 1}</td>
          <td style="border: 1px solid #ccc; padding: 12px;">${getRandomInt(1, 10)}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">${root1}</td>
          <td style="border: 1px solid #ccc; padding: 12px;">0</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">0</td>
          <td style="border: 1px solid #ccc; padding: 12px;">${-getRandomInt(1, 5)}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">${root2}</td>
          <td style="border: 1px solid #ccc; padding: 12px;">0</td>
        </tr>
      </tbody>
    </table>`;
    
    const correctFactor = root1 >= 0 ? `(x-${root1})` : `(x+${Math.abs(root1)})`;
    const correctFactor2 = root2 >= 0 ? `(x-${root2})` : `(x+${Math.abs(root2)})`;
    
    const optionsData = [
      { text: `$(x-${root1 + root2})$`, isCorrect: false },
      { text: `$(x+${Math.abs(root1) + root2})$`, isCorrect: false },
      { text: `$(x-${root2})${correctFactor}$`, isCorrect: false },
      { text: `${correctFactor}${correctFactor2}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `The table gives selected values of a polynomial function $p$. Based on the values in the table, which of the following must be a factor of $p$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${correctFactor}${correctFactor2}$`,
      explanation: `Choice ${correctLetter} is correct. Since $p(${root1})=0$ and $p(${root2})=0$, by the Factor Theorem, ${correctFactor} and ${correctFactor2} are factors of $p$.`
    };
  }
};

/**
 * Question ID: 1530985
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [vertex (-3, 6), one x-intercept (-17/4, 0)]
 * - Difficulty factors: [Quadratic symmetry, finding other root]
 * - Distractor patterns: [A: -29/4, B: -7/4, C: 5/4, D: 17/4]
 * - Constraints: [Other root is 2×(-3) - (-17/4) = -6 + 17/4 = -7/4]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */