import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 68
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 500-1100, doublingPeriod: 5-15]
 * - Difficulty factors: [Constructing an exponential function for doubling periods]
 * - Distractor patterns: [Decay factor, period swapped with base, base swapped with period]
 * - Constraints: [Exponent represents number of periods]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_68 = {
  metadata: {
    id: "68",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initial = getRandomInt(5, 10) * 100 + getRandomInt(1, 99);

    const doublingPeriod = getRandomInt(5, 15);

    const correctEq = `M(t)=${initial}(2)^{\\frac{t}{${doublingPeriod}}}`;

    // doublingPeriod >= 5, so no distractor form can coincide with another
    // (a collision would require doublingPeriod = 2).
    const optionsData = [
      {
        text: `$${correctEq}$`,
        isCorrect: true,
        reason: ''
      },
      {
        text: `$M(t)=${initial}\\left(\\frac{1}{2}\\right)^{\\frac{t}{${doublingPeriod}}}$`,
        isCorrect: false,
        reason: `This equation represents a value that is cut in half every ${doublingPeriod} years, not doubled.`
      },
      {
        text: `$M(t)=${initial}\\left(\\frac{1}{${doublingPeriod}}\\right)^{\\frac{t}{2}}$`,
        isCorrect: false,
        reason: `This equation swaps the roles of the growth factor and the doubling period, and its base $\\frac{1}{${doublingPeriod}}$ represents decay, not doubling.`
      },
      {
        text: `$M(t)=${initial}(${doublingPeriod})^{\\frac{t}{2}}$`,
        isCorrect: false,
        reason: `This equation uses ${doublingPeriod} as the growth factor and 2 as the period length, reversing their roles.`
      }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;
    const incorrectOptions = shuffled.filter(o => !o.isCorrect);

    return {
      questionText: `An investment account was opened with an initial value of \\$${initial}. The value of the account doubled every ${doublingPeriod} years. Which equation represents the value of the account $M(t)$, in dollars, $t$ years after the account was opened?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. After $t$ years, the number of doubling periods that have elapsed is $\\frac{t}{${doublingPeriod}}$. The value of the account is the initial value \\$${initial} multiplied by 2 once for each doubling period, so $M(t)=${initial}(2)^{\\frac{t}{${doublingPeriod}}}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect. ${o.reason}`).join(' ')}`
    };
  }
};
