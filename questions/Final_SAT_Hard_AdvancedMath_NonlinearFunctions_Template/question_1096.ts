import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1096
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(t) = 8000(0.65)^t]
 * - Difficulty factors: [Exponential decay, y-intercept interpretation]
 * - Distractor patterns: [A/B: minimum estimates, C: wrong calculation, D: 8000 correct]
 * - Constraints: [y-intercept at t=0 is initial value]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1096 = {
  metadata: {
    id: "1096",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const P0 = getRandomInt(50, 150) * 100;
    const decayPct = getRandomInt(55, 75);
    const decayStr = (decayPct / 100).toFixed(2);
    // Exact by construction: P0 is a multiple of 100 (was Math.round of a float).
    const afterOneYear = (P0 / 100) * decayPct;
    const plain = (n: number) => n.toLocaleString('en-US');
    const math = (n: number) => plain(n).replace(/,/g, '{,}');

    // Distractors were an unexplained P0/3 and a "minimum" of f(1). Each is now
    // a real misreading of the intercept, and each has a reason.
    const correctText = `The estimated number of coupons sent at the end of 1998 was ${plain(P0)}.`;
    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      { text: `The estimated number of coupons sent at the end of 1998 was ${plain(afterOneYear)}.`, isCorrect: false, reason: `${plain(afterOneYear)} is $f(1)$, the estimate for the end of 1999, found by applying the factor $${decayStr}$ once when $t=0$ calls for no change` },
      { text: `The estimated number of coupons sent at the end of 1999 was ${plain(P0)}.`, isCorrect: false, reason: `it treats the intercept as the value at $t=1$, but the intercept occurs at $t=0$, which is 1998` },
      { text: `The minimum estimated number of coupons sent in a year was ${plain(P0)}.`, isCorrect: false, reason: `${plain(P0)} is the greatest value of $f$ on this interval, not the least, since the factor $${decayStr}$ is less than $1$ and $f$ decreases` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(t)=${math(P0)}(${decayStr})^t$ for $0 \\leq t \\leq 5$ and models the number of coupons a company sent to its customers at the end of each year, where $t$ is the number of years after 1998. If $y=f(t)$ is graphed in the $ty$-plane, what is the best interpretation of the $y$-intercept of the graph?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The $y$-intercept of the graph occurs at $t=0$, and $f(0)=${math(P0)}(${decayStr})^0=${math(P0)}$. Since $t=0$ corresponds to 1998, the model estimates that the company sent ${plain(P0)} coupons at the end of 1998. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
