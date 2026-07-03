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

    // Distractors are all <= k. Since a > 0 forces a + b + c = a(h-1)^2 + k > k,
    // none of these can equal the value of a + b + c. Keep them distinct and < answer.
    const optionsData = [
      { text: `$${k - getRandomInt(1, 3)}$`, isCorrect: false },
      { text: `$${k - getRandomInt(4, 7)}$`, isCorrect: false },
      { text: `$${k}$`, isCorrect: false },
      { text: `$${answer}$`, isCorrect: true }
    ];

    // Guard against any accidental collision (exact string match) with a bounded retry.
    let tries = 0;
    while (tries++ < 50) {
      const seen = new Set(optionsData.map(o => o.text));
      if (seen.size === 4) break;
      optionsData[0].text = `$${k - getRandomInt(1, 3)}$`;
      optionsData[1].text = `$${k - getRandomInt(4, 7)}$`;
    }

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    // Formatting helpers so signed constants read cleanly (e.g. "- 14", not "+-14").
    const kAbs = Math.abs(k);
    const vertexForm = `y=a(x-${h})^2-${kAbs}`;
    const expanded = `ax^2-${2 * h}ax+${h * h}a-${kAbs}`;

    return {
      questionText: `In the $xy$-plane, a parabola has vertex $(${h}, ${k})$ and intersects the $x$-axis at two points. If the equation is written as $y=ax^2+bx+c$, which could be the value of $a+b+c$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$${answer}$`,
      explanation: `Choice ${correctLetter} is correct. In vertex form the parabola is $${vertexForm}=${expanded}$, so $a+b+c=f(1)=a(1-${h})^2-${kAbs}=${sq}a-${kAbs}$. Because the vertex $(${h}, ${k})$ lies below the $x$-axis, two $x$-intercepts require the parabola to open upward, so $a>0$ and $a+b+c=${sq}a-${kAbs}>${k}$. Taking $a=${a}$ gives $a+b+c=${sq}\\cdot${a}-${kAbs}=${answer}$. The other choices are $${k}$ or less, which cannot occur because $a+b+c$ is always greater than $${k}$.`
    };
  }
};
