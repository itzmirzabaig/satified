import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1467
 *
 * ANALYSIS:
 * - Context: Percent increase over three consecutive years (2012 -> 2014).
 * - Logic:
 *   Let r = percent increase from 2013 to 2014.
 *   The percent increase from 2012 to 2013 is double that: 2r.
 *   The table shows 2013 and 2014; the student works backwards to find 2012.
 *   Numbers are constructed so every intermediate value is an exact integer
 *   and every stated percentage is exact.
 */
export const generator_1467 = {
  metadata: {
    id: "1467",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    // r = percent increase 2013 -> 2014; 2r = percent increase 2012 -> 2013.
    const rates = [5, 10, 20];

    let r = 0;
    let r2 = 0;
    let y2012 = 0;
    let y2013 = 0;
    let y2014 = 0;

    // Choose values so that y2013 = y2012*(1 + 2r/100) and
    // y2014 = y2013*(1 + r/100) are BOTH exact integers (no rounding drift,
    // so the stated percentages are exactly r% and 2r%).
    let tries = 0;
    do {
      r = rates[getRandomInt(0, rates.length - 1)];
      r2 = 2 * r;
      y2012 = getRandomInt(40, 60) * 100; // multiple of 100, 4000..6000
      const raw13 = y2012 * (1 + r2 / 100);
      const raw14 = raw13 * (1 + r / 100);
      const exact = Number.isInteger(raw13) && Number.isInteger(raw14);
      if (exact) {
        y2013 = raw13;
        y2014 = raw14;
      }
      tries++;
    } while (
      (!Number.isInteger(y2013) || !Number.isInteger(y2014) || y2013 === 0) &&
      tries < 50
    );

    // Deterministic fallback guaranteeing exact integers if the loop was unlucky.
    if (!Number.isInteger(y2013) || !Number.isInteger(y2014) || y2013 === 0) {
      r = 10;
      r2 = 20;
      y2012 = 5000;
      y2013 = y2012 * (1 + r2 / 100); // 6000
      y2014 = y2013 * (1 + r / 100);  // 6600
    }

    const inc1314 = y2014 - y2013; // exact increase 2013 -> 2014

    // 2. HTML Table Generation (2012 value hidden as the unknown)
    const tableCode = `
      <div style="width: 100%; max-width: 300px; margin: 0 auto; font-family: sans-serif; border: 1px solid currentColor; border-radius: 4px; overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse; text-align: center;">
          <thead style="background-color: rgba(0,0,0,0.05);">
            <tr>
              <th style="padding: 10px; border-bottom: 1px solid currentColor; border-right: 1px solid currentColor;">Year</th>
              <th style="padding: 10px; border-bottom: 1px solid currentColor;">Subscriptions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid currentColor; border-right: 1px solid currentColor;">2012</td>
              <td style="padding: 8px; border-bottom: 1px solid currentColor;">?</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid currentColor; border-right: 1px solid currentColor;">2013</td>
              <td style="padding: 8px; border-bottom: 1px solid currentColor;">${y2013}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-right: 1px solid currentColor;">2014</td>
              <td style="padding: 8px;">${y2014}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    // 3. Options (correct answer first, then plausible distractors)
    const optionSet = new Set<number>([y2012]);
    const distractors: number[] = [];

    const addDistractor = (val: number) => {
      const v = Math.round(val);
      if (v > 0 && !optionSet.has(v)) {
        optionSet.add(v);
        distractors.push(v);
      }
    };

    // D1: applied r% (instead of 2r%) when working backwards.
    addDistractor(y2013 / (1 + r / 100));
    // D2: treated the change as linear/additive (subtracted the 2013->2014 gap).
    addDistractor(y2013 - inc1314);
    // D3: worked forward from 2013 instead of backward to 2012 (used 2014).
    addDistractor(y2014 / (1 + r2 / 100));

    // Fill any remaining slots with guaranteed-distinct nearby values.
    let pad = 1;
    while (distractors.length < 3 && pad < 50) {
      addDistractor(y2012 - 10 * pad);
      addDistractor(y2012 + 10 * pad);
      pad++;
    }

    const optionsData = [
      { text: y2012.toString(), isCorrect: true },
      { text: distractors[0].toString(), isCorrect: false },
      { text: distractors[1].toString(), isCorrect: false },
      { text: distractors[2].toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The table above shows the number of subscriptions to a service for the years 2012 through 2014. The percent increase in the number of subscriptions from 2012 to 2013 was double the percent increase from 2013 to 2014. How many subscriptions were there in 2012?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct.

1. Find the percent increase from 2013 to 2014. The number of subscriptions rose by ${y2014} - ${y2013} = ${inc1314}, so the percent increase is $\\frac{${inc1314}}{${y2013}} = ${r}\\%$.

2. The increase from 2012 to 2013 was double this, or $\\left(2\\right)\\left(${r}\\%\\right) = ${r2}\\%$.

3. Let $x$ be the number of subscriptions in 2012. Then $x\\left(1 + \\frac{${r2}}{100}\\right) = ${y2013}$, so $x = \\frac{${y2013}}{${1 + r2 / 100}} = ${y2012}$.

The other choices come from using the wrong rate, treating the change as a constant amount, or working forward from 2013 instead of back to 2012.`
    };
  }
};
