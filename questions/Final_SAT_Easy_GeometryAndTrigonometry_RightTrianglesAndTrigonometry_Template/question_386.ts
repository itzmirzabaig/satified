import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 386
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [leg1: 11, leg2: 9]
 * - Difficulty factors: [Pythagorean theorem, recognizing radical form]
 * - Distractor patterns: [A: sqrt of difference, C: addition of legs, D: squared sum]
 * - Constraints: [Must preserve sqrt in answer]
 * - Question type: [No Figure→Multiple Choice Text]
 */

export const generator_386 = {
  metadata: {
    id: "386",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Redraw when the legs are equal (the difference of squares would be 0)
    // or when either square root is a whole number (a 6-8-10 triangle would
    // show "√100" instead of 10).
    const isSquare = (n: number) => Number.isInteger(Math.sqrt(n));
    let leg1 = 8, leg2 = 5, sumSquares = 89, diffSquares = 39;
    do {
      leg1 = getRandomInt(8, 15);
      leg2 = getRandomInt(5, 12);
      sumSquares = leg1 * leg1 + leg2 * leg2;
      diffSquares = Math.abs(leg1 * leg1 - leg2 * leg2);
    } while (leg1 === leg2 || isSquare(sumSquares) || isSquare(diffSquares));
    const simpleSum = leg1 + leg2;
    const big = Math.max(leg1, leg2), small = Math.min(leg1, leg2);

    const optionsData = [
      { text: `$\\sqrt{${diffSquares}}$`, isCorrect: false, reason: `it results from subtracting the squares of the legs, $\\sqrt{${big * big} - ${small * small}}$; the squares of the legs must be added` },
      { text: `$\\sqrt{${sumSquares}}$`, isCorrect: true, reason: '' },
      { text: `$${simpleSum}$`, isCorrect: false, reason: `${simpleSum} is the sum of the leg lengths, $${leg1} + ${leg2}$; the Pythagorean theorem adds the squares of the leg lengths` },
      { text: `$${sumSquares}$`, isCorrect: false, reason: `${sumSquares} is the value of $c^2$; the length of the hypotenuse is the square root of this value` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A right triangle has legs with lengths of $${leg1}$ centimeters and $${leg2}$ centimeters. What is the length of this triangle's hypotenuse, in centimeters?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. By the Pythagorean theorem, if $a$ and $b$ are the lengths of the legs of a right triangle and $c$ is the length of its hypotenuse, then $a^2 + b^2 = c^2$. Substituting the leg lengths gives $${leg1}^2 + ${leg2}^2 = c^2$, or $${leg1 * leg1} + ${leg2 * leg2} = c^2$, so $c^2 = ${sumSquares}$. Taking the positive square root of both sides gives $c = \\sqrt{${sumSquares}}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
