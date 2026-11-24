import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1138
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [population 50000, 3% increase, target 60000]
 * - Difficulty factors: [Exponential growth setup, solving for time]
 * - Distractor patterns: [Swapped populations, rate as base, decrease factor]
 * - Constraints: [Correct: 60000 = 50000(1.03)^t]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED: the stem was a broken fragment ("Which equation estimates years t"),
 * numbers had no commas, and two choices combined unrelated errors with no
 * reasons. Wrong choices are now single real slips, each with its own reason.
 */

export const generator_1138 = {
  metadata: {
    id: "1138",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const initial = getRandomInt(30, 80) * 1000;
    const target = (initial / 10) * getRandomInt(12, 16);
    const rate = getRandomInt(2, 6);

    const fmt = (n: number) => n.toLocaleString('en-US');
    const fmtM = (n: number) => fmt(n).replace(/,/g, '{,}');
    const I = fmtM(initial);
    const T = fmtM(target);
    const rateText = (rate / 100).toFixed(2);
    const growthText = ((100 + rate) / 100).toFixed(2);
    const decayText = ((100 - rate) / 100).toFixed(2);
    const correctText = `$${T}=${I}(${growthText})^t$`;

    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      { text: `$${I}=${T}(${growthText})^t$`, isCorrect: false, reason: `this equation swaps the two populations, starting at ${fmt(target)} and growing to ${fmt(initial)}` },
      { text: `$${T}=${I}(${rateText})^t$`, isCorrect: false, reason: `this equation uses the rate ${rateText} as the base without adding it to 1, so it would multiply the population by ${rateText} each year` },
      { text: `$${T}=${I}(${decayText})^t$`, isCorrect: false, reason: `this equation uses the base ${decayText}, which models a decrease of ${rate}% each year instead of an increase` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The population of a town is currently ${fmt(initial)} and increases by ${rate}% each year. Which equation can be used to find $t$, the number of years it will take the population to reach ${fmt(target)}?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. An increase of ${rate}% each year means the population is multiplied by $1+${rateText}=${growthText}$ each year, so after $t$ years the population is $${I}(${growthText})^t$. Setting this expression equal to the target population gives $${T}=${I}(${growthText})^t$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
