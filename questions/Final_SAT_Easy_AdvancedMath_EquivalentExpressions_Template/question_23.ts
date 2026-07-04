import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 23
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 16, 14, GCF: 2]
 * - Difficulty factors: [Finding GCF, factoring out common factors]
 * - Distractor patterns: [A: factoring x incorrectly, C: using larger coefficient as GCF, D: not reducing coefficients]
 * - Constraints: [Must have common factor > 1]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - Canonical monomial rendering (drop ^1 and coefficient 1) so no two
 *   options render the same expression a different way (e.g. y^{1} vs y).
 * - GCF is now the TRUE greatest common factor of the two coefficients, so
 *   the "greatest common factor" wording in the explanation is always correct.
 * - Every distractor is constructed to differ structurally from the correct
 *   answer, with a normalized-equivalence guard so no distractor can collide
 *   with the correct answer for any draw.
 */

export const generator_23 = {
  metadata: {
    id: "23",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const gcdOf = (m: number, n: number): number => {
      let x = Math.abs(m);
      let y = Math.abs(n);
      while (y) {
        [x, y] = [y, x % y];
      }
      return x || 1;
    };

    // Render a monomial coef * x^xp * y^yp in canonical form.
    // - coefficient 1 is dropped unless the whole term is a bare constant
    // - powers of 1 are written without the exponent (y not y^{1})
    // - powers of 0 drop the variable entirely
    const mono = (coef: number, xp: number, yp: number): string => {
      let s = '';
      if (xp > 0) s += xp === 1 ? 'x' : `x^{${xp}}`;
      if (yp > 0) s += yp === 1 ? 'y' : `y^{${yp}}`;
      if (s === '') return `${coef}`;            // bare constant
      return coef === 1 ? s : `${coef}${s}`;      // drop leading coefficient 1
    };

    // Factored form: outerCoef * xy * ( innerCoef * x^ix * y^iy + constTerm )
    const factored = (
      outerCoef: number,
      innerCoef: number, ix: number, iy: number,
      constTerm: number
    ): string => {
      const outer = mono(outerCoef, 1, 1);        // e.g. 3xy  (coef 1 -> "xy")
      const first = mono(innerCoef, ix, iy);
      return `$${outer}(${first} + ${constTerm})$`;
    };

    // Draw so that the true GCF factoring is clean: the reduced coefficient
    // pair must be coprime, so the drawn gcf is the TRUE greatest common
    // factor of a and b and the expression is fully factored.
    let gcf = getRandomInt(2, 4);
    let remA = getRandomInt(3, 6);              // reduced coefficient of first term
    let remB = getRandomInt(2, 5);              // reduced constant term
    let tries = 0;
    while (gcdOf(remA, remB) > 1 && tries++ < 50) {
      gcf = getRandomInt(2, 4);
      remA = getRandomInt(3, 6);
      remB = getRandomInt(2, 5);
    }
    // Fallback to a guaranteed-coprime pair if retries were exhausted.
    if (gcdOf(remA, remB) > 1) { remA = 5; remB = 2; }

    const a = gcf * remA;
    const b = gcf * remB;
    const x1 = getRandomInt(2, 4);
    const y1 = getRandomInt(2, 3);

    const remX1 = x1 - 1;                        // remaining x power after pulling one x
    const remY1 = y1 - 1;                        // remaining y power after pulling one y

    const correctText = factored(gcf, remA, remX1, remY1, remB);

    // Distractor A: forgets to reduce the x power (keeps full x^{x1} inside).
    // x1 = remX1 + 1 >= 3 > remX1, so this always differs from the correct form.
    const distractorA = factored(gcf, remA, x1, remY1, remB);

    // Distractor C: pulls out only a single x and y but an over-large coefficient
    // (uses a itself instead of the reduced remA), forgetting to divide the
    // constant term correctly -> not equivalent.
    const distractorC = factored(gcf, a, remX1, remY1, remB + 1);

    // Distractor D: does not reduce the coefficients at all after factoring xy
    // (leaves the original a and b inside with a leading 1) -> not equivalent.
    const distractorD = factored(1, a, x1, y1, b);

    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorC, isCorrect: false },
      { text: distractorD, isCorrect: false }
    ];

    // Safety guard: no two options may render as the same math string.
    // With canonical monomial rendering and the coprime draw above this never
    // fires, but assert it so a future edit cannot silently reintroduce a
    // duplicate/ambiguous item.
    const norm = (t: string) => t.replace(/\s+/g, '');
    const texts = optionsData.map(o => norm(o.text));
    if (new Set(texts).size !== texts.length) {
      // Deterministic, always-distinct fallback set.
      optionsData[0].text = factored(gcf, remA, x1, remY1, remB);       // wrong x power
      optionsData[2].text = factored(gcf + 1, remA, remX1, remY1, remB); // wrong gcf
      optionsData[3].text = factored(1, a, x1, y1, b);                   // unreduced
    }

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctInnerText = correctText.replace(/\$/g, '');

    return {
      questionText: `Which expression is equivalent to $${a}x^{${x1}}y^{${y1}} + ${b}xy$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The greatest common factor of $${a}$ and $${b}$ is $${gcf}$. The GCF of the variable parts is $xy$ (the lowest power of each variable). Factoring $${gcf}xy$ out of every term gives $${correctInnerText}$. The other choices use an incorrect common factor or fail to reduce the exponents or coefficients correctly after factoring.`
    };
  }
};
