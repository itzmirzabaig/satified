import { getRandomInt, shuffle } from "../../utils/math";
import type { QuestionData } from "../../study/types";

/**
 * Question ID: 044c1cb7
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cVal: -3 to 3, xPoints: 1, 2, 3]
 * - Difficulty factors: [Matching function values to a table]
 * - Distractor patterns: [Off-by-one errors, linear result, random table entries]
 * - Constraints: [Follow quadratic rule x^2 + c]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_044c1cb7 = {
  metadata: {
    id: "044c1cb7",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy",
  },
  generate: (): QuestionData => {
    const cVal = getRandomInt(-3, 3);
    const xPoints = [1, 2, 3];
    const yPoints = xPoints.map((x) => x * x + cVal);
    const signStr = cVal > 0 ? `+ ${cVal}` : cVal < 0 ? `- ${Math.abs(cVal)}` : "";

    // Build table HTML for each option - no fill, just borders
    const buildTable = (yVals: number[]) => `
      <table style="border-collapse: collapse; margin: 8px 0;">
        <tr>
          <th style="border: 1px solid #333; padding: 6px 12px;">x</th>
          <td style="border: 1px solid #333; padding: 6px 12px;">${xPoints[0]}</td>
          <td style="border: 1px solid #333; padding: 6px 12px;">${xPoints[1]}</td>
          <td style="border: 1px solid #333; padding: 6px 12px;">${xPoints[2]}</td>
        </tr>
        <tr>
          <th style="border: 1px solid #333; padding: 6px 12px;">h(x)</th>
          <td style="border: 1px solid #333; padding: 6px 12px;">${yVals[0]}</td>
          <td style="border: 1px solid #333; padding: 6px 12px;">${yVals[1]}</td>
          <td style="border: 1px solid #333; padding: 6px 12px;">${yVals[2]}</td>
        </tr>
      </table>
    `;

    const correctTable = buildTable(yPoints);
    const offByOneTable = buildTable(xPoints.map((x) => x * x + cVal + 1));
    const linearTable = buildTable(xPoints.map((x) => x + cVal));
    const shiftedTable = buildTable(yPoints.map((y) => y - 1));

    const optionsData = [
      { text: correctTable, isCorrect: true },
      { text: offByOneTable, isCorrect: false },
      { text: linearTable, isCorrect: false },
      { text: shiftedTable, isCorrect: false },
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, i) => ({
      ...opt,
      letter: String.fromCharCode(65 + i),
    }));

    const correctOption = shuffledOptions.find((o) => o.isCorrect)!;

    return {
      questionText: `Which table gives three values of $x$ and their corresponding values of $h(x)$ for the function $h(x)=x^2 ${signStr}$?`,
      figureCode: null,
      options: shuffledOptions.map((o) => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Substituting the x-values into $h(x)=x^2 ${signStr}$ gives the pairs shown in this table. For example, $h(1) = 1^2 ${signStr} = ${yPoints[0]}$, $h(2) = 4 ${signStr} = ${yPoints[1]}$, and $h(3) = 9 ${signStr} = ${yPoints[2]}$.`,
    };
  },
};