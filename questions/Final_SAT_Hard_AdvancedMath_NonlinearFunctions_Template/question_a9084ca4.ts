import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: a9084ca4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [P0: 9000, decay factor: 0.66]
 * - Difficulty factors: [Exponential decay, y-intercept interpretation, context]
 * - Distractor patterns: [A/B: minimum (nonsense), C: wrong calculation, D: 9000 correct]
 * - Constraints: [Exponential model, t=0 gives initial value]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_a9084ca4 = {
  metadata: {
    // id: "a9084ca4",
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
      { text: `The estimated number in 1997 was ${wrongCalc}.`, isCorrect: false },
      { text: `The estimated number in 1997 was ${P0}.`, isCorrect: true }
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
      correctAnswer: `The estimated number in 1997 was ${P0}.`,
      explanation: `Choice ${correctLetter} is correct. The y-intercept occurs at $t=0$: $f(0)=${P0}(${decayFactor.toFixed(2)})^0=${P0}$. This represents the number of advertisements at the end of 1998 (0 years after 1998).`
    };
  }
};

/**
 * Question ID: 2c6f214f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [first term: 9, common ratio: 4]
 * - Difficulty factors: [Geometric sequence, explicit formula]
 * - Distractor patterns: [A: 4(9^n), B: 4(9^(n-1)), C: 9(4^n), D: 9(4^(n-1))]
 * - Constraints: [Correct formula is a·r^(n-1)]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */