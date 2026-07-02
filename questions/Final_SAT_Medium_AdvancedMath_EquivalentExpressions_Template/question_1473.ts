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
    // 1. Math Setup
    const a = getRandomInt(2, 5);
    const c = getRandomInt(2, 5);
    const b = getRandomInt(1, 9) * (Math.random() < 0.5 ? 1 : -1);
    const d = getRandomInt(1, 9) * (Math.random() < 0.5 ? 1 : -1);
    
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

Combine like terms ($${a*d}x + ${b*c}x$):
$${term1}x^2 + (${a*d + b*c})x + ${term3}$

Which simplifies to:
$${correctPoly}$`
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
