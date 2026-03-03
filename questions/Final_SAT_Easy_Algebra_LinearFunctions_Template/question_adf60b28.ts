import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: adf60b28
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [growthRate: 6-12, initialHeight: 2-6]
 * - Difficulty factors: [Interpreting y-intercept]
 * - Distractor patterns: [time period confusion, maximum value, slope as intercept]
 * - Constraints: [None]
 * - Question type: [Interpretation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_adf60b28 = {
  metadata: {
    // id: "adf60b28",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const growthRate = getRandomInt(6, 12);

    const initialHeight = getRandomInt(2, 6);

    const optionD = `The estimated height of the tree was ${initialHeight} feet when it was first measured.`;

    const optionsData = [
      { text: `The tree will be measured each year for ${initialHeight} years.`, isCorrect: false, reason: "confuses the intercept with a time period" },
      { text: `The tree is estimated to grow to a maximum height of ${initialHeight} feet.`, isCorrect: false, reason: "linear functions do not have maximum values in this context" },
      { text: `The estimated height of the tree increased by ${initialHeight} feet each year.`, isCorrect: false, reason: "describes the slope, not the y-intercept" },
      { text: optionD, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f(x) = ${growthRate}x + ${initialHeight}$ gives the estimated height, in feet, of a willow tree $x$ years after its height was first measured. Which statement is the best interpretation of ${initialHeight} in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: optionD,
      explanation: `Choice ${correctOption.letter} is correct. In $f(x) = ${growthRate}x + ${initialHeight}$, the value ${initialHeight} is the y-intercept, representing the height when $x=0$ (when first measured). Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: b8cbe394
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [dailyRate: 10-15, insuranceFee: 8-12]
 * - Difficulty factors: [Modeling linear relationship]
 * - Distractor patterns: [rate applied to sum, swapped rate/fee]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

