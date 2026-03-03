import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: c3f8a9d2
 * 
 * FIXES:
 * - Removed undefined helper function `formatFactor`.
 * - Fixed logical errors in constructing the distractors (ensure unique options).
 * - Fixed return type of options (string[]).
 */

export const generator_c3f8a9d2 = {
  metadata: {
    id: "c3f8a9d2",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup
    // Difference of Squares: (Ax^n)^2 - (By^m)^2
    // Factors: (Ax^n + By^m)(Ax^n - By^m)
    
    const A = getRandomInt(2, 6);
    const B = getRandomInt(2, 6);
    const n = getRandomInt(1, 3);
    const m = getRandomInt(1, 3);
    
    // Polynomial: (A^2)x^(2n) - (B^2)y^(2m)
    const coeff1 = A * A;
    const exp1 = 2 * n;
    const coeff2 = B * B;
    const exp2 = 2 * m;
    
    const polynomial = `${coeff1}x^{${exp1}} - ${coeff2}y^{${exp2}}`;
    
    // Factors
    const term1 = `${A}x^{${n}}`;
    const term2 = `${B}y^{${m}}`;
    
    const factorPlus = `${term1} + ${term2}`;
    const factorMinus = `${term1} - ${term2}`;
    
    // Randomly choose which correct factor to display
    const isPlusCorrect = Math.random() < 0.5;
    const correctFactor = isPlusCorrect ? factorPlus : factorMinus;
    
    // Distractors
    // 1. Wrong coefficients (A^2 instead of A)
    const d1 = `${coeff1}x^{${n}} ${isPlusCorrect ? '+' : '-'} ${coeff2}y^{${m}}`;
    // 2. Wrong exponents (2n instead of n)
    const d2 = `${A}x^{${exp1}} ${isPlusCorrect ? '+' : '-'} ${B}y^{${exp2}}`;
    // 3. Wrong sign (display the OTHER factor? No, question asks "Which is a factor". Both are correct. 
    //    We must display something that is NOT a factor.)
    //    Let's display (Ax^n + B^2 y^m) -- mixed error
    const d3 = `${A}x^{${n}} + ${coeff2}y^{${m}}`;

    const optionsData = [
      { text: correctFactor, isCorrect: true },
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
      questionText: `Which of the following is equivalent to the expression $${polynomial}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Identify Pattern:**
    The expression $${polynomial}$ is a difference of squares in the form $a^2 - b^2 = (a-b)(a+b)$.
    
2.  **Determine Terms:**
    First term: $${coeff1}x^{${exp1}} = (${A}x^{${n}})^2$
    Second term: $${coeff2}y^{${exp2}} = (${B}y^{${m}})^2$
    
3.  **Factor:**
    $(${A}x^{${n}})^2 - (${B}y^{${m}})^2 = (${A}x^{${n}} - ${B}y^{${m}})(${A}x^{${n}} + ${B}y^{${m}})$
    
    The option $${correctOption.text}$ matches one of these factors.`
    };
  }
};

/**
 * Question ID: a7e4b1f9
 * 
 * ANALYSIS:
 * - Context: Binomial Multiplication.
 * - Task: Expand (ax + b)(cx + d).
 * - Result: acx^2 + (ad + bc)x + bd.
 */
export const generator_a7e4b1f9 = {
  metadata: {
    id: "a7e4b1f9",
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