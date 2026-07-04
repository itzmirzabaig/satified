import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1137
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [P0: 5000-12000, decay factor: 0.60-0.80]
 * - Difficulty factors: [Exponential decay, y-intercept interpretation, context]
 * - Distractor patterns: [minimum (misreads intercept), wrong t=1 value, right year wrong value]
 * - Constraints: [Exponential model, t=0 gives initial value AT END OF 1998]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * MATH: t = years since the END OF 1998, so the y-intercept (t=0) is the value
 * at the end of 1998: f(0) = P0 * decayFactor^0 = P0. The correct option and the
 * explanation both say "end of 1998" so the year matches the stated t-origin.
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
    const decayFactor = (getRandomInt(60, 80) / 100);
    const wrongCalc = Math.round(P0 * decayFactor);
    
    const optionsData = [
      { text: `The minimum estimated number of advertisements was ${wrongCalc}.`, isCorrect: false },
      { text: `The minimum estimated number of advertisements was ${Math.round(P0/2)}.`, isCorrect: false },
      { text: `The estimated number of advertisements at the end of 1998 was ${wrongCalc}.`, isCorrect: false },
      { text: `The estimated number of advertisements at the end of 1998 was ${P0}.`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `$f(t)=${P0}(${decayFactor.toFixed(2)})^t$ The function $f$ models the number of advertisements a company sent to its clients at the end of each year, where $t$ represents the number of years since the end of 1998, and $0 \\leq t \\leq 5$. If $y=f(t)$ is graphed in the $ty$-plane, which of the following is the best interpretation of the y-intercept?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `The estimated number of advertisements at the end of 1998 was ${P0}.`,
      explanation: `Choice ${correctLetter} is correct. The y-intercept occurs at $t=0$: $f(0)=${P0}(${decayFactor.toFixed(2)})^0=${P0}$. Since $t$ is the number of years since the end of 1998, $t=0$ corresponds to the end of 1998, so this represents the estimated number of advertisements at the end of 1998. The "minimum" choices misread the y-intercept as a least value, and $${wrongCalc}$ is $f(1)$ (the value one year later), not the y-intercept.`
    };
  }
};
