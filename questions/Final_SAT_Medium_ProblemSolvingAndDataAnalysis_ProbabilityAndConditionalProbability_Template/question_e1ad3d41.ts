import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e1ad3d41
 *
 * FIXES:
 * - Changed \\\\frac to \\frac
 * - Updated table styling
 * - Added local gcd function
 */

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

export const generator_e1ad3d41 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate table values
    // Cream-tortoiseshell row
    const creamBlue = getRandomInt(12, 20);
    const creamBrown = getRandomInt(12, 20);
    const creamTotal = creamBlue + creamBrown;

    // Chocolate row
    const chocBlue = getRandomInt(8, 16);
    const chocBrown = getRandomInt(3, 8);
    const chocTotal = chocBlue + chocBrown;

    const totalKittens = creamTotal + chocTotal;
    const totalBlue = creamBlue + chocBlue;
    const totalBrown = creamBrown + chocBrown;

    // STEP 2: Calculate correct answer (conditional probability)
    const numerator = chocBlue;
    const denominator = chocTotal;
    // Simplify answer for fraction option
    const g = gcd(numerator, denominator);
    const simpleNum = numerator / g;
    const simpleDen = denominator / g;

    // STEP 3: Build HTML table
    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto; text-align: center; background: transparent; width: 100%; max-width: 450px;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Coat color</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Deep blue</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Light brown</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Cream-tortoiseshell</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${creamBlue}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${creamBrown}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${creamTotal}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Chocolate</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${chocBlue}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${chocBrown}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${chocTotal}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Total</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalBlue}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalBrown}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalKittens}</td>
    </tr>
  </tbody>
</table>`;

    // STEP 4: Create options
    // Note: options might not be simplified in all distractor cases, but correct answer usually is.
    // Based on original, we return fractions.
    
    // Distractors
    const dist1 = `\\frac{${chocBlue}}{${totalKittens}}`;
    const dist2 = `\\frac{${chocBlue}}{${totalBlue}}`;
    const dist3 = `\\frac{${creamBlue}}{${creamTotal}}`;
    const correctText = `\\frac{${numerator}}{${denominator}}`;
    
    const optionsData = [
      { text: `$${dist1}$`, isCorrect: false },
      { text: `$${dist2}$`, isCorrect: false },
      { text: `$${dist3}$`, isCorrect: false },
      { text: `$${correctText}$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `The data on the coat color and eye color for ${totalKittens} Himalayan kittens available for adoption were collected and summarized in the table above. What fraction of the chocolate-colored kittens has deep blue eyes?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Of the ${chocTotal} chocolate-colored kittens, ${chocBlue} have deep blue eyes. Therefore, the fraction is $\\frac{${chocBlue}}{${chocTotal}}$.`
    };
  }
};