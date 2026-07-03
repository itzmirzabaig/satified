import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 729
 *
 * Evaluate a linear function f(x) = (x + c)/d at two points and subtract.
 *   f(x2) - f(x1) = ((x2 + c) - (x1 + c)) / d = (x2 - x1) / d.
 *
 * Construction: x2 - x1 is forced to be a multiple of d, so the answer is a
 * clean integer. Distractors are built to be mutually distinct by construction
 * (verified numerically) and cover the classic slips: off-by-one, using only
 * the slope 1/d, and forgetting to subtract f(x1).
 */
export const generator_729 = {
  metadata: {
    id: "729",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Reduce a fraction to "a" (integer) or "\frac{a}{b}".
    const gcd = (a: number, b: number): number => {
      let x = Math.abs(a);
      let y = Math.abs(b);
      while (y !== 0) { const t = y; y = x % y; x = t; }
      return x || 1;
    };
    const fracStr = (n: number, de: number): string => {
      const g = gcd(n, de);
      const nn = n / g;
      const dd = de / g;
      return dd === 1 ? `${nn}` : `\\frac{${nn}}{${dd}}`;
    };

    // 1. Math setup — force (x2 - x1) to be a multiple of d for a clean answer.
    const c = getRandomInt(5, 12);
    const d = getRandomInt(3, 6);
    const x1 = getRandomInt(1, 3);
    const k = getRandomInt(2, 4);            // integer answer = (x2 - x1)/d
    const x2 = x1 + k * d;                    // so x2 - x1 = k*d, x2 in a sensible range

    const numDiff = x2 - x1;                  // = k * d
    const answerVal = k;                      // (x2 - x1)/d is the integer k
    const correctText = `${answerVal}`;

    // 2. Distractors (values, then rendered) — guaranteed distinct from the
    //    answer and from each other:
    //  D1: off by one — added the slope one extra time.
    const d1Val = k + 1;
    const d1Text = `${d1Val}`;
    //  D2: reported only the slope 1/d (non-integer, so != k and != k+1).
    const d2Text = fracStr(1, d);
    //  D3: forgot to subtract f(x1); used f(x2) = (x2 + c)/d instead.
    const d3Num = x2 + c;
    const d3Val = d3Num / d;
    const d3Text = fracStr(d3Num, d);

    // Numeric guard: all four distinct. d2Val = 1/d in (0,1) is never an
    // integer; d3Val could in principle land on k or k+1, so verify.
    const vals = [answerVal, d1Val, 1 / d, d3Val];
    const allDistinct = vals.every((v, i) => vals.every((w, j) => i === j || Math.abs(v - w) > 1e-9));

    // If d3 happens to collide, shift c so f(x2) changes (bounded, deterministic
    // fallback that never affects the correct answer, which is independent of c).
    let d3TextFinal = d3Text;
    let cFinal = c;
    if (!allDistinct) {
      let cc = c;
      let tries = 0;
      let ok = false;
      while (!ok && tries++ < 50) {
        cc = 5 + ((c - 5 + tries) % 8);        // cycle through 5..12
        const num = x2 + cc;
        const v = num / d;
        if (Math.abs(v - answerVal) > 1e-9 && Math.abs(v - d1Val) > 1e-9 && Math.abs(v - 1 / d) > 1e-9) {
          d3TextFinal = fracStr(num, d);
          cFinal = cc;
          ok = true;
        }
      }
    }

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: d1Text, isCorrect: false },
      { text: d2Text, isCorrect: false },
      { text: d3TextFinal, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // Explanation values computed from the same live variables.
    const f_x2_num = x2 + cFinal;
    const f_x1_num = x1 + cFinal;
    const f_x2_str = fracStr(f_x2_num, d);
    const f_x1_str = fracStr(f_x1_num, d);

    return {
      questionText: `For the function $f$ defined by $f(x) = \\dfrac{x + ${cFinal}}{${d}}$, what is the value of $f(${x2}) - f(${x1})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct.

1.  **Evaluate $f(${x2})$:**
    $f(${x2}) = \\dfrac{${x2} + ${cFinal}}{${d}} = \\dfrac{${f_x2_num}}{${d}} = ${f_x2_str}$.

2.  **Evaluate $f(${x1})$:**
    $f(${x1}) = \\dfrac{${x1} + ${cFinal}}{${d}} = \\dfrac{${f_x1_num}}{${d}} = ${f_x1_str}$.

3.  **Subtract:**
    $f(${x2}) - f(${x1}) = \\dfrac{${f_x2_num} - ${f_x1_num}}{${d}} = \\dfrac{${numDiff}}{${d}} = ${correctText}$.`
    };
  }
};
