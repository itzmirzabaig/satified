import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 66bce0c1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radical equation sqrt(2x+6)+4=x+3]
 * - Difficulty factors: [Isolate radical, square both sides, check extraneous solutions, set notation]
 * - Distractor patterns: [A: includes extraneous, B: only valid, C: includes both, D: includes extra wrong]
 * - Constraints: [Must check solutions in original equation, return as set]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_66bce0c1 = {
  metadata: {
    // id: "66bce0c1",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: √(ax+b) + c = x + d, isolate and solve
    
    const a = getRandomInt(2, 4);
    const c = getRandomInt(3, 6); // The added constant
    const d = getRandomInt(1, 4); // Right side constant
    
    // √(ax+b) + c = x + d → √(ax+b) = x + (d-c)
    // Let e = d - c (should be negative for extraneous solution pattern)
    const e = d - c; // This is negative
    
    // Square: ax + b = (x+e)² = x² + 2ex + e²
    // x² + (2e-a)x + (e²-b) = 0
    
    // We want one valid solution and one extraneous
    // Valid solution: x where x+e ≥ 0 (so √(ax+b) = x+e is valid)
    // Extraneous: x where x+e < 0
    
    // Let's pick the valid solution first
    const validSol = getRandomInt(3, 8);
    // Then √(a*validSol+b) = validSol + e, so a*validSol + b = (validSol+e)²
    const b = (validSol + e) * (validSol + e) - a * validSol;
    
    // The quadratic should give another solution that's extraneous
    // Sum of roots = a - 2e (from x² + (2e-a)x + ... = 0, so sum = a-2e)
    const sumOfRoots = a - 2*e;
    const extraneousSol = sumOfRoots - validSol;
    
    // STEP 2: Create options
    const correctSet = `\\{${validSol}\\}`;
    const distractorA = `\\{${extraneousSol}\\}`; // Only the extraneous one
    const distractorC = `\\{${extraneousSol}, ${validSol}\\}`; // Both
    const distractorD = `\\{0, ${extraneousSol}, ${validSol}\\}`; // With extra 0
    
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false, reason: "includes only the extraneous solution; when substituted, the left side is positive but the right side is negative" },
      { text: `$${correctSet}$`, isCorrect: true },
      { text: `$${distractorC}$`, isCorrect: false, reason: "includes both the valid and extraneous solutions without checking" },
      { text: `$${distractorD}$`, isCorrect: false, reason: "incorrectly includes 0, which is not a solution" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Isolating the radical: $\\sqrt{${a}x+${b}}=x${e}$. Squaring: $${a}x+${b}=x^2${2*e}x+${e*e}$, or $x^2${2*e-a}x+${e*e-b}=0$. This factors as $(x-${validSol})(x-${extraneousSol})=0$. Checking $x=${validSol}$: $\\sqrt{${a*validSol+b}}+${c}=${validSol+c}$ and ${validSol}+${d}=${validSol+d}$ ✓. Checking $x=${extraneousSol}$: left side is positive but right side is ${extraneousSol+d}<0$ ✗.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `$\\sqrt{${a}x+${b}} + ${c} = x + ${d}$\n\nWhat is the solution set of the equation above?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 97e50fa2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [parabola vertex form, line y=-x+10, intersection points at 2 and 8]
 * - Difficulty factors: [Set f(a)=g(a), solve quadratic, either solution valid]
 * - Distractor patterns: [N/A - fill in blank, accepts 2 or 8]
 * - Constraints: [Must have two intersection points, either is acceptable]
 * - Question type: [Fill-in-the-blank with multiple accepted answers]
 * - Figure generation: [Mafs graph showing parabola and line]
 */

// File: generators/hard/advanced_math/97e50fa2.ts