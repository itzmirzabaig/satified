import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 223
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [denominator: 3-6, intercept: 3-8]
 * - Difficulty factors: [Equation from slope and intercept]
 * - Distractor patterns: [reciprocal intercept, incorrect fraction, wrong sign]
 * - Constraints: [Slope is 1/denominator]
 * - Question type: [Find equation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_223 = {
  metadata: {
    id: "223",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const numerator = 1;

    const denominator = getRandomInt(3, 6);

    const intercept = getRandomInt(3, 8);

    const correctEquation = `$f(x) = \\frac{1}{${denominator}}x + ${intercept}$`;

    const distractorB = `$f(x) = \\frac{1}{${denominator}}x + \\frac{1}{${intercept}}$`;

    const distractorC = `$f(x) = ${intercept}x + \\frac{1}{${denominator}}$`;

    const distractorD = `$f(x) = \\frac{1}{${denominator}}x - ${intercept}$`;

    const optionsData = [
      { text: correctEquation, isCorrect: true, reason: '' },
      { text: distractorB, isCorrect: false, reason: `its $y$-intercept is $\\frac{1}{${intercept}}$, the reciprocal of ${intercept}; the graph passes through $(0, ${intercept})$` },
      { text: distractorC, isCorrect: false, reason: `it swaps the slope, $\\frac{1}{${denominator}}$, and the $y$-intercept, ${intercept}` },
      { text: distractorD, isCorrect: false, reason: `its $y$-intercept is $-${intercept}$, so its graph passes through $(0, -${intercept})$, not $(0, ${intercept})$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For the linear function $f$, the graph of $y=f(x)$ in the $xy$-plane has a slope of $\\frac{1}{${denominator}}$ and passes through the point $(0, ${intercept})$. Which equation defines $f$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. Using slope-intercept form with slope $m=\\frac{1}{${denominator}}$ and y-intercept $b=${intercept}$ gives $f(x) = \\frac{1}{${denominator}}x + ${intercept}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
