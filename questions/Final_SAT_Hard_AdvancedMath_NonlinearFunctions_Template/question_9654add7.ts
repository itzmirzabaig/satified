import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 9654add7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: -500, 25000]
 * - Difficulty factors: [Quadratic modeling, x-intercept interpretation]
 * - Distractor patterns: [A: revenue at $0, B: max revenue price, C: price at $0 revenue (correct), D: max revenue]
 * - Constraints: [f(x) = 0 means zero revenue]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_9654add7 = {
  metadata: {
    // id: "9654add7",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const a = -getRandomInt(300, 600);
    const b = getRandomInt(15000, 35000);
    
    const otherRoot = Math.round(-b / a);
    
    const optionsData = [
      { text: `The revenue when the unit price is $$0`, isCorrect: false },
      { text: `The unit price that will result in maximum revenue`, isCorrect: false },
      { text: `The unit price that will result in a revenue of $$0`, isCorrect: true },
      { text: `The maximum revenue`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `The revenue $f(x)$, in dollars, is given by $f(x) = ${a}x^{2}+${b}x$, where $x$ is the unit price. The graph intersects the $x$-axis at $0$ and $a$. What does $a$ represent?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `The unit price that will result in a revenue of $0`,
      explanation: `Choice ${correctLetter} is correct. The x-intercept at $x=a$ means $f(a)=0$, so the revenue is $$0$ when the price is $$a$.`
    };
  }
};

/**
 * Question ID: 263f9937
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Day 1: 2.5×10^5, Day 2: 5.0×10^5, doubling each day]
 * - Difficulty factors: [Exponential growth, scientific notation]
 * - Distractor patterns: [A: Day 5, B: Day 9, C: Day 11, D: Day 12]
 * - Constraints: [Doubling daily, solve 2.5×10^5 × 2^(d-1) = 5.12×10^8]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table required]
 */