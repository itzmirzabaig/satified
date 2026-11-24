import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1113
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-intercept: (2,0), y-intercept: (0, -323)]
 * - Difficulty factors: [Exponential from two points, solving for parameters]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must yield integer b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1113 = {
  metadata: {
    id: "1113",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // f(x) = a^x + b
    // f(0) = 1 + b = y_int, so b = y_int - 1
    // f(2) = a² + b = 0, so a = sqrt(-b)
    
    // Previously b was drawn on its own, so a^2 = -b usually had no whole number a and the
    // stated intercepts did not come from the unused a. Now b = -a^2, so both intercepts hold.
    const a = getRandomInt(10, 25);
    const b = -(a * a);
    const x_int = 2;
    const y_int = 1 + b;

    return {
      questionText: `The function $f$ is defined by $f(x)=a^{x}+b$, where $a$ and $b$ are constants and $a>0$. In the $xy$-plane, the graph of $y=f(x)$ has an $x$-intercept at $(${x_int}, 0)$ and a $y$-intercept at $(0, ${y_int})$. What is the value of $b$?`,
      figureCode: null,
      options: [],
      correctAnswer: b.toString(),
      explanation: `The correct answer is ${b}. The $y$-intercept is $(0, ${y_int})$, so $f(0)=${y_int}$. Since $f(0)=a^0+b=1+b$, it follows that $1+b=${y_int}$, so $b=${b}$. The $x$-intercept confirms this: $f(${x_int})=a^2+b=0$ gives $a^2=${-b}$, so $a=${a}$, and $${a}^2+(${b})=0$.`
    };
  }
};
