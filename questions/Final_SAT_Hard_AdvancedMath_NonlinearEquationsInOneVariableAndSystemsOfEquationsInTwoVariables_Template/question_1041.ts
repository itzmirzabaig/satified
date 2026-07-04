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
    
    // STEP 2: No figure needed
    const figureCode = null;
    
    return {
      questionText: `$\\sqrt{k-x}=${a}-x$\n\nIn the given equation, $k$ is a constant. The equation has exactly one real solution. What is the minimum possible value of $4k$?`,
      figureCode: figureCode,
      options: [],
      correctAnswer: min4k.toString(),
      explanation: `The correct answer is $${min4k}$. Squaring both sides gives $k-x=(${a}-x)^2$, which rearranges to $x^2-(2\\cdot${a}-1)x+(${a}^2-k)=0$, i.e. $x^2-${2*a-1}x+(${a*a}-k)=0$. For this quadratic in $x$, the discriminant is $(2\\cdot${a}-1)^2-4(${a}^2-k)=4\\cdot${a}^2-4\\cdot${a}+1-4\\cdot${a}^2+4k=4k-${4*a-1}$. As $k$ increases from small values, the discriminant $4k-${4*a-1}$ is first negative (no real solution), then zero, then positive. The smallest $k$ giving a real solution is where the discriminant equals $0$, i.e. $4k-${4*a-1}=0$, so $4k=${min4k}$. At that value there is exactly one (double) root $x=${a}-0.5$, which satisfies the domain requirement $${a}-x\\ge 0$. Therefore the minimum possible value of $4k$ is $${min4k}$.`
    };
  }
};
