import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1358
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [diagonal: 3√17, shorter side: 3]
 * - Difficulty factors: [Pythagorean theorem with radicals, solving for unknown side]
 * - Constraints: [Longer side = √(153-9) = √144 = 12]
 * - Question type: [Text→Fill in the blank]
 * - Figure generation: [None — figure removed per review]
 *
 * FIXED (italicized text — same as Q1333/1337/1342/1345/1350/1355/1356):
 * - The stem and explanation used FOUR backslashes before LaTeX commands
 *   (\\\\sqrt, \\\\implies) — two at runtime — so the renderer treated \\ as
 *   a row break and printed the command names as italic math text. Now the
 *   standard two-in-source form (\\sqrt -> \sqrt at runtime).
 *
 * FIXED (figure removed):
 * - The old figure drew only the DIAGONAL segment on faint coordinate axes —
 *   the rectangle's sides were never drawn, so it rendered as an orphan
 *   slanted line. The stem is fully self-contained ("rectangle" supplies the
 *   right angles; the diagonal and shorter side are given as values), so no
 *   figure is needed: figureCode is now null and the broken figure code is
 *   deleted. Question logic, stem, answer, and explanation unchanged.
 */

export const generator_1358 = {
  metadata: {
    id: "1358",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: Diagonal = 3√17, shorter side = 3
    // Longer side = √((3√17)² - 3²) = √(153 - 9) = √144 = 12
    
    // Generate pattern: diagonal = m√(k), shorter side = m, longer side = m√(k-1)
    // Need k-1 to be perfect square
    const squares = [4, 9, 16, 25, 36, 49, 64];
    const perfectSquare = getRandomElement(squares);
    const k = perfectSquare + 1;
    const m = getRandomInt(2, 5);
    
    const shorterSide = m;
    const diagonalCoef = m;
    const longerSide = m * Math.sqrt(perfectSquare);

    return {
      questionText: `The length of a rectangle's diagonal is $${diagonalCoef}\\sqrt{${k}}$, and the length of the rectangle's shorter side is ${shorterSide}. What is the length of the rectangle's longer side?`,
      figureCode: null,
      options: [], // Fill in the blank
      correctAnswer: longerSide.toString(),
      explanation: `By Pythagoras: $${shorterSide}^2 + x^2 = (${diagonalCoef}\\sqrt{${k}})^2 \\implies ${shorterSide * shorterSide} + x^2 = ${diagonalCoef * diagonalCoef * k} \\implies x^2 = ${diagonalCoef * diagonalCoef * k - shorterSide * shorterSide} \\implies x = ${longerSide}$.`
    };
  }
};