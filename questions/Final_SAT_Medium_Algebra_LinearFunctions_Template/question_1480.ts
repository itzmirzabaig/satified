import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1480
 * 
 * ANALYSIS:
 * - Context: Linear Function Evaluation.
 * - Given: c(x) = mx + b.
 * - Data: c(x1) = y1, and usually intercept is given or calculable.
 * - Task: Find c(x2).
 */
export const generator_1480 = {
  metadata: {
    id: "1480",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    const slope = getRandomInt(2, 6); // m
    const intercept = getRandomInt(400, 600); // b
    
    // c(x) = mx + b
    // Given point x1
    const x1 = 100;
    const y1 = slope * x1 + intercept;
    
    // Target point x2
    const x2 = 1000;
    const y2 = slope * x2 + intercept;
    
    // Question:
    // Function c(x) = mx + 500. c(100) = y1. What is c(1000)?
    // Here intercept is given as fixed 500 in prompt? Let's use the random intercept.
    
    return {
      questionText: `For the linear function $c$, $c(x) = mx + ${intercept}$, where $m$ is a constant. If $c(${x1}) = ${y1}$, what is the value of $c(${x2})$?`,
      figureCode: null,
      options: [], // Fill in the blank
      correctAnswer: y2.toString(),
      explanation: `To find the value of $m$, substitute $x = ${x1}$ and $c(x) = ${y1}$ into the equation:
      
$${y1} = m(${x1}) + ${intercept}$
$${y1} - ${intercept} = ${x1}m$
$${y1 - intercept} = ${x1}m$
$m = \\frac{${y1 - intercept}}{${x1}} = ${slope}$

Now substitute $m = ${slope}$ and $x = ${x2}$ into the original equation:
$c(${x2}) = ${slope}(${x2}) + ${intercept}$
$c(${x2}) = ${slope * x2} + ${intercept}$
$c(${x2}) = ${y2}$`
    };
  }
};
