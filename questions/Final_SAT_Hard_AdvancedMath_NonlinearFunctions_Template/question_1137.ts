import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1137
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [P0: 5000-12000, decay factor: 0.60-0.80]
 * - Difficulty factors: [Exponential decay, y-intercept interpretation, context]
 * - Distractor patterns: [f(1) as the 1998 value, P0 as the minimum, P0 placed at 1999]
 * - Constraints: [Exponential model, t=0 gives initial value AT END OF 1998]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * MATH: t = years since the END OF 1998, so the y-intercept (t=0) is the value
 * at the end of 1998: f(0) = P0 * decayFactor^0 = P0. The correct option and the
 * explanation both say "end of 1998" so the year matches the stated t-origin.
 *
 * FIXED: the equation ran into the next sentence, numbers had no commas, and the
 * "minimum was P0/2" choice was an arbitrary value. Wrong choices are now real
 * misreadings of the model, each with its own reason.
 */

export const generator_1137 = {
  metadata: {
    id: "1137",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const P0 = getRandomInt(50, 120) * 100;
    const decayPct = getRandomInt(60, 80);
    const decayText = (decayPct / 100).toFixed(2);
    // P0 is a multiple of 100, so f(1) is an exact whole number.
    const f1 = (P0 / 100) * decayPct;

    const fmt = (n: number) => n.toLocaleString('en-US');
    const fmtM = (n: number) => fmt(n).replace(/,/g, '{,}');
    const P0s = fmt(P0);
    const f1s = fmt(f1);
    const correctText = `The estimated number of advertisements at the end of 1998 was ${P0s}.`;

    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      { text: `The estimated number of advertisements at the end of 1998 was ${f1s}.`, isCorrect: false, reason: `${f1s} is $f(1)$, the estimate for the end of 1999, not the value at $t=0$` },
      { text: `The minimum estimated number of advertisements was ${P0s}.`, isCorrect: false, reason: `${P0s} is the greatest value of $f$ for $0 \\leq t \\leq 5$, not the minimum, because the base ${decayText} is less than 1 and $f$ decreases as $t$ increases` },
      { text: `The estimated number of advertisements at the end of 1999 was ${P0s}.`, isCorrect: false, reason: `${P0s} is the estimate for $t=0$, which is the end of 1998, while the end of 1999 corresponds to $t=1$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The function $f$, defined by $f(t)=${fmtM(P0)}(${decayText})^t$, models the number of advertisements a company sent to its clients at the end of each year, where $t$ represents the number of years since the end of 1998 and $0 \\leq t \\leq 5$. If $y=f(t)$ is graphed in the $ty$-plane, which of the following is the best interpretation of the $y$-intercept?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The $y$-intercept occurs at $t=0$, and $f(0)=${fmtM(P0)}(${decayText})^0=${fmtM(P0)}(1)=${fmtM(P0)}$. Since $t$ is the number of years since the end of 1998, $t=0$ corresponds to the end of 1998, so the $y$-intercept means the estimated number of advertisements at the end of 1998 was ${P0s}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
