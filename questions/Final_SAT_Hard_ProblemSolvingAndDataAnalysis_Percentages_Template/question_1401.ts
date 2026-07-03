import { getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1401
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [subscriptions: mid-range multiples of 100]
 * - Difficulty factors: [Percent increase calculation, compound relationship between years]
 * - Distractor patterns: [Applied full percent again, wrong base year, additive percentage error]
 * - Constraints: [First increase must be exactly double the second increase; every displayed
 *   figure AND the expected answer must be an exact integer (no rounding artifacts)]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [HTML Table - years and subscription counts]
 *
 * CONSTRUCTION NOTE (answer-first, provably clean):
 * We enumerate all (base, secondPct) pairs with base a multiple of 100 in a mid range
 * where firstPct = 2*secondPct AND both year2 = base*(1+firstPct/100) and
 * year3 = year2*(1+secondPct/100) are exact integers. This guarantees the value shown for
 * 2013 and the correct answer for 2014 are whole numbers, so no floating-point rounding is
 * ever visible and the explanation's arithmetic is exact. Distractors are then built from
 * three classic misconceptions; the pool was verified so all four options are distinct and
 * positive for every pair.
 */

export const generator_1401 = {
  metadata: {
    id: "1401",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Build the pool of clean (base, secondPct) pairs.
    // secondPct in 1..5 -> firstPct in 2..10; base multiple of 100 in [4000, 9000].
    type Combo = { base: number; firstPct: number; secondPct: number; year2: number; year3: number };
    const pool: Combo[] = [];
    for (let secondPct = 1; secondPct <= 5; secondPct++) {
      const firstPct = 2 * secondPct;
      for (let base = 4000; base <= 9000; base += 100) {
        const year2 = base * (1 + firstPct / 100);
        if (!Number.isInteger(year2)) continue;
        const year3 = year2 * (1 + secondPct / 100);
        if (!Number.isInteger(year3)) continue;
        pool.push({ base, firstPct, secondPct, year2, year3 });
      }
    }

    // STEP 2: Pick one clean scenario.
    const { base: baseSubs, firstPct: firstIncreasePct, secondPct: secondIncreasePct, year2: year2Subs, year3: year3Subs } =
      getRandomElement(pool);

    // STEP 3: Build the HTML table (shows only the two given years, 2012 and 2013).
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Year</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Subscriptions sold</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">2012</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${baseSubs.toLocaleString()}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">2013</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${year2Subs.toLocaleString()}</td>
    </tr>
  </tbody>
</table>`;

    // STEP 4: Distractors from common misconceptions (pool verified: all distinct + positive).
    // D1: applied the FULL (2012->2013) percent again instead of half of it.
    const wrongApplyFull = Math.round(year2Subs * (1 + firstIncreasePct / 100));
    // D2: applied the second-year percent to the wrong (2012) base instead of 2013's total.
    const wrongBase = Math.round(baseSubs * (1 + secondIncreasePct / 100));
    // D3: added both percents together and applied the sum to the 2012 base (additive error).
    const wrongAddPct = Math.round(baseSubs * (1 + (firstIncreasePct + secondIncreasePct) / 100));

    const optionsData = [
      { text: year3Subs.toLocaleString(), isCorrect: true, reason: "" },
      { text: wrongApplyFull.toLocaleString(), isCorrect: false, reason: "applies the 2012-to-2013 percent again instead of half of it" },
      { text: wrongBase.toLocaleString(), isCorrect: false, reason: "applies the second increase to the 2012 total instead of the 2013 total" },
      { text: wrongAddPct.toLocaleString(), isCorrect: false, reason: "adds both percents together and applies the sum to the 2012 total" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The manager of an online news service received the report above on the number of subscriptions sold by the service. The manager estimated that the percent increase from 2012 to 2013 would be double the percent increase from 2013 to 2014. How many subscriptions did the manager expect would be sold in 2014?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The percent increase from 2012 to 2013 is $\\frac{${year2Subs} - ${baseSubs}}{${baseSubs}} = ${firstIncreasePct}\\%$. Since this is double the increase from 2013 to 2014, the second increase is $\\frac{${firstIncreasePct}}{2} = ${secondIncreasePct}\\%$. Applying a ${secondIncreasePct}% increase to the ${year2Subs.toLocaleString()} subscriptions sold in 2013 gives $\\left(1 + \\frac{${secondIncreasePct}}{100}\\right)\\times ${year2Subs} = ${year3Subs}$, so the manager expected ${year3Subs.toLocaleString()} subscriptions in 2014. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
