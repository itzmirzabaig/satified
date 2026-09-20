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
    const r1 = -getRandomInt(2, 6);
    const r2 = r1 + getRandomInt(2, 5);
    const vertex = (r1 + r2) / 2;
    
    // Interval option text. Uses \lt, not <: option text is injected as HTML
    // before math rendering, and a raw "<x" opens a tag that swallows the
    // rest of the string — including the closing $. KaTeX renders \lt as <.
    const interval = (a: number, b: number) => `$${a} \\lt x \\lt ${b}$`;
    
    const optionsData = [
      { text: interval(r1 - 1, r1), isCorrect: false },
      { text: interval(r1, r2), isCorrect: true },
      { text: interval(r2, r2 + 2), isCorrect: false },
      { text: interval(r2 + 2, r2 + 3), isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    const factor1 = r1 >= 0 ? `(x-${r1})` : `(x+${Math.abs(r1)})`;
    const factor2 = r2 >= 0 ? `(x-${r2})` : `(x+${Math.abs(r2)})`;
    
    return {
      questionText: `The function $f$ is defined by $f(x)=${factor1}${factor2}$. In which of the following intervals does $f(x)$ reach its minimum?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: interval(r1, r2),
      explanation: `Choice ${correctLetter} is correct. The x-intercepts are at $x=${r1}$ and $x=${r2}$. The vertex (minimum) is at $x=\\frac{${r1}+${r2}}{2}=${vertex}$, which lies in the interval $(${r1}, ${r2})$.`
    };
  }
};