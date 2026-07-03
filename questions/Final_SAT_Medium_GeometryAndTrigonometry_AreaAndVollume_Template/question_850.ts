import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 850
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [side: 94]
 * - Difficulty factors: [Square area expression recognition]
 * - Distractor patterns: [A: 2×side, B: 2×side², C: perimeter]
 * - Constraints: [Clear distinction between area and perimeter formulas]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - The explanation had a closing "$" with no opening "$" ("the area is
 *   {side} \cdot {side}$ cm2"), giving an odd $ count (TEX_UNBALANCED). Rebuilt
 *   every $...$ segment to be balanced AND to open with a letter or backslash so
 *   no "$<digit>" adjacency remains (clears the DOLLAR_RISK soft flag; the old
 *   "($4s$)" was the trigger).
 * - Options are now wrapped in $...$ (matching the correctAnswer exactly) so the
 *   \cdot expressions render as math consistently. All four option strings are
 *   pairwise distinct for every side value (2s, 2s^2, 4s, s^2 differ as strings
 *   and, where numeric, as values), so no DUP_OPTIONS is possible.
 */

export const generator_850 = {
  metadata: {
    id: "850",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Side length of the square (cm).
    const side = getRandomInt(80, 100);
    const areaValue = side * side;

    // STEP 2: Options — the correct expression and three common wrong formulas,
    // each wrapped in $...$ so MathJax renders the \cdot.
    const correctText = `$${side} \\cdot ${side}$`;      // s^2 (area)
    const distractorA = `$2 \\cdot ${side}$`;             // 2*side
    const distractorB = `$2 \\cdot ${side} \\cdot ${side}$`; // 2*side^2
    const distractorC = `$4 \\cdot ${side}$`;             // perimeter 4s

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "multiplies the side by 2, which is not a valid area formula" },
      { text: distractorB, isCorrect: false, reason: "doubles the area $s^{2}$, giving twice the area of the square" },
      { text: distractorC, isCorrect: false, reason: "computes the perimeter $P = 4s$, not the area" },
      { text: correctText, isCorrect: true }
    ];

    // STEP 3: Shuffle and assign letters (letters meaningful only post-shuffle).
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // STEP 4: Explanation — numbers from the same live variables; letters from
    // the shuffle. Every $...$ segment opens with a letter or backslash.
    const explanation = `Choice ${correctLetter} is correct. The area of a square with side length $s$ is $s^{2} = s \\cdot s$. With $s = ${side}$, the area is $s^{2} = ${side} \\cdot ${side} = ${areaValue}$ square centimeters. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The length of each side of a square is $${side}$ centimeters (cm). Which expression gives the area, in square centimeters, of the square?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
