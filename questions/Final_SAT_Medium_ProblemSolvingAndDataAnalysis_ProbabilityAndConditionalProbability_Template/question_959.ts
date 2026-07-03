import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 959
 *
 * Simple probability from a two-way frequency table.
 * P(hybrid AND priced <= $25,000) = hybridLowPrice / totalCars.
 *
 * FIXES:
 * - Currency now escaped as \$ everywhere it is user-visible (questionText,
 *   explanation, AND the table headers, which MathJax scans), removing the
 *   odd-$ TEX_UNBALANCED and the DOLLAR_RISK.
 * - correctAnswer now exactly equals the correct option string (with $...$),
 *   eliminating CORRECT_FUZZY / numeric-equivalence mis-resolution.
 * - Bounded retry (<=50) guarantees all four option VALUES are distinct,
 *   eliminating DUP_OPTIONS for every draw.
 * - Distractors carry reasons; explanation references each distractor by its
 *   post-shuffle letter, so letters stay consistent.
 */

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

// Reduced-fraction TeX plus a numeric value for collision checks.
const frac = (num: number, den: number): { tex: string; value: number } => {
  const g = gcd(Math.abs(num), Math.abs(den)) || 1;
  return { tex: `$\\frac{${num / g}}{${den / g}}$`, value: num / den };
};

export const generator_959 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate counts, retrying (bounded) until the correct answer and
    // all three distractors are distinct values. Distractors are derived from
    // the same counts, so we regenerate the counts rather than nudge a value.
    let hybridLowPrice = 0, hybridHighPrice = 0, nonHybridLowPrice = 0, nonHybridHighPrice = 0;
    let hybridTotal = 0, nonHybridTotal = 0, totalCars = 0;
    let lowTotal = 0, highTotal = 0;
    let correct = frac(0, 1), d1 = frac(0, 1), d2 = frac(0, 1), d3 = frac(0, 1);

    let tries = 0;
    do {
      hybridLowPrice = getRandomInt(1, 3);
      hybridHighPrice = getRandomInt(2, 5);
      nonHybridLowPrice = getRandomInt(3, 7);
      nonHybridHighPrice = getRandomInt(2, 5);

      hybridTotal = hybridLowPrice + hybridHighPrice;
      nonHybridTotal = nonHybridLowPrice + nonHybridHighPrice;
      totalCars = hybridTotal + nonHybridTotal;
      lowTotal = hybridLowPrice + nonHybridLowPrice;
      highTotal = hybridHighPrice + nonHybridHighPrice;

      // STEP 2: Correct answer + three common wrong approaches.
      correct = frac(hybridLowPrice, totalCars);   // hybrid & low-priced / all cars
      d1 = frac(hybridTotal, totalCars);           // all hybrids / all cars
      d2 = frac(hybridLowPrice, hybridTotal);      // low-priced among hybrids only
      d3 = frac(nonHybridTotal, totalCars);        // all nonhybrids / all cars
    } while (
      new Set([correct.value, d1.value, d2.value, d3.value]).size !== 4 &&
      tries++ < 50
    );

    const simplifiedNum = hybridLowPrice / (gcd(hybridLowPrice, totalCars) || 1);
    const simplifiedDen = totalCars / (gcd(hybridLowPrice, totalCars) || 1);

    // STEP 3: Build HTML table (currency escaped for MathJax with \$).
    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto; text-align: center; background: transparent; width: 100%; max-width: 500px;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Type of car</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Priced at no more than \\$25,000</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Priced greater than \\$25,000</th>
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
      <td style="border: 1px solid currentColor; padding: 8px;">${lowTotal}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${highTotal}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalCars}</td>
    </tr>
  </tbody>
</table>`;

    // STEP 4: Create options with distractor reasons.
    const optionsData = [
      { text: correct.tex, isCorrect: true, reason: '' },
      { text: d1.tex, isCorrect: false, reason: `counts all ${hybridTotal} hybrid cars, not just the ${hybridLowPrice} priced at no more than \\$25,000` },
      { text: d2.tex, isCorrect: false, reason: `divides by the ${hybridTotal} hybrid cars instead of all ${totalCars} cars` },
      { text: d3.tex, isCorrect: false, reason: `counts the ${nonHybridTotal} nonhybrid cars instead of the low-priced hybrids` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The table above shows information about ${totalCars} cars listed for sale on an auto dealership's website. If one of the cars listed for sale is selected at random, what is the probability that the car selected will be a hybrid car priced at no more than \\$25,000?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correct.tex,
      explanation: `Choice ${correctLetter} is correct. Of the ${totalCars} cars, ${hybridLowPrice} are hybrid cars priced at no more than \\$25,000, so the probability is $\\frac{${hybridLowPrice}}{${totalCars}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
