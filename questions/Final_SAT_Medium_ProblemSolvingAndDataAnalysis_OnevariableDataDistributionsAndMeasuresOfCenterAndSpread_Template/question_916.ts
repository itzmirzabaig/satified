import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 916
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ages: 18-30, frequencies: 1-9]
 * - Difficulty factors: [Comparing mean, median, mode from frequency table]
 * - Distractor patterns: [Wrong ordering of measures]
 * - Constraints: [Must create clear distinction with unique mode < median < mean]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_916 = {
  metadata: {
    id: "916",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Build an age distribution guaranteeing a UNIQUE mode at the lowest
    // age and a strict mode < median < mean ordering. Everything is computed
    // live and re-validated, so the marked answer is correct for every draw.
    let ages: number[] = [];
    let frequencies: number[] = [];
    let mode = 0;
    let median = 0;
    let meanExact = 0;
    let totalStudents = 0;
    let weightedSum = 0;

    let tries = 0;
    while (tries++ < 50) {
      const baseAge = getRandomInt(18, 22);
      const outlierAge = baseAge + getRandomInt(10, 15);
      ages = [baseAge, baseAge + 1, baseAge + 2, baseAge + 3, baseAge + 4, baseAge + 5, outlierAge];
      frequencies = [
        getRandomInt(7, 9),  // dominant mode at the lowest age
        getRandomInt(3, 5),
        getRandomInt(3, 5),
        getRandomInt(2, 4),
        getRandomInt(1, 3),
        1,
        1                    // high-age outlier pulls the mean up
      ];

      const maxFreq = Math.max(...frequencies);
      // Require a single unique mode, located at the lowest age.
      if (frequencies.filter(f => f === maxFreq).length !== 1) continue;
      if (frequencies.indexOf(maxFreq) !== 0) continue;

      totalStudents = frequencies.reduce((a, b) => a + b, 0);

      // Median from the expanded, sorted data set.
      const expanded: number[] = [];
      for (let i = 0; i < ages.length; i++) {
        for (let k = 0; k < frequencies[i]; k++) expanded.push(ages[i]);
      }
      expanded.sort((a, b) => a - b);
      const n = expanded.length;
      median = n % 2 === 1
        ? expanded[(n - 1) / 2]
        : (expanded[n / 2 - 1] + expanded[n / 2]) / 2;

      weightedSum = 0;
      for (let i = 0; i < ages.length; i++) weightedSum += ages[i] * frequencies[i];
      meanExact = weightedSum / totalStudents;
      mode = ages[0];

      // Display the mean to one decimal; require the shown values to satisfy
      // mode < median < mean strictly so the stated ordering is truthful.
      const meanShown = Math.round(meanExact * 10) / 10;
      if (mode < median && median < meanShown) break;
    }

    // Values as shown to the student. Median is integer or half-integer and
    // meanDisplay is rounded to one decimal, so both interpolate cleanly.
    const meanDisplay = Math.round(meanExact * 10) / 10;

    // STEP 2: Build HTML table.
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
      <thead>
        <tr>
          <th style="border: 1px solid currentColor; padding: 8px;">Age</th>
          <th style="border: 1px solid currentColor; padding: 8px;">Frequency</th>
        </tr>
      </thead>
      <tbody>
        ${ages.map((age, i) => `
        <tr>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${age}</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${frequencies[i]}</td>
        </tr>`).join('')}
      </tbody>
    </table>`;

    // STEP 3: Options are four orderings of the three measures.
    const optionsData = [
      { text: `mode < median < mean`, isCorrect: true },
      { text: `mode < mean < median`, isCorrect: false },
      { text: `median < mode < mean`, isCorrect: false },
      { text: `mean < mode < median`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // Reason each incorrect ordering is wrong, keyed by its OWN text so the
    // reason stays correct no matter how the options were shuffled.
    const reasonFor: Record<string, string> = {
      'mode < mean < median': `the mean (${meanDisplay}) is greater than the median (${median}), not less`,
      'median < mode < mean': `the mode (${mode}) is less than the median (${median}), not greater`,
      'mean < mode < median': `the mean (${meanDisplay}) is the largest of the three values, not the smallest`
    };

    const distractorText = incorrectOptions
      .map(o => `Choice ${o.letter} is incorrect because ${reasonFor[o.text]}.`)
      .join(' ');

    return {
      questionText: `The table above shows the distribution of ages of the ${totalStudents} students enrolled in a college class. Which of the following gives the correct order of the mean, median, and mode of the ages?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The mode is the age with the greatest frequency, which is ${mode}. The median is ${median}. The mean is $\\frac{${weightedSum}}{${totalStudents}} \\approx ${meanDisplay}$. Thus, ${mode} < ${median} < ${meanDisplay}, or mode < median < mean. ${distractorText}`
    };
  }
};
