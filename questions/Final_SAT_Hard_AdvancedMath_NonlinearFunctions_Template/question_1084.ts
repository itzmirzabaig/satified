import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1084
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (x+7)² + 4]
 * - Difficulty factors: [Vertex form, minimum value location]
 * - Distractor patterns: [A: -4 (correct), B: -2, C: 2, D: 4]
 * - Constraints: [Minimum at x = -h where vertex is (h, k)]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1084 = {
  metadata: {
    id: "1084",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Before: the answer was always negative and k always positive, the stem
    // opened on a bare equation, and the explanation never said why the square
    // decides the minimum. Now both signs occur and |k| never equals |h|, so
    // the minimum value cannot be mistaken for the x value.
    const h = getRandomElement([-1, 1]) * getRandomInt(3, 10);
    let k = getRandomElement([-1, 1]) * getRandomInt(2, 9);
    while (Math.abs(k) === Math.abs(h)) k = getRandomElement([-1, 1]) * getRandomInt(2, 9);

    const shift = h > 0 ? `-${h}` : `+${-h}`;
    const kTerm = k > 0 ? `+${k}` : `-${-k}`;

    return {
      questionText: `The function $f$ is defined by $f(x)=(x${shift})^2${kTerm}$. For what value of $x$ does $f(x)$ reach its minimum?`,
      figureCode: null,
      options: [],
      correctAnswer: h.toString(),
      explanation: `The correct answer is $${h}$. A squared expression is never negative, so $(x${shift})^2$ has its smallest value, $0$, when $x${shift}=0$, which means $x=${h}$. At that value, $f(${h})=0${kTerm}=${k}$, so the minimum value of $f$ is $${k}$, and it occurs at $x=${h}$.`
    };
  }
};
