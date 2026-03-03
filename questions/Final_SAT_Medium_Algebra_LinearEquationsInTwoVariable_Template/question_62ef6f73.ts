import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 62ef6f73
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [2 squares, 6 triangles, side lengths r and t, total perimeter: 210]
 * - Difficulty factors: [Calculating perimeters, setting up equation]
 * - Distractor patterns: [A: wrong calculations, B: counting shapes not perimeters, C: correct, D: reversed quantities]
 * - Constraints: [Clean equation setup]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_62ef6f73 = {
  metadata: {
    // id: "62ef6f73",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const numSquares = getRandomInt(2, 5);
    const numTriangles = getRandomInt(4, 8);
    const totalPerimeter = getRandomInt(150, 300);
    
    const squareCoeff = numSquares * 4;
    const triangleCoeff = numTriangles * 3;
    
    // STEP 2: Create options
    const optionsData = [
      { text: `$${numSquares * 3}r + ${numTriangles * 4}t = ${totalPerimeter}$`, isCorrect: false },
      { text: `$${numSquares}r + ${numTriangles}t = ${totalPerimeter}$`, isCorrect: false },
      { text: `$${squareCoeff}r + ${triangleCoeff}t = ${totalPerimeter}$`, isCorrect: true },
      { text: `$${numTriangles * 4}r + ${numSquares * 3}t = ${totalPerimeter}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `A total of ${numSquares} squares each have side length $r$. A total of ${numTriangles} equilateral triangles each have side length $t$. None of these squares and triangles shares a side. The sum of the perimeters of all these squares and triangles is ${totalPerimeter}. Which equation represents this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. \n\n1. **Analyze the perimeter of the squares:**\n   - There are ${numSquares} squares.\n   - Each square has a perimeter of $4r$.\n   - Total perimeter for squares: $${numSquares} \\times 4r = ${squareCoeff}r$.\n\n2. **Analyze the perimeter of the triangles:**\n   - There are ${numTriangles} equilateral triangles.\n   - Each triangle has a perimeter of $3t$.\n   - Total perimeter for triangles: $${numTriangles} \\times 3t = ${triangleCoeff}t$.\n\n3. **Formulate the equation:**\n   - Total perimeter = $${squareCoeff}r + ${triangleCoeff}t = ${totalPerimeter}$.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-265f2a53.ts
/**
 * Question ID: 265f2a53
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-intercept: -4, y-intercept: 86/3, slope: -3/2]
 * - Difficulty factors: [Calculating slope from intercepts with fraction]
 * - Distractor patterns: [A: small fraction, B: reciprocal, C: correct, D: multiplication error]
 * - Constraints: [Clean fraction result]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */
