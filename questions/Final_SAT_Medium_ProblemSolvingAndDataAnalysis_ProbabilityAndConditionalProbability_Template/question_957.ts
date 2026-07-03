import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 957
 *
 * Conditional probability from a two-way frequency table.
 * P(weekend day | no rain) = weekendNoRain / totalNoRain.
 *
 * FIXES:
 * - Removed personal name ("Anka") -> generic student role with "they".
 * - correctAnswer now exactly equals the correct option string (with $...$),
 *   eliminating CORRECT_FUZZY / numeric-equivalence mis-resolution.
 * - Bounded retry (<=50) guarantees all four option VALUES are distinct,
 *   eliminating DUP_OPTIONS for every draw.
 * - Explanation describes each distractor by its reasoning (no letter-based
 *   "incorrect" claims, so letters stay shuffle-consistent).
 */

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

// Reduced-fraction TeX plus a numeric value for collision checks.
const frac = (num: number, den: number): { tex: string; value: number } => {
  const g = gcd(Math.abs(num), Math.abs(den)) || 1;
  return { tex: `$\\frac{${num / g}}{${den / g}}$`, value: num / den };
};

export const generator_957 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const weeks = 12;

    // STEP 1: Generate parameters, retrying until all four option values are
    // distinct (bounded). Distractors are derived from the same counts as the
    // correct answer, so we regenerate the counts rather than nudge a distractor.
    let weekdaysRain = 0, weekdaysNoRain = 0, weekendRain = 0, weekendNoRain = 0;
    let weekdaysTotal = 0, weekendTotal = 0, totalDays = 0, totalRain = 0, totalNoRain = 0;
    let correct = frac(0, 1), d1 = frac(0, 1), d2 = frac(0, 1), d3 = frac(0, 1);

    let tries = 0;
    do {
      weekdaysRain = getRandomInt(10, 15);
      weekdaysNoRain = getRandomInt(45, 55);
      weekendRain = getRandomInt(6, 10);
      weekendNoRain = getRandomInt(14, 20);

      weekdaysTotal = weekdaysRain + weekdaysNoRain;
      weekendTotal = weekendRain + weekendNoRain;
      totalDays = weekdaysTotal + weekendTotal;
      totalRain = weekdaysRain + weekendRain;
      totalNoRain = weekdaysNoRain + weekendNoRain;

      // STEP 2: Correct conditional probability P(weekend | no rain), plus the
      // three most common wrong approaches as distractors.
      correct = frac(weekendNoRain, totalNoRain);        // weekend & no rain / all no-rain
      d1 = frac(weekendTotal, totalDays);                // all weekend / all days
      d2 = frac(totalNoRain, totalDays);                 // all no-rain / all days
      d3 = frac(weekdaysNoRain, totalNoRain);            // weekday & no rain / all no-rain
    } while (
      new Set([correct.value, d1.value, d2.value, d3.value]).size !== 4 &&
      tries++ < 50
    );

    const simplifiedNum = weekendNoRain / (gcd(weekendNoRain, totalNoRain) || 1);
    const simplifiedDen = totalNoRain / (gcd(weekendNoRain, totalNoRain) || 1);

    // STEP 3: Build table
    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto; text-align: center; background: transparent; width: 100%; max-width: 400px;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;"></th>
      <th style="border: 1px solid currentColor; padding: 8px;">Rain</th>
      <th style="border: 1px solid currentColor; padding: 8px;">No rain</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Number of weekdays</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${weekdaysRain}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${weekdaysNoRain}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${weekdaysTotal}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Number of weekend days</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${weekendRain}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${weekendNoRain}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${weekendTotal}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Total</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalRain}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalNoRain}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalDays}</td>
    </tr>
  </tbody>
</table>`;

    // STEP 4: Create options
    const optionsData = [
      { text: d1.tex, isCorrect: false },
      { text: correct.tex, isCorrect: true },
      { text: d2.tex, isCorrect: false },
      { text: d3.tex, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `For a science project, a student recorded whether it rained each weekday and weekend day for ${weeks} weeks. Their results are summarized in the table below. If one of the days on which there was no rain is selected at random, what is the probability the day was a weekend day?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correct.tex,
      explanation: `Choice ${correctLetter} is correct. Of the ${totalNoRain} days with no rain, ${weekendNoRain} were weekend days, so the probability is $\\frac{${weekendNoRain}}{${totalNoRain}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$. Dividing the weekend days or no-rain days by the total of ${totalDays} days ignores the given condition (no rain), and using the ${weekdaysNoRain} weekday no-rain days counts the wrong group.`
    };
  }
};