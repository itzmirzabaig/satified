import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1131
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [vertex (h, k) with h in [5,15], k negative; need a+b+c for parabola crossing x-axis twice]
 * - Difficulty factors: [Vertex form, constraint a > 0 for two x-intercepts, evaluating a+b+c = f(1)]
 * - Distractor patterns: [values <= k, which are impossible because a > 0 forces a+b+c > k]
 * - Constraints: [Must have a > 0 and vertex below the x-axis for two intercepts]
 * - Question type: [Text->Multiple Choice Text]
 * - Figure generation: [None]
 *
 * MATH: y = a(x-h)^2 + k  =>  a + b + c = f(1) = a(1-h)^2 + k = a(h-1)^2 + k.
 * Vertex (h, k) is below the x-axis (k < 0), so two real x-intercepts require the
 * parabola to open upward: a > 0. Hence a + b + c = a(h-1)^2 + k > k for every valid a.
 * The correct choice is a specific reachable value (a positive integer a); every
 * distractor is <= k, so none can be the value of a + b + c.
 */

export const generator_1131 = {
  metadata: {
    id: "1131",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const h = getRandomInt(5, 15);
    const k = -getRandomInt(10, 20);          // vertex below the x-axis
    const a = getRandomInt(1, 3);             // opens upward => two x-intercepts

    const sq = (h - 1) * (h - 1);             // (h-1)^2, always positive
    const answer = a * sq + k;                // = a + b + c = f(1), an integer > k

    // Before: two wrong choices were k minus a random offset, with no slip behind them.
    // Now they are the values from a = -1 and a = -2 (a parabola opening the wrong way),
    // and k itself (a = 0). All are <= k, while a > 0 forces a + b + c > k. Since
    // sq >= 16, the four values are always distinct.
    const downOne = k - sq;
    const downTwo = k - 2 * sq;
    const optionsData = [
      { text: `$${downOne}$`, isCorrect: false, reason: `$${downOne}$ is the value when $a=-1$, but then the parabola opens downward from a vertex below the $x$-axis and never intersects the $x$-axis` },
      { text: `$${downTwo}$`, isCorrect: false, reason: `$${downTwo}$ is the value when $a=-2$, but then the parabola opens downward from a vertex below the $x$-axis and never intersects the $x$-axis` },
      { text: `$${k}$`, isCorrect: false, reason: `$${k}$ is the $y$-coordinate of the vertex, and $a+b+c$ equals it only when $a=0$, which does not give a parabola` },
      { text: `$${answer}$`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // Formatting helper so signed constants read cleanly (e.g. "- 14", not "+-14").
    const kAbs = Math.abs(k);

    return {
      questionText: `In the $xy$-plane, a parabola has vertex $(${h}, ${k})$ and intersects the $x$-axis at two points. If the equation is written as $y=ax^2+bx+c$, which could be the value of $a+b+c$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$${answer}$`,
      explanation: `Choice ${correctOption.letter} is correct. Because the vertex is $(${h}, ${k})$, the equation can be written as $y=a(x-${h})^2-${kAbs}$. Substituting $x=1$ into $y=ax^2+bx+c$ gives $y=a+b+c$, so $a+b+c$ is the value of $y$ when $x=1$: $a+b+c=a(1-${h})^2-${kAbs}=${sq}a-${kAbs}$. The vertex lies below the $x$-axis, so the parabola can intersect the $x$-axis at two points only if it opens upward, which means $a>0$. Therefore $${sq}a>0$ and $a+b+c>${k}$. Of the choices, only $${answer}$ is greater than $${k}$, and it occurs when $a=${a}$, since $${sq}(${a})-${kAbs}=${answer}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
