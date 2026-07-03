import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1105
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [P(t) = 290(1.04)^(4t/6)]
 * - Difficulty factors: [Exponential growth rate interpretation]
 * - Distractor patterns: [A: 0.38, B: 1.04, C: 4, D: 6]
 * - Constraints: [18 months = 1.5 years, growth factor over 18 months is 1.04]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1105 = {
  metadata: {
    id: "1105",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Percent-first construction: pick the integer percent increase pct, set
    // the base to 1 + pct/100, and use the exponent (12t)/months so that the
    // exponent increases by exactly 1 every `months` months (t in years).
    // The per-period growth factor is then exactly the base — no rounding.
    const P0 = getRandomInt(200, 400);
    const pct = getRandomInt(2, 10);          // n, the exact percent increase per period
    const months = getRandomInt(13, 24);      // period length; 13..24 so months !== pct always
    const rateStr = (1 + pct / 100).toFixed(2);   // e.g. "1.04"
    const decStr = (pct / 100).toFixed(2);        // e.g. "0.04"

    // Option values are pairwise distinct for every draw:
    // pct in [2,10] (integer), months in [13,24] (integer), rate in 1.02..1.10,
    // decimal form in 0.02..0.10 — the four ranges never overlap.
    const optionsData = [
      { key: 'correct', text: `$${pct}$`, isCorrect: true },
      { key: 'decimal', text: `$${decStr}$`, isCorrect: false },
      { key: 'factor', text: `$${rateStr}$`, isCorrect: false },
      { key: 'months', text: `$${months}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const letterOf = (key: string) => shuffledOptions.find(o => o.key === key)!.letter;

    return {
      questionText: `The function $P$ models the population of a city, in thousands, $t$ years after 2005, where $P(t)=${P0}(${rateStr})^{\\frac{12t}{${months}}}$. According to the model, the population increases by $n\\%$ every ${months} months. What is the value of $n$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$${pct}$`,
      explanation: `Choice ${correctLetter} is correct. The exponent $\\frac{12t}{${months}}$ increases by exactly 1 whenever $t$ increases by $\\frac{${months}}{12}$ of a year, that is, every ${months} months. Each such increase multiplies the population by a factor of ${rateStr}, which is an increase of ${pct}%, so $n=${pct}$. Choice ${letterOf('decimal')} is incorrect; ${decStr} is the increase written as a decimal rather than as a percent. Choice ${letterOf('factor')} is incorrect; ${rateStr} is the growth factor for each ${months}-month period, not the percent increase. Choice ${letterOf('months')} is incorrect; ${months} is the number of months in each period, not the percent increase.`
    };
  }
};
