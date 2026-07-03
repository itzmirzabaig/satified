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

    // Distractors are distinct integer multiples of hh (hh >= 3), so the four
    // displayed values {t=2hh, hh, 3hh, 4hh} can never collide.
    const dVertex = hh;              // stops at the vertex x-coordinate
    const dTriple = 3 * hh;          // arithmetic slip
    const dDouble = 4 * hh;          // doubles the correct root

    const optionsData = [
      { text: `$${t}$`, isCorrect: true },
      { text: `$${dVertex}$`, isCorrect: false },
      { text: `$${dTriple}$`, isCorrect: false },
      { text: `$${dDouble}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correct = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correct.letter;

    return {
      questionText: `The quadratic function $h$ is defined by $h(x)=${a}(x-${hh})^2-${absK}$. In the $xy$-plane, the graph of $y=h(x)$ intersects the $x$-axis at the points $(0,0)$ and $(t,0)$, where $t$ is a constant. What is the value of $t$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correct.text,
      explanation: `Choice ${correctLetter} is correct. Set $h(x)=0$ to find the $x$-intercepts: $${a}(x-${hh})^2-${absK}=0$, so $(x-${hh})^2=${absK}/${a}=${hh * hh}$. Taking square roots gives $x-${hh}=\\pm ${hh}$, so $x=0$ or $x=${t}$. Since the graph already passes through $(0,0)$, the other intercept is at $t=${t}$. The value $${dVertex}$ is the $x$-coordinate of the vertex, not an intercept.`
    };
  }
};
