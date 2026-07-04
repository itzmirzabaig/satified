import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 922
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base value: 3-8, outlier: 15x-25x base]
 * - Difficulty factors: [Comparing mean and median with/without outlier]
 * - Distractor patterns: [Thinking both change, thinking neither changes]
 * - Constraints: [Same values plus outlier changes mean but not median]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_922 = {
  metadata: {
    id: "922",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate base value and a large outlier.
    const baseValue = getRandomInt(3, 8);
    const outlier = baseValue * getRandomInt(15, 25); // Large outlier

    const setA = Array(9).fill(baseValue);
    const setB = [...setA, outlier];

    // STEP 2: Calculate statistics.
    // Set A: nine identical values -> mean = median = baseValue.
    // Set B: adding one high outlier raises the mean but leaves the median
    // (average of the 5th and 6th sorted values, both baseValue) unchanged.
    const sumA = baseValue * 9;
    const sumB = baseValue * 9 + outlier;
    const meanA = sumA / 9;                 // = baseValue (integer)
    const meanB = sumB / 10;                // shown to one decimal
    const medianAB = baseValue;             // identical median for both sets

    const optionsData = [
      { text: `Only the means are different.`, isCorrect: true },
      { text: `Only the medians are different.`, isCorrect: false },
      { text: `Both the means and the medians are different.`, isCorrect: false },
      { text: `Neither the means nor the medians are different.`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // Reason each incorrect statement is wrong, keyed by its OWN text so the
    // reason stays correct no matter how the options were shuffled.
    const reasonFor: Record<string, string> = {
      'Only the medians are different.': `the means are different and the medians are equal, the opposite of what this choice claims`,
      'Both the means and the medians are different.': `the medians are both ${medianAB}, so the medians are not different`,
      'Neither the means nor the medians are different.': `the means are different (${meanA} versus ${meanB.toFixed(1)})`
    };

    const distractorText = incorrectOptions
      .map(o => `Choice ${o.letter} is incorrect because ${reasonFor[o.text]}.`)
      .join(' ');

    return {
      questionText: `Data set A: ${setA.join(', ')}\nData set B: ${setB.join(', ')}\nWhich of the following statements about the means and medians of data set A and data set B is true?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The mean of data set A is $\\frac{${sumA}}{9} = ${meanA}$, and the mean of data set B is $\\frac{${sumA} + ${outlier}}{10} = ${meanB.toFixed(1)}$, so the means are different. Both data sets have the same median: the middle values are all ${baseValue}, so the median of each set is ${baseValue}. Therefore only the means are different. ${distractorText}`
    };
  }
};
