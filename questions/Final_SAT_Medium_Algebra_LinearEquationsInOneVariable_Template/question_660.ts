import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 660
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [a: 2-4, b: 1-3, c: 5-(9-a), d: -3..-1, e: a+c-1]
 * - Difficulty factors: [Distributing, combining like terms]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Standard linear equation solving with an INTEGER solution]
 * - Question type: [Fill-in-the-blank]
 *
 * MATH NOTE: The equation is a(p+b) + c(p+d) = e*p. Expanding:
 *   a*p + a*b + c*p + c*d = e*p
 *   (a + c - e)*p = -(a*b + c*d)
 * The original code drew e independently, so a + c - e could be 0, producing a
 * division by zero (Infinity) and, in other draws, non-terminating decimals that
 * cannot be an exact fill-in answer. To guarantee a clean, exact INTEGER answer
 * for every draw we force the p-coefficient to 1 by choosing e = a + c - 1 (and
 * we bound c so that a + c stays in [7,9], keeping e in the valid range [6,8]).
 * Then (a + c - e) = 1, so p = -(a*b + c*d) is always an exact integer.
 */

export const generator_660 = {
  metadata: {
    id: "660",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Draw so that a + c is in [7, 9]; then e = a + c - 1 (p-coefficient = 1).
    const a = getRandomInt(2, 4);
    const c = getRandomInt(5, 9 - a);   // a + c in [7, 9]
    const b = getRandomInt(1, 3);
    const d = getRandomInt(-3, -1);
    const e = a + c - 1;                 // makes (a + c - e) = 1

    const constant = a * b + c * d;      // constant term after distributing (a*b + c*d)
    const answer = -constant;            // exact integer: 1 * p = -(a*b + c*d)

    const correctAnswer = `${answer}`;

    // Helper: render a signed additive term, e.g. 5 -> "+5", -3 -> "-3", 0 -> "".
    const signed = (n: number) => (n === 0 ? '' : n > 0 ? `+${n}` : `${n}`);
    const combined = `${a + c}p${signed(constant)}`;      // left side after combining
    // After subtracting e*p from both sides:  1*p + constant = 0.  When the
    // constant is 0 the equation is already p = 0; otherwise move it across
    // (its sign flips) to isolate p. Build the final sentence per case.
    const finalSentence = constant === 0
      ? `Subtracting \\( ${e}p \\) from both sides leaves \\( p=0 \\).`
      : `Subtracting \\( ${e}p \\) from both sides leaves \\( p${signed(constant)}=0 \\), and ${constant > 0 ? 'subtracting' : 'adding'} \\( ${Math.abs(constant)} \\) ${constant > 0 ? 'from' : 'to'} both sides gives \\( p=${answer} \\).`;

    return {
      questionText: `\\( ${a}(p+${b})+${c}(p${d})=${e}p \\)\n\nWhat value of \\( p \\) is the solution of the equation above?`,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${answer}. Distributing gives \\( ${a}p+${a * b}+${c}p${c * d}=${e}p \\). Combining like terms on the left gives \\( ${combined}=${e}p \\). ${finalSentence}`
    };
  }
};
