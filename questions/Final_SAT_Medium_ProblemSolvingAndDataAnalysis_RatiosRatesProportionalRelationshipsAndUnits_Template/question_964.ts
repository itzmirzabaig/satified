import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 964
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total area: 92.1, water: 11.3, population: 621,000]
 * - Difficulty factors: [Subtraction for land area, then division, closest answer]
 * - Distractor patterns: [A: use total area (6740), C/D: order of magnitude errors]
 * - Constraints: [Must subtract water area first, then calculate density]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_964 = {
  metadata: {
    id: "964",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES).
    // Work in integer tenths so 92.1 - 11.3 style subtraction is exact
    // (avoids float artifacts like 64.60000000000001).
    let totalAreaTenths = 0, waterAreaTenths = 0, landAreaTenths = 0;
    let totalArea = 0, waterArea = 0, landArea = 0;
    let targetDensity = 0, population = 0, roundedDensity = 0;
    let wrongDensityA = 0, wrongDensityC = 0, wrongDensityD = 0;

    // Bounded construction loop: pick values, then verify all four options are
    // distinct after rounding. The math guarantees separation, but the guard
    // makes it robust for every draw including boundaries.
    let tries = 0;
    do {
      totalAreaTenths = getRandomInt(700, 1100);   // 70.0 – 110.0
      waterAreaTenths = getRandomInt(80, 150);     //  8.0 –  15.0
      landAreaTenths = totalAreaTenths - waterAreaTenths;
      totalArea = totalAreaTenths / 10;
      waterArea = waterAreaTenths / 10;
      landArea = landAreaTenths / 10;

      // Pick the density first, then derive a population that yields it exactly
      // to the nearest whole person, so the displayed density is clean.
      targetDensity = getRandomInt(6000, 8500);
      population = Math.round(targetDensity * landArea);

      // Actual density from the constructed population (≈ targetDensity).
      const density = population / landArea;
      roundedDensity = Math.round(density / 10) * 10; // nearest 10

      // A: density using TOTAL area instead of land area (smaller result).
      wrongDensityA = Math.round((population / totalArea) / 10) * 10;
      // C: order-of-magnitude too small (÷10).
      wrongDensityC = Math.round(roundedDensity / 100) * 10;
      // D: order-of-magnitude too large (×10).
      wrongDensityD = roundedDensity * 10;
      tries++;
    } while (
      tries < 50 &&
      new Set([roundedDensity, wrongDensityA, wrongDensityC, wrongDensityD]).size !== 4
    );

    const density = population / landArea;

    // STEP 2: Build options (formatted with thousands separators).
    const optionsData = [
      { text: wrongDensityA.toLocaleString('en-US'), isCorrect: false, reason: "is the population density calculated using the total area instead of the land area" },
      { text: roundedDensity.toLocaleString('en-US'), isCorrect: true },
      { text: wrongDensityC.toLocaleString('en-US'), isCorrect: false, reason: "is off by a factor of ten, as if a decimal point were misplaced to make the value too small" },
      { text: wrongDensityD.toLocaleString('en-US'), isCorrect: false, reason: "is off by a factor of ten, as if a decimal point were misplaced to make the value too large" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The total area of a coastal city is $${totalArea}$ square miles, of which $${waterArea}$ square miles is water. If the city had a population of $${population.toLocaleString('en-US')}$ people in the year $2010$, which of the following is closest to the population density, in people per square mile of land area, of the city at that time?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: roundedDensity.toLocaleString('en-US'),
      explanation: `Choice ${correctLetter} is correct. To find the population density in people per square mile of land area, first find the land area by subtracting the water area from the total area: $${totalArea} - ${waterArea} = ${landArea}$ square miles. Then divide the population by the land area: $${population.toLocaleString('en-US')} \\div ${landArea} \\approx ${density.toFixed(0)}$ people per square mile, which is closest to $${roundedDensity.toLocaleString('en-US')}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
