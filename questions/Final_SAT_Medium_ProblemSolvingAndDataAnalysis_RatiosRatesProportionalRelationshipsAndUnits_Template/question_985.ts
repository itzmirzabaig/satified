import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 985
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [density: 2.5 to 3.3, area: 100,250 (large fixed number)]
 * - Difficulty factors: [Population density calculation, difference calculation]
 * - Distractor patterns: [A: total population 2014, B: miscalculation, C: miscalculation]
 * - Constraints: [Area remains constant]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - Float artifacts (e.g. 4.800000000000001) eliminated: densities are stored
 *   in integer tenths and each display value is a single division by 10, so
 *   density2 = (tenths)/10 renders as a clean one-decimal number.
 * - area is a multiple of 10, so every population (tenths * area / 10) and the
 *   increase are EXACT integers — no rounding, no artifacts anywhere.
 * - Distractors are now meaningful (2014 total, 1990 total, and an off-by-one
 *   density-tenth error) and guaranteed distinct via a bounded retry.
 * - Explanation numbers all come from the same live integer variables and the
 *   letters come from the shuffled array.
 */

export const generator_985 = {
  metadata: {
    id: "985",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Random values, kept in INTEGER TENTHS to avoid float artifacts.
    // density1: 1.2 to 4.5 ; increase: 0.4 to 1.5 (all as tenths)
    const density1Tenths = getRandomInt(12, 45);        // 1.2 .. 4.5
    // Guard: if increase == density1 then pop1990 == increase (the "1990"
    // distractor would collide with the correct answer). Resample to avoid it.
    let increaseTenths = getRandomInt(4, 15);           // 0.4 .. 1.5
    let g = 0;
    while (increaseTenths === density1Tenths && g++ < 50) increaseTenths = getRandomInt(4, 15);
    if (increaseTenths === density1Tenths) increaseTenths = (density1Tenths === 4) ? 5 : 4;
    const density2Tenths = density1Tenths + increaseTenths;

    // area is a multiple of 10 near the original 100,250 so that
    // (tenths * area) / 10 is always an exact integer.
    const area = getRandomInt(5000, 15000) * 10;        // 50,000 .. 150,000

    // Exact-integer populations (tenths * area is an integer multiple of 10).
    const pop1990 = (density1Tenths * area) / 10;
    const pop2014 = (density2Tenths * area) / 10;
    const increase = pop2014 - pop1990;                 // == increaseTenths * area / 10

    // Distractor C is the increase computed with the density change off by
    // one tenth. Every option value is (multiplier * area / 10); with a
    // common positive factor area/10, distinctness reduces to distinctness of
    // the multipliers {increaseTenths, density2Tenths, density1Tenths, cTenths}.
    // Pick cTenths from a small candidate set so it structurally avoids the
    // three used multipliers — no reliance on retry luck.
    const usedMultipliers = new Set([increaseTenths, density2Tenths, density1Tenths]);
    let cTenths = increaseTenths + 1;
    let cReason = "uses a density change that is 0.1 too large";
    if (usedMultipliers.has(cTenths)) {
      cTenths = increaseTenths - 1;
      cReason = "uses a density change that is 0.1 too small";
    }
    if (usedMultipliers.has(cTenths) || cTenths <= 0) {
      cTenths = increaseTenths + 2;
      cReason = "uses a density change that is 0.2 too large";
    }
    const distractorC = (cTenths * area) / 10;

    const options: { value: number; correct: boolean; reason?: string }[] = [
      { value: increase, correct: true },
      { value: pop2014, correct: false, reason: "is the total population in 2014, not the amount of the increase" },
      { value: pop1990, correct: false, reason: "is the population in 1990, not the amount of the increase" },
      { value: distractorC, correct: false, reason: cReason }
    ];

    const density1 = density1Tenths / 10;
    const density2 = density2Tenths / 10;

    // STEP 2: Shuffle and assign letters AFTER shuffling.
    const shuffledOptions = shuffle(options).map((opt, index) => ({
      ...opt,
      text: opt.value.toLocaleString(),
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.correct)!;
    const correctLetter = correctOption.letter;
    const correctText = correctOption.text;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.correct);

    return {
      questionText: `The population density of a country, in people per square kilometer of land area, increased from $${density1}$ in $1990$ to $${density2}$ in $2014$. During this time period, the land area of the country was $${area.toLocaleString()}$ square kilometers. By how many people did the country's population increase from $1990$ to $2014$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Population equals density multiplied by land area. In 1990 the population was $${density1} \\times ${area.toLocaleString()} = ${pop1990.toLocaleString()}$, and in 2014 it was $${density2} \\times ${area.toLocaleString()} = ${pop2014.toLocaleString()}$. The increase is $${pop2014.toLocaleString()} - ${pop1990.toLocaleString()} = ${correctText}$. Equivalently, multiply the change in density by the land area: $(${density2} - ${density1}) \\times ${area.toLocaleString()} = ${correctText}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
