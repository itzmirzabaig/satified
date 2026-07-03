import { getRandomInt, round } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1390
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [two students, six rocks each, one mass unknown (x), mean difference 0.1–0.3 kg]
 * - Difficulty factors: [Setting up equation from means, solving for the unknown mass]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [second student's mean = first student's mean + difference; solve for x]
 * - Question type: [Table→Fill in the blank]
 */

export const generator_1390 = {
  metadata: {
    id: "1390",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Work entirely in integer tenths of a kilogram so x is exact and no
    // floating-point artifacts can reach the student. Divide by 10 only for
    // display. Because the second student's total is forced to the first
    // student's total plus 6 * difference, the stated mean relationship holds
    // EXACTLY for the value of x reported below.
    const mass = (tenths: number): string => `${Math.trunc(tenths / 10)}.${Math.abs(tenths % 10)}`;
    const dec = (tenths: number): string => (tenths % 10 === 0 ? String(tenths / 10) : mass(tenths));

    let firstValues10: number[] = [25, 27, 28, 30, 32, 34];
    let secondOther10: number[] = [28, 30, 31, 33, 35];
    let meanDiff10 = 2;   // 0.2 kg
    let x10 = 36;         // 3.6 kg

    let tries = 0;
    let ready = false;
    while (!ready && tries++ < 50) {
      firstValues10 = Array.from({ length: 6 }, () => getRandomInt(20, 50));   // 2.0–5.0 kg
      secondOther10 = Array.from({ length: 5 }, () => getRandomInt(25, 45));   // 2.5–4.5 kg
      meanDiff10 = getRandomInt(1, 3);                                         // 0.1–0.3 kg

      const firstSum10 = firstValues10.reduce((a, b) => a + b, 0);
      // second student's six masses must total firstSum + 6 * difference.
      const secondSum10 = firstSum10 + 6 * meanDiff10;
      const otherSum10 = secondOther10.reduce((a, b) => a + b, 0);
      x10 = secondSum10 - otherSum10;

      // x must be a realistic single rock mass.
      if (x10 >= 15 && x10 <= 60) ready = true;
    }

    if (!ready) {
      firstValues10 = [25, 27, 28, 30, 32, 34];   // sum 176 -> 17.6
      secondOther10 = [28, 30, 31, 33, 35];        // sum 157 -> 15.7
      meanDiff10 = 2;                              // 0.2 kg
      const firstSum10 = 176;
      x10 = firstSum10 + 6 * meanDiff10 - 157;     // 176 + 12 - 157 = 31 -> 3.1
    }

    const firstSum10 = firstValues10.reduce((a, b) => a + b, 0);
    const otherSum10 = secondOther10.reduce((a, b) => a + b, 0);
    const secondSum10 = firstSum10 + 6 * meanDiff10;
    const firstMean = round(firstSum10 / 60, 2);   // informational, <=2 decimals

    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Student</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Masses (kilograms)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">First student</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${firstValues10.map(mass).join(", ")}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Second student</td>
      <td style="border: 1px solid currentColor; padding: 8px;">x, ${secondOther10.map(mass).join(", ")}</td>
    </tr>
  </tbody>
</table>`;

    return {
      questionText: `Two students each collected six rocks, and the mass of each rock is shown in the table. The mean mass of the second student's rocks is ${dec(meanDiff10)} kilograms greater than the mean mass of the first student's rocks. What is the value of x?`,
      figureCode: tableCode,
      options: [],
      correctAnswer: mass(x10),
      explanation: `The correct answer is ${mass(x10)}. The first student's six masses sum to ${dec(firstSum10)} kg, so the first student's mean mass is ${dec(firstSum10)} ÷ 6 = ${firstMean} kg. Because both students collected six rocks and the second student's mean is ${dec(meanDiff10)} kg greater, the second student's six masses must sum to ${dec(firstSum10)} + 6 × ${dec(meanDiff10)} = ${dec(secondSum10)} kg. The five known masses of the second student sum to ${dec(otherSum10)} kg, so x = ${dec(secondSum10)} − ${dec(otherSum10)} = ${mass(x10)} kg.`
    };
  }
};
