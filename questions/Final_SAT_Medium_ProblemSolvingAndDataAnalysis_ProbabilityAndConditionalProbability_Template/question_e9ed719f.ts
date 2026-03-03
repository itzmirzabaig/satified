import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e9ed719f
 *
 * FIXES:
 * - Changed \\\\frac to \\frac
 * - Updated table styling
 * - Added local gcd function
 */

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

export const generator_e9ed719f = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate table values
    const squareRed = getRandomInt(8, 15);
    const squareBlue = getRandomInt(15, 25);
    const squareYellow = getRandomInt(20, 30);
    const pentagonRed = getRandomInt(15, 25);
    const pentagonBlue = getRandomInt(8, 15);
    const pentagonYellow = getRandomInt(12, 20);

    const squareTotal = squareRed + squareBlue + squareYellow;
    const pentagonTotal = pentagonRed + pentagonBlue + pentagonYellow;
    const totalRed = squareRed + pentagonRed;
    const totalBlue = squareBlue + pentagonBlue;
    const totalYellow = squareYellow + pentagonYellow;
    const totalTiles = squareTotal + pentagonTotal;

    // STEP 2: Calculate probability
    const g = gcd(totalRed, totalTiles);
    const simplifiedNum = totalRed / g;
    const simplifiedDen = totalTiles / g;
    const decimalForm = (totalRed / totalTiles).toFixed(1);

    // STEP 3: Build table
    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto; text-align: center; background: transparent; width: 100%; max-width: 500px;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Shape</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Red</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Blue</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Yellow</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Square</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${squareRed}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${squareBlue}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${squareYellow}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${squareTotal}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Pentagon</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${pentagonRed}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${pentagonBlue}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${pentagonYellow}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${pentagonTotal}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Total</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalRed}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalBlue}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalYellow}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalTiles}</td>
    </tr>
  </tbody>
</table>`;

    return {
      questionText: "The table summarizes the distribution of color and shape for tiles of equal area. If one of these tiles is selected at random, what is the probability of selecting a red tile? (Express your answer as a decimal or fraction, not as a percent.)",
      figureCode: tableCode,
      options: [],
      correctAnswer: `${simplifiedNum}/${simplifiedDen}`,
      explanation: `The correct answer is $\\frac{${simplifiedNum}}{${simplifiedDen}}$. There are ${totalTiles} tiles total and ${totalRed} red tiles. The probability is $\\frac{${totalRed}}{${totalTiles}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$.`
    };
  }
};