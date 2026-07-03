import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1384
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [weights baseWeight..baseWeight+7 with baseWeight 10-25, frequencies 5-15, outlier = maxWeight + 15..25]
 * - Difficulty factors: [Effect of a high outlier on mean vs median]
 * - Distractor patterns: [Student may think both change, that mean stays equal, or that the median also increases]
 * - Constraints: [The outlier is far above every original value, so the mean always increases; the data
 *                 are constructed (odd total count, median-stable retry) so the median is unchanged]
 * - Question type: [Table -> Multiple Choice Text]
 */

export const generator_1384 = {
  metadata: {
    id: "1384",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Build an original distribution whose median is unchanged when one
    // high outlier is appended. We require an ODD total count so the original
    // median is a single, well-defined data value, and we retry (bounded) until
    // appending the outlier leaves the median unchanged.
    let weights: number[] = [];
    let frequencies: number[] = [];
    let totalCount = 0;
    let originalMedian = 0;
    let newMedian = 0;
    let originalMean = 0;
    let newMean = 0;
    let outlier = 0;

    let valid = false;
    let attempts = 0;
    while (!valid && attempts < 100) {
      attempts++;

      const baseWeight = getRandomInt(10, 25);
      weights = Array.from({ length: 8 }, (_, i) => baseWeight + i);
      frequencies = weights.map(() => getRandomInt(5, 15));
      totalCount = frequencies.reduce((a, b) => a + b, 0);

      // Require an odd count so the median is a single value.
      if (totalCount % 2 === 0) continue;

      // Expand into the sorted list of individual values.
      const sortedValues: number[] = [];
      weights.forEach((w, i) => {
        for (let j = 0; j < frequencies[i]; j++) sortedValues.push(w);
      });

      // Original median (odd count): the middle value.
      originalMedian = sortedValues[(totalCount - 1) / 2];

      // Outlier is well above every original weight, so the mean always rises.
      outlier = weights[weights.length - 1] + getRandomInt(15, 25);

      // New median (even count = totalCount + 1): mean of the two middle values.
      const newSorted = [...sortedValues, outlier].sort((a, b) => a - b);
      const midHi = (totalCount + 1) / 2;          // 1-based upper middle position
      newMedian = (newSorted[midHi - 1] + newSorted[midHi]) / 2;

      const originalSum = sortedValues.reduce((a, b) => a + b, 0);
      originalMean = originalSum / totalCount;
      newMean = (originalSum + outlier) / (totalCount + 1);

      // Accept only when the median is unchanged (and, by construction, an integer).
      if (Math.abs(newMedian - originalMedian) < 1e-9) valid = true;
    }

    // Deterministic fallback with the same guaranteed properties: odd total count
    // (71), median 16 both before and after, outlier far above every value.
    if (!valid) {
      weights = [13, 14, 15, 16, 17, 18, 19, 20];
      frequencies = [5, 7, 9, 11, 13, 10, 8, 8]; // sums to 71 (odd)
      const sv: number[] = [];
      weights.forEach((w, i) => {
        for (let j = 0; j < frequencies[i]; j++) sv.push(w);
      });
      totalCount = sv.length; // 71
      originalMedian = sv[(totalCount - 1) / 2];
      outlier = weights[weights.length - 1] + 20; // 40
      const newSorted = [...sv, outlier].sort((a, b) => a - b);
      const midHi = (totalCount + 1) / 2;
      newMedian = (newSorted[midHi - 1] + newSorted[midHi]) / 2;
      const originalSum = sv.reduce((a, b) => a + b, 0);
      originalMean = originalSum / totalCount;
      newMean = (originalSum + outlier) / (totalCount + 1);
    }

    // STEP 2: Build the frequency table.
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Weight (pounds)</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Frequency</th>
    </tr>
  </thead>
  <tbody>
    ${weights.map((w, i) => `
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${w}</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${frequencies[i]}</td>
    </tr>`).join('')}
  </tbody>
</table>`;

    // STEP 3: Options. By construction the mean increases and the medians are equal.
    const correctText = "The mean increases, and the medians are equal.";
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: "The mean and median both increase.", isCorrect: false },
      { text: "The mean stays the same, and the medians are equal.", isCorrect: false },
      { text: "The median increases, and the means are equal.", isCorrect: false }
    ];

    // STEP 4: Shuffle and assign letters AFTER shuffling.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    // STEP 5: Return question data. All figures computed from the live variables.
    const medianPosition = (totalCount + 1) / 2; // 1-based position of the odd-count median

    return {
      questionText: `The frequency table summarizes a data set of the weights, rounded to the nearest pound, of a group of tortoises. A tortoise with a weight of ${outlier} pounds is then added to the original data set, creating a new data set. Which statement best compares the mean and the median of the new data set with those of the original data set?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The original data set has ${totalCount} values, so its median is the ${medianPosition}th value, which is ${originalMedian} pounds. The added weight of ${outlier} pounds is greater than every original value (the largest is ${weights[weights.length - 1]} pounds), so it lies above the middle of the ordered data: the new median is still ${newMedian} pounds, unchanged. However, because ${outlier} is far above the original mean of about ${originalMean.toFixed(1)} pounds, it pulls the mean upward to about ${newMean.toFixed(1)} pounds. Therefore, the mean increases while the medians are equal. The other choices are incorrect because the median does not change (it is not an increase), and the mean cannot stay the same when a value larger than every existing value is added.`
    };
  }
};
