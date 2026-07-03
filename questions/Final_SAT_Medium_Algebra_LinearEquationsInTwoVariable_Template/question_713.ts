import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 713
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (0,9) and (1,17), slope: 8, intercept: 9]
 * - Difficulty factors: [Calculating slope from two points, identifying y-intercept]
 * - Distractor patterns: [A: reciprocal slope, B: mixed up values, C: wrong slope, D: correct]
 * - Constraints: [Clean integer slope and intercept]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_713 = {
  metadata: {
    id: "713",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate points that give a clean integer slope.
    // Line passes through (0, y1) so the y-intercept is exactly y1, and the
    // slope is the integer `slope`. y2 is derived so both points are consistent.
    const x1 = 0;
    const y1 = getRandomInt(3, 15);
    const x2 = getRandomInt(2, 6);        // x2 >= 2 so the reciprocal slope 1/slope is clearly a fraction
    const slope = getRandomInt(2, 10);
    const y2 = y1 + slope * (x2 - x1);    // = slope*x2 + y1, an integer

    // STEP 2: Build a wrong slope and wrong intercept for the "close" distractor,
    // constructed to never coincide with the correct integer coefficients.
    const wrongSlope = slope >= 6
      ? slope - getRandomInt(1, 3)         // 3..9
      : slope + getRandomInt(1, 3);        // 3..13  (>= 3, always != slope)
    const wrongIntercept = y1 + getRandomInt(1, 3); // always > y1, so != y1 and positive

    const correctText = `$y = ${slope}x + ${y1}$`;

    // STEP 3: Create options.
    // - reciprocal slope 1/slope (fraction coefficient, keeps correct intercept)
    // - swapped values: slope becomes x2, intercept becomes y1/slope (fraction)
    // - integer distractor with a different slope AND intercept
    // - the correct line
    const optionsData = [
      { text: `$y = \\frac{1}{${slope}}x + ${y1}$`, isCorrect: false },
      { text: `$y = ${x2}x + \\frac{${y1}}{${slope}}$`, isCorrect: false },
      { text: `$y = ${wrongSlope}x + ${wrongIntercept}$`, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText: `In the $xy$-plane, line $t$ passes through the points $(${x1}, ${y1})$ and $(${x2}, ${y2})$. Which equation defines line $t$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The slope of the line through $(${x1}, ${y1})$ and $(${x2}, ${y2})$ is $m = \\frac{${y2} - ${y1}}{${x2} - ${x1}} = \\frac{${y2 - y1}}{${x2}} = ${slope}$. Because the line passes through $(${x1}, ${y1})$ with $x = 0$, the $y$-intercept is $b = ${y1}$. Therefore the equation of line $t$ is $y = ${slope}x + ${y1}$.`
    };
  }
};
