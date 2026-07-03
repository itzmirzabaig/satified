import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 770
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [length: 50, width: x, perimeter: <= 210]
 * - Difficulty factors: [Perimeter formula, inequality setup]
 * - Distractor patterns: [B = wrong inequality sign, C = wrong formula, D = wrong formula and sign]
 * - Constraints: [2(length) + 2x <= maxPerimeter]
 * - Question type: [Word Problem -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - correctAnswer now EXACTLY equals the correct option's text.
 * - length and maxPerimeter are stated in prose (no bare "$50$" beside "$x$"),
 *   and the explanation's perimeter expression is written "P = 2x + ..." so no
 *   math segment starts with a bare digit (clears DOLLAR_RISK).
 * - Explanation numbers/letters come from the same live variables and the
 *   shuffled array. The four options are always distinct (2*length != length
 *   since length >= 40, and the two signs differ).
 */

export const generator_770 = {
  metadata: {
    id: "770",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Rectangle length and the perimeter cap.
    const length = getRandomInt(40, 80);
    const maxPerimeter = 2 * length + getRandomInt(50, 150); // keeps a valid width range
    const doubleLength = 2 * length;

    // STEP 2: Options.
    //   correct : 2x + 2*length <= maxPerimeter
    //   B       : wrong sign  (>=)
    //   C       : wrong formula (length not doubled), correct sign
    //   D       : wrong formula and wrong sign
    const optionsData = [
      { text: `$2x + ${doubleLength} \\leq ${maxPerimeter}$`, isCorrect: true },
      { text: `$2x + ${doubleLength} \\geq ${maxPerimeter}$`, isCorrect: false },
      { text: `$2x + ${length} \\leq ${maxPerimeter}$`, isCorrect: false },
      { text: `$2x + ${length} \\geq ${maxPerimeter}$`, isCorrect: false }
    ];

    // STEP 3: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Identify each distractor by its defining error so the explanation labels
    // them correctly regardless of shuffle order.
    const wrongSign = incorrectOptions.find(o => o.text === `$2x + ${doubleLength} \\geq ${maxPerimeter}$`)!;
    const wrongFormula = incorrectOptions.find(o => o.text === `$2x + ${length} \\leq ${maxPerimeter}$`)!;
    const wrongBoth = incorrectOptions.find(o => o.text === `$2x + ${length} \\geq ${maxPerimeter}$`)!;

    // STEP 4: Explanation — "P = ..." keeps math segments from starting with a
    // bare digit; numbers computed from the same live variables.
    const explanation =
      `Choice ${correctOption.letter} is correct. The perimeter of a rectangle is $P = 2l + 2w$. ` +
      `With length ${length} and width $x$, this gives $P = 2(${length}) + 2x = 2x + ${doubleLength}$. ` +
      `Because the perimeter is at most ${maxPerimeter}, we need $P \\leq ${maxPerimeter}$, which is exactly the inequality in Choice ${correctOption.letter}. ` +
      `Choice ${wrongSign.letter} is incorrect because it uses "$\\geq$" (at least) instead of "$\\leq$" (at most). ` +
      `Choice ${wrongFormula.letter} is incorrect because it does not double the length (it uses ${length} instead of ${doubleLength}). ` +
      `Choice ${wrongBoth.letter} is incorrect because it has both the wrong constant and the wrong inequality sign.`;

    // STEP 5: Return.
    return {
      questionText: `The length of a rectangle is ${length} inches and the width is $x$ inches. The perimeter of the rectangle is at most ${maxPerimeter} inches. Which inequality represents this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
