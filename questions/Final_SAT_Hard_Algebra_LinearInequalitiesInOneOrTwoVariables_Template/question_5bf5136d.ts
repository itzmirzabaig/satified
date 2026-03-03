import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 5bf5136d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sides: 6 and 12]
 * - Difficulty factors: [Triangle inequality theorem, compound inequality]
 * - Distractor patterns: [A: only upper bound, B: wrong direction, D: impossible values]
 * - Constraints: [Sum of any two sides > third side, x > 0]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_5bf5136d = {
  metadata: {
    // id: "5bf5136d",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: sides 6 and 12
    // Generate: two sides where one is roughly double the other
    
    const sideA = getRandomInt(5, 9);
    const sideB = sideA * 2 + getRandomInt(-1, 2); // roughly 2x first side
    
    // STEP 2: Calculate valid range for third side
    // |sideA - sideB| < x < sideA + sideB
    const lowerBound = Math.abs(sideA - sideB) + 1; // +1 because must be strictly greater
    const upperBound = sideA + sideB - 1; // -1 because must be strictly less
    
    // STEP 3: Create options
    const optionsData = [
      { text: `$x < ${sideA + sideB}$`, isCorrect: false, reason: "is incomplete - the third side must also be greater than the difference of the other two sides" },
      { text: `$x > ${sideA + sideB}$`, isCorrect: false, reason: "reverses the inequality; the sum of two sides must be greater than the third" },
      { text: `$${lowerBound - 1} < x < ${sideA + sideB}$`, isCorrect: true },
      { text: `$x < ${lowerBound - 1}$ or $x > ${sideA + sideB}$`, isCorrect: false, reason: "describes impossible values for the third side (the complement of the correct range)" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `The triangle inequality theorem states that the sum of any two sides of a triangle must be greater than the length of the third side. If a triangle has side lengths of $${sideA}$ and $${sideB}$, which inequality represents the possible lengths, $x$, of the third side of the triangle?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: shuffledOptions.find(o => o.isCorrect).text,
      explanation: `Choice ${correctLetter} is correct. By the triangle inequality theorem: (1) $${sideA} + ${sideB} > x$, so $x < ${sideA + sideB}$; (2) $${sideA} + x > ${sideB}$, so $x > ${sideB - sideA}$; (3) $${sideB} + x > ${sideA}$ (always true since side lengths are positive). Combining: $${sideB - sideA} < x < ${sideA + sideB}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: e8f9e117
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [resistance: 500, battery: 6V, max current: 0.25]
 * - Difficulty factors: [Ohm's law, physics application, rounding down for max whole number]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [V = IR, I ≤ 0.25, n must be integer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */