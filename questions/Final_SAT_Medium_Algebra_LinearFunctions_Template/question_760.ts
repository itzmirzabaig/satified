import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 760
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 2x + 2w, find width w]
 * - Difficulty factors: [Connecting linear function to geometric formula]
 * - Distractor patterns: [coefficient (2), full constant term (2w), doubled constant]
 * - Constraints: [x-coefficient must be 2 so P = 2l + 2w is consistent]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - x-coefficient forced to 2 (was random 1-4, which broke the P = 2l + 2w premise).
 * - Balanced the explanation's $...$ (the "= 2w" term was outside math delimiters).
 * - Dropped unused getRandomElement import.
 */

export const generator_760 = {
  metadata: {
    id: "760",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Width: 100-150 cm
    const width = getRandomInt(100, 150);
    // Perimeter of a rectangle: P = 2l + 2w. With length x, f(x) = 2x + 2w,
    // so the x-coefficient is fixed at 2 and the constant term is 2w.
    const coef = 2;
    const constant = 2 * width; // always even, integer -> clean

    // STEP 2: Create options (all four values are distinct for every draw:
    // coef=2, width in [100,150], constant=2w in [200,300], 2*constant in [400,600])
    const correctText = width.toString();
    const optionsData = [
      { text: coef.toString(), isCorrect: false, reason: "gives the coefficient of $x$, which is the number of length sides, not the width" },
      { text: correctText, isCorrect: true },
      { text: constant.toString(), isCorrect: false, reason: "gives the constant term, which is twice the width, not the width itself" },
      { text: (constant * 2).toString(), isCorrect: false, reason: "incorrectly doubles the constant term" }
    ];

    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // STEP 4: Return question data
    return {
      questionText: `The given function $f(x) = ${coef}x + ${constant}$ represents the perimeter, in centimeters, of a rectangle with a length of $x$ cm and a fixed width. What is the width, in cm, of the rectangle?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The perimeter formula is $P = 2l + 2w$. Comparing $f(x) = ${coef}x + ${constant}$ with this, the constant term equals twice the width, so $w = \\frac{${constant}}{2} = ${width}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
