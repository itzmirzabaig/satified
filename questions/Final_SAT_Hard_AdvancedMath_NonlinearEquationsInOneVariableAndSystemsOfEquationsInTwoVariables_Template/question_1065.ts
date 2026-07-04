import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1065
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 1.5 (decimal), linear coefficient: 8, constant: double-digit range]
 * - Difficulty factors: [System of equations with parabola and horizontal line, discriminant condition for exactly one solution]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Discriminant must equal 0 for exactly one solution, a must be positive]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1065 = {
  metadata: {
    id: "1065",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving original difficulty
    // Original used y = -1.5 and y = x² + 8x + a
    // We'll randomize the horizontal line value and linear coefficient
    
    const horizontalY = getRandomInt(-5, -1) - 0.5; // Values like -1.5, -2.5, -3.5, etc.
    // linearCoeff starts at 5 so that a = horizontalY + linearCoeff^2/4 is ALWAYS positive.
    // Worst case: horizontalY = -5.5, linearCoeff = 5 -> a = -5.5 + 6.25 = 0.75 > 0.
    // (linearCoeff = 4 would give linearCoeff^2/4 = 4, and horizontalY = -5.5 makes a = -1.5 < 0,
    //  which would violate the stated "a is a positive constant" premise.)
    const linearCoeff = getRandomInt(5, 12); // Random linear coefficient (original was 8)
    const horizontalYDisplay = horizontalY < 0 ? horizontalY.toString() : `+${horizontalY}`;

    // STEP 2: Calculate derived values using discriminant = 0 condition
    // Substituting: horizontalY = x² + linearCoeff*x + a
    // Rearranging: x² + linearCoeff*x + (a - horizontalY) = 0
    // Discriminant: linearCoeff² - 4(1)(a - horizontalY) = 0
    // Solving for a: a = horizontalY + linearCoeff²/4

    const aValue = horizontalY + (linearCoeff * linearCoeff) / 4;

    // a is guaranteed positive because linearCoeff >= 5 => linearCoeff^2/4 >= 6.25 > 5.5 >= |horizontalY|.
    
    // Format a as fraction if needed, or decimal
    const aNumerator = (4 * horizontalY) + (linearCoeff * linearCoeff);
    const aDenominator = 4;
    
    // Simplify fraction
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const commonDivisor = gcd(Math.abs(aNumerator), aDenominator);
    const simplifiedNum = aNumerator / commonDivisor;
    const simplifiedDen = aDenominator / commonDivisor;
    
    let aDisplay: string;
    if (simplifiedDen === 1) {
      aDisplay = simplifiedNum.toString();
    } else {
      aDisplay = `${simplifiedNum}/${simplifiedDen}`;
    }
    
    // STEP 3: No figure needed
    const figureCode = null;
    
    // STEP 4: Return question data
    return {
      questionText: `$y = ${horizontalYDisplay}$\n$y = x^2 + ${linearCoeff}x + a$\n\nIn the given system of equations, $a$ is a positive constant. The system has exactly one distinct real solution. What is the value of $a$?`,
      figureCode: figureCode,
      options: [], // Fill-in-the-blank
      correctAnswer: aDisplay,
      explanation: `The correct answer is $${aDisplay}$. According to the first equation in the given system, the value of $y$ is ${horizontalYDisplay}. Substituting ${horizontalYDisplay} for $y$ in the second equation yields $${horizontalYDisplay} = x^2 + ${linearCoeff}x + a$. Adding ${Math.abs(horizontalY)} to both sides yields $0 = x^2 + ${linearCoeff}x + (a + ${Math.abs(horizontalY)})$. If the given system has exactly one distinct real solution, the discriminant must equal 0. The discriminant is $(${linearCoeff})^2 - 4(1)(a + ${Math.abs(horizontalY)}) = ${linearCoeff * linearCoeff} - 4a - ${4 * Math.abs(horizontalY)}$. Setting this equal to 0 and solving: $4a = ${linearCoeff * linearCoeff - 4 * Math.abs(horizontalY)}$, so $a = ${aDisplay}$.`
    };
  }
};
