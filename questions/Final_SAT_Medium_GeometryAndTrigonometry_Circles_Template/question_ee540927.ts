import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: ee540927
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 58 (double-digit, even number)]
 * - Difficulty factors: [Completing the square, circle equation standard form]
 * - Distractor patterns: [A=swapped coords and wrong sign, B=wrong variable assignment, C=wrong sign only, D=correct]
 * - Constraints: [Must complete square properly, center is (-h, -k) from equation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_ee540927 = {
  metadata: {
    // id: "ee540927",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random coefficient for x (double-digit, even, positive for medium difficulty)
    // Original used 58, we use range 40-80 to maintain similar difficulty
    const b = getRandomInt(20, 40) * 2; // Even numbers: 40, 42, 44, ..., 80
    const halfB = b / 2;
    const perfectSquare = halfB * halfB;
    
    // STEP 2: Calculate center coordinates
    const h = -halfB; // x-coordinate of center
    const k = 0;      // y-coordinate of center (no y term)
    
    // STEP 3: Create distractor options based on SAT error patterns
    // A: (0, halfB) - swapped and wrong sign
    // B: (0, -halfB) - wrong variable (y instead of x)
    // C: (halfB, 0) - wrong sign only
    // D: (-halfB, 0) - correct
    
    const optionsData = [
      { text: `$(0, ${halfB})$`, isCorrect: false, pattern: "swapped coordinates and wrong sign" },
      { text: `$(0, ${-halfB})$`, isCorrect: false, pattern: "assigned shift to y-variable instead of x-variable" },
      { text: `$(${halfB}, 0)$`, isCorrect: false, pattern: "incorrect sign of x-coordinate" },
      { text: `$(${h}, ${k})$`, isCorrect: true }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `$$x^2+${b}x+y^2=0$$ In the xy-plane, the graph of the given equation is a circle. What are the coordinates (x,y) of the center of the circle?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$(${h}, ${k})$`,
      explanation: `Choice ${correctLetter} is correct. To find the center, rewrite the equation in standard form by completing the square. Taking half of ${b} gives ${halfB}, and squaring it gives ${perfectSquare}. Adding ${perfectSquare} to both sides: $$(x^2+${b}x+${perfectSquare})+y^2=${perfectSquare}$$, which factors to $$(x+${halfB})^2+y^2=${perfectSquare}$$. This can be written as $$(x-(${h}))^2+(y-${k})^2=${halfB}^2$$, so the center is at $$(${h}, ${k})$$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].pattern}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].pattern}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].pattern}.`
    };
  }
};

/**
 * Question ID: a0cacec1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerator: 16, denominator: 15 (both double-digit, reasonable fractions)]
 * - Difficulty factors: [Radian to degree conversion, fraction simplification]
 * - Distractor patterns: [None - fill in the blank]
 * - Constraints: [Must simplify 180/15 = 12, then multiply]
 * - Question type: [Text→Fill in the blank]
 * - Figure generation: [None]
 */

// File: generators/Circles/a0cacec1.ts