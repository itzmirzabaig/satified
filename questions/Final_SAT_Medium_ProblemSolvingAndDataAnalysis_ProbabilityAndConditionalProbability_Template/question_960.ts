import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 960
 *
 * Conditional probability from a one-variable frequency table.
 * Of the presidents at least 50 at inauguration, what fraction were at least 60?
 * P(>=60 | >=50) = atLeast60 / atLeast50.
 *
 * FIXES:
 * - correctAnswer now exactly equals the correct option string (with $...$),
 *   eliminating CORRECT_FUZZY and the numeric-equivalence mis-resolution that
 *   produced LETTER_MISMATCH.
 * - Bounded retry (<=50) guarantees all four option VALUES are distinct,
 *   eliminating DUP_OPTIONS (the common case was range3 == atLeast60, which made
 *   the range3/atLeast50 distractor equal the correct answer).
 * - Explanation keeps arithmetic sums as plain text and only fractions in math,
 *   so no field mixes "$<digit>" with "$\\frac", clearing the DOLLAR_RISK.
 * - Distractors carry reasons; explanation references each distractor by its
 *   post-shuffle letter.
 */

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

// Reduced-fraction TeX plus a numeric value for collision checks.
const frac = (num: number, den: number): { tex: string; value: number } => {
  const g = gcd(Math.abs(num), Math.abs(den)) || 1;
  return { tex: `$\\frac{${num / g}}{${den / g}}$`, value: num / den };
};

export const generator_960 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate the six age-band counts, retrying (bounded) until the
    // correct answer and all three distractors are distinct values.
    let range1 = 0, range2 = 0, range3 = 0, range4 = 0, range5 = 0, range6 = 0;
    let totalPresidents = 0, atLeast50 = 0, atLeast60 = 0;
    let correct = frac(0, 1), d1 = frac(0, 1), d2 = frac(0, 1), d3 = frac(0, 1);

    let tries = 0;
    do {
      range1 = getRandomInt(1, 4);  // 40-44
      range2 = getRandomInt(5, 9);  // 45-49
      range3 = getRandomInt(10, 16); // 50-54
      range4 = getRandomInt(8, 14); // 55-59
      range5 = getRandomInt(5, 10); // 60-64
      range6 = getRandomInt(2, 5);  // 65-69

      totalPresidents = range1 + range2 + range3 + range4 + range5 + range6;
      atLeast50 = range3 + range4 + range5 + range6;
      atLeast60 = range5 + range6;

      // STEP 2: Correct conditional probability + three common wrong approaches.
      correct = frac(atLeast60, atLeast50);        // >=60 among the >=50 group
      d1 = frac(atLeast60, totalPresidents);       // >=60 out of ALL presidents
      d2 = frac(range3, atLeast50);                // 50-54 band among the >=50 group
      d3 = frac(atLeast50, atLeast60);             // ratio inverted
    } while (
      new Set([correct.value, d1.value, d2.value, d3.value]).size !== 4 &&
      tries++ < 50
    );

    const g = gcd(atLeast60, atLeast50) || 1;
    const simplifiedNum = atLeast60 / g;
    const simplifiedDen = atLeast50 / g;

    // STEP 3: Build table
    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto; text-align: center; background: transparent; width: 100%; max-width: 300px;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Ages</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Number</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">40–44</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${range1}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">45–49</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${range2}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">50–54</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${range3}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">55–59</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${range4}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">60–64</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${range5}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">65–69</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${range6}</td>
    </tr>
  </tbody>
</table>`;

    // STEP 4: Create options with distractor reasons.
    const optionsData = [
      { text: d1.tex, isCorrect: false, reason: `divides by all ${totalPresidents} presidents instead of only the ${atLeast50} who were at least 50` },
      { text: correct.tex, isCorrect: true, reason: '' },
      { text: d2.tex, isCorrect: false, reason: `uses the ${range3} presidents aged 50 to 54 instead of the ${atLeast60} who were at least 60` },
      { text: d3.tex, isCorrect: false, reason: `inverts the ratio, dividing the ${atLeast50} by the ${atLeast60}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The table above gives the number of United States presidents from 1789 to 2015 whose age at the time they first took office is within the interval listed. Of those presidents who were at least 50 years old when they first took office, what fraction were at least 60 years old?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correct.tex,
      explanation: `Choice ${correctLetter} is correct. The number of presidents who were at least 50 years old is ${range3} + ${range4} + ${range5} + ${range6} = ${atLeast50}. Of those, the number who were at least 60 is ${range5} + ${range6} = ${atLeast60}. Therefore, the fraction is $\\frac{${atLeast60}}{${atLeast50}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
