import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b39d74a0
 *
 * ORIGINAL ANALYSIS: [Matching a power function table to its graph]
 * - Number ranges: [x values: 0-3, power: 2 or 3 (for easy nonlinear)]
 * - Difficulty factors: [Matching a table of (x, y) pairs to the correct graph]
 * - Constraints: [Easy - cubic or quadratic power function, small positive x values]
 * - Question type: [Table → Multiple Choice Figure]
 * - Figure generation: [HTML Table and Mafs plots]
 */

export const generator_b39d74a0 = {
  metadata: {
    // id: "b39d74a0",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // For Easy nonlinear functions, use cubic (power=3)
    // Vary the x-value range: start from 0 or 1, up to 3 or 4
    const startX = getRandomInt(0, 1);
    const endX = startX + 3;  // always 4 consecutive x values
    const correctPower = 3;   // cubic is the key pattern to identify

    const xVals = [startX, startX+1, startX+2, endX];
    const points = xVals.map(x => ({ x, y: Math.pow(x, correctPower) }));

    const tableHTML = `<table border="1">
  <tr><th>x</th><th>y</th></tr>
  ${points.map(p => `<tr><td>${p.x}</td><td>${p.y}</td></tr>`).join('')}
</table>`;

    const buildMafs = (power: number) => `<Mafs viewBox={{ x: [-1, 5], y: [-5, 100] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => Math.pow(x, ${power})} color="var(--mafs-blue)" />
</Mafs>`;

    const linearSlope = getRandomInt(2, 8);
    const linearShift = getRandomInt(1, 15);

    const optionsData = [
      { figureCode: buildMafs(correctPower), isCorrect: true },
      { figureCode: `<Mafs viewBox={{ x: [-1, 5], y: [-5, 100] }}><Coordinates.Cartesian /><Plot.OfX y={(x) => x * ${linearSlope}} color="var(--mafs-blue)" /></Mafs>`, isCorrect: false },
      { figureCode: buildMafs(2), isCorrect: false },
      { figureCode: `<Mafs viewBox={{ x: [-1, 5], y: [-5, 100] }}><Coordinates.Cartesian /><Plot.OfX y={(x) => x + ${linearShift}} color="var(--mafs-blue)" /></Mafs>`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The table shown includes some values of $x$ and their corresponding values of $y$. Which of the following graphs could represent this relationship?`,
      figureCode: tableHTML,
      options: shuffled.map(o => o.figureCode),
      correctAnswer: correctOption.figureCode,
      explanation: `Choice ${correctOption.letter} is correct. Each pair $(x, y)$ in the table satisfies $y = x^3$. Testing the point $(${xVals[2]}, ${Math.pow(xVals[2],3)})$ shows that only the cubic graph passes through these coordinates.`
    };
  }
};

