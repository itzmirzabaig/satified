import { getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1119
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [denominator: odd values coprime to 1,2,4,6]
 * - Difficulty factors: [Surface area formula, solving for side, perimeter of a face]
 * - Distractor patterns: [side only (÷ forgets ×4), used 2 instead of 4, used 6 from SA formula]
 * - Constraints: [Cube SA = 6s^2 = 6(a/den)^2 => s = a/den; face perimeter = 4s = 4a/den]
 * - Question type: [Text -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * Denominators are chosen from {5,7,9,11}: each is coprime to the numerator
 * coefficients {1,2,4,6}, so every option fraction is already in lowest terms,
 * the correct answer 4a/den never simplifies to an integer, and the four option
 * strings are guaranteed textually distinct for every draw.
 */

export const generator_1119 = {
  metadata: {
    id: "1119",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const den = getRandomElement([5, 7, 9, 11]);

    // Correct: perimeter of one face = 4s = 4 * (a/den) = 4a/den.
    const correctText = `$\\frac{4a}{${den}}$`;

    const optionsData = [
      { text: correctText, isCorrect: true },                 // 4a/den  (correct)
      { text: `$\\frac{a}{${den}}$`, isCorrect: false },      // side only, forgot x4
      { text: `$\\frac{2a}{${den}}$`, isCorrect: false },     // used 2 instead of 4
      { text: `$\\frac{6a}{${den}}$`, isCorrect: false }      // reused the 6 from 6s^2
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `The surface area of a cube is $\\left(\\frac{a}{${den}}\\right)^{2}\\cdot 6$, where $a$ is a positive constant. Which of the following gives the perimeter of one face of the cube?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The surface area of a cube with side length $s$ is $s^{2}\\cdot 6$. Setting $s^{2}\\cdot 6=6\\left(\\frac{a}{${den}}\\right)^{2}$ gives the side length $s=\\frac{a}{${den}}$. A face of the cube is a square, so its perimeter is $s\\cdot 4=\\frac{4a}{${den}}$.`
    };
  }
};
