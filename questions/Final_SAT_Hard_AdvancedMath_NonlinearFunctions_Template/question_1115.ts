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
 * - Statement I (c < 0): c = f(0) = a*h^2 + k. Since h != 0, a*h^2 > 0 while
 *   k < 0, so c is indeterminate -> NOT necessarily true.
 * - Statement II (a >= 1): a is forced to a specific value by B and h. Half the
 *   draws give a >= 1 (a in {1,2,3,4}, "II only"); half give a = 1/2 < 1
 *   ("Neither I nor II"). a is always an integer or 1/2, so B is always an
 *   integer and nothing is ever displayed as a repeating decimal.
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
    // 1. Axis of symmetry h (nonzero so that Statement I stays indeterminate:
    //    if h were 0 then c = k < 0 and "c < 0" would be forced true).
    let h = getRandomInt(-6, 6);
    if (h === 0) h = 2;

    // 2. Symmetry points equidistant from h, so f(x1) = f(x2).
    const dist = getRandomInt(1, 5);
    const x1 = h - dist;
    const x2 = h + dist;

    // 3. Determine a and B from h.  h = -B/(2a)  =>  B = -2*a*h.
    //    small_a: a = 1/2 (< 1)  -> B = -h (always an integer), Statement II false.
    //    large_a: a in {1,2,3,4} -> B = -2*a*h (integer),        Statement II true.
    const scenario = getRandomElement(['small_a', 'large_a']);
    const a = scenario === 'small_a' ? 0.5 : getRandomInt(1, 4);
    const B = -2 * a * h; // guaranteed integer for both branches

    // 4. Evaluate statements.
    const isStatement1True = false;      // c is indeterminate (see analysis)
    const isStatement2True = a >= 1;

    let correctText: string;
    if (isStatement1True && isStatement2True) correctText = "I and II";
    else if (isStatement1True) correctText = "I only";
    else if (isStatement2True) correctText = "II only";
    else correctText = "Neither I nor II";

    // 5. Options (always four distinct fixed strings).
    const optionsData = [
      { text: `I only`, isCorrect: correctText === "I only" },
      { text: `II only`, isCorrect: correctText === "II only" },
      { text: `I and II`, isCorrect: correctText === "I and II" },
      { text: `Neither I nor II`, isCorrect: correctText === "Neither I nor II" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // 6. Display helpers.
    // Signed middle term "+ 4x" / "- 4x".
    const signB = B >= 0 ? "+" : "-";
    const absB = Math.abs(B);
    // a as a clean token: integer, or the fraction 1/2 (never a decimal).
    const aTok = Number.isInteger(a) ? `${a}` : `\\frac{1}{2}`;
    // Midpoint numerator x1 + x2 shown with an explicit sign on x2.
    const x2Signed = x2 >= 0 ? `+ ${x2}` : `- ${Math.abs(x2)}`;
    // -B token for the axis formula, sign-safe.
    const negB = -B; // integer

    return {
      questionText: `In the given quadratic function $f(x) = a x^2 ${signB} ${absB}x + c$, $a$ and $c$ are constants. Its graph is a parabola that opens upward with vertex $(h, k)$, where $k < 0$, and $f(${x1}) = f(${x2})$. Which of the following must be true?
      <br/>
      I. $c < 0$
      <br/>
      II. $a \\geq 1$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct.
      <br/><br/>
      <strong>Find the axis of symmetry.</strong> Since $f(${x1}) = f(${x2})$, the two inputs are equidistant from the axis $x = h$, so $h$ is their midpoint:
      $$h = \\frac{${x1} ${x2Signed}}{2} = ${h}.$$
      For $f(x) = a x^2 ${signB} ${absB}x + c$ the axis of symmetry is $x = \\frac{-B}{2a}$, where $B = ${B}$. Setting this equal to $h$ and solving for $a$:
      $$h = \\frac{-B}{2a} \\;\\Rightarrow\\; a = \\frac{-B}{2h} = \\frac{${negB}}{${2 * h}} = ${aTok}.$$
      <br/>
      <strong>Statement II ($a \\geq 1$).</strong> The value $a = ${aTok}$ satisfies $a ${isStatement2True ? `\\geq` : `<`} 1$, so Statement II is <strong>${isStatement2True ? `true` : `false`}</strong>.
      <br/><br/>
      <strong>Statement I ($c < 0$).</strong> The constant is the $y$-intercept $c = f(0) = a(0 - h)^2 + k = a h^2 + k$. Because $h \\neq 0$ and $a > 0$, the term $a h^2$ is positive while $k$ is negative, so $c$ could be positive or negative depending on how far below the $x$-axis the vertex lies. Statement I is therefore not necessarily true.
      <br/><br/>
      ${isStatement2True ? `Only Statement II is forced` : `Neither statement is forced`}, so the answer is <strong>${correctText}</strong>.`
    };
  }
};
