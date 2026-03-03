import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: ba0edc30
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [quadratic with b=-2, c=-9, discriminant gives 40 under radical]
 * - Difficulty factors: [Quadratic formula, simplifying radical, identifying k in form 1+√k]
 * - Distractor patterns: [8 = incorrect radicand, 20 = half of discriminant, 40 = unsimplified discriminant]
 * - Constraints: [Discriminant must be positive but not perfect square, must simplify to form with √k where k is square-free]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_ba0edc30 = {
  metadata: {
    // id: "ba0edc30",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: x² - 2x - 9 = 0, solution form 1 ± √10, so k = 10
    // We need discriminant = b² - 4ac to simplify to 4k where k is the answer
    
    // For equation x² + bx + c = 0 to give solutions (-b ± √(b²-4c))/2
    // If we want form 1 ± √k, then -b/2 = 1, so b = -2
    // And √(b²-4c)/2 = √k, so (b²-4c)/4 = k, thus b²-4c = 4k
    
    const b = -2; // Fixed to get the "1 +" part
    const k = getRandomInt(6, 15); // The answer, should be square-free
    // Check if k is square-free (not divisible by perfect squares > 1)
    // Simple check: not divisible by 4 or 9
    
    const discriminant = 4 * k;
    // b² - 4c = discriminant → 4 - 4c = 4k → c = 1 - k
    const c = 1 - k;
    
    // STEP 2: Calculate derived values
    // Solutions: (2 ± √(4-4(1-k)))/2 = (2 ± √(4k))/2 = (2 ± 2√k)/2 = 1 ± √k
    // So one solution is 1 + √k
    
    // STEP 3: Create distractors
    // Distractor A: k/2 or some incorrect calculation
    const distractorA = Math.floor(k / 2);
    // Distractor C: 2*k
    const distractorC = 2 * k;
    // Distractor D: discriminant value (unsimplified)
    const distractorD = discriminant;
    
    // STEP 4: Create options with tracking
    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "is incorrect; this might result from dividing the correct value by 2" },
      { text: k.toString(), isCorrect: true },
      { text: distractorC.toString(), isCorrect: false, reason: "is incorrect; this might result from multiplying instead of simplifying the discriminant" },
      { text: distractorD.toString(), isCorrect: false, reason: "is incorrect; this is the discriminant before simplification, not the value of k" }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 6: Build explanation
    const explanation = `Choice ${correctLetter} is correct. Using the quadratic formula for $x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0$ where $a=1$, $b=${b}$, and $c=${c}$: $x = \\frac{${-b} \\pm \\sqrt{${b*b} - 4(1)(${c})}}{2} = \\frac{2 \\pm \\sqrt{${discriminant}}}{2} = \\frac{2 \\pm 2\\sqrt{${k}}}{2} = 1 \\pm \\sqrt{${k}}$. Comparing $1 + \\sqrt{${k}}$ to $1 + \\sqrt{k}$, we get $k = ${k}$.
Choice ${incorrectOptions[0].letter} ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `One solution to the given equation can be written as $1 + \\sqrt{k}$, where $k$ is a constant. What is the value of $k$?\n\n$x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: `$${o.text}$` })),
      correctAnswer: k.toString(),
      explanation: explanation
    };
  }
};

/**
 * Question ID: fc3d783a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [line: 2y=4.5, parabola: y=-4x²+bx, b is positive]
 * - Difficulty factors: [Horizontal line intersects parabola at exactly one point, discriminant = 0]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Horizontal line gives constant y, discriminant must be 0 for single intersection, b > 0]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/fc3d783a.ts