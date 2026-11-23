import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1062
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system y=x+9 and y=x²+16x+63, greatest x-value]
 * - Difficulty factors: [System with line and parabola, substitution, factor quadratic]
 * - Distractor patterns: [A: -6/correct, B: 7, C: 9, D: 63]
 * - Constraints: [Find both solutions, identify greatest x]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1062 = {
  metadata: {
    id: "1062",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: y = x + c1, y = x² + bx + c2, find greatest x
    
    // Substitution: x + c1 = x² + bx + c2 → x² + (b-1)x + (c2-c1) = 0
    
    // Let's create factorable quadratic with negative roots
    // (x + p)(x + q) = x² + (p+q)x + pq where p, q > 0
    
    const p = getRandomInt(4, 9);
    const q = p + getRandomInt(1, 4); // q > p, so -p > -q (greatest is -p)
    
    const b = p + q + 1; // So that b-1 = p+q
    const cDiff = p * q; // c2 - c1 = pq
    
    // Solutions: x = -p and x = -q, greatest is -p
    const greatestX = -p;

    // Before: two wrong choices were just the constants c1 and c2 from the
    // system, c1 was nudged by 1 to dodge a collision, and the other solution
    // -q was never offered. The wrong choices are now real slips: the lesser
    // solution (-q), the factor numbers read without changing sign (q), and
    // the y-coordinate of the solution. c1 is redrawn until all four differ.
    // -q < -p < 0 < q, so only y = c1 - p can collide, and only with q.
    let c1 = 0, yAtGreatest = 0;
    do {
      c1 = getRandomInt(5, 12);
      yAtGreatest = greatestX + c1;
    } while (new Set([greatestX, -q, q, yAtGreatest]).size < 4);
    const c2 = c1 + cDiff;

    // STEP 2: Create options
    const optionsData = [
      { text: `$${greatestX}$`, isCorrect: true, reason: '' },
      { text: `$${-q}$`, isCorrect: false, reason: `$${-q}$ is the lesser of the two solutions; it results from choosing the number with the greater absolute value` },
      { text: `$${q}$`, isCorrect: false, reason: `$${q}$ results from reading the solutions from $(x+${p})(x+${q})=0$ as $x=${p}$ and $x=${q}$ without changing the signs, then choosing the greater number` },
      { text: `$${yAtGreatest}$`, isCorrect: false, reason: `$${yAtGreatest}$ is the $y$-coordinate of the solution with the greatest $x$, since $y=${greatestX}+${c1}=${yAtGreatest}$, but the question asks for $x$` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Setting the expressions equal: $x+${c1}=x^2+${b}x+${c2}$, so $x^2+${b-1}x+${cDiff}=0$. This factors as $(x+${p})(x+${q})=0$. The solutions are $x=-${p}$ and $x=-${q}$. The greatest value is $${greatestX}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;
    
    return {
      questionText: `$y = x + ${c1}$\n$y = x^2 + ${b}x + ${c2}$\n\nA solution to the given system of equations is $(x,y)$. What is the greatest possible value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
