import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 3f8a701b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 2-12, constant: 2-12, a, b (parameters)]
 * - Difficulty factors: [No solution conditions with multiple statements to evaluate]
 * - Distractor patterns: [A: None, B: I only, C: I and II, D: I and III]
 * - Constraints: [a=coefficient necessary, b≠constant/coefficient necessary, b=constant not necessary]
 * - Question type: [Equation→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_3f8a701b = {
  metadata: {
    // id: "3f8a701b",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Randomize the equation structure: coeff*x + const = a(x + b)
    const coeff = getRandomInt(2, 12);
    const constVal = getRandomInt(2, 12);
    
    // For no solution: a must equal coeff, and b must not equal const/coeff
    
    const statementI = `a = ${coeff}`;
    const statementII = `b = ${constVal}`;
    const statementIII = `b \\neq \\frac{${constVal}}{${coeff}}`;
    
    const optionsData = [
      { text: "None", isCorrect: false },
      { text: "I only", isCorrect: false },
      { text: "I and II only", isCorrect: false },
      { text: "I and III only", isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    // Fixed: Removed excessive escaping, plain text for words, $...$ for math only
    const explanation = `To determine the conditions under which the linear equation has no solution, let's analyze the given equation: $${coeff}x + ${constVal} = a(x + b)$

First, expand the right side of the equation:
$${coeff}x + ${constVal} = ax + ab$

For a linear equation of the form $Ax + B = Cx + D$ to have no solution, the coefficients of $x$ must be equal ($A = C$), but the constant terms must not be equal ($B \\neq D$).

1. **Match the coefficients of x:**
   On the left side, the coefficient of $x$ is $${coeff}$.
   On the right side, the coefficient of $x$ is $a$.
   So, for the lines to be parallel, we must have:
   $a = ${coeff}$
   This confirms that statement I is true.

2. **Compare the constant terms:**
   On the left side, the constant is $${constVal}$.
   On the right side, the constant is $ab$. Since we know $a = ${coeff}$, the constant on the right becomes $${coeff}b$.
   For the equation to have no solution, these constant terms must not be equal.
   $${constVal} \\neq ${coeff}b$
   Solving for $b$:
   $b \\neq \\frac{${constVal}}{${coeff}}$
   This confirms that statement III is true.

3. **Check statement II:**
   Statement II says $b = ${constVal}$. Is this required?
   If $b = ${constVal}$, then the right side constant is $${coeff}(${constVal}) = ${coeff * constVal}$. Since $${constVal} \\neq ${coeff * constVal}$, the equation would have no solution. However, $b$ could be any number other than $\\frac{${constVal}}{${coeff}}$. Therefore, statement II is not necessarily true.

Conclusion: Statements I and III must be true. Therefore, the correct choice is ${correctLetter}. I and III only.`;
    
    return {
      // Fixed: Removed excessive escaping, plain text for intro, $...$ for math
      questionText: `The equation $${coeff}x + ${constVal} = a(x + b)$, where $a$ and $b$ are constants, has no solutions. Which of the following must be true?\n\nI. $a = ${coeff}$\nII. $b = ${constVal}$\nIII. $b \\neq \\frac{${constVal}}{${coeff}}$`,
      figureCode: null,
      // Fixed: Return string array
      options: shuffledOptions.map(o => o.text),
      correctAnswer: "I and III only",
      explanation: explanation
    };
  }
};

/**
 * Question ID: 429fb7c0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [0.8, 0.46, 8, 0.001, 1.9 (decimals)]
 * - Difficulty factors: [Decimal arithmetic, careful distribution]
 * - Distractor patterns: [N/A - fill-in-blank, decimal answer]
 * - Constraints: [Decimal answer to 4 places]
 * - Question type: [Equation→Fill-in-blank]
 * - Figure generation: [None]
 */