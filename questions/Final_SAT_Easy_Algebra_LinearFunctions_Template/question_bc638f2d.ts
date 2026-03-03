import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: bc638f2d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [growthRate: 10-20, initialLength: 5-15]
 * - Difficulty factors: [Interpreting y-intercept]
 * - Distractor patterns: [time period, growth rate monthly, maximum length]
 * - Constraints: [None]
 * - Question type: [Interpretation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_bc638f2d = {
  metadata: {
    // id: "bc638f2d",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const growthRate = getRandomInt(10, 20);

    const initialLength = getRandomInt(5, 15);

    const optionD = `The estimated length of the vine plant was ${initialLength} inches when Tavon purchased it.`;

    const optionsData = [
      { text: `Tavon will keep the vine plant for ${initialLength} months.`, isCorrect: false, reason: "confuses the intercept with a time period" },
      { text: `The vine plant is expected to grow ${initialLength} inches each month.`, isCorrect: false, reason: "describes the slope, not the y-intercept" },
      { text: `The vine plant is expected to grow to a maximum length of ${initialLength} inches.`, isCorrect: false, reason: "linear growth does not have a maximum in this context" },
      { text: optionD, isCorrect: true }
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
      explanation: `Choice ${correctOption.letter} is correct. In $f(t)=${growthRate}t+${initialLength}$, the value ${initialLength} is the y-intercept, representing the length when $t=0$ (when purchased). Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 9d9fe1e6
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initialHeight: 30-50, rate: decimal 0.10-0.25]
 * - Difficulty factors: [Interpreting y-intercept]
 * - Distractor patterns: [end height, rate of change, time to evaporate]
 * - Constraints: [None]
 * - Question type: [Interpretation→Multiple Choice Text]
 * - Figure generation: null
 */

