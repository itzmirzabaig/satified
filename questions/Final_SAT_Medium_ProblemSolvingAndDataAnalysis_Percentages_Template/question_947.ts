import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 947
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [increase: percent in {10,15,...,45}, multiplier: 1 + percent/100]
 * - Difficulty factors: [Converting a percent increase to a multiplier]
 * - Distractor patterns: [decimal-only (percent/100), decimal misplaced (percent/10), over-scaled (1 + percent/10)]
 * - Constraints: [k = 1 + percent/100]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_947 = {
  metadata: {
    id: "947",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate the percent increase (10, 15, 20, 25, 30, 35, 40, 45).
    const percent = getRandomInt(2, 9) * 5;

    // STEP 2: Build option values. Strip trailing zeros so each reads cleanly.
    const strip = (n: number) => n.toFixed(2).replace(/\.?0+$/, '');
    const rateDecimal = strip(percent / 100);        // e.g. 0.3  — decimal of the increase only
    const multiplier = strip(1 + percent / 100);     // e.g. 1.3  — the correct multiplier k
    const misplaced = (percent / 10).toFixed(1);     // e.g. 3.0  — decimal point misplaced
    const overScaled = (1 + percent / 10).toFixed(1);// e.g. 4.0  — treats percent as percent*10

    const correctText = multiplier;

    // STEP 3: Assemble options. The four values are distinct for every allowed
    // percent (rateDecimal < 1 < multiplier < 2 <= misplaced/overScaled cluster,
    // and misplaced and overScaled always differ by exactly 1).
    const optionsData = [
      { text: rateDecimal, isCorrect: false, reason: `gives only the decimal form of the ${percent}% increase, not the multiplier for the whole population` },
      { text: misplaced, isCorrect: false, reason: "misplaces the decimal point when converting the percent" },
      { text: correctText, isCorrect: true },
      { text: overScaled, isCorrect: false, reason: `treats the ${percent}% increase as ${percent}0%` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 4: Return question data. Percents in prose are plain "%"; the one
    // calculation is wrapped in a single balanced math region.
    return {
      questionText: `The population of a town increased by ${percent}% from 2015 to 2016. If the 2016 population is $k$ times the 2015 population, what is the value of $k$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. An increase of ${percent}% means the 2016 population is ${100 + percent}% of the 2015 population. Writing ${100 + percent}% as a decimal gives $\\frac{${100 + percent}}{100} = ${multiplier}$, so $k = ${multiplier}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
