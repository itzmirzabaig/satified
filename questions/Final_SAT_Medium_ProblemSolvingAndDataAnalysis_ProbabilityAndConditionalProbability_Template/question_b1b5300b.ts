import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: b1b5300b
 *
 * FIXES:
 * - Changed \\\\frac to \\frac
 * - Updated table styling
 * - Added local gcd function
 */

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

export const generator_b1b5300b = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate table values
    const hybridLowPrice = getRandomInt(1, 3);
    const hybridHighPrice = getRandomInt(2, 5);
    const nonHybridLowPrice = getRandomInt(3, 7);
    const nonHybridHighPrice = getRandomInt(2, 5);

    const hybridTotal = hybridLowPrice + hybridHighPrice;
    const nonHybridTotal = nonHybridLowPrice + nonHybridHighPrice;
    const totalCars = hybridTotal + nonHybridTotal;

    // STEP 2: Calculate answer
    const numerator = hybridLowPrice;
    const denominator = totalCars;
    const g = gcd(numerator, denominator);
    const simplifiedNum = numerator / g;
    const simplifiedDen = denominator / g;

    // STEP 3: Build HTML table
    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto; text-align: center; background: transparent; width: 100%; max-width: 500px;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Type of car</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Priced at no more than $25,000</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Priced greater than $25,000</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Nonhybrid</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${nonHybridLowPrice}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${nonHybridHighPrice}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${nonHybridTotal}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Hybrid</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${hybridLowPrice}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${hybridHighPrice}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${hybridTotal}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Total</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${hybridLowPrice + nonHybridLowPrice}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${hybridHighPrice + nonHybridHighPrice}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalCars}</td>
    </tr>
  </tbody>
</table>`;

    // STEP 4: Create options with tracking
    const correctText = `\\frac{${simplifiedNum}}{${simplifiedDen}}`;
    const dist1 = `\\frac{${hybridTotal}}{${totalCars}}`;
    const dist2 = `\\frac{${hybridLowPrice}}{${hybridTotal}}`;
    const dist3 = `\\frac{${nonHybridTotal}}{${totalCars}}`;

    const optionsData = [
      { text: `$${correctText}$`, isCorrect: true },
      { text: `$${dist1}$`, isCorrect: false },
      { text: `$${dist2}$`, isCorrect: false },
      { text: `$${dist3}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `The table above shows information about ${totalCars} cars listed for sale on an auto dealership's website. If one of the cars listed for sale is selected at random, what is the probability that the car selected will be a hybrid car priced at no more than $25,000?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. There are ${hybridLowPrice} hybrid cars priced at no more than $25,000 out of ${totalCars} total cars. Therefore, the probability is $\\frac{${hybridLowPrice}}{${totalCars}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$.`
    };
  }
};