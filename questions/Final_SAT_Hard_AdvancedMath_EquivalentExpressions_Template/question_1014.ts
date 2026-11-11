import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1014
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [roots: 5th and 6th, exponents: varied]
 * - Difficulty factors: [Multiple radical operations, rational exponents, solving for x in exponent]
 * - Distractor patterns: [Wrong common denominators, arithmetic errors in fraction simplification]
 * - Constraints: [Must equate exponents correctly, n > 1]
 * - Question type: [Fill-in-the-blank - fraction]
 * - Figure generation: [None]
 */

export const generator_1014 = {
  metadata: {
    id: "1014",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate root indices
    const root1 = getRandomInt(3, 6);
    let root2 = getRandomInt(3, 6);
    while (root1 === root2) {
      root2 = getRandomInt(3, 6);
    }
    
    // The expression: (70n)^(1/root1) * (70n)^(2/root2) = (70n)^(1/root1 + 2/root2)
    const numerator1 = 1;
    const denominator1 = root1;
    const numerator2 = 2;
    const denominator2 = root2;
    
    // Calculate sum: 1/root1 + 2/root2 = (root2 + 2*root1)/(root1*root2)
    const sumNum = root2 + 2 * root1;
    const sumDen = root1 * root2;
    
    // Now solve: sumNum/sumDen = 30x, so x = sumNum/(30*sumDen)
    const finalNum = sumNum;
    const finalDen = 30 * sumDen;
    
    // Simplify
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const g = gcd(finalNum, finalDen);
    
    const simplifiedNum = finalNum / g;
    const simplifiedDen = finalDen / g;
    
    // STEP 2: Format answer (fill-in: plain "a/b" fraction, never LaTeX)
    const correctAnswer = simplifiedDen === 1
      ? simplifiedNum.toString()
      : `${simplifiedNum}/${simplifiedDen}`;
    // LaTeX version for use inside math in the explanation only
    const answerTex = simplifiedDen === 1
      ? `${simplifiedNum}`
      : `\\frac{${simplifiedNum}}{${simplifiedDen}}`;

    // STEP 3: Build question
    const questionText = `$ \\sqrt[${root1}]{70n}(\\sqrt[${root2}]{70n})^{2} $ For what value of $x$ is the given expression equivalent to $(70n)^{30x}$, where $n > 1$? (Enter your answer as a fraction.)`;
    
    // STEP 4: Explanation
    // Before: markdown bullets, display math on separate lines, and no
    // "The correct answer is" opening. Now plain sentences with inline math.
    const sumTex = `\\frac{${sumNum}}{${sumDen}}`;
    const explanation = `The correct answer is ${correctAnswer}. Rewrite each radical with a rational exponent: $\\sqrt[${root1}]{70n} = (70n)^{\\frac{1}{${root1}}}$ and $\\sqrt[${root2}]{70n} = (70n)^{\\frac{1}{${root2}}}$, so $(\\sqrt[${root2}]{70n})^{2} = (70n)^{\\frac{2}{${root2}}}$. Multiplying powers with the same base adds the exponents, so the expression equals $(70n)^{\\frac{1}{${root1}} + \\frac{2}{${root2}}}$. With the common denominator ${root1 * root2}, $\\frac{1}{${root1}} + \\frac{2}{${root2}} = \\frac{${root2}}{${root1 * root2}} + \\frac{${2 * root1}}{${root1 * root2}} = ${sumTex}$. Since $n > 1$, the base $70n$ is greater than 1, so the two expressions are equivalent exactly when their exponents are equal: $30x = ${sumTex}$. Dividing both sides by 30 gives $x = \\frac{${finalNum}}{${finalDen}}${g > 1 ? ` = ${answerTex}` : ''}$.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
