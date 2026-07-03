import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1262
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 8, 7, 24, 21, constants: 9, 27]
 * - Difficulty factors: [Equivalent equations, parametric solution form]
 * - Distractor patterns: [wrong sign on r-term, scaled constant, wrong sign on constant]
 * - Constraints: [Equations must be equivalent (second = first * mult)]
 * - Question type: [Table -> Multiple Choice Text]
 * - Figure generation: null
 *
 * REBUILD NOTES:
 * - The two equations are equivalent: Eq1 = Eq2 * mult, so both describe the
 *   same line  A x + B y = C  (A,B,C > 0).
 * - Parametric solution uses the free parameter r as the y-coordinate:
 *   set y = r, solve  A x + B y = C  =>  x = (C - B r) / A = -(B/A) r + C/A.
 *   Correct point: ( -(B/A) r + C/A , r ).
 * - Fractions B/A and C/A are reduced INDEPENDENTLY (each with its own gcd) and
 *   collapse to an integer when the denominator reduces to 1, so no unreduced
 *   fraction and no float artifact ever reaches the user.
 * - Every distractor is a point of the SAME (..., r) form that is provably NOT
 *   on the line for general r, so exactly one option is correct (a "swapped
 *   coordinate" (r, ...) form was deliberately rejected: it re-parametrizes the
 *   same line and would be a second true answer). Substituting each distractor
 *   into A x + B y leaves a residual that depends on r or a wrong constant:
 *     D1 (wrong sign on r):     A(+B/A r + C/A) + B r = 2B r + C  != C
 *     D2 (scaled constant):     A(-B/A r + mC/A) + B r = mC       != C  (m>=2)
 *     D3 (wrong sign on const):  A(-B/A r - C/A) + B r = -C        != C  (C>0)
 * - Distractors differ from the correct answer and from each other in either the
 *   sign of the r-term or the constant, for every draw; a bounded exact-string
 *   dedupe retry (<= 50) is kept as a belt-and-suspenders guard.
 */

export const generator_1262 = {
  metadata: {
    id: "1262",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

    // Reduced fraction as LaTeX: collapses to an integer string when den | num.
    // `sign` is '+' or '-' and is emitted as a leading unary sign so the caller
    // can concatenate terms without producing "+ -" runs.
    const fracTex = (num: number, den: number, coeff = ''): string => {
      const s = num < 0 ? '-' : '+';
      let n = Math.abs(num);
      let d = Math.abs(den);
      const g = gcd(n, d) || 1;
      n /= g;
      d /= g;
      if (d === 1) return `${s} ${n === 1 && coeff ? '' : n}${coeff}`;
      return `${s} \\frac{${n === 1 && coeff ? '' : n}${coeff}}{${d}}`;
    };

    // Build a point string "\\left( <xTerms> , <yExpr> \\right)".
    // xTerms is a list of pre-signed terms; a leading '+' is stripped.
    const point = (xTerms: string[], yExpr: string): string => {
      let x = xTerms.join(' ').trim();
      if (x.startsWith('+')) x = x.slice(1).trim();
      return `\\left(${x}, ${yExpr}\\right)`;
    };

    const build = () => {
      const mult = getRandomInt(2, 5);
      const A = getRandomInt(2, 5);
      const B = getRandomInt(2, 5);
      const C = getRandomInt(5, 15);

      // Correct: y = r, x = -(B/A) r + C/A.
      const correct = point(
        [fracTex(-B, A, 'r'), fracTex(C, A)],
        'r'
      );

      // Distractor 1 — wrong sign on the r-term: forgot to negate when isolating
      // x, giving ( +(B/A) r + C/A , r ). Off the line for r != 0.
      const optSign = point(
        [fracTex(B, A, 'r'), fracTex(C, A)],
        'r'
      );

      // Distractor 2 — used the scaled equation's constant with the unscaled
      // coefficients: x = -(B/A) r + (mult*C)/A. On the parallel line, not this one.
      const optScaled = point(
        [fracTex(-B, A, 'r'), fracTex(mult * C, A)],
        'r'
      );

      // Distractor 3 — wrong sign on the constant term: x = -(B/A) r - C/A.
      // Substitution yields -C, so it satisfies A x + B y = -C, not = C.
      const optConst = point(
        [fracTex(-B, A, 'r'), fracTex(-C, A)],
        'r'
      );

      return { mult, A, B, C, correct, distractors: [optSign, optScaled, optConst] };
    };

    // Bounded retry: reshuffle the parameter draw until the four option strings
    // are pairwise distinct (exact string). Distractors are constructed to
    // differ structurally, so this rarely fires, but it is a hard guard.
    let data = build();
    let tries = 0;
    while (
      tries++ < 50 &&
      new Set([data.correct, ...data.distractors]).size !== 4
    ) {
      data = build();
    }
    const { mult, A, B, C, correct, distractors } = data;

    const optionsData = [
      { text: distractors[0], isCorrect: false, reason: "keeps the wrong sign on the $r$-term when isolating $x$, so it fails the equation for $r \\neq 0$" },
      { text: correct, isCorrect: true },
      { text: distractors[1], isCorrect: false, reason: "uses the scaled constant $" + (mult * C) + "$ instead of $" + C + "$, placing the point on a parallel line" },
      { text: distractors[2], isCorrect: false, reason: "uses the wrong sign on the constant, so it satisfies $" + A + "x + " + B + "y = " + (-C) + "$ instead" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Correct x displayed for the explanation, from the SAME live values.
    const xDisplay = (() => {
      let s = `${fracTex(-B, A, 'r')} ${fracTex(C, A)}`.trim();
      if (s.startsWith('+')) s = s.slice(1).trim();
      return s;
    })();

    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Equation 1</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Equation 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${mult * A}x + ${mult * B}y = ${mult * C}$</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${A}x + ${B}y = ${C}$</td>
    </tr>
  </tbody>
</table>`;

    return {
      questionText: `For each real number $r$, which of the following points lies on the graph of each equation in the $xy$-plane for the given system?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correct,
      explanation: `Choice ${correctLetter} is correct. The two equations are equivalent (Equation 1 is Equation 2 multiplied by $${mult}$), so they represent the same line $${A}x + ${B}y = ${C}$. Letting the free parameter be the $y$-coordinate, set $y = r$ and solve for $x$: $${A}x + ${B}r = ${C}$, so $x = \\frac{${C} - ${B}r}{${A}} = ${xDisplay}$. Thus every solution has the form $${correct}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
