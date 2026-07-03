import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1089
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: -2, -1, 0, 1, 2 with p(x): 5, 0, -3, -1, 0]
 * - Difficulty factors: [Factor theorem, table analysis]
 * - Distractor patterns: [A: (x-3), B: (x+3), C: (x-1)(x+2), D: (x+1)(x-2)]
 * - Constraints: [p(-1)=0 and p(2)=0 means (x+1) and (x-2) are factors]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table required]
 */

export const generator_1089 = {
  metadata: {
    id: "1089",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // p has zeros at x = -a (negative) and x = b (positive), shown in the table.
    const a = getRandomInt(1, 3);
    let b = getRandomInt(2, 4);
    let tries = 0;
    while (b === a && tries++ < 50) {
      b = getRandomInt(2, 4);
    }
    if (b === a) b = a + 1; // deterministic fallback; a <= 3 keeps b in [3, 4]

    const root1 = -a;
    const root2 = b;
    const pAtLeft = getRandomInt(1, 10); // p(root1 - 1), nonzero
    const pAtZero = -getRandomInt(1, 5); // p(0), nonzero

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
          <td style="border: 1px solid #ccc; padding: 12px;">${pAtLeft}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">${root1}</td>
          <td style="border: 1px solid #ccc; padding: 12px;">0</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">0</td>
          <td style="border: 1px solid #ccc; padding: 12px;">${pAtZero}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">${root2}</td>
          <td style="border: 1px solid #ccc; padding: 12px;">0</td>
        </tr>
      </tbody>
    </table>`;

    const correctText = `$(x+${a})(x-${b})$`;

    const optionsData = [
      { key: 'correct', text: correctText, isCorrect: true },
      { key: 'flipped', text: `$(x-${a})(x+${b})$`, isCorrect: false },
      { key: 'single1', text: `$(x-${a})$`, isCorrect: false },
      { key: 'single2', text: `$(x+${b})$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.key === 'correct')!.letter;
    const flippedLetter = shuffledOptions.find(o => o.key === 'flipped')!.letter;
    const single1Letter = shuffledOptions.find(o => o.key === 'single1')!.letter;
    const single2Letter = shuffledOptions.find(o => o.key === 'single2')!.letter;

    return {
      questionText: `The table gives selected values of a polynomial function $p$. Based on the values in the table, which of the following must be a factor of $p(x)$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The table shows that $p(${root1})=0$ and $p(${root2})=0$. By the factor theorem, if $p(k)=0$, then $(x-k)$ is a factor of $p(x)$, so $(x-(${root1}))=(x+${a})$ and $(x-${b})$ are both factors of $p(x)$. Therefore their product $(x+${a})(x-${b})$ must also be a factor of $p(x)$. Choice ${flippedLetter} is incorrect; it reverses the signs of the factors and would require $p(${a})=0$ and $p(${-b})=0$, which the table does not show. Choices ${single1Letter} and ${single2Letter} are incorrect because the table does not show that $p(${a})=0$ or that $p(${-b})=0$, so neither $(x-${a})$ nor $(x+${b})$ must be a factor.`
    };
  }
};
