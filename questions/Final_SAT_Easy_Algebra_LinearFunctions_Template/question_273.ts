import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 273
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [growthRate: 10-20, initialLength: 5-15]
 * - Difficulty factors: [Interpreting y-intercept]
 * - Distractor patterns: [time period, growth rate monthly, maximum length]
 * - Constraints: [None]
 * - Question type: [Interpretation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_273 = {
  metadata: {
    id: "273",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The rate and the starting length must differ: when they matched (for
    // example f(t) = 15t + 15), the "grows 15 inches each month" choice was
    // also true, giving two correct answers.
    let growthRate = 10, initialLength = 5;
    do {
      growthRate = getRandomInt(10, 20);
      initialLength = getRandomInt(5, 15);
    } while (growthRate === initialLength);

    const optionD = `The estimated length of the vine plant was ${initialLength} inches when Tavon purchased it.`;

    const optionsData = [
      { text: `Tavon will keep the vine plant for ${initialLength} months.`, isCorrect: false, reason: `${initialLength} is a length in inches, not a number of months; the function does not say how long Tavon will keep the plant` },
      { text: `The vine plant is expected to grow ${initialLength} inches each month.`, isCorrect: false, reason: `the estimated length increases by ${growthRate} inches each month, the coefficient of $t$, not by ${initialLength} inches` },
      { text: `The vine plant is expected to grow to a maximum length of ${initialLength} inches.`, isCorrect: false, reason: `the estimated length increases by ${growthRate} inches each month, so ${initialLength} inches is the smallest estimated length, at $t = 0$, not the largest` },
      { text: optionD, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ defined by $f(t)=${growthRate}t+${initialLength}$ gives the estimated length, in inches, of a vine plant $t$ months after Tavon purchased it. Which of the following is the best interpretation of ${initialLength} in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: optionD,
      explanation: `Choice ${correctOption.letter} is correct. Tavon purchased the plant at $t = 0$ months. Substituting 0 for $t$ in the given function yields $f(0) = ${growthRate}(0) + ${initialLength}$, or $f(0) = ${initialLength}$. Therefore, ${initialLength} is the estimated length, in inches, of the vine plant when Tavon purchased it. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
