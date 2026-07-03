import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1197
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [a in [2,8], b in [4,16], c in [2,12]]
 * - Difficulty factors: [Finding perpendicular slope from standard form]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Perpendicular slope is the negative reciprocal]
 * - Question type: [Text -> Fill in blank]
 * - Figure generation: [None]
 *
 * FIXES:
 *  1. MATH BUG: line p is a*y + b*x = c, so y = -(b/a)x + c/a and the slope of p
 *     is -b/a. The negative reciprocal is +a/b, NOT b/a. The original answered
 *     b/a (and the explanation matched that wrong value). Both are corrected to
 *     a/b, reduced to lowest terms.
 *  2. FILLIN_FORMAT: correctAnswer is now a plain integer or an "a/b" string
 *     (no LaTeX) so the grader accepts what a student types; \frac{} is used for
 *     the explanation's $...$ math only.
 *  3. Question text tells the student to enter a fraction or decimal.
 *  a, b > 0 so the perpendicular slope a/b > 0 and the sign never lands on the
 *  denominator.
 */

export const generator_1197 = {
  metadata: {
    id: "1197",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);

    // STEP 1: Generate random values
    const a = getRandomInt(2, 8);
    const b = getRandomInt(4, 16);
    const c = getRandomInt(2, 12);

    // STEP 2: Line p is a*y + b*x = c  =>  y = -(b/a)x + c/a, so slope_p = -b/a.
    // Line r is perpendicular: slope_r = negative reciprocal of -b/a = a/b.
    const divisor = gcd(a, b) || 1;
    const num = a / divisor; // > 0
    const den = b / divisor; // > 0

    const isInteger = den === 1;
    // Fill-in answer for the grader: plain integer or "a/b" (no LaTeX).
    const correctAnswer = isInteger ? `${num}` : `${num}/${den}`;
    // LaTeX-rendered form for use inside the explanation's $...$ math only.
    const answerTex = isInteger ? `${num}` : `\\frac{${num}}{${den}}`;

    // The negative reciprocal of -b/a is a/b (shown raw). Append the reduced
    // form only when it actually differs, so we never print "= \frac{8}{5}"
    // right after an identical \frac{8}{5}.
    const rawPerp = `\\frac{${a}}{${b}}`;
    const perpChain = divisor === 1 ? rawPerp : `${rawPerp} = ${answerTex}`;

    return {
      questionText: `Line $p$ is defined by $${a}y+${b}x=${c}$. Line $r$ is perpendicular to line $p$ in the $xy$-plane. What is the slope of line $r$? Enter your answer as a fraction or decimal.`,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: `Rewrite line $p$ in slope-intercept form: $${a}y=-${b}x+${c}$, so $y=-\\frac{${b}}{${a}}x+\\frac{${c}}{${a}}$. The slope of line $p$ is $-\\frac{${b}}{${a}}$. The slope of a perpendicular line is the negative reciprocal, so the slope of line $r$ is $${perpChain}$.`
    };
  }
};
