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

    // Before: two wrong choices shared one combined reason. Each now names its
    // own sign slip. When -b is the first row of the table, the table actually
    // shows p(-b) is nonzero, so the reason says that instead.
    const flippedText = `$(x-${a})(x+${b})$`;
    const single1Text = `$(x-${a})$`;
    const single2Text = `$(x+${b})$`;
    const negBFact = b === a + 1
      ? `the table shows $p(${-b})=${pAtLeft}$, not $0$`
      : `the table does not show that $p(${-b})=0$`;

    const optionsData = [
      { key: 'correct', text: correctText, isCorrect: true, reason: '' },
      { key: 'flipped', text: flippedText, isCorrect: false, reason: `${flippedText} reverses the sign in both factors, which would require $p(${a})=0$ and $p(${-b})=0$, but the table does not show that $p(${a})=0$, and ${negBFact}` },
      { key: 'single1', text: single1Text, isCorrect: false, reason: `${single1Text} uses the wrong sign for the zero at $x=${root1}$, which would require $p(${a})=0$, and the table does not show that value` },
      { key: 'single2', text: single2Text, isCorrect: false, reason: `${single2Text} uses the wrong sign for the zero at $x=${root2}$, which would require $p(${-b})=0$, but ${negBFact}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The table gives selected values of a polynomial function $p$. Based on the values in the table, which of the following must be a factor of $p(x)$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The table shows that $p(${root1})=0$ and $p(${root2})=0$. By the factor theorem, if $p(r)=0$ for a number $r$, then $(x-r)$ is a factor of $p(x)$, so $(x-(${root1}))=(x+${a})$ and $(x-${b})$ are both factors of $p(x)$. Because these factors come from two different zeros, their product $(x+${a})(x-${b})$ must also be a factor of $p(x)$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
