import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2cb17792
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system with k, one distinct solution, discriminant=0]
 * - Difficulty factors: [System of equations, substitution, discriminant condition]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Subtract equations, get quadratic in x, discriminant=0]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_2cb17792 = {
  metadata: {
    // id: "2cb17792",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: y+k=x+26, y-k=x²-5x, subtract: 2k = -x²+6x+26, rearr: x²-6x+(2k-26)=0
    // Discriminant: 36 - 4(2k-26) = 0 → 36 - 8k + 104 = 0 → 8k = 140 → k = 17.5
    
    // Pattern: y+k = x + c1, y-k = x² + c2*x, find k for one solution
    
    const c1 = getRandomInt(15, 35);
    const c2 = getRandomInt(-8, -2); // Negative coefficient for variety
    
    // Subtracting: 2k = -x² + (1-c2)x + c1
    // Rearranging: x² + (c2-1)x + (2k-c1) = 0
    
    // For one solution, discriminant = 0:
    // (c2-1)² - 4(2k-c1) = 0
    // (c2-1)² = 4(2k-c1)
    // 2k-c1 = (c2-1)²/4
    // 2k = c1 + (c2-1)²/4
    
    const linearCoeff = c2 - 1;
    const kValue = (c1 + (linearCoeff * linearCoeff) / 4) / 2;
    
    // Format as fraction if needed
    const numerator = 4 * c1 + linearCoeff * linearCoeff;
    const denominator = 8;
    
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const commonFactor = gcd(numerator, denominator);
    
    let kDisplay: string;
    if (denominator / commonFactor === 1) {
      kDisplay = (numerator / commonFactor).toString();
    } else {
      kDisplay = `${numerator / commonFactor}/${denominator / commonFactor}`;
    }
    
    // STEP 2: No figure needed
    const figureCode = null;
    
    return {
      questionText: `$y + k = x + ${c1}$\n$y - k = x^2 ${c2 >= 0 ? '+' : ''}${c2}x$\n\nIn the given system of equations, $k$ is a constant. The system has exactly one distinct real solution. What is the value of $k$?`,
      figureCode: figureCode,
      options: null,
      correctAnswer: kDisplay,
      explanation: `The correct answer is $${kDisplay}$. Subtracting the second equation from the first: $2k=-x^2+${1-c2}x+${c1}$, or $x^2+${-(1-c2)}x+(2k-${c1})=0$. For exactly one solution, the discriminant equals 0: $(${-(1-c2)})^2-4(2k-${c1})=0$, so $${linearCoeff*linearCoeff}=8k-${4*c1}$, thus $k=${kDisplay}$.`
    };
  }
};

/**
 * Question ID: 74473be4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [four quadratics, checking discriminants]
 * - Difficulty factors: [Discriminant analysis for all options, identifying negative discriminant]
 * - Distractor patterns: [A: discriminant>0, B: discriminant=0, C: discriminant>0, D: discriminant<0]
 * - Constraints: [Only one option has negative discriminant]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/74473be4.ts