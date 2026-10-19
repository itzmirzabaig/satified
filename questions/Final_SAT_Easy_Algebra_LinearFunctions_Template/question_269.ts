import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 269
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [growthRate: 6-12, initialHeight: 2-6]
 * - Difficulty factors: [Interpreting y-intercept]
 * - Distractor patterns: [time period confusion, maximum value, slope as intercept]
 * - Constraints: [None]
 * - Question type: [Interpretation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_269 = {
  metadata: {
    id: "269",
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
      { text: `The tree will be measured each year for ${initialHeight} years.`, isCorrect: false, reason: `${initialHeight} is a height in feet, not a number of years; the function does not say how long the tree will be measured` },
      { text: `The tree is estimated to grow to a maximum height of ${initialHeight} feet.`, isCorrect: false, reason: `the estimated height increases by ${growthRate} feet each year, so ${initialHeight} feet is the smallest estimated height, at $x = 0$, not the largest` },
      { text: `The estimated height of the tree increased by ${initialHeight} feet each year.`, isCorrect: false, reason: `the estimated height increases by ${growthRate} feet each year, the coefficient of $x$, not by ${initialHeight} feet` },
      { text: optionD, isCorrect: true, reason: '' }
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
      explanation: `Choice ${correctOption.letter} is correct. The tree was first measured at $x = 0$ years. Substituting 0 for $x$ in the given function yields $f(0) = ${growthRate}(0) + ${initialHeight}$, or $f(0) = ${initialHeight}$. Therefore, ${initialHeight} is the estimated height, in feet, of the tree when it was first measured. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
