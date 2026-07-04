import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 302
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coordinates: single-digit positive integers (8, 2)]
 * - Difficulty factors: [Basic coordinate plane understanding, quadrant identification]
 * - Distractor patterns: [B/C/D test wrong quadrant combinations]
 * - Constraints: [x and y must be positive for correct answer]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_302 = {
  metadata: {
    id: "302",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const x = getRandomInt(1, 15);
    const y = getRandomInt(1, 15);

    // Each incorrect option carries a `reason` derived from its OWN sign claims
    // (xPos/yPos), so the explanation stays correct no matter how shuffle()
    // reorders the choices.
    const reasonFor = (xPos: boolean, yPos: boolean): string => {
      if (!xPos && !yPos) {
        return `it claims both coordinates are negative, but ${x} and ${y} are both positive`;
      }
      if (!xPos) {
        return `it claims $x < 0$ (negative), but ${x} is positive`;
      }
      return `it claims $y < 0$ (negative), but ${y} is positive`;
    };

    const optionsData = [
      { text: `$x > 0$ $y > 0$`, isCorrect: true, xPos: true, yPos: true },
      { text: `$x > 0$ $y < 0$`, isCorrect: false, xPos: true, yPos: false },
      { text: `$x < 0$ $y > 0$`, isCorrect: false, xPos: false, yPos: true },
      { text: `$x < 0$ $y < 0$`, isCorrect: false, xPos: false, yPos: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const distractorText = incorrectOptions
      .map(opt => `${opt.letter} is incorrect because ${reasonFor(opt.xPos, opt.yPos)}.`)
      .join(" ");

    const explanation = `Choice ${correctLetter} is correct. The point $(${x}, ${y})$ has x-coordinate ${x} and y-coordinate ${y}. Since both coordinates are positive, $x > 0$ and $y > 0$. ${distractorText}`;

    return {
      questionText: `The point $(${x}, ${y})$ in the $xy$-plane is a solution to which of the following systems of inequalities?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
