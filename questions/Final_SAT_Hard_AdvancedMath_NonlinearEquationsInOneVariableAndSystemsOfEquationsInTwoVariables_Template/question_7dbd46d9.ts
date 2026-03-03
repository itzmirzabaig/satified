import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 7dbd46d9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system 8x+y=-11, 2x²=y+341, find x²]
 * - Difficulty factors: [System with linear and quadratic, substitution, solve quadratic]
 * - Distractor patterns: [A: -15, B: -11, C: 121, D: 225/correct]
 * - Constraints: [Substitute linear into quadratic, get two possible x² values]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_7dbd46d9 = {
  metadata: {
    // id: "7dbd46d9",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: ax + by = c1, dx² = y + c2, find x²
    
    const a = getRandomInt(5, 12);
    const d = getRandomInt(1, 4);
    
    // From linear: y = (c1 - ax)/b, substitute into quadratic
    // dx² = (c1 - ax)/b + c2
    
    // Let's use b = 1 for simplicity, so y = c1 - ax
    // dx² = c1 - ax + c2 = (c1+c2) - ax
    // dx² + ax - (c1+c2) = 0
    
    // We want this to factor nicely
    // Let's pick roots for x, say p and q, then x² values are p² and q²
    
    const p = getRandomInt(-15, -8);
    const q = p + getRandomInt(1, 4); // q > p, so -p > -q (greatest is -p)
    
    // Sum: p + q = -a/d, product: pq = -(c1+c2)/d
    
    // Choose d, then a = -d(p+q)
    const finalD = 2;
    const finalA = -finalD * (p + q);
    
    // c1 + c2 = -d*pq
    const sumConstants = -finalD * p * q;
    
    // Split into c1 and c2
    const c1 = getRandomInt(10, 50);
    const c2 = sumConstants - c1;
    
    // x² values are p² and q²
    const xSquared1 = p * p;
    const xSquared2 = q * q;
    
    // STEP 2: Create options (D is larger x²)
    const distractorA = -15;
    const distractorB = Math.floor(-finalA / 2); // Related to coefficient
    const distractorC = xSquared1; // Smaller x²
    
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false, reason: "is not a valid solution for $x^2$ (would require imaginary x)" },
      { text: `$${distractorB}$`, isCorrect: false, reason: "confuses the coefficient with the solution" },
      { text: `$${distractorC}$`, isCorrect: false, reason: "is one possible value, but not the one asked for (or there's an error in identifying which)" },
      { text: `$${xSquared2}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. From the first equation, $y=-${finalA}x+${c1}$. Substituting into the second: $${finalD}x^2=-${finalA}x+${c1}+${c2}=-${finalA}x+${sumConstants}$. This gives $${finalD}x^2+${finalA}x-${sumConstants}=0$, which factors as $(x-${p})(x-${q})=0$. Thus $x=${p}$ or $x=${q}$, and $x^2=${xSquared1}$ or $x^2=${xSquared2}$. The answer is $${xSquared2}$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `$${finalA}x + y = ${c1}$\n$${finalD}x^2 = y + ${c2}$\n\nIf $(x, y)$ is a solution to the given system of equations, what is the value of $x^2$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

/**
 * Question ID: c9417793
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [absolute value |x-9|+45=63, sum of solutions]
 * - Difficulty factors: [Isolate absolute value, split into cases, sum solutions]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Simple arithmetic, check both cases]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/c9417793.ts