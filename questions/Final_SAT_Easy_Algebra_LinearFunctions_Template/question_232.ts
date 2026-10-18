import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 232
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerator: 2-5, denominator: 3-6, intercept: 2-5]
 * - Difficulty factors: [Equation from slope and intercept]
 * - Distractor patterns: [wrong sign, swapped parameters, denominator as slope]
 * - Constraints: [None]
 * - Question type: [Find equation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_232 = {
  metadata: {
    id: "232",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The slope is a proper fraction in lowest terms; numerator and denominator
    // used to be drawn independently, giving slopes like 3/3 or 4/6.
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    let numerator = 2, denominator = 3;
    do {
      numerator = getRandomInt(2, 5);
      denominator = getRandomInt(3, 7);
    } while (numerator >= denominator || gcd(numerator, denominator) !== 1);

    const intercept = getRandomInt(2, 5);
    const slopeTex = `\\frac{${numerator}}{${denominator}}`;

    const correctEquation = `$f(x) = ${slopeTex}x + ${intercept}$`;

    const distractorA = `$f(x) = ${slopeTex}x - ${intercept}$`;

    const distractorC = `$f(x) = \\frac{${denominator}}{${numerator}}x + ${intercept}$`;

    const distractorD = `$f(x) = ${intercept}x + ${slopeTex}$`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: `its $y$-intercept is $-${intercept}$, so $f(0) = -${intercept}$, not ${intercept}` },
      { text: correctEquation, isCorrect: true, reason: '' },
      { text: distractorC, isCorrect: false, reason: `its slope, $\\frac{${denominator}}{${numerator}}$, is the reciprocal of $${slopeTex}$` },
      { text: distractorD, isCorrect: false, reason: `it swaps the slope, $${slopeTex}$, and the $y$-intercept, ${intercept}` }
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
      explanation: `Choice ${correctOption.letter} is correct. Using slope-intercept form with slope $m=\\frac{${numerator}}{${denominator}}$ and y-intercept $b=${intercept}$ gives $f(x)=\\frac{${numerator}}{${denominator}}x+${intercept}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
