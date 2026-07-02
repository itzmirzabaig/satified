import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 53
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rate: 3-5]
 * - Difficulty factors: [Matching a table to coordinates]
 * - Distractor patterns: [Shifting values, swapping signs, zero values]
 * - Constraints: [Must match the provided points]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_53 = {
  metadata: {
    id: "53",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const rate = getRandomInt(3, 5);

    const hours =[0, 3, 6];

    const levels = [0, -rate * 3, 0];

    const tableCode = `<table border="1">
  <tr>
    <th>Elapsed time (hours)</th>
    <th>Ocean water level (feet)</th>
  </tr>
  ${hours.map((h, i) => `
  <tr>
    <td>${h}</td>
    <td>${levels[i]}</td>
  </tr>`).join('')}
</table>`;

    const optionsData = [
      { text: `$(0, 0), (3, ${-rate * 3}), (6, 0)$`, isCorrect: true },
      { text: `$(0, ${-rate * 3}), (3, 0), (6, ${-rate * 3})$`, isCorrect: false },
      { text: `$(0, 0), (3, ${rate * 3}), (6, 0)$`, isCorrect: false },
      { text: `$(0, 0), (3, 0), (6, 0)$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `Scientists recorded ocean water levels. The table shown models the data. Which ordered pairs $(x, y)$ match the values in the table?`,
      figureCode: tableCode,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The table explicitly lists the values for $x$ (time) and $y$ (level). By reading the rows, we identify the points $(0, 0)$, $(3, ${-rate * 3})$, and $(6, 0)$.`
    };
  }
};
