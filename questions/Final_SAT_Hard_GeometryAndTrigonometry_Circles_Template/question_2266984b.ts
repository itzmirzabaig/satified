import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 2266984b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: double digit (20, 16), constant: -20]
 * - Difficulty factors: [Completing the square with larger numbers]
 * - Distractor patterns: [Sign errors on center, using raw coefficients]
 * - Constraints: [Must complete square correctly]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_2266984b = {
  metadata: {
    // id: "2266984b",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate center coordinates
    const h = -getRandomInt(5, 15); // Negative for variety
    const k = -getRandomInt(5, 15); // Negative for variety
    
    // STEP 2: Generate radius
    const r = getRandomInt(5, 15);
    
    // STEP 3: Build equation x² + Bx + y² + Cy = D form
    // Expanded: (x-h)² + (y-k)² = r²
    // x² - 2hx + h² + y² - 2ky + k² = r²
    // x² + (-2h)x + y² + (-2k)y = r² - h² - k²
    
    const B = -2 * h;  // Coefficient of x (positive since h is negative)
    const C = -2 * k;  // Coefficient of y (positive since k is negative)
    const D = h * h + k * k - r * r;  // Right side when rearranged
    
    // Actually, we want: x² + Bx + y² + Cy = -D (negative constant)
    // Let's use the form: x² + Bx + y² + Cy = constant
    // From standard: x² - 2hx + y² - 2ky = r² - h² - k²
    
    const rightSide = r * r - h * h - k * k; // This is D from earlier
    
    // STEP 4: Generate distractor centers
    // Distractor A: (B, C) - forgetting to halve and wrong signs
    const distractorA = `(${B},${C})`;
    
    // Distractor C: (-B, -C) - wrong signs but halved
    const distractorC = `(${-B/2},${-C/2})`;
    
    // Distractor D: (-B, -C) without halving
    const distractorD = `(${-B},${-C})`;
    
    const correctText = `(${h},${k})`;
    
    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorC, isCorrect: false },
      { text: distractorD, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `The equation $x^2+${B}x+y^2+${C}y=${rightSide}$ defines a circle in the $xy$-plane. What are the coordinates of the center of the circle?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. To find the center, complete the square. For $x$: take half of ${B} to get ${B/2}, square it to get ${(B/2)*(B/2)}. For $y$: take half of ${C} to get ${C/2}, square it to get ${(C/2)*(C/2)}$. The equation becomes $(x${h >= 0 ? '-' : '+'}${Math.abs(h)})^2+(y${k >= 0 ? '-' : '+'}${Math.abs(k)})^2=${r*r}$. Thus the center is $(${h}, ${k})$. Choice ${incorrectOptions[0].letter} is incorrect; this uses the raw coefficients without halving or adjusting signs. Choice ${incorrectOptions[1].letter} is incorrect; this has wrong signs. Choice ${incorrectOptions[2].letter} is incorrect; this uses wrong signs without halving.`
    };
  }
};

/**
 * Question ID: 69b0d79d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle: 30°, radius: 18]
 * - Difficulty factors: [Isosceles triangle, central angle calculation, arc length]
 * - Distractor patterns: [Using wrong angle, forgetting to convert to arc length]
 * - Constraints: [Triangle with two radii]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Circle with triangle, arc - requires Mafs]
 */