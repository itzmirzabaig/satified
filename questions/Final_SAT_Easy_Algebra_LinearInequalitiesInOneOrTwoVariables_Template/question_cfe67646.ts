import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: cfe67646
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coordinates: single-digit positive integers (8, 2)]
 * - Difficulty factors: [Basic coordinate plane understanding, quadrant identification]
 * - Distractor patterns: [B/C/D test wrong quadrant combinations]
 * - Constraints: [x and y must be positive for correct answer]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_cfe67646 = {
  metadata: {
    // id: "cfe67646",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const x = getRandomInt(1, 15);
    const y = getRandomInt(1, 15);

    const optionsData = [
      { text: `$x > 0$ $y > 0$`, isCorrect: true },
      { text: `$x > 0$ $y < 0$`, isCorrect: false },
      { text: `$x < 0$ $y > 0$`, isCorrect: false },
      { text: `$x < 0$ $y < 0$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The point $(${x}, ${y})$ has x-coordinate ${x} and y-coordinate ${y}. Since both coordinates are positive, $x > 0$ and $y > 0$. ${incorrectOptions[0].letter} is incorrect because it claims $y < 0$ (negative), but ${y} is positive. ${incorrectOptions[1].letter} is incorrect because it claims $x < 0$ (negative), but ${x} is positive. ${incorrectOptions[2].letter} is incorrect because it claims both coordinates are negative.`;

    return {
      questionText: `The point $(${x}, ${y})$ in the $xy$-plane is a solution to which of the following systems of inequalities?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 842cec4d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [speed values: double-digit around 150-170, range width: 20]
 * - Difficulty factors: [Real-world context, compound inequality construction]
 * - Distractor patterns: [A=range width, B=lower bound only, C=upper bound only, D=correct compound]
 * - Constraints: [Speed must be inclusive range]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */