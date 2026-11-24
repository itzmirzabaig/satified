import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1115
 *
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Nonlinear Functions (Quadratic Properties)
 * - Logic: f(x) = a*x^2 + B*x + c opens upward (a>0), vertex (h,k) with k<0,
 *   and f(x1)=f(x2). The coefficient B is shown, and h is the midpoint of
 *   x1,x2, so a = -B/(2h) is fully determined by the visible information.
 * - Statement I is one of two claims, so all four answers occur (before, the
 *   answer could never include I):
 *     "c < 0": c = f(0) = a*h^2 + k. Since h != 0, a*h^2 > 0 while k < 0, so
 *       c is indeterminate -> NOT necessarily true.
 *     "f(x) = 0 has two distinct real solutions": opens upward with the vertex
 *       below the x-axis -> must be true.
 * - Statement II (a >= 1): a is forced to a specific value by B and h. Half the
 *   draws give a >= 1 (a in {1,2,3,4}); half give a = 1/2 < 1. a is always an
 *   integer or 1/2, so B is always an integer and nothing is ever displayed as
 *   a repeating decimal.
 */

export const generator_1115 = {
  metadata: {
    id: "1115",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // 1. Axis of symmetry h (nonzero so that "c < 0" stays indeterminate:
    //    if h were 0 then c = k < 0 and "c < 0" would be forced true).
    let h = getRandomInt(-6, 6);
    if (h === 0) h = 2;

    // 2. Symmetry points equidistant from h, so f(x1) = f(x2).
    //    Redraw when an input is 0, which used to print "+ 0" in the midpoint.
    let dist = getRandomInt(1, 5);
    while (h - dist === 0 || h + dist === 0) dist = getRandomInt(1, 5);
    const x1 = h - dist;
    const x2 = h + dist;

    // 3. Determine a and B from h.  h = -B/(2a)  =>  B = -2*a*h.
    //    small_a: a = 1/2 (< 1)  -> B = -h (always an integer), Statement II false.
    //    large_a: a in {1,2,3,4} -> B = -2*a*h (integer),        Statement II true.
    const scenario = getRandomElement(['small_a', 'large_a']);
    const a = scenario === 'small_a' ? 0.5 : getRandomInt(1, 4);
    const B = -2 * a * h; // guaranteed integer for both branches

    // 4. Evaluate statements.
    const statementIKind = getRandomElement(['c', 'roots']);
    const isStatement1True = statementIKind === 'roots';
    const isStatement2True = a >= 1;

    let correctText: string;
    if (isStatement1True && isStatement2True) correctText = "I and II";
    else if (isStatement1True) correctText = "I only";
    else if (isStatement2True) correctText = "II only";
    else correctText = "Neither I nor II";

    // 5. Display helpers.
    // Signed middle term "+ 4x" / "- 4x", never "1x" (B = 1 used to print "- 1x").
    const signB = B >= 0 ? "+" : "-";
    const absB = Math.abs(B);
    const bTerm = absB === 1 ? 'x' : `${absB}x`;
    // a as a clean token: integer, or the fraction 1/2 (never a decimal).
    const aTok = Number.isInteger(a) ? `${a}` : `\\frac{1}{2}`;
    // Midpoint numerator x1 + x2 shown with an explicit sign on x2.
    const x2Signed = x2 >= 0 ? `+ ${x2}` : `- ${Math.abs(x2)}`;
    // -B token for the axis formula, sign-safe.
    const negB = -B; // integer
    // a*h^2 as a clean token.
    const v = a * h * h;
    const vTok = Number.isInteger(v) ? `${v}` : `\\frac{${h * h}}{2}`;

    const statementIText = statementIKind === 'c'
      ? `$c < 0$`
      : `The equation $f(x) = 0$ has two distinct real solutions.`;
    const statementIWork = statementIKind === 'c'
      ? `Statement I need not be true: in vertex form, $c=f(0)=a(0-h)^2+k=${aTok}(${h})^2+k=${vTok}+k$, and $k$ can be any negative number, so $c$ is positive when $-${vTok} < k < 0$ and negative when $k < -${vTok}$.`
      // Keep spaces around < here: "<k" is read by the browser as an HTML tag.
      : `Statement I must be true: the parabola opens upward and its vertex is below the $x$-axis because $k < 0$, so the graph crosses the $x$-axis twice and $f(x)=0$ has two distinct real solutions.`;
    const statementIIWork = isStatement2True
      ? `Statement II must be true because $a=${aTok}$ is at least 1.`
      : `Statement II is false because $a=${aTok}$ is less than 1.`;

    // Each wrong choice names exactly which statement it gets wrong.
    const reasonFor = (claimsI: boolean, claimsII: boolean): string => {
      const parts: string[] = [];
      if (claimsI && !isStatement1True) parts.push(`it includes statement I, which need not be true`);
      if (!claimsI && isStatement1True) parts.push(`it leaves out statement I, which must be true`);
      if (claimsII && !isStatement2True) parts.push(`it includes statement II, which is false because $a=${aTok}$`);
      if (!claimsII && isStatement2True) parts.push(`it leaves out statement II, which must be true because $a=${aTok}$`);
      return parts.join(', and ');
    };

    // 6. Options (always four distinct fixed strings).
    const optionsData = [
      { text: `I only`, isCorrect: correctText === "I only", reason: reasonFor(true, false) },
      { text: `II only`, isCorrect: correctText === "II only", reason: reasonFor(false, true) },
      { text: `I and II`, isCorrect: correctText === "I and II", reason: reasonFor(true, true) },
      { text: `Neither I nor II`, isCorrect: correctText === "Neither I nor II", reason: reasonFor(false, false) }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `In the given quadratic function $f(x) = a x^2 ${signB} ${bTerm} + c$, $a$ and $c$ are constants. Its graph is a parabola that opens upward with vertex $(h, k)$, where $k < 0$, and $f(${x1}) = f(${x2})$. Which of the following must be true?
      <br/>
      I. ${statementIText}
      <br/>
      II. $a \\geq 1$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      // One plain paragraph (was a multiline HTML explanation with no choice reasons).
      explanation: `Choice ${correctOption.letter} is correct. Since $f(${x1}) = f(${x2})$, these two inputs are equally far from the axis of symmetry, so $h = \\frac{${x1} ${x2Signed}}{2} = ${h}$. The coefficient of $x$ is $${B}$, so the axis of symmetry is also $x = \\frac{${negB}}{2a}$. Setting $\\frac{${negB}}{2a} = ${h}$ gives $a = \\frac{${negB}}{2(${h})} = ${aTok}$. ${statementIIWork} ${statementIWork} ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
