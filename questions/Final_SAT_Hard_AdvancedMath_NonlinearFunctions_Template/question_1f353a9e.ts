import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 1f353a9e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(t) = 8000(0.65)^t]
 * - Difficulty factors: [Exponential decay, y-intercept interpretation]
 * - Distractor patterns: [A/B: minimum estimates, C: wrong calculation, D: 8000 correct]
 * - Constraints: [y-intercept at t=0 is initial value]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1f353a9e = {
  metadata: {
    // id: "1f353a9e",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const P0 = getRandomInt(50, 150) * 100;
    const decay = (getRandomInt(55, 75) / 100);
    const wrongCalc = Math.round(P0 * decay);
    
    const optionsData = [
      { text: `The minimum was ${wrongCalc}.`, isCorrect: false },
      { text: `The minimum was ${Math.round(P0/3)}.`, isCorrect: false },
      { text: `The estimated number in 1997 was ${wrongCalc}.`, isCorrect: false },
      { text: `The estimated number in 1997 was ${P0}.`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `The function $f$ models the number of coupons a company sent to customers at the end of each year, where $t$ represents years since 1998. $f(t)=${P0}(${decay.toFixed(2)})^t$ for $0 \\leq t \\leq 5$. If $y=f(t)$ is graphed in the $ty$-plane, what is the best interpretation of the y-intercept?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `The estimated number in 1997 was ${P0}.`,
      explanation: `Choice ${correctLetter} is correct. The y-intercept is at $t=0$: $f(0)=${P0}(${decay.toFixed(2)})^0=${P0}$. This represents the number of coupons at the end of 1998 (0 years after 1998).`
    };
  }
};

/**
 * Question ID: 270cf326
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = -6(3)^x-3, g(x) = -3(6)^x]
 * - Difficulty factors: [Exponential functions, minimum value analysis]
 * - Distractor patterns: [A: I only, B: II only, C: I and II, D: Neither]
 * - Constraints: [Both are decreasing exponentials, no minimum]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */