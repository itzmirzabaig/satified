import { shuffle, getRandomInt, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1237
 * Skill: Systems Of Two Linear Equations In Two Variables
 * Difficulty: Hard
 *
 * Description: Identify the system of equations with no solution (parallel lines).
 *
 * REBUILD NOTES:
 * - correctAnswer now equals the correct option's TEXT (previously it was set to
 *   the letter, which matched no option → CORRECT_MISMATCH on every draw).
 * - The old "one solution" distractor `Bx+Ay / Ax+By` became a SECOND no-solution
 *   system whenever A = ±B (and degenerated to the same line when A = B). Replaced
 *   with two distractors whose slopes provably differ from a parallel line, so the
 *   no-solution system is unique for every draw.
 * - `\begin{cases}` rows are now single-line with a space after each `\\`, which
 *   removes the backslash-before-newline SIGN_GLITCH.
 * - Explanation compares the SCALED first equation to the second (integer RHS),
 *   avoiding fractional intercepts.
 */
export const generator_1237 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. BASE LINE  A x + B y = C1   (small readable integers)
    // ----------------------------------------------------------------------
    const A = getRandomInt(2, 5);
    const B = getRandomNonZeroInt(2, 5) * (Math.random() > 0.5 ? 1 : -1);
    const C1 = getRandomInt(5, 15);

    // ----------------------------------------------------------------------
    // 2. OPTIONS
    // ----------------------------------------------------------------------
    // (A) NO SOLUTION — same line scaled by 2 on the left, different RHS.
    //     2A x + 2B y = C2  with C2 != 2*C1  => parallel & distinct.
    const kNo = 2;
    const C2 = kNo * C1 + getRandomInt(3, 9); // guaranteed != kNo*C1
    const optNoSol = `\\begin{cases} ${formatEq(A, B, C1)} \\\\ ${formatEq(A * kNo, B * kNo, C2)} \\end{cases}`;

    // (B) INFINITE SOLUTIONS — second equation is an exact multiple of the first.
    const kInf = 3;
    const optInfSol = `\\begin{cases} ${formatEq(A, B, C1)} \\\\ ${formatEq(A * kInf, B * kInf, kInf * C1)} \\end{cases}`;

    // (C) ONE SOLUTION — different x-coefficient => different slope.
    const optOneSolA = `\\begin{cases} ${formatEq(A + 1, B, C1)} \\\\ ${formatEq(A, B, C1)} \\end{cases}`;

    // (D) ONE SOLUTION — different y-coefficient and RHS => different slope, distinct.
    const optOneSolB = `\\begin{cases} ${formatEq(A, B, C1)} \\\\ ${formatEq(A, B + 1, C1 + 2)} \\end{cases}`;

    // ----------------------------------------------------------------------
    // 3. RETURN DATA
    // ----------------------------------------------------------------------
    const optionsData = [
      { text: `$$${optNoSol}$$`, isCorrect: true },
      { text: `$$${optInfSol}$$`, isCorrect: false },
      { text: `$$${optOneSolA}$$`, isCorrect: false },
      { text: `$$${optOneSolB}$$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correct = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correct.letter;

    // Left-hand side string (identical on both lines of the correct system).
    const lhs = formatLhs(A, B);

    return {
      questionText: `Which of the following systems of linear equations has no solution?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correct.text,
      explanation:
        `Choice ${correctLetter} is correct. ` +
        `A system of two linear equations has no solution when the lines are parallel (equal slopes) but distinct (different intercepts). ` +
        `In the correct system, multiplying the first equation by ${kNo} gives $${formatEq(A * kNo, B * kNo, kNo * C1)}$. ` +
        `The second equation is $${formatEq(A * kNo, B * kNo, C2)}$, which has the same left side $${lhs}$ but a different right side (${kNo * C1} vs. ${C2}). ` +
        `Because the left sides are identical while the right sides differ, the two lines are parallel and never intersect, so there is no solution. ` +
        `The other choices each have a solution: one system is a pair of identical equations (infinitely many solutions), and the remaining two have different slopes (exactly one solution each).`
    };
  }
};

// Helper: full equation "a x + b y = c" with clean signs.
function formatEq(a: number, b: number, c: number): string {
  return `${formatLhs(a, b)} = ${c}`;
}

// Helper: left-hand side "a x + b y" with clean signs and unit coefficients.
function formatLhs(a: number, b: number): string {
  const aStr = a === 1 ? "x" : a === -1 ? "-x" : `${a}x`;
  const bStr = b >= 0
    ? (b === 1 ? "+ y" : `+ ${b}y`)
    : (b === -1 ? "- y" : `- ${Math.abs(b)}y`);
  return `${aStr} ${bStr}`;
}
