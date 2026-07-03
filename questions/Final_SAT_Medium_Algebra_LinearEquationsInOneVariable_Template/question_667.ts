import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 667
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: single-digit to double-digit]
 * - Difficulty factors: [Algebraic manipulation, recognizing the expression
 *   (x - f) can be solved for directly without first solving for x]
 * - Distractor patterns: [A gives the value of x instead of (x - f);
 *   a sign-error value; a small arithmetic slip]
 * - Constraints: [b divides c so (bx - c) = b(x - f); solve for (x - f)]
 * - Question type: [Equation solving - Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_667 = {
  metadata: {
    id: "667",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Equation:  a(bx - c) - d = e(x - f) + g,  with c = b*f so bx - c = b(x - f).
    // Let u = x - f.  Then  a*b*u - d = e*u + g  =>  (a*b - e)*u = g + d.
    // Answer-first construction: choose u (clean positive integer) and the
    // coefficient m = a*b - e >= 2, then force g = m*u - d so the equation is
    // exactly consistent and u is always an integer.
    let a = 0, b = 0, f = 0, c = 0, d = 0, e = 0, g = 0, m = 0, u = 0;
    let tries = 0;
    do {
      a = getRandomInt(2, 5);
      b = getRandomInt(2, 4);
      f = getRandomInt(2, 5);          // f = c / b (integer)
      c = b * f;
      const ab = a * b;                // 4..20
      m = getRandomInt(2, Math.min(8, ab - 2)); // a*b - e, kept >= 2
      e = ab - m;                      // in [2, a*b - 2], always >= 2
      u = getRandomInt(2, 5);          // chosen value of (x - f)
      d = getRandomInt(5, 15);
      g = m * u - d;                   // forced for consistency
      tries++;
    } while ((g < 3 || g > 20) && tries < 50);

    // Deterministic fallback (hand-checked): a=3,b=2,f=3,c=6,m=4,e=2,u=3,d=6,g=6
    if (g < 3 || g > 20) {
      a = 3; b = 2; f = 3; c = b * f; m = 4; e = a * b - m; u = 3; d = 6; g = m * u - d;
    }

    const ab = a * b;

    // Distractors (all guaranteed pairwise distinct from u for u>=2, f>=2):
    const dxValue = u + f;   // solved for x instead of (x - f)
    const dSign = -u;        // sign error: treated (e - a*b) as the coefficient
    const dSlip = u - 1;     // arithmetic slip when dividing

    const correctText = `$${u}$`;
    const optionsData = [
      { text: `$${dxValue}$`, isCorrect: false },
      { text: `$${u}$`, isCorrect: true },
      { text: `$${dSign}$`, isCorrect: false },
      { text: `$${dSlip}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;

    return {
      questionText: `If $${a}(${b}x - ${c}) - ${d} = ${e}(x - ${f}) + ${g}$, what is the value of $(x - ${f})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Because $${b}$ is a factor of both $${b}x$ and $${c}$, the expression $${b}x - ${c}$ can be written as $${b}(x - ${f})$. Substituting this on the left-hand side gives $${a}(${b})(x - ${f}) - ${d} = ${e}(x - ${f}) + ${g}$, which is $${ab}(x - ${f}) - ${d} = ${e}(x - ${f}) + ${g}$. Subtracting $${e}(x - ${f})$ from both sides gives $${m}(x - ${f}) - ${d} = ${g}$, and adding $${d}$ to both sides gives $${m}(x - ${f}) = ${g + d}$. Dividing both sides by $${m}$ gives $(x - ${f}) = ${u}$. The value $${dxValue}$ is the value of the variable x itself rather than of $(x - ${f})$, and the other choices come from a sign or arithmetic error.`
    };
  }
};
