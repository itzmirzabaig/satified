import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1424
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: Flower counts (tulips/daffodils) at two sites
 * - Difficulty factors: Conditional probability with row condition (tulip), recognizing reduced sample space
 * - Distractor patterns: Not applicable (fill-in-the-blank)
 * - Constraints: Totals must match; conditional = tulipA / (tulipA + tulipB)
 * - Question type: Table -> Fill-in-the-blank
 * - Figure generation: HTML table with flower distribution
 */

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

export const generator_1424 = {
  metadata: {
    id: "1424",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // P(Site A | Tulip) = tulipA / (tulipA + tulipB).
    // tulipB >= 10 > 0 guarantees a proper fraction (0 < answer < 1) every draw.
    const tulipA = getRandomInt(25, 45);   // Tulips at Site A
    const tulipB = getRandomInt(10, 25);   // Tulips at Site B
    const totalTulips = tulipA + tulipB;

    const daffodilA = getRandomInt(20, 40);
    const daffodilB = getRandomInt(15, 30);

    const totalSiteA = tulipA + daffodilA;
    const totalSiteB = tulipB + daffodilB;
    const totalDaffodils = daffodilA + daffodilB;
    const grandTotal = totalSiteA + totalSiteB;

    // Simplify the conditional probability fraction from the SAME live values.
    const g = gcd(tulipA, totalTulips);
    const simplifiedNum = tulipA / g;
    const simplifiedDen = totalTulips / g;

    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto; text-align: center; background: transparent; width: 100%; max-width: 500px;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Flower</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Site A</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Site B</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Tulip</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${tulipA}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${tulipB}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalTulips}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Daffodil</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${daffodilA}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${daffodilB}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalDaffodils}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Total</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalSiteA}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalSiteB}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${grandTotal}</td>
    </tr>
  </tbody>
</table>`;

    return {
      questionText: `The table shows the distribution of two types of flowers at two different sites. If a flower represented in the table is selected at random, what is the probability of selecting a flower from Site A, given that the flower is a tulip? (Express your answer as a fraction or decimal, not as a percent.)`,
      figureCode: tableCode,
      options: [],
      correctAnswer: `${simplifiedNum}/${simplifiedDen}`,
      explanation: `Given that the flower is a tulip, restrict the sample space to the Tulip row, which has a total of ${totalTulips} tulips. Of these, ${tulipA} are from Site A. The probability is $\\frac{${tulipA}}{${totalTulips}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$.`
    };
  }
};
