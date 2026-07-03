import { getRandomInt, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1234
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: small integers, integer solution point]
 * - Difficulty factors: [Substitution method, finding x-y instead of individual values]
 * - Distractor patterns: [None - fill in blank, but calculation is complex]
 * - Constraints: [Solution must be integers for clean x-y value; unique solution]
 * - Question type: [Fill in blank]
 *
 * REBUILD NOTES:
 * The original solve code and the displayed equation-1 were mathematically
 * inconsistent (the printed constant differed from the one actually solved, and
 * the sign of the constant was flipped), and the explanation left a dangling
 * unmatched "$". Rebuilt answer-first: pick an integer solution (xs, ys) and
 * integer coefficients, then set line 2's constant so it passes through the
 * point. A guard forces a unique solution (line slopes differ) and both a real
 * x- and y-term in the standard-form equation.
 */

export const generator_1234 = {
  metadata: {
    id: "1234",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    let attempts = 0;
    const maxAttempts = 50;
    let result: QuestionData | null = null;

    while (attempts < maxAttempts && !result) {
      attempts++;

      // Line 1 (slope-intercept form): y = m*x + b
      const m = getRandomNonZeroInt(2, 5);
      const b = getRandomInt(-5, 5);

      // Integer solution point (xs, ys)
      const xs = getRandomInt(-4, 4);
      const ys = m * xs + b;

      // Line 2 (standard form): p*x + q*y = r, made to pass through (xs, ys)
      const p = getRandomNonZeroInt(-5, 5);
      const q = getRandomNonZeroInt(-4, 4);

      // Unique solution requires the lines to have different slopes.
      // Substituting y = m*x + b into p*x + q*y = r gives (p + q*m)*x = r - q*b,
      // which is solvable for a single x iff (p + q*m) != 0.
      if (p + q * m === 0) continue;

      const r = p * xs + q * ys;

      const answer = xs - ys;

      // ---- Formatting helpers (kept local, integer-only) ----
      // Leading term of an expression: coefficient * varName (no leading '+').
      const leadTerm = (coef: number, varName: string): string => {
        const a = Math.abs(coef);
        const t = a === 1 ? varName : `${a}${varName}`;
        return coef < 0 ? `-${t}` : t;
      };
      // Trailing term of an expression: " + t" or " - t".
      const tailTerm = (coef: number, varName: string): string => {
        const a = Math.abs(coef);
        const t = a === 1 ? varName : `${a}${varName}`;
        return coef < 0 ? ` - ${t}` : ` + ${t}`;
      };
      const tailConst = (c: number): string => (c < 0 ? ` - ${Math.abs(c)}` : ` + ${Math.abs(c)}`);

      // Line 1: y = m x + b
      const line1Rhs = `${leadTerm(m, 'x')}${b === 0 ? '' : tailConst(b)}`;
      const eq1 = `y = ${line1Rhs}`;
      // Line 2: p x + q y = r
      const eq2 = `${leadTerm(p, 'x')}${tailTerm(q, 'y')} = ${r}`;

      // q * (m x + b) as a trailing term (carries its own leading sign / factor).
      const qFactor = Math.abs(q) === 1 ? '' : `${Math.abs(q)}`;
      const qGroup = `${qFactor}(${line1Rhs})`;
      const substitutedLhs = `${leadTerm(p, 'x')}${q < 0 ? ` - ${qGroup}` : ` + ${qGroup}`}`;

      // y back-substitution: m(xs) + b
      const yBack = `${m === 1 ? '' : m === -1 ? '-' : m}(${xs})${b === 0 ? '' : tailConst(b)}`;

      result = {
        questionText: `The solution to the given system of equations is $(x, y)$. What is the value of $x - y$? $$${eq1}$$ $$${eq2}$$`,
        figureCode: null,
        options: [],
        correctAnswer: answer.toString(),
        explanation: `Substitute the first equation into the second. Replacing $y$ with $${line1Rhs}$ in $${eq2}$ gives $${substitutedLhs} = ${r}$. Solving this equation for $x$ gives $x = ${xs}$. Substituting back, $y = ${yBack} = ${ys}$. Therefore $x - y = ${xs} - (${ys}) = ${answer}$.`
      };
    }

    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }

    return result;
  }
};
