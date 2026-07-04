import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1070
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radical equation √3x+34 = x-2, solutions 10 and -3]
 * - Difficulty factors: [Radical equation, squaring both sides, checking extraneous solutions]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Must check for extraneous solutions, find smallest valid solution]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1070 = {
  metadata: {
    id: "1070",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: √(3x+34) = x-2, solutions of the squared equation are -3 and 10.
    // Pattern: √(ax+b) = x-c where the squared equation has two integer roots, but
    // the smaller root is EXTRANEOUS (it makes the right side x-c negative while the
    // radical is non-negative). The only real solution of the ORIGINAL equation is the
    // larger root, so it is the answer. (An extraneous root is not a solution.)

    // If √(ax+b) = x-c, then ax+b = (x-c)² = x² - 2cx + c², i.e.
    // x² - (2c+a)x + (c²-b) = 0, whose roots p (extraneous) and q (valid) satisfy
    // p + q = 2c + a  and  p*q = c² - b.
    // We pick c, the extraneous root p (< c) and the valid root q (> c) as integers,
    // then DERIVE a = p+q-2c and b = c²-pq. We require a >= 2 so the radical is a
    // genuine, non-degenerate "ax+b" (guards against a=0 giving "√(0x+..)" or a bare "1x").

    let c = 0, validSolution = 0, extraneousSolution = 0, calculatedA = 0, calculatedB = 0;
    let tries = 0;
    do {
      c = getRandomInt(1, 4); // The subtraction on the right side
      validSolution = getRandomInt(c + 2, c + 8);    // q > c  -> genuine solution
      extraneousSolution = getRandomInt(-5, c - 1);  // p < c  -> x-c < 0, extraneous
      calculatedA = (validSolution + extraneousSolution) - 2 * c; // a = p+q-2c
      calculatedB = c * c - validSolution * extraneousSolution;   // b = c^2 - pq
    } while (
      (calculatedA < 2 || validSolution === extraneousSolution) && tries++ < 50
    );

    // The only real solution of the ORIGINAL radical equation is the valid (larger) root.
    const answer = validSolution;

    // STEP 2: No figure needed
    const figureCode = null;

    // Signed-term formatting helpers so every expression renders cleanly regardless of
    // the sign/zero of b, the coefficients, or the roots (avoid "5x+-1", "+ 0", "(x - 0)").
    // Radicand "ax + b": show "ax - |b|" when b<0, plain "ax" when b=0, else "ax + b".
    const radicand = calculatedB < 0
      ? `${calculatedA}x - ${Math.abs(calculatedB)}`
      : (calculatedB === 0 ? `${calculatedA}x` : `${calculatedA}x + ${calculatedB}`);
    // Expanded quadratic x^2 - (2c)x + c^2 (2c and c^2 are always positive here).
    const middle = -(validSolution + extraneousSolution); // coefficient of x in x^2 + (middle)x + const
    const constTerm = validSolution * extraneousSolution;   // = c^2 - b
    const signedX = middle < 0
      ? ` - ${Math.abs(middle)}x`
      : (middle > 0 ? ` + ${middle}x` : ``);
    const signedConst = constTerm < 0
      ? ` - ${Math.abs(constTerm)}`
      : (constTerm > 0 ? ` + ${constTerm}` : ``);
    const factorOf = (root: number): string =>
      root === 0 ? `x` : (root < 0 ? `(x + ${Math.abs(root)})` : `(x - ${root})`);
    const factorValid = factorOf(validSolution);
    const factorExtraneous = factorOf(extraneousSolution);
    const rhsAtExtraneous = extraneousSolution - c; // negative
    const rhsAtValid = validSolution - c;           // positive

    return {
      questionText: `$\\sqrt{${radicand}} = x - ${c}$\n\nWhat is the solution to the given equation?`,
      figureCode: figureCode,
      options: [],
      correctAnswer: answer.toString(),
      explanation: `The correct answer is $${answer}$. Squaring both sides gives $${radicand}=(x-${c})^2=x^2-${2 * c}x+${c * c}$. Rearranging all terms to one side yields $x^2${signedX}${signedConst}=0$, which factors as $${factorValid}${factorExtraneous}=0$. This gives the candidate values $x=${validSolution}$ and $x=${extraneousSolution}$. Because both sides were squared, each candidate must be checked in the original equation. When $x=${extraneousSolution}$, the right side is $x-${c}=${rhsAtExtraneous}$, which is negative, but a square root is never negative, so $x=${extraneousSolution}$ is extraneous and is not a solution. When $x=${validSolution}$, the right side is $x-${c}=${rhsAtValid}$ and $\\sqrt{${radicand}}=${rhsAtValid}$, so both sides are equal. Therefore the only solution is $${answer}$.`
    };
  }
};
