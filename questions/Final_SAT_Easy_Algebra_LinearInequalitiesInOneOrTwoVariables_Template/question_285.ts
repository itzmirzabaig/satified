import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 285
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [perimeter limit: 27, test length: 8, test width: 3]
 * - Difficulty factors: [Interpretation of ordered pair in context, perimeter formula]
 * - Distractor patterns: [A=swapped dimensions, B=correct interpretation, C=swapped with wrong sign, D=calculation error]
 * - Constraints: [Must verify 2(8)+2(3) <= 27]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_285 = {
  metadata: {
    id: "285",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Draw dimensions and a perimeter bound. Perimeter is symmetric in
    // (length, width), so distractors are built from the CONCLUSION and the
    // quantity being compared, not from swapping the two dimensions.
    let length = getRandomInt(6, 12);
    let width = getRandomInt(2, 6);
    let maxPerimeter = getRandomInt(20, 40);
    let actualPerimeter = 2 * length + 2 * width;

    // Guard: perimeter must not equal the bound, so the "perimeter equals the
    // bound" distractor is always false. Bounded retry, then deterministic nudge.
    let tries = 0;
    while (actualPerimeter === maxPerimeter && tries++ < 50) {
      length = getRandomInt(6, 12);
      width = getRandomInt(2, 6);
      maxPerimeter = getRandomInt(20, 40);
      actualPerimeter = 2 * length + 2 * width;
    }
    if (actualPerimeter === maxPerimeter) {
      maxPerimeter = actualPerimeter + 1; // stays within a sensible range
    }

    const satisfies = actualPerimeter <= maxPerimeter;
    const satisfiesPhrase = satisfies ? 'satisfies' : 'does not satisfy';
    const notSatisfiesPhrase = satisfies ? 'does not satisfy' : 'satisfies';

    const optionsData = [
      {
        text: `A rectangle with length ${length} and width ${width} has a perimeter of ${actualPerimeter}, so the pair ${satisfiesPhrase} the inequality.`,
        isCorrect: true
      },
      {
        text: `A rectangle with length ${length} and width ${width} has a perimeter of ${actualPerimeter}, so the pair ${notSatisfiesPhrase} the inequality.`,
        isCorrect: false,
        reason: "reaches the opposite conclusion about whether the pair satisfies the inequality"
      },
      {
        text: `The ordered pair means the perimeter of the rectangle is exactly ${maxPerimeter}.`,
        isCorrect: false,
        reason: `treats ${maxPerimeter} as the exact perimeter rather than an upper bound`
      },
      {
        text: `The ordered pair means the sum of the length and width must be at most ${maxPerimeter}.`,
        isCorrect: false,
        reason: "drops the factor of 2, comparing the length plus width to the bound instead of the full perimeter"
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Substituting length $\\ell = ${length}$ and width $w = ${width}$ into $2\\ell + 2w$ gives $2(${length}) + 2(${width}) = ${actualPerimeter}$. Since $${actualPerimeter} ${satisfies ? '\\leq' : '>'} ${maxPerimeter}$, the pair ${satisfiesPhrase} the inequality $2\\ell + 2w \\leq ${maxPerimeter}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A rectangle has length $\\ell$ and width $w$. The inequality $2\\ell + 2w \\leq ${maxPerimeter}$ gives the values of $\\ell$ and $w$ for which the perimeter of the rectangle is at most ${maxPerimeter}. Which statement is the best interpretation of $(\\ell, w) = (${length}, ${width})$ in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
