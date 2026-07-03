import { getRandomInt, getRandomNonZeroInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 172
 *
 * ORIGINAL ANALYSIS: [Table matching Mafs graph]
 * - Number ranges: [slope: 1-4, intercept: -8 to 8]
 * - Difficulty factors: [Matching table to graphed line]
 * - Constraints: [Simple integers for Easy]
 */

export const generator_172 = {
  metadata: {
    id: "172",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize slope (1-4 for Easy)
    const m = getRandomInt(1, 4);
    // Randomize y-intercept (-8 to 8, NONZERO so the "zero intercept"
    // distractor table can never coincide with the correct table).
    const b = getRandomNonZeroInt(-8, 8);
    const xVals = [0, 1, 2];
    const yVals = xVals.map(x => m * x + b);
    // With m >= 1 and b != 0 the four tables below are pairwise distinct for
    // every draw: they disagree at x = 0 (b vs 0) and/or x = 1 (slope).

    const mafsCode = `<Mafs viewBox={{ x: [-2, 4], y: [-10, 10] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${m} * x + ${b}} color="#2563eb" />
</Mafs>`;

    const createTable = (ys: number[]) => `<table style="border-collapse: collapse; margin: 0 auto;"><tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; font-weight: bold;">x</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; font-weight: bold;">y</td></tr>${xVals.map((x, i) => `<tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center;">${x}</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center;">${ys[i]}</td></tr>`).join('')}</table>`;

    const optionsData = [
      { key: 'correct', code: createTable(yVals), isCorrect: true },
      { key: 'negSlope', code: createTable(xVals.map(x => -m * x + b)), isCorrect: false },
      { key: 'wrongSlope', code: createTable(xVals.map(x => (m + 1) * x + b)), isCorrect: false },
      { key: 'zeroIntercept', code: createTable(xVals.map(x => m * x)), isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const letterOf = (key: string) => shuffled.find(o => o.key === key)!.letter;

    return {
      questionText: `The graph of a line is shown. Which table gives three values of $x$ and their corresponding values of $y$ for this line?`,
      figureCode: mafsCode,
      options: shuffled.map(o => o.code),
      correctAnswer: shuffled.find(o => o.isCorrect)!.code,
      explanation: `Choice ${letterOf('correct')} is correct. The graphed line has slope ${m} and y-intercept $(0, ${b})$, so its equation is $y = ${m}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}$. Evaluating at $x = 0$, $x = 1$, and $x = 2$ gives $y$-values of ${yVals[0]}, ${yVals[1]}, and ${yVals[2]}, which is exactly the table in choice ${letterOf('correct')}. Choice ${letterOf('negSlope')} is incorrect; its $y$-values decrease by ${m} for each unit increase in $x$, but the graphed line rises. Choice ${letterOf('wrongSlope')} is incorrect; its values increase by ${m + 1} per unit instead of ${m}. Choice ${letterOf('zeroIntercept')} is incorrect; its value at $x = 0$ is 0, but the line crosses the y-axis at ${b}.`
    };
  }
};
