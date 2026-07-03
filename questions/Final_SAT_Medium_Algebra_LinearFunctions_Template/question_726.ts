import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 726
 *
 * ANALYSIS:
 * - Context: Linear function with a fractional slope and fractional intercept.
 * - Given: f(x) = (num/denom)x + intNum/denom and f(x) = target.
 * - Task: Solve for x (fill-in).
 * - Logic: (num*x + intNum)/denom = target  =>  x = (target*denom - intNum)/num.
 *
 * ANSWER-FIRST CONSTRUCTION (guarantees a clean integer answer, no float artifacts):
 *   - Pick denom in [3,7].
 *   - Pick num in [2,5] coprime to denom (so num/denom is already in lowest terms
 *     and num has a modular inverse mod denom).
 *   - Pick intNum in [1, denom-1] so intNum/denom is a genuine proper fraction.
 *   - Solve num*x ≡ -intNum (mod denom) for the residue x0, then lift by a random
 *     multiple of denom so x is a positive integer >= 2 with variety.
 *   - target = (num*x + intNum)/denom is then always a positive integer.
 * Verified over the full parameter space: x and target are always integers,
 * x in [4,27], target in [3,20]. Because the answer is a whole number the fill-in
 * response is a plain integer string (no fraction/decimal instructions needed).
 */

export const generator_726 = {
  metadata: {
    id: "726",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => {
      while (b) { [a, b] = [b, a % b]; }
      return a;
    };

    // Denominator of both fractions.
    const denom = getRandomInt(3, 7);

    // Slope numerator: coprime to denom so num/denom is in lowest terms and
    // num is invertible mod denom. Coprime options always exist for denom in [3,7].
    const coprimeNums: number[] = [];
    for (let n = 2; n <= 5; n++) if (gcd(n, denom) === 1) coprimeNums.push(n);
    const num = coprimeNums[getRandomInt(0, coprimeNums.length - 1)];

    // Intercept numerator: proper fraction (1 <= intNum <= denom-1).
    const intNum = getRandomInt(1, denom - 1);

    // Modular inverse of num mod denom (exists because gcd(num, denom) = 1).
    let inv = 1;
    let guard = 0;
    while ((num * inv) % denom !== 1 && guard++ < denom) inv++;

    // Base residue solving num*x ≡ -intNum (mod denom).
    let x0 = (((inv * (-intNum)) % denom) + denom) % denom;
    if (x0 === 0) x0 = denom;

    // Lift into a nicer range and add variety while keeping x an integer >= 2.
    const x = x0 + getRandomInt(1, 3) * denom;

    // target is guaranteed to be a positive integer by construction.
    const target = (num * x + intNum) / denom;

    // Values used verbatim in the explanation so they stay consistent.
    const rhs = target * denom;          // both sides times denom
    const afterSubtract = rhs - intNum;  // num*x isolated

    return {
      questionText: `The function $f$ is defined by $f(x) = \\frac{${num}}{${denom}}x + \\frac{${intNum}}{${denom}}$. For what value of $x$ does $f(x) = ${target}$?`,
      figureCode: null,
      options: [],
      correctAnswer: x.toString(),
      explanation: `Set $f(x) = ${target}$: $\\frac{${num}}{${denom}}x + \\frac{${intNum}}{${denom}} = ${target}$. Multiply both sides by ${denom}: $${num}x + ${intNum} = ${rhs}$. Subtract ${intNum} from both sides: $${num}x = ${afterSubtract}$. Divide both sides by ${num}: $x = \\frac{${afterSubtract}}{${num}} = ${x}$.`
    };
  }
};
