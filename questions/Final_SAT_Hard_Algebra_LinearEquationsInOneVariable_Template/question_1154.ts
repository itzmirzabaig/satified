import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1154
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [-3, 21, 84 (coefficients)]
 * - Difficulty factors: [No solution condition with parameter p]
 * - Distractor patterns: [A: 0 (makes solvable), C: a competing fraction, D: an integer (both give unique solutions)]
 * - Constraints: [Coefficient of x must be 0, constant must be non-zero]
 * - Question type: [Equation -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * MATH: a*x + b*p*x = c  =>  x*(a + b*p) = c.
 * With c != 0 the equation has NO solution iff the coefficient of x is 0,
 * i.e. a + b*p = 0  =>  p = -a/b. Since a in [-8,-2] and b in [10,30],
 * p = (-a)/b is a positive proper fraction (numerator in [2,8] < denominator).
 */

export const generator_1154 = {
  metadata: {
    id: "1154",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : gcd(y, x % y));

    // STEP 1: Draw coefficients. p = -a/b must make the x-coefficient vanish.
    const a = getRandomInt(-8, -2);   // negative coefficient of the bare x term
    const b = getRandomInt(10, 30);   // coefficient attached to p
    const c = getRandomInt(40, 100);  // non-zero constant on the right

    // STEP 2: Reduce p = (-a)/b to lowest terms.
    const pNum = -a;                  // in [2,8]
    const pDenom = b;                 // in [10,30]
    const g = gcd(pNum, pDenom);
    const finalPNum = pNum / g;
    const finalPDenom = pDenom / g;   // still > 1 because pNum < pDenom
    const correctP = `\\frac{${finalPNum}}{${finalPDenom}}`;
    const correctValue = finalPNum / finalPDenom; // in (0,1)
    // Show the reduction step only when the raw fraction actually reduces.
    const pReductionStr = g > 1 ? `\\frac{${pNum}}{${pDenom}} = ${correctP}` : correctP;

    // STEP 3: Distractors that each yield a UNIQUE solution (wrong for "no solution").
    // A: p = 0  -> coefficient a (nonzero) -> unique solution.
    const distractorA = "0";

    // C: a competing fraction; guard it away from the correct value and from D.
    // D: an integer in [2,8]; a nonzero x-coefficient -> unique solution.
    let distractorCNum = 0, distractorCDenom = 1, distractorD = 0;
    let tries = 0;
    do {
      distractorCNum = getRandomInt(3, 8);
      distractorCDenom = getRandomInt(2, 5);
      distractorD = getRandomInt(2, 8);
      tries++;
    } while (
      tries < 50 && (
        // C must not reduce to an integer that could read like D, and must differ from correct
        distractorCNum % distractorCDenom === 0 ||
        Math.abs(distractorCNum / distractorCDenom - correctValue) < 1e-9 ||
        Math.abs(distractorCNum / distractorCDenom - distractorD) < 1e-9 ||
        distractorD === finalPNum // avoid D visually echoing the numerator
      )
    );
    const distractorC = `\\frac{${distractorCNum}}{${distractorCDenom}}`;

    const optionsData = [
      {
        text: distractorA,
        isCorrect: false,
        reason: `if $p = 0$ the equation becomes $${a}x = ${c}$, which gives the unique solution $x = ${correctValueDivStr(c, a)}$`
      },
      { text: correctP, isCorrect: true },
      {
        text: distractorC,
        isCorrect: false,
        reason: `substituting $p = ${distractorC}$ leaves a nonzero coefficient of $x$, so the equation has one unique solution`
      },
      {
        text: distractorD.toString(),
        isCorrect: false,
        reason: `substituting $p = ${distractorD}$ leaves a nonzero coefficient of $x$, so the equation has one unique solution`
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `We are asked for the value of $p$ that makes the equation have no solution. Start from the given equation:
$$${a}x + ${b}px = ${c}$$

Factor $x$ out of the left side:
$$x(${a} + ${b}p) = ${c}$$

A linear equation of the form $kx = m$ has:
- exactly one solution when $k \\neq 0$,
- no solution when $k = 0$ and $m \\neq 0$,
- infinitely many solutions when $k = 0$ and $m = 0$.

Here the coefficient of $x$ is $${a} + ${b}p$ and the constant is $${c}$. Because $${c} \\neq 0$, the equation has no solution exactly when the coefficient of $x$ is zero:
$$${a} + ${b}p = 0$$

Add $${Math.abs(a)}$ to both sides:
$$${b}p = ${-a}$$

Divide both sides by $${b}$:
$$p = ${pReductionStr}$$

With $p = ${correctP}$ the equation becomes $0 \\cdot x = ${c}$, i.e. $0 = ${c}$, which is false — so there is no solution.

Choice ${correctLetter} is correct.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.

Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.

Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;

    return {
      questionText: `$$${a}x + ${b}px = ${c}$$ In the given equation, $p$ is a constant. The equation has no solution. What is the value of $p$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctP,
      explanation: explanation
    };
  }
};

/**
 * Render c/a as an exact integer or a reduced fraction string (no float artifacts).
 */
function correctValueDivStr(c: number, a: number): string {
  const gcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : gcd(y, x % y));
  if (c % a === 0) return (c / a).toString();
  const sign = (c < 0) !== (a < 0) ? "-" : "";
  const nc = Math.abs(c), na = Math.abs(a);
  const g = gcd(nc, na);
  return `${sign}\\frac{${nc / g}}{${na / g}}`;
}
