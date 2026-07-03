import { shuffle, getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 716
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (0,-5), (1,-1), slope: 4, intercept: -5]
 * - Difficulty factors: [Finding equation from two points]
 * - Distractor patterns: [A: wrong slope sign, B: wrong intercept sign, C: reciprocal slope, D: correct]
 * - Constraints: [Clean integer slope]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_716 = {
  metadata: {
    id: "716",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Line k through (x1,y1)=(0,y1) and (x2,y2). Since x1=0, the intercept is
    // exactly y1 and the slope is (y2-y1)/x2. Construct integers so y1<0 and
    // slope>0; the correct equation is y = slope*x + y1  (=> "slope x - |y1|").
    const x1 = 0;
    const y1 = getRandomInt(-8, -2); // always negative => intercept term is "- |y1|"
    const x2 = getRandomInt(1, 3);
    const slope = getRandomInt(2, 6); // positive integer slope
    const y2 = y1 + slope * (x2 - x1);

    const absY1 = Math.abs(y1); // y1 < 0 so absY1 >= 2

    // Correct: y = slope*x - absY1.
    // Distractors are pairwise distinct from the answer and each other for every
    // draw (slope >= 2 > 0 and absY1 >= 2 > 0, and 1/slope is never an integer):
    //   - wrong slope sign:      -slope*x - absY1   (x-term sign differs)
    //   - wrong intercept sign:   slope*x + absY1   (intercept sign differs)
    //   - reciprocal slope:      (1/slope)*x - absY1 (x-term form differs)
    const optionsData = [
      {
        text: `$y = ${slope}x - ${absY1}$`,
        isCorrect: true,
        reason: `is correct.`
      },
      {
        text: `$y = -${slope}x - ${absY1}$`,
        isCorrect: false,
        reason: `uses the wrong sign for the slope. The line rises from left to right, so the slope is positive.`
      },
      {
        text: `$y = ${slope}x + ${absY1}$`,
        isCorrect: false,
        reason: `uses the wrong sign for the $y$-intercept. Because the line passes through $(0, ${y1})$, the $y$-intercept is $${y1}$.`
      },
      {
        text: `$y = \\frac{1}{${slope}}x - ${absY1}$`,
        isCorrect: false,
        reason: `inverts the slope. The slope is $\\frac{\\text{rise}}{\\text{run}}=${slope}$, not its reciprocal.`
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrect = shuffledOptions.filter(opt => !opt.isCorrect);

    const distractorText = incorrect
      .map(opt => `Choice ${opt.letter} ${opt.reason}`)
      .join(' ');

    return {
      questionText: `In the $xy$-plane, line $k$ passes through the points $(${x1}, ${y1})$ and $(${x2}, ${y2})$. Which equation defines line $k$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. Because the line passes through $(0, ${y1})$, its $y$-intercept is $${y1}$. The slope is $m=\\frac{${y2}-(${y1})}{${x2}-${x1}}=\\frac{${y2 - y1}}{${x2 - x1}}=${slope}$. So line $k$ is $y=${slope}x - ${absY1}$. ${distractorText}`
    };
  }
};
