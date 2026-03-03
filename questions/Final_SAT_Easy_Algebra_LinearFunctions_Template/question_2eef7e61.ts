import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 2eef7e61
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerator: 2-5, denominator: 3-6, intercept: 2-5]
 * - Difficulty factors: [Equation from slope and intercept]
 * - Distractor patterns: [wrong sign, swapped parameters, denominator as slope]
 * - Constraints: [None]
 * - Question type: [Find equation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_2eef7e61 = {
  metadata: {
    // id: "2eef7e61",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const numerator = getRandomInt(2, 5);

    const denominator = getRandomInt(3, 6);

    const intercept = getRandomInt(2, 5);

    const correctEquation = `f(x)=\\frac{${numerator}}{${denominator}}x+${intercept}`;

    const distractorA = `f(x)=\\frac{${numerator}}{${denominator}}x-${intercept}`;

    const distractorC = `f(x)=${denominator}x-${intercept}`;

    const distractorD = `f(x)=${denominator}x+${intercept}`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "uses the wrong sign for the y-intercept" },
      { text: correctEquation, isCorrect: true },
      { text: distractorC, isCorrect: false, reason: "uses the denominator as slope with wrong sign" },
      { text: distractorD, isCorrect: false, reason: "uses the denominator as slope instead of a fraction" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The graph of the function $f$ is a line in the $xy$-plane. If the line has slope $\\frac{${numerator}}{${denominator}}$ and $f(0)=${intercept}$, which of the following defines $f$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. Using slope-intercept form with slope $m=\\frac{${numerator}}{${denominator}}$ and y-intercept $b=${intercept}$ gives $f(x)=\\frac{${numerator}}{${denominator}}x+${intercept}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 0ea7ef01
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 100-150, intercept: 40-60 negative, x: 5-8]
 * - Difficulty factors: [Evaluating function from graph]
 * - Distractor patterns: [x-coord as y-coord, multiple of x, overestimate]
 * - Constraints: [None]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 */

