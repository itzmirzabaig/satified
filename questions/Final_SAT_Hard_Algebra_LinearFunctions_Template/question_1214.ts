import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1214
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4 (single-digit), intercept: 19 (double-digit)]
 * - Difficulty factors: [Interpreting x-intercept of linear function]
 * - Distractor patterns: [B: y-intercept interpretation, C: wrong slope description, D: slope interpretation]
 * - Constraints: [f(x) = 4x + 19, x-intercept is where f(x) = 0]
 * - Question type: [Word problem → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1214 = {
  metadata: {
    id: "1214",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const slope = getRandomInt(2, 6);      // 2-6
    const intercept = getRandomInt(10, 25); // 10-25

    // x-intercept solves 0 = slope*x + intercept  ->  x = -intercept/slope.
    // Numerator is negative; denominator (slope) is positive.
    const xInterceptNum = -intercept;
    const xInterceptDen = slope;

    // Reduce the fraction.
    function gcd(a: number, b: number): number {
      return b === 0 ? a : gcd(b, a % b);
    }
    const divisor = gcd(Math.abs(xInterceptNum), Math.abs(xInterceptDen));
    const simplifiedNum = xInterceptNum / divisor; // negative
    const simplifiedDen = xInterceptDen / divisor; // positive

    // LaTeX for the x-intercept value, with the sign carried out front of the
    // fraction (e.g. "-\frac{11}{3}") or a plain integer when it reduces cleanly.
    const xInterceptStr = simplifiedDen === 1
      ? `${simplifiedNum}`
      : `-\\frac{${Math.abs(simplifiedNum)}}{${simplifiedDen}}`;

    // STEP 2: Create options
    const correctText = `When $f(x) = 0$, the number is $${xInterceptStr}$.`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `When the number is 0, $f(x) = ${intercept}$.`, isCorrect: false, reason: "describes the y-intercept, not the x-intercept" },
      { text: `The value of $f(x)$ increases by 1 for each increase of ${slope} in the value of the number.`, isCorrect: false, reason: `describes a slope of $\\frac{1}{${slope}}$, which is not the slope of this function` },
      { text: `For each increase of 1 in the value of the number, $f(x)$ increases by ${slope}.`, isCorrect: false, reason: "correctly describes the slope but does not interpret the x-intercept as asked" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined so that $f(x)$ is ${intercept} more than ${slope} times a number $x$. If $y = f(x)$ is graphed in the $xy$-plane, which of the following is the best interpretation of the $x$-intercept?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The function is $f(x) = ${slope}x + ${intercept}$. The $x$-intercept occurs where $f(x) = 0$, so $0 = ${slope}x + ${intercept}$, which gives $${slope}x = -${intercept}$ and therefore $x = ${xInterceptStr}$. This is the value of the number for which the output $f(x)$ equals $0$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
