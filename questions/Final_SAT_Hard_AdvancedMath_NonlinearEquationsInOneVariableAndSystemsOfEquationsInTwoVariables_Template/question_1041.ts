import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1041
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [involves square root equation with parameter k, discriminant analysis]
 * - Difficulty factors: [Radical equation with parameter, extraneous solution analysis, finding minimum k for exactly one solution]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Domain restriction from square root, discriminant condition, exactly one valid solution]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1041 = {
  metadata: {
    id: "1041",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: √(k-x) = 58-x, find minimum 4k
    // Pattern: √(k-x) = a - x where a is a constant
    
    const a = getRandomInt(40, 70); // The constant in (a-x)
    
    // Squaring: k-x = (a-x)² = a² - 2ax + x²
    // x² - (2a-1)x + (a²-k) = 0
    
    // For exactly one solution, we analyze cases:
    // 1. Discriminant = 0 (tangent case): (2a-1)² - 4(a²-k) = 0
    //    4a² - 4a + 1 - 4a² + 4k = 0 → 4k = 4a - 1
    
    // 2. Or discriminant > 0 but one root is extraneous (x > a, violating a-x ≥ 0)
    
    // Minimum 4k occurs at discriminant = 0 case: 4k = 4a - 1
    
    // Check that the double root x = (2a-1)/2 = a - 0.5 satisfies x <= a:
    // a - 0.5 <= a, so the tangent-case solution is valid.
    
    const min4k = 4 * a - 1;

    // a^2 is always 1,600 or more and used to print with no thousands comma.
    // The double root also printed as an unfinished subtraction ("58-0.5").
    const aSquaredTex = (a * a).toLocaleString('en-US').replace(/,/g, '{,}');
    const doubleRoot = a - 0.5;

    // STEP 2: No figure needed
    const figureCode = null;

    return {
      questionText: `$\\sqrt{k-x}=${a}-x$\n\nIn the given equation, $k$ is a constant. The equation has exactly one real solution. What is the minimum possible value of $4k$?`,
      figureCode: figureCode,
      options: [],
      correctAnswer: min4k.toString(),
      explanation: `The correct answer is ${min4k}. Squaring both sides gives $k-x=(${a}-x)^2$, which rearranges to $x^2-${2*a-1}x+(${aSquaredTex}-k)=0$. The discriminant of this quadratic is $(-${2*a-1})^2-4(${aSquaredTex}-k)$, which simplifies to $4k-${min4k}$. If $4k<${min4k}$, the discriminant is negative and the equation has no real solution, so no smaller value of $4k$ is possible. If $4k=${min4k}$, the discriminant is $0$ and the quadratic has the single solution $x=\\frac{${2*a-1}}{2}=${doubleRoot}$. This value satisfies the original equation because $${a}-${doubleRoot}=0.5$ is not negative and $k-x=\\frac{${min4k}}{4}-${doubleRoot}=0.25=(0.5)^2$. Therefore the minimum possible value of $4k$ is ${min4k}.`
    };
  }
};
