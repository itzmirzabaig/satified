import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 137cc6fd
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [roots: 5th and 6th, exponents: varied]
 * - Difficulty factors: [Multiple radical operations, rational exponents, solving for x in exponent]
 * - Distractor patterns: [Wrong common denominators, arithmetic errors in fraction simplification]
 * - Constraints: [Must equate exponents correctly, n > 1]
 * - Question type: [Fill-in-the-blank - fraction]
 * - Figure generation: [None]
 */

export const generator_137cc6fd = {
  metadata: {
    // id: "137cc6fd",
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
    
    // STEP 2: Format answer
    let correctAnswer: string;
    if (simplifiedDen === 1) {
      correctAnswer = simplifiedNum.toString();
    } else {
      correctAnswer = `\\frac{${simplifiedNum}}{${simplifiedDen}}`;
    }
    
    // STEP 3: Build question
    const questionText = `$ \\sqrt[${root1}]{70n}(\\sqrt[${root2}]{70n})^{2} $ For what value of $x$ is the given expression equivalent to $(70n)^{30x}$, where $n > 1$?`;
    
    // STEP 4: Explanation
    const explanation = `Rewrite the radicals using rational exponents:
- $ \\sqrt[${root1}]{70n} = (70n)^{\\frac{1}{${root1}}} $
- $ \\sqrt[${root2}]{70n} = (70n)^{\\frac{1}{${root2}}} $, so $(\\sqrt[${root2}]{70n})^{2} = (70n)^{\\frac{2}{${root2}}} $

Multiply the expressions by adding exponents:
$$ (70n)^{\\frac{1}{${root1}}} \\cdot (70n)^{\\frac{2}{${root2}}} = (70n)^{\\frac{1}{${root1}} + \\frac{2}{${root2}}} $$

Find common denominator (${root1 * root2}):
$$ \\frac{1}{${root1}} + \\frac{2}{${root2}} = \\frac{${root2}}{${root1 * root2}} + \\frac{${2 * root1}}{${root1 * root2}} = \\frac{${root2} + ${2 * root1}}{${root1 * root2}} = \\frac{${sumNum}}{${sumDen}} $$

Set equal to $30x$:
$$ \\frac{${sumNum}}{${sumDen}} = 30x $$

Solve for $x$:
$$ x = \\frac{${sumNum}}{${sumDen} \\cdot 30} = \\frac{${finalNum}}{${finalDen}} = ${correctAnswer} $$`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 433184f1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerators: single digit, denominators: linear expressions]
 * - Difficulty factors: [Rational expression subtraction, common denominators, distribution with negatives]
 * - Distractor patterns: [Sign errors, forgetting to distribute negative, wrong common denominator]
 * - Constraints: [None specific]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */