import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 698
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 18, passes through (0,0) and (4,d)]
 * - Difficulty factors: [Parallel lines, finding y-coordinate]
 * - Distractor patterns: [A: y-intercept of original, B: slope, C: correct, D: using wrong equation]
 * - Constraints: [Clean integer result]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_698 = {
  metadata: {
    id: "698",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters.
    // Line s is parallel to y = slope*x + yIntOriginal, so its slope is `slope`.
    // It passes through (0,0), so its equation is y = slope*x, giving d = slope*x.
    const slope = getRandomInt(10, 25);
    const x = getRandomInt(2, 8);
    const d = slope * x;
    const yIntOriginal = getRandomInt(1, 5);

    // STEP 2: Build distractors. With slope >= 10, x >= 2, yInt in [1,5], all
    // four values are provably distinct:
    //   yIntOriginal (<=5) < slope (>=10) < d = slope*x (>= 2*slope) < d + yIntOriginal.
    const optionsData = [
      { text: `$${yIntOriginal}$`, isCorrect: false },       // y-intercept of the given line
      { text: `$${slope}$`, isCorrect: false },              // the slope itself
      { text: `$${d}$`, isCorrect: true },                   // correct: slope * x
      { text: `$${d + yIntOriginal}$`, isCorrect: false }    // adds the given y-intercept
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `In the $xy$-plane, line $s$ passes through the point $(0,0)$ and is parallel to the line represented by the equation $y=${slope}x+${yIntOriginal}$. If line $s$ also passes through the point $(${x},d)$, what is the value of $d$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Parallel lines have equal slopes, so line $s$ has slope ${slope}. Because line $s$ passes through $(0,0)$, its equation is $y=${slope}x$. Substituting $x=${x}$ gives $d=${slope}(${x})=${d}$.`
    };
  }
};
