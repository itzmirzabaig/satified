import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 961
 *
 * Two-way table (coat color x eye color). Asks: of the chocolate-colored
 * kittens, what fraction has deep blue eyes? Answer = chocBlue / chocTotal.
 * Distractors are plausible wrong ratios drawn from the same table. All four
 * option values are guaranteed pairwise-distinct via a bounded retry so no
 * two rendered fractions can collide numerically.
 */

export const generator_961 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate table values, redrawing until the four candidate
    // option fractions are all numerically distinct (bounded retry).
    let creamBlue = 0, creamBrown = 0, chocBlue = 0, chocBrown = 0;
    let creamTotal = 0, chocTotal = 0, totalKittens = 0, totalBlue = 0, totalBrown = 0;

    let tries = 0;
    while (tries++ < 50) {
      // Cream-tortoiseshell row
      creamBlue = getRandomInt(12, 20);
      creamBrown = getRandomInt(12, 20);
      creamTotal = creamBlue + creamBrown;

      // Chocolate row
      chocBlue = getRandomInt(8, 16);
      chocBrown = getRandomInt(3, 8);
      chocTotal = chocBlue + chocBrown;

      totalKittens = creamTotal + chocTotal;
      totalBlue = creamBlue + chocBlue;
      totalBrown = creamBrown + chocBrown;

      // Candidate fraction values that will be rendered as options.
      const vals = [
        chocBlue / chocTotal,   // correct
        chocBlue / totalKittens, // dist1
        chocBlue / totalBlue,    // dist2
        creamBlue / creamTotal   // dist3
      ];

      let distinct = true;
      for (let a = 0; a < vals.length && distinct; a++) {
        for (let b = a + 1; b < vals.length; b++) {
          if (Math.abs(vals[a] - vals[b]) < 1e-9) { distinct = false; break; }
        }
      }
      if (distinct) break;
    }

    // STEP 2: Correct answer (conditional probability) — displayed unsimplified.
    const numerator = chocBlue;
    const denominator = chocTotal;

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

    // STEP 4: Create options (unsimplified fractions straight from the table).
    const correctText = `$\\frac{${numerator}}{${denominator}}$`;
    const dist1 = `$\\frac{${chocBlue}}{${totalKittens}}$`;
    const dist2 = `$\\frac{${chocBlue}}{${totalBlue}}$`;
    const dist3 = `$\\frac{${creamBlue}}{${creamTotal}}$`;

    const optionsData = [
      { text: dist1, isCorrect: false },
      { text: dist2, isCorrect: false },
      { text: dist3, isCorrect: false },
      { text: correctText, isCorrect: true }
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
