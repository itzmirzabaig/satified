import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 619
 * 
 * FIXES:
 * - Removed undefined helper function `formatFactor`.
 * - Fixed logical errors in constructing the distractors (ensure unique options).
 * - Fixed return type of options (string[]).
 */

export const generator_619 = {
  metadata: {
    id: "619",
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
