import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1130
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [a: 2, h: 4, k: -32, leading to t: 8]
 * - Difficulty factors: [Vertex form of parabola, x-intercepts, solving quadratic]
 * - Distractor patterns: [A: 1 (half of something), B: 2 (a), C: 4 (h), D: 8 (correct t)]
 * - Constraints: [Must yield integer solution for t, vertex form h(x)=a(x-h)²+k]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1130 = {
  metadata: {
    id: "1130",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // h(x) = a(x - hh)^2 + k, vertex at (hh, k).
    // x-intercepts solve a(x-hh)^2 + k = 0  =>  (x-hh)^2 = -k/a.
    // Choose k = -a*hh^2 so that -k/a = hh^2 and x = hh ± hh, i.e. x = 0 or x = 2*hh.
    // With one intercept fixed at (0,0), the other is (t,0) where t = 2*hh.
    const a = getRandomInt(1, 4);
    const hh = getRandomInt(3, 6);
    const k = -a * hh * hh;          // negative integer
    const absK = -k;                 // = a*hh^2, positive
    const t = 2 * hh;                // the required intercept

    // Before: a = 1 displayed as "1(x-3)^2", and 3h and 4h were arbitrary multiples with
    // no real slip behind them. Each wrong choice now comes from a step of the solution.
    // For hh >= 3 the values 2hh, hh, hh^2 and hh^2 + hh are always distinct.
    const square = hh * hh;
    const dVertex = hh;              // stops at the vertex x-coordinate
    const dSquare = square;          // stops at (x - hh)^2 = hh^2, no square root
    const dNoRoot = square + hh;     // solves x - hh = hh^2, skipping the square root

    const optionsData = [
      { text: `$${t}$`, isCorrect: true, reason: '' },
      { text: `$${dVertex}$`, isCorrect: false, reason: `$${dVertex}$ is the $x$-coordinate of the vertex, which lies halfway between the two $x$-intercepts` },
      { text: `$${dSquare}$`, isCorrect: false, reason: `$${dSquare}$ is the value of $(x-${hh})^2$, which results from stopping before taking the square root and solving for $x$` },
      { text: `$${dNoRoot}$`, isCorrect: false, reason: `$${dNoRoot}$ results from solving $x-${hh}=${dSquare}$, which skips taking the square root of $${dSquare}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correct = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    const aStr = a === 1 ? '' : `${a}`;
    const isolate = a === 1
      ? `$(x-${hh})^2=${absK}$`
      : `$${a}(x-${hh})^2=${absK}$, and dividing both sides by $${a}$ gives $(x-${hh})^2=${square}$`;

    return {
      questionText: `The quadratic function $h$ is defined by $h(x)=${aStr}(x-${hh})^2-${absK}$. In the $xy$-plane, the graph of $y=h(x)$ intersects the $x$-axis at the points $(0,0)$ and $(t,0)$, where $t$ is a constant. What is the value of $t$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correct.text,
      explanation: `Choice ${correct.letter} is correct. The graph intersects the $x$-axis where $h(x)=0$, so $${aStr}(x-${hh})^2-${absK}=0$. Adding $${absK}$ to both sides gives ${isolate}. Taking the square root of both sides gives $x-${hh}=${hh}$ or $x-${hh}=-${hh}$, so $x=${t}$ or $x=0$. The solution $x=0$ is the given point $(0,0)$, so $t=${t}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
