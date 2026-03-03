import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f4b3672a
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [253 acres (3-digit), 5 samples (single-digit), 51, 59, 45, 52, 73 (double-digit tree counts)]
 * - Difficulty factors: [Mean calculation, multiplication with 3-digit number, range selection]
 * - Distractor patterns: A is too low, B is lower than estimate, C is Correct (contains calculated value), D is too high
 * - Constraints: [Mean × total must fall cleanly within one range option, sample values should be varied]
 * - Question type: [Mean→Multiple Choice Range]
 * - Figure generation: [None - calculation-based question]
 */

export const generator_f4b3672a = {
  metadata: {
    // id: "f4b3672a",
    assessment: "SAT",
    domain: "Problem-Solving and Data Analysis",
    skill: "Inference from sample statistics and margin of error",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const totalAcres = getRandomInt(200, 300);
    const numSamples = 5;
    const sampleValues = [
      getRandomInt(40, 60),
      getRandomInt(50, 70),
      getRandomInt(35, 55),
      getRandomInt(45, 65),
      getRandomInt(60, 85)
    ];

    const mean = sampleValues.reduce((a, b) => a + b, 0) / numSamples;
    const estimatedTotal = Math.round(mean * totalAcres);
    const rangeSize = 1000;
    const rangeStart = Math.floor(estimatedTotal / rangeSize) * rangeSize;
    const rangeEnd = rangeStart + rangeSize;
    const correctRange = `$${rangeStart.toLocaleString()}$ to $${rangeEnd.toLocaleString()}$`;

    const locationTypes = ["forest", "park", "nature reserve", "woodland"];
    const location = getRandomElement(locationTypes);
    const measurerTypes = ["ranger", "forester", "ecologist", "surveyor"];
    const measurer = getRandomElement(measurerTypes);
    const objectTypes = ["trees", "birds", "plants", "flowers"];
    const objectType = getRandomElement(objectTypes);

    const distractorARange = `$${(rangeStart - 3000).toLocaleString()}$ to $${(rangeEnd - 3000).toLocaleString()}$`;
    const distractorBRange = `$${(rangeStart - 1500).toLocaleString()}$ to $${(rangeEnd - 1500).toLocaleString()}$`;
    const distractorDRange = `$${(rangeStart + 4000).toLocaleString()}$ to $${(rangeEnd + 4000).toLocaleString()}$`;

    const optionsData = [
      { text: distractorARange, isCorrect: false, reason: "is too low" },
      { text: distractorBRange, isCorrect: false, reason: "is lower than the estimate" },
      { text: correctRange, isCorrect: true },
      { text: distractorDRange, isCorrect: false, reason: "is too high" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const sampleList = sampleValues.join("$, $");
    const sum = sampleValues.reduce((a, b) => a + b, 0);

    const explanation = `Choice ${correctLetter} is correct. Calculate the mean: $\\frac{${sampleList}}{${numSamples}} = \\frac{${sum}}{${numSamples}} = ${mean}$ ${objectType} per acre. Then estimate total: $${mean} \\times ${totalAcres} = ${estimatedTotal}$, which falls in the range ${correctRange}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A certain ${location} is $${totalAcres}$ acres. To estimate the number of ${objectType} in the ${location}, a ${measurer} randomly selects $${numSamples}$ different $1$-acre parcels in the ${location} and determines the number of ${objectType} in each parcel. The numbers of ${objectType} in the sample acres are $${sampleList}$. Based on the mean of the sample, which of the following ranges contains the best estimate for the number of ${objectType} in the entire ${location}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 0108ac2d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [300 students, 38% percentage, 5.5% margin (decimal percentage)]
 * - Difficulty factors: [Margin of error interpretation, percentage interval calculation]
 * - Distractor patterns: A treats point estimate as exact, B claims greater than 38%, C is Correct interval, D confuses percentage with count
 * - Constraints: [Percentage must be exact, margin creates clean decimal bounds]
 * - Question type: [Margin of error interpretation→Multiple Choice Text]
 * - Figure generation: [None - conceptual question]
 */