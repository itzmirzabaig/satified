import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 379ffefb
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [leg1: 11, leg2: 9]
 * - Difficulty factors: [Pythagorean theorem, recognizing radical form]
 * - Distractor patterns: [A: sqrt of difference, C: addition of legs, D: squared sum]
 * - Constraints: [Must preserve sqrt in answer]
 * - Question type: [No Figure→Multiple Choice Text]
 */

export const generator_379ffefb = {
  metadata: {
    // id: "379ffefb",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const leg1 = getRandomInt(8, 15);
    const leg2 = getRandomInt(5, 12);

    const sumSquares = leg1 * leg1 + leg2 * leg2;
    const diffSquares = Math.abs(leg1 * leg1 - leg2 * leg2);
    const simpleSum = leg1 + leg2;

    const optionsData = [
      { text: `$\\sqrt{${diffSquares}}$`, isCorrect: false, reason: "results from subtracting the squares of the legs" },
      { text: `$\\sqrt{${sumSquares}}$`, isCorrect: true },
      { text: `$${simpleSum}$`, isCorrect: false, reason: "results from simply adding the leg lengths" },
      { text: `$${sumSquares}$`, isCorrect: false, reason: "results from forgetting to take the square root of the sum of squares" }
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
      explanation: `Choice ${correctLetter} is correct. To find the length of the hypotenuse $c$, use the Pythagorean theorem: $a^2 + b^2 = c^2$. Substituting the leg lengths: $${leg1}^2 + ${leg2}^2 = c^2 \Rightarrow ${leg1 * leg1} + ${leg2 * leg2} = c^2 \Rightarrow ${sumSquares} = c^2$. Thus, $c = \\sqrt{${sumSquares}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 36661021
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [leg1: 9, leg2: 6]
 * - Difficulty factors: [Pythagorean theorem, square root estimation]
 * - Distractor patterns: [A: average, C: simple sum, D: squared sum]
 * - Constraints: [Must estimate sqrt]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with hypotenuse labeled c → Mafs code]
 */

// File: generators/right-triangles-and-trigonometry/36661021.ts