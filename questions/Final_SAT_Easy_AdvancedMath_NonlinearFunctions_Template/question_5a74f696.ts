import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: 5a74f696
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 500-1100, doublingPeriod: 5-15]
 * - Difficulty factors: [Constructing an exponential function for doubling periods]
 * - Distractor patterns: [Decay factor, period swapped with base, base swapped with period]
 * - Constraints: [Exponent represents number of periods]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_5a74f696 = {
  metadata: {
    // id: "5a74f696",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initial = getRandomInt(5, 10) * 100 + getRandomInt(1, 99);

    const doublingPeriod = getRandomInt(5, 15);

    const correctEq = `M(t)=${initial}(2)^{\\frac{t}{${doublingPeriod}}}`;

    const optionsData = [
      { text: `$${correctEq}$`, isCorrect: true },
      { text: `$M(t)=${initial}\\left(\\frac{1}{2}\\right)^{\\frac{t}{${doublingPeriod}}}$`, isCorrect: false },
      { text: `$M(t)=${initial}\\left(\\frac{1}{${doublingPeriod}}\\right)^{\\frac{t}{2}}$`, isCorrect: false },
      { text: `$M(t)=${initial}(${doublingPeriod})^{\\frac{t}{2}}$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `An investment account was opened with an initial value of $${initial}. The value of the account doubled every ${doublingPeriod} years. Which equation represents the value of the account $M(t)$, in dollars, $t$ years after the account was opened?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The number of doubling periods is $\\frac{t}{${doublingPeriod}}$. Multiplying the initial value $${initial}$ by $2$ for each period gives $M(t)=${initial}(2)^{\\frac{t}{${doublingPeriod}}}$.`
    };
  }
};

/**
 * Question ID: 1863e3be
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [k: 10-50]
 * - Difficulty factors: [Calculating y-intercept of a basic quadratic]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Quadratic in form y = x^2 + k]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

