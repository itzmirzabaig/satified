import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1428
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: Group totals per group, three age bands that sum by column
 * - Difficulty factors: Conditional probability, identifying correct sub-population, fraction simplification
 * - Distractor patterns: A: wrong numerator (0-9 count), B: correct, C: only 10-19 in numerator, D: wrong (grand-total) denominator
 * - Constraints: Equal totals per group; every age column sums to the group total; all four options distinct by value
 * - Question type: Table -> Multiple choice (fractions)
 * - Figure generation: HTML table with age distribution
 */

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const frac = (n: number, d: number): string => {
  const g = gcd(Math.abs(n), Math.abs(d)) || 1;
  return `\\frac{${n / g}}{${d / g}}`;
};

export const generator_1428 = {
  metadata: {
    id: "1428",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Draw a consistent table AND four value-distinct options, with a bounded retry.
    let totalPerGroup = 30;
    let groupA_0_9 = 5, groupA_10_19 = 17, groupA_20_plus = 8;
    let groupB_0_9 = 6, groupB_10_19 = 13, groupB_20_plus = 11;
    let groupC_0_9 = 19, groupC_10_19 = 0, groupC_20_plus = 11;

    let built = false;
    let outer = 0;
    while (!built && outer < 50) {
      outer++;

      // --- inner search for a column-consistent table (bounded) ---
      let valid = false;
      let attempts = 0;
      let T = 30, a09 = 5, a1019 = 17, a20 = 8;
      let b09 = 6, b1019 = 13, b20 = 11;
      let c09 = 19, c1019 = 0, c20 = 11;
      while (!valid && attempts < 100) {
        attempts++;
        T = getRandomInt(25, 35);
        a09 = getRandomInt(3, 8);
        a1019 = getRandomInt(12, 20);
        a20 = T - a09 - a1019;
        if (a20 < 3 || a20 > 12) continue;

        b09 = getRandomInt(4, 10);
        b1019 = getRandomInt(5, 15);
        b20 = T - b09 - b1019;
        if (b1019 < 3 || b20 < 3) continue;

        // Each column must sum to the group total T.
        c09 = T - a09 - b09;
        c1019 = T - a1019 - b1019;
        c20 = T - a20 - b20;
        if (c09 < 1 || c1019 < 1 || c20 < 1) continue;
        if (c09 + c1019 + c20 !== T) continue;

        valid = true;
      }
      if (!valid) continue; // re-draw the whole thing

      // --- candidate options for this table ---
      const gA = a1019 + a20;      // Group A, at least 10 years old
      const t10 = 2 * T;           // participants at least 10 years old (two columns)
      const grand = 3 * T;         // all participants

      const correctVal = gA / t10;
      const dAVal = a09 / t10;     // wrong numerator: uses the 0-9 count
      const dCVal = a1019 / t10;   // numerator omits the 20+ group
      const dDVal = gA / grand;    // wrong denominator: divides by the whole population

      // Reject unless all four are distinct by value (what the grader compares).
      const vals = [correctVal, dAVal, dCVal, dDVal];
      let dup = false;
      for (let i = 0; i < 4; i++) {
        for (let j = i + 1; j < 4; j++) {
          if (Math.abs(vals[i] - vals[j]) < 1e-9) dup = true;
        }
      }
      if (dup) continue; // re-draw

      // commit
      totalPerGroup = T;
      groupA_0_9 = a09; groupA_10_19 = a1019; groupA_20_plus = a20;
      groupB_0_9 = b09; groupB_10_19 = b1019; groupB_20_plus = b20;
      groupC_0_9 = c09; groupC_10_19 = c1019; groupC_20_plus = c20;
      built = true;
    }
    // If the loop exhausted (does not happen for the seeded draws), the
    // deterministic fallback above is already column-consistent and
    // yields four distinct option values (5/12, 1/12, 17/60, 5/18).

    const groupA_atLeast10 = groupA_10_19 + groupA_20_plus;
    const total_atLeast10 = 2 * totalPerGroup;
    const grandTotal = 3 * totalPerGroup;

    const g = gcd(groupA_atLeast10, total_atLeast10);
    const simplifiedNum = groupA_atLeast10 / g;
    const simplifiedDen = total_atLeast10 / g;

    const correctAnswerText = frac(groupA_atLeast10, total_atLeast10);

    const optionsData = [
      {
        text: frac(groupA_0_9, total_atLeast10),
        isCorrect: false,
        reason: "results from using the number of Group A participants aged 0-9 years in the numerator instead of those at least 10 years old"
      },
      { text: correctAnswerText, isCorrect: true },
      {
        text: frac(groupA_10_19, total_atLeast10),
        isCorrect: false,
        reason: "results from counting only the 10-19 age group in the numerator and omitting the 20+ participants"
      },
      {
        text: frac(groupA_atLeast10, grandTotal),
        isCorrect: false,
        reason: "results from dividing by all participants instead of only those at least 10 years old"
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto; text-align: center; background: transparent; width: 100%; max-width: 560px;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Group</th>
      <th style="border: 1px solid currentColor; padding: 8px;">0-9 years</th>
      <th style="border: 1px solid currentColor; padding: 8px;">10-19 years</th>
      <th style="border: 1px solid currentColor; padding: 8px;">20+ years</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Group A</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${groupA_0_9}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${groupA_10_19}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${groupA_20_plus}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalPerGroup}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Group B</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${groupB_0_9}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${groupB_10_19}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${groupB_20_plus}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalPerGroup}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Group C</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${groupC_0_9}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${groupC_10_19}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${groupC_20_plus}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalPerGroup}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Total</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalPerGroup}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalPerGroup}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalPerGroup}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${grandTotal}</td>
    </tr>
  </tbody>
</table>`;

    return {
      questionText: `The table shows the distribution of participants across three groups by age. One of these participants will be selected at random. What is the probability of selecting a participant from Group A, given that the participant is at least 10 years of age?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswerText,
      explanation: `Choice ${correctLetter} is correct. The participants at least 10 years old come from the 10-19 and 20+ columns, each of which totals ${totalPerGroup}, so there are ${total_atLeast10} such participants. Within Group A, ${groupA_10_19} + ${groupA_20_plus} = ${groupA_atLeast10} are at least 10 years old. The probability is $\\frac{${groupA_atLeast10}}{${total_atLeast10}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$.\n\nChoice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.\nChoice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.\nChoice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
