import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1382
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [integer mean M ~42, sum of 9 values = 9*M, 10th value must make total sum divisible by 10, range M < x < 60]
 * - Difficulty factors: [Multi-step: find sum, determine divisibility constraint, find the unique valid integer in range]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [10th value > M, < 60, sum of all 10 must be divisible by 10, value must be integer, EXACTLY ONE such x exists]
 * - Question type: [Text→Fill in the blank]
 *
 * WELL-POSEDNESS NOTE:
 * The nine shown values are constructed so their sum is a multiple of 9, hence
 * their mean M is an exact integer (no rounded/false decimal in the stem). The
 * accept loop keeps only draws for which EXACTLY ONE integer x satisfies
 * M < x < 60 together with the divisibility-by-10 requirement, so the answer
 * (the largest value in data set A) is unique for every draw.
 */

export const generator_1382 = {
  metadata: {
    id: "1382",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate 9 base values whose sum is a multiple of 9 (so the mean
    // is an exact integer) AND for which exactly one valid 10th value exists.
    let valid = false;
    let baseValues: number[] = [];
    let sumOfNine = 0;
    let meanOfNine = 0; // exact integer M
    let onesDigit = 0;  // required ones digit of x
    let finalX = 0;
    let attempts = 0;

    while (!valid && attempts < 300) {
      attempts++;
      baseValues = [
        getRandomInt(36, 44),
        getRandomInt(36, 44),
        getRandomInt(38, 46),
        getRandomInt(38, 46),
        getRandomInt(40, 48),
        getRandomInt(40, 48),
        getRandomInt(40, 48),
        getRandomInt(42, 49),
        getRandomInt(42, 49)
      ];

      sumOfNine = baseValues.reduce((a, b) => a + b, 0);

      // Require an exact integer mean so the stated mean is truthful.
      if (sumOfNine % 9 !== 0) continue;
      meanOfNine = sumOfNine / 9;

      // x must be an integer with M < x < 60 and (sumOfNine + x) divisible by 10.
      onesDigit = (10 - (sumOfNine % 10)) % 10;
      const candidates: number[] = [];
      for (let candidate = meanOfNine + 1; candidate < 60; candidate++) {
        if ((sumOfNine + candidate) % 10 === 0) {
          candidates.push(candidate);
        }
      }

      // Accept only when the valid value is UNIQUE and is strictly the largest
      // value in data set A (larger than all nine shown integers).
      if (candidates.length === 1 && candidates[0] > Math.max(...baseValues)) {
        finalX = candidates[0];
        valid = true;
      }
    }

    // Fallback: a known-good configuration (mean 42, unique x = 52).
    if (!valid) {
      baseValues = [38, 39, 40, 40, 43, 43, 44, 45, 46];
      sumOfNine = 378;
      meanOfNine = 42;
      onesDigit = 2;
      finalX = 52;
    }

    // STEP 2: Format the list of 9 values
    const valuesList = baseValues.join(", ");

    // STEP 3: Return question data
    return {
      questionText: `Data set A consists of positive integers less than 60. The list shown gives 9 of the integers from data set A.\n\n${valuesList}\n\nThe mean of these integers is ${meanOfNine}. If the mean of data set A is an integer that is greater than ${meanOfNine}, what is the value of the largest integer from data set A?`,
      figureCode: null,
      options: [],
      correctAnswer: finalX.toString(),
      explanation: `The correct answer is ${finalX}. The mean of a data set is the sum of the values divided by the number of values. Data set A consists of 10 values, 9 of which are shown. Let x represent the 10th data value. The mean of data set A is (${sumOfNine} + x)/10. The 9 shown values have a mean of ${meanOfNine}, and the mean of all 10 values is greater than ${meanOfNine}, so the 10th value x is greater than ${meanOfNine}. Because every value in data set A is a positive integer less than 60, it follows that ${meanOfNine} < x < 60. The mean of data set A is also an integer, so the sum of all 10 values, ${sumOfNine} + x, is divisible by 10; that is, ${sumOfNine} + x must end in 0. Therefore x must end in the digit ${onesDigit}. The only integer with ${meanOfNine} < x < 60 that ends in ${onesDigit} is ${finalX}. Since ${finalX} is greater than every integer shown, the largest integer in data set A is ${finalX}.`
    };
  }
};
