import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 1993561d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [denominator: 3-6, intercept: 3-8]
 * - Difficulty factors: [Equation from slope and intercept]
 * - Distractor patterns: [reciprocal intercept, incorrect fraction, wrong sign]
 * - Constraints: [Slope is 1/denominator]
 * - Question type: [Find equation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_1993561d = {
  metadata: {
    // id: "1993561d",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const numerator = 1;

    const denominator = getRandomInt(3, 6);

    const intercept = getRandomInt(3, 8);

    const correctEquation = `f(x) = \\frac{1}{${denominator}}x + ${intercept}`;

    const distractorB = `f(x) = \\frac{1}{${denominator}}x + \\frac{1}{${intercept}}`;

    const distractorC = `f(x) = \\frac{1}{${denominator}}x - \\frac{${intercept}}{${denominator}}`;

    const distractorD = `f(x) = \\frac{1}{${denominator}}x - ${intercept}`;

    const optionsData = [
      { text: correctEquation, isCorrect: true },
      { text: distractorB, isCorrect: false, reason: "uses reciprocal for y-intercept" },
      { text: distractorC, isCorrect: false, reason: "uses incorrect fraction for y-intercept" },
      { text: distractorD, isCorrect: false, reason: "uses wrong sign for y-intercept" }
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
      explanation: `Choice ${correctOption.letter} is correct. Using slope-intercept form with slope $m=\\frac{1}{${denominator}}$ and y-intercept $b=${intercept}$ gives $f(x) = \\frac{1}{${denominator}}x + ${intercept}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 5ad6bc97
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 5-9, intercept: 1-4, x: 5-10]
 * - Difficulty factors: [Simple evaluation]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Fill in blank]
 * - Figure generation: null
 */

