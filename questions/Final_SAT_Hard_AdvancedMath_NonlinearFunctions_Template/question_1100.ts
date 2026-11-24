import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1100
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (x+3)(x+1), roots at -3, -1]
 * - Difficulty factors: [Factored form, vertex location, interval identification]
 * - Distractor patterns: [A: -4<x<-3, B: -3<x<1, C: 1<x<3, D: 3<x<4]
 * - Constraints: [Vertex at x = (-3 + -1)/2 = -2, which is in (-3, 1)]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED (options displayed as "$-" fragments):
 * - Option texts contained raw < characters ($-5<x<-4$). Options are
 *   injected as HTML before math rendering (the inject-first pipeline
 *   established in Question 85), and the HTML parser treats "<x" as the
 *   start of a tag, swallowing everything from the first < onward —
 *   including the closing $. Only the leading "$-5"-style fragment
 *   survived on screen. Fix: \lt instead of < inside the math
 *   ($-5 \lt x \lt -4$) — no raw angle bracket reaches the HTML parser,
 *   and KaTeX renders \lt as <. correctAnswer uses the same helper, so the
 *   two strings are identical by construction.
 * - Stem fix (flagged — revert if unwanted): the stem asked "For what value
 *   of x..." while every option is an interval, so no option could answer the
 *   question as asked. It now asks which interval contains the minimum,
 *   matching the option design in the ORIGINAL ANALYSIS.
 */

export const generator_1100 = {
  metadata: {
    id: "1100",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Zeros now share a sign and are never 0. Before, r2 could be 0, which showed
    // "(x-0)", and the sum in the explanation printed as "-3+-1". Same sign also
    // keeps the sign flipped interval below from overlapping the correct one.
    const sign = getRandomInt(0, 1) === 0 ? -1 : 1;
    const small = getRandomInt(1, 4);
    const large = small + getRandomInt(2, 5);
    const r1 = sign < 0 ? -large : small;
    const r2 = sign < 0 ? -small : large;
    const vertex = (r1 + r2) / 2;

    // Interval option text. Uses \lt, not <: option text is injected as HTML
    // before math rendering, and a raw "<x" opens a tag that swallows the
    // rest of the string, including the closing $. KaTeX renders \lt as <.
    const interval = (a: number, b: number) => `$${a} \\lt x \\lt ${b}$`;
    const factor = (r: number) => (r > 0 ? `(x-${r})` : `(x+${-r})`);
    const paren = (r: number) => (r < 0 ? `(${r})` : `${r}`);

    // Distractors were arbitrary intervals with no reasons.
    const optionsData = [
      { text: interval(r1, r2), isCorrect: true, reason: '' },
      { text: interval(-r2, -r1), isCorrect: false, reason: `it uses $x=${-r1}$ and $x=${-r2}$ as the zeros, which have the wrong signs, since the factor $${factor(r1)}$ equals $0$ at $x=${r1}$` },
      { text: interval(r1 - 2, r1), isCorrect: false, reason: `every $x$ in this interval is less than the smaller zero, $${r1}$, where $f(x)$ is positive, so the minimum cannot occur there` },
      { text: interval(r2, r2 + 2), isCorrect: false, reason: `every $x$ in this interval is greater than the larger zero, $${r2}$, where $f(x)$ is positive, so the minimum cannot occur there` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x)=${factor(r1)}${factor(r2)}$. In which of the following intervals does $f(x)$ reach its minimum?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: interval(r1, r2),
      explanation: `Choice ${correctLetter} is correct. The zeros of $f$ are $x=${r1}$ and $x=${r2}$. The graph of $f$ is a parabola that opens upward, so its minimum is at the vertex, halfway between the zeros, at $x=\\frac{${paren(r1)}+${paren(r2)}}{2}=${vertex}$. This value lies in the interval ${interval(r1, r2)}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};