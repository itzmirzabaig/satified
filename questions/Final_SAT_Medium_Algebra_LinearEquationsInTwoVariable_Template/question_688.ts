import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 688
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-intercept: -4, y-intercept: 86/3, slope: -3/2]
 * - Difficulty factors: [Calculating slope from intercepts with fraction]
 * - Distractor patterns: [A: small fraction, B: reciprocal, C: correct, D: multiplication error]
 * - Constraints: [Clean fraction result]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 *
 * Answer-first model: pick the slope p/q in lowest terms (p>=2 so the reciprocal
 * distractor is never an integer), and a negative integer x-intercept a. The
 * y-intercept is slope * (-a) = p*(-a)/q, displayed simplified; we require it to
 * stay a genuine fraction (denominator > 1) so the question keeps its intended
 * flavor. Slope through (a,0) and (0, yInt) is yInt/(-a) = p/q exactly. The three
 * distractors (reciprocal q/p, sign flip -p/q, y-intercept-value yN/yD) are
 * provably distinct from the answer and from each other across the whole range.
 */

export const generator_688 = {
  metadata: {
    id: "688",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

    // STEP 1: Answer-first parameters. Pick slope p/q in lowest terms and a
    // negative integer x-intercept so the y-intercept stays a genuine fraction.
    let slopeNum = 0, slopeDen = 0, xInt = 0, negA = 0, yN = 0, yD = 0;
    let tries = 0;
    do {
      slopeNum = getRandomInt(2, 9);   // p (>=2 keeps reciprocal q/p a non-integer)
      slopeDen = getRandomInt(2, 6);   // q
      xInt = getRandomInt(-8, -2);     // a (negative)
      negA = -xInt;                    // positive
      const g = gcd(slopeNum, slopeDen);
      slopeNum /= g; slopeDen /= g;    // force p/q into lowest terms
      // y-intercept value = slope * (-a) = (p * negA) / q, displayed simplified
      const yIntNum = slopeNum * negA;
      const yg = gcd(yIntNum, slopeDen);
      yN = yIntNum / yg;
      yD = slopeDen / yg;
    } while (yD === 1 && tries++ < 50); // require a genuine fraction y-intercept

    // STEP 2: Distractors from concrete error patterns (all provably distinct
    // from the answer and from each other over the declared ranges).
    const optionsData = [
      { text: `$\\frac{${slopeNum}}{${slopeDen}}$`, isCorrect: true, reason: "" },
      { text: `$\\frac{${slopeDen}}{${slopeNum}}$`, isCorrect: false, reason: `the reciprocal of the slope, from dividing the run by the rise instead of the rise by the run` },
      { text: `$-\\frac{${slopeNum}}{${slopeDen}}$`, isCorrect: false, reason: `the negative of the slope, from mishandling the sign of the $x$-intercept` },
      { text: `$\\frac{${yN}}{${yD}}$`, isCorrect: false, reason: `the value of the $y$-intercept itself, not the slope` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // For the explanation: yInt / (-a) = yN/yD ÷ negA = yN / (yD*negA) = p/q.
    const denomTimesNegA = yD * negA;

    return {
      questionText: `When line $n$ is graphed in the $xy$-plane, it has an $x$-intercept of $(${xInt}, 0)$ and a $y$-intercept of $\\left(0, \\frac{${yN}}{${yD}}\\right)$. What is the slope of line $n$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The slope of a line through two points is $m = \\frac{y_2 - y_1}{x_2 - x_1}$. Using the $y$-intercept $\\left(0, \\frac{${yN}}{${yD}}\\right)$ and the $x$-intercept $(${xInt}, 0)$, $m = \\frac{\\frac{${yN}}{${yD}} - 0}{0 - (${xInt})} = \\frac{\\frac{${yN}}{${yD}}}{${negA}} = \\frac{${yN}}{${denomTimesNegA}} = \\frac{${slopeNum}}{${slopeDen}}$. ${incorrectOptions.map(opt => `Choice ${opt.letter} is incorrect because it is ${opt.reason}.`).join(' ')}`
    };
  }
};
