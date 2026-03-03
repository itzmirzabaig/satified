import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 4a0d0399
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-intercept: (2,0), y-intercept: (0, -323)]
 * - Difficulty factors: [Exponential from two points, solving for parameters]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must yield integer b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_4a0d0399 = {
  metadata: {
    // id: "4a0d0399",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // f(x) = a^x + b
    // f(0) = 1 + b = y_int, so b = y_int - 1
    // f(2) = a² + b = 0, so a = sqrt(-b)
    
    const b = -getRandomInt(200, 400);
    const a = getRandomInt(10, 25);
    const x_int = 2;
    const y_int = 1 + b;
    
    return {
      questionText: `The function $f$ is defined by $f(x)=a^{x}+b$, where $a$ and $b$ are constants. In the $xy$-plane, the graph of $y=f(x)$ has an $x$ intercept at $(${x_int},0)$ and a $y$-intercept at $(0,${y_int})$. What is the value of $b$?`,
      figureCode: null,
      options: null,
      correctAnswer: b.toString(),
      explanation: `From the y-intercept: $f(0)=a^0+b=1+b=${y_int}$, so $b=${b}$.`
    };
  }
};

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