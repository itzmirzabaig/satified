import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 258
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 20-50]
 * - Difficulty factors: [Slope-intercept from point and slope]
 * - Distractor patterns: [negative slope, reciprocal slope, slope as intercept]
 * - Constraints: [Passes through origin]
 * - Question type: [Find equation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_258 = {
  metadata: {
    id: "258",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(20, 50);

    const optionsData = [
      { text: `$f(x) = -${slope}x$`, isCorrect: false, reason: `its graph has a slope of $-${slope}$, not ${slope}` },
      { text: `$f(x) = \\frac{1}{${slope}}x$`, isCorrect: false, reason: `its slope is the reciprocal of ${slope}, not ${slope}` },
      { text: `$f(x) = x - ${slope}$`, isCorrect: false, reason: `its graph has a slope of 1 and passes through $(0, -${slope})$, not $(0, 0)$` },
      { text: `$f(x) = ${slope}x$`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For the linear function $f$, the graph of $y=f(x)$ in the $xy$-plane has a slope of $${slope}$ and passes through the point $(0,0)$. Which equation defines $f$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$f(x) = ${slope}x$`,
      explanation: `Choice ${correctOption.letter} is correct. Using slope-intercept form, $f(x) = mx + b$, with slope $m = ${slope}$ and $y$-intercept $b = 0$ (since the graph passes through the origin) gives $f(x) = ${slope}x$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
