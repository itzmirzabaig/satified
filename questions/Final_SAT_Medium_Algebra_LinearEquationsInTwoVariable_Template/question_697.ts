import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 697
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [2 squares, 6 triangles, side lengths r and t, total perimeter: 210]
 * - Difficulty factors: [Calculating perimeters, setting up equation]
 * - Distractor patterns: [A: wrong calculations, B: counting shapes not perimeters, C: correct, D: reversed quantities]
 * - Constraints: [Clean equation setup]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_697 = {
  metadata: {
    id: "697",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters. Redraw (bounded) until the four option
    // strings are guaranteed pairwise distinct — the reversed distractor
    // collides with the correct answer whenever numSquares === numTriangles.
    let numSquares = 0;
    let numTriangles = 0;
    let squareCoeff = 0;
    let triangleCoeff = 0;
    let totalPerimeter = 0;
    let optionsData: { text: string; isCorrect: boolean }[] = [];

    let tries = 0;
    do {
      numSquares = getRandomInt(2, 5);
      numTriangles = getRandomInt(4, 8);
      totalPerimeter = getRandomInt(150, 300);

      squareCoeff = numSquares * 4;   // perimeter of one square is 4r
      triangleCoeff = numTriangles * 3; // perimeter of one equilateral triangle is 3t

      optionsData = [
        // A: multiplies sides by the wrong shape's side count (wrong calculation)
        { text: `$${numSquares * 3}r + ${numTriangles * 4}t = ${totalPerimeter}$`, isCorrect: false },
        // B: counts shapes instead of summing perimeters
        { text: `$${numSquares}r + ${numTriangles}t = ${totalPerimeter}$`, isCorrect: false },
        // C: correct — 4r per square, 3t per triangle
        { text: `$${squareCoeff}r + ${triangleCoeff}t = ${totalPerimeter}$`, isCorrect: true },
        // D: reverses which count goes with which side
        { text: `$${numTriangles * 4}r + ${numSquares * 3}t = ${totalPerimeter}$`, isCorrect: false }
      ];
    } while (
      new Set(optionsData.map(o => o.text)).size !== optionsData.length &&
      ++tries < 50
    );

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `A total of ${numSquares} squares each have side length $r$. A total of ${numTriangles} equilateral triangles each have side length $t$. No square or triangle shares a side with another shape. The sum of the perimeters of all of these squares and triangles is ${totalPerimeter}. Which equation represents this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Each square has perimeter $4r$, so the ${numSquares} squares contribute $${numSquares} \\times 4r = ${squareCoeff}r$. Each equilateral triangle has perimeter $3t$, so the ${numTriangles} triangles contribute $${numTriangles} \\times 3t = ${triangleCoeff}t$. Adding these and setting the total equal to ${totalPerimeter} gives $${squareCoeff}r + ${triangleCoeff}t = ${totalPerimeter}$.`
    };
  }
};
