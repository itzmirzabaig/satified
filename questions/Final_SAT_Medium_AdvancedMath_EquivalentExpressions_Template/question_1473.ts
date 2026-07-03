import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1473
 * 
 * ANALYSIS:
 * - Context: Binomial Multiplication.
 * - Task: Expand (ax + b)(cx + d).
 * - Result: acx^2 + (ad + bc)x + bd.
 */
export const generator_1473 = {
  metadata: {
    id: "1473",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup — bounded retry so every option is distinct and no
    //    x-coefficient is 0 (avoids "0x" terms and duplicate options).
    //    Middles used by the options: correct = ad+bc, d1 = ad-bc, d2 = a+c.
    //    d3 flips the constant's sign (bd is never 0 since b, d are nonzero).
    let a = 2, c = 3, b = 1, d = 5; // safe fallback: middles 13, 7, 5 all distinct & nonzero
    let tries = 0;
    while (tries++ < 50) {
      const aa = getRandomInt(2, 5);
      const cc = getRandomInt(2, 5);
      const bb = getRandomInt(1, 9) * (getRandomInt(0, 1) === 0 ? 1 : -1);
      const dd = getRandomInt(1, 9) * (getRandomInt(0, 1) === 0 ? 1 : -1);
      const mid = aa * dd + bb * cc;
      const altMid = aa * dd - bb * cc;
      const sumMid = aa + cc;
      if (mid === 0 || altMid === 0) continue;
      if (altMid === mid || sumMid === mid || altMid === sumMid) continue;
      a = aa; c = cc; b = bb; d = dd;
      break;
    }

    // (ax + b)(cx + d)
    const term1 = a * c; // x^2 coeff
    const term2 = a * d + b * c; // x coeff
    const term3 = b * d; // constant
    
    // Format binomials
    const bin1 = formatBinomial(a, b);
    const bin2 = formatBinomial(c, d);
    
    // 2. Options
    // Correct: ac x^2 + (ad+bc)x + bd
    const correctPoly = formatPolynomial(term1, term2, term3);
    
    // Distractors
    // 1. Wrong middle term (ad - bc)
    const d1 = formatPolynomial(term1, a * d - b * c, term3);
    // 2. Wrong middle term (just sum of constants? or just product of x coeffs?)
    // Let's use (a+c)x for middle
    const d2 = formatPolynomial(term1, a + c, term3);
    // 3. Sign error on constant
    const d3 = formatPolynomial(term1, term2, -term3);

    const optionsData = [
      { text: correctPoly, isCorrect: true },
      { text: d1, isCorrect: false },
      { text: d2, isCorrect: false },
      { text: d3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const letterFor = (text: string) => shuffledOptions.find(o => o.text === text)!.letter;

    return {
      questionText: `Which of the following is equivalent to the expression $(${bin1})(${bin2})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct.

To expand the expression $(${bin1})(${bin2})$, multiply each term in the first binomial by each term in the second binomial (FOIL method):

1.  **First terms:** $(${a}x)(${c}x) = ${term1}x^2$
2.  **Outer terms:** $(${a}x)(${d}) = ${a*d}x$
3.  **Inner terms:** $(${b})(${c}x) = ${b*c}x$
4.  **Last terms:** $(${b})(${d}) = ${term3}$

Combine the like terms: $${a*d}x ${b*c >= 0 ? '+' : '-'} ${Math.abs(b*c)}x = ${term2}x$.

So the product is $${correctPoly}$.

Choice ${letterFor(d1)} is incorrect; it results from subtracting the inner product from the outer product instead of adding them when combining the middle terms. Choice ${letterFor(d2)} is incorrect; it adds the leading coefficients of the two binomials, $${a} + ${c} = ${a + c}$, and uses that sum as the coefficient of the middle term instead of combining the outer and inner products. Choice ${letterFor(d3)} is incorrect; it results from a sign error on the constant term: $(${b})(${d}) = ${term3}$, not $${-term3}$.`
    };
  }
};

// Helpers
function formatBinomial(a: number, b: number): string {
  const sign = b >= 0 ? '+' : '-';
  return `${a}x ${sign} ${Math.abs(b)}`;
}

function formatPolynomial(a: number, b: number, c: number): string {
  // Handle signs
  const signB = b >= 0 ? '+' : '-';
  const signC = c >= 0 ? '+' : '-';
  // If b is 0, omit middle term. If c is 0, omit constant. (Unlikely with current random ranges but good practice)
  return `${a}x^2 ${signB} ${Math.abs(b)}x ${signC} ${Math.abs(c)}`;
}
