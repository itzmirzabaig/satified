import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9ec76b54
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Legs: 28 and 20 (double-digit), Hypotenuse: 4√74 (simplified radical)]
 * - Difficulty factors: [Pythagorean theorem, simplifying radicals, recognizing non-perfect squares]
 * - Distractor patterns: [Unsimplified radical, integer approximation, squared value]
 * - Constraints: [Sum of squares must not be perfect square, result must simplify]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None - word problem]
 */

export const generator_9ec76b54 = {
  metadata: {
    // id: "9ec76b54",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate values that create simplifyable radical
    // Original: 28² + 20² = 784 + 400 = 1184 = 16 × 74, so √1184 = 4√74
    // Use multiples that create perfect square factor
    
    const factor = getRandomInt(2, 6); // Scaling factor
    const base1 = 7;
    const base2 = 5;
    
    const leg1 = base1 * factor * 4; // 28 when factor=1
    const leg2 = base2 * factor * 4; // 20 when factor=1
    
    const sumSquares = leg1 * leg1 + leg2 * leg2;
    
    // Simplify radical: find largest perfect square factor
    let perfectSquareFactor = 1;
    let coefficient = 1;
    let radicand = sumSquares;
    
    for (let i = Math.floor(Math.sqrt(sumSquares)); i >= 2; i--) {
      if (sumSquares % (i * i) === 0) {
        perfectSquareFactor = i * i;
        coefficient = i;
        radicand = sumSquares / perfectSquareFactor;
        break;
      }
    }
    
    // Format answer
    let answer;
    if (coefficient === 1) {
      answer = `\\sqrt{${radicand}}`;
    } else if (radicand === 1) {
      answer = coefficient.toString();
    } else {
      answer = `${coefficient}\\sqrt{${radicand}}`;
    }
    
    // STEP 2: Create distractors
    const distractorA = coefficient === 2 ? `8\\sqrt{${radicand / 4}}` : `${coefficient * 2}\\sqrt{${radicand}}`; // Wrong coefficient
    const distractorC = Math.round(Math.sqrt(sumSquares)); // Approximation
    const distractorD = sumSquares.toString(); // Squared value
    
    // STEP 3: Create options with tracking
    const correctText = answer;
    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "may result from conceptual or calculation errors" },
      { text: answer, isCorrect: true, reason: "" },
      { text: distractorC.toString(), isCorrect: false, reason: "may result from conceptual or calculation errors" },
      { text: distractorD, isCorrect: false, reason: "is the square of the hypotenuse, not the hypotenuse itself" }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 5: Build explanation
    const explanation = `Choice ${correctLetter} is correct. By the Pythagorean theorem: $${leg1}^2 + ${leg2}^2 = c^2$, so $c^2 = ${leg1 * leg1} + ${leg2 * leg2} = ${sumSquares}$. Taking the square root: $c = \\sqrt{${sumSquares}} = ${answer}$ (since $\\sqrt{${sumSquares}} = \\sqrt{${perfectSquareFactor} \\times ${radicand}} = ${coefficient}\\sqrt{${radicand}}$). Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    // STEP 6: Return question data
    return {
      questionText: `A right triangle has legs with lengths of ${leg1} centimeters and ${leg2} centimeters. What is the length of this triangle's hypotenuse, in centimeters?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: bf8d843e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Equilateral triangle sides: 12, altitude creates 30-60-90 triangles]
 * - Difficulty factors: [Equilateral triangle properties, altitude bisects base, special right triangles]
 * - Distractor patterns: [Incorrect division, correct value, 45-45-90 confusion, 30-60-90 confusion]
 * - Constraints: [Must be equilateral, altitude must bisect base]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Equilateral triangle with altitude]
 */

// File: generators/RightTrianglesAndTrigonometry/bf8d843e.ts