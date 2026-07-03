import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 971
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ratio length:width, width increases by a whole number]
 * - Difficulty factors: [Proportional change, multiplication vs addition]
 * - Distractor patterns: [wrong direction, wrong amount (uses width change), 1:1 assumption]
 * - Constraints: [Must scale length by the ratio, not add the same amount]
 * - Question type: [Text -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * REPAIR NOTES:
 * - Original produced repeating-decimal float artifacts (e.g. 41/12 = 3.41666...).
 * - Rebuilt answer-first: the ratio is reduced to p/q and the width increase is
 *   forced to a multiple of q, so the length increase is ALWAYS an integer.
 * - Ratio is shown as an exact fraction (never a decimal). Distractors are
 *   provably distinct because the reduced ratio has p > q (length > width),
 *   so lengthIncrease > widthIncrease for every draw.
 */

export const generator_971 = {
  metadata: {
    id: "971",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

    // STEP 1: Build a reduced length:width ratio p:q with length > width.
    const widthRatio = getRandomInt(2, 9);
    const lengthRatio = getRandomInt(widthRatio + 1, widthRatio * 4);
    const g = gcd(lengthRatio, widthRatio);
    const p = lengthRatio / g; // reduced length part
    const q = widthRatio / g;  // reduced width part

    // STEP 2: Force the width increase to be a multiple of q so the required
    // length increase (p/q * widthIncrease) is always a whole number.
    const t = getRandomInt(1, 4);
    const widthIncrease = q * t;
    const lengthIncrease = p * t; // = (lengthRatio/widthRatio) * widthIncrease, exact integer

    // STEP 3: Create options. lengthIncrease > widthIncrease always (p > q, t >= 1),
    // so every option string is distinct.
    const correctText = `It must increase by $${lengthIncrease}$ units.`;
    const wrongDecreaseCorrectAmt = `It must decrease by $${lengthIncrease}$ units.`;
    const wrongDecreaseWidthAmt = `It must decrease by $${widthIncrease}$ units.`;
    const wrongIncreaseWidthAmt = `It must increase by $${widthIncrease}$ units.`;

    const optionsData = [
      { text: wrongDecreaseCorrectAmt, isCorrect: false, reason: "uses the correct amount but the wrong direction; the length must increase, not decrease, when the width increases" },
      { text: correctText, isCorrect: true },
      { text: wrongDecreaseWidthAmt, isCorrect: false, reason: "both reverses the direction and adds the width's change instead of scaling by the ratio" },
      { text: wrongIncreaseWidthAmt, isCorrect: false, reason: "assumes the length grows by the same amount as the width, which is only true when the ratio is 1 to 1" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Ratio shown exactly. Keep whole-number quantities in prose (no bare $digit$
    // in the same field as the $\frac...$) so nothing reads as stray currency.
    const ratioDisplay = g === 1
      ? `\\frac{${lengthRatio}}{${widthRatio}}`
      : `\\frac{${lengthRatio}}{${widthRatio}} = \\frac{${p}}{${q}}`;

    return {
      questionText: `For a certain rectangular region, the ratio of its length to its width is $${lengthRatio}$ to $${widthRatio}$. If the width of the rectangular region increases by $${widthIncrease}$ units, how must the length change to maintain this ratio?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The ratio of length to width is $${ratioDisplay}$. To keep this ratio, any change in the width must be scaled by that ratio. Multiplying the width increase of ${widthIncrease} units by $\\frac{${p}}{${q}}$ gives a length increase of ${lengthIncrease} units, so the length must increase by ${lengthIncrease} units. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
