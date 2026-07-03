import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 919
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [prices: $3.60-$3.75]
 * - Difficulty factors: [Finding median of 5 decimal values]
 * - Distractor patterns: [Mean instead of median, mode instead of median]
 * - Constraints: [5 values, 3rd is median]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_919 = {
  metadata: {
    id: "919",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate 5 gas prices with a clear, unambiguous median.
    // Work in whole cents so every displayed value is an exact 2-decimal dollar
    // amount (no float artifacts). Fixed cent-offsets added to a random base keep
    // the sorted order fixed for every draw:
    //   sorted offsets: 2, 12, 20, 28, 28  (28 repeats -> a genuine mode)
    // From these, median / mean / mode all land on distinct whole cents:
    //   median = base + 20   (3rd of 5 sorted values)
    //   mean   = base + 18    (sum of offsets 90, /5 = 18)
    //   mode   = base + 28    (the repeated value, also the maximum)
    //   2nd    = base + 12    (second-lowest value)
    // 12, 18, 20, 28 are pairwise distinct, so no distractor can ever collide
    // with the correct answer or another distractor.
    const startCents = getRandomInt(300, 372); // base $3.00–$3.72, so max price ≤ $4.00
    const offsets = [12, 2, 28, 20, 28];        // cents added to base (unsorted, as shown)
    const cents = offsets.map(o => startCents + o);
    const prices = cents.map(c => c / 100);

    // STEP 2: Statistics, computed from the live values
    const sortedCents = [...cents].sort((a, b) => a - b);
    const medianCents = sortedCents[2];                       // middle of 5
    const meanCents = cents.reduce((a, b) => a + b, 0) / 5;   // exact: base + 18
    const modeCents = startCents + 28;                        // the repeated value
    const secondCents = sortedCents[1];                       // second-lowest

    // Format helper: two-decimal currency, escaped so MathJax never pairs the $.
    const money = (dollars: number) => `\\$${dollars.toFixed(2)}`;
    const moneyC = (centsVal: number) => money(centsVal / 100);

    // STEP 3: Build HTML table (values match the question numbers exactly)
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
      <thead>
        <tr>
          <th style="border: 1px solid currentColor; padding: 8px;">Station 1</th>
          <th style="border: 1px solid currentColor; padding: 8px;">Station 2</th>
          <th style="border: 1px solid currentColor; padding: 8px;">Station 3</th>
          <th style="border: 1px solid currentColor; padding: 8px;">Station 4</th>
          <th style="border: 1px solid currentColor; padding: 8px;">Station 5</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${money(prices[0])}</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${money(prices[1])}</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${money(prices[2])}</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${money(prices[3])}</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${money(prices[4])}</td>
        </tr>
      </tbody>
    </table>`;

    // STEP 4: Options — median (correct), plus the classic mean / mode / lower-value traps
    const optionsData = [
      { text: moneyC(medianCents), isCorrect: true },
      { text: moneyC(meanCents), isCorrect: false },
      { text: moneyC(modeCents), isCorrect: false },
      { text: moneyC(secondCents), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const meanOpt = shuffledOptions.find(o => o.text === moneyC(meanCents))!;
    const modeOpt = shuffledOptions.find(o => o.text === moneyC(modeCents))!;
    const secondOpt = shuffledOptions.find(o => o.text === moneyC(secondCents))!;

    return {
      questionText: `In the table above, a driver recorded the price of one gallon of regular gas from five different local gas stations on the same day. What is the median of the gas prices, in dollars?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To find the median, arrange the prices in ascending order: ${sortedCents.map(c => moneyC(c)).join(', ')}. With five values, the median is the middle (third) value, ${moneyC(medianCents)}. Choice ${meanOpt.letter} is incorrect because ${moneyC(meanCents)} is the mean (the sum of all five prices divided by 5), not the median. Choice ${modeOpt.letter} is incorrect because ${moneyC(modeCents)} is the mode (the most frequent price) and the highest value, not the middle one. Choice ${secondOpt.letter} is incorrect because ${moneyC(secondCents)} is the second-lowest price rather than the middle value.`
    };
  }
};
