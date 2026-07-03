import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 254
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initialDiesel: 12-20, maxRange: 300-600, xValue: multiple of rateDenominator]
 * - Difficulty factors: [Linear decay model, fraction rate]
 * - Distractor patterns: [empty tank, sign error, initial amount]
 * - Constraints: [xValue is a whole multiple of rateDenominator so x/rateDenominator is an integer]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_254 = {
  metadata: {
    id: "254",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initialDiesel = getRandomInt(12, 20);
    const maxRange = getRandomInt(300, 600);

    const rateDenominator = Math.floor(maxRange / initialDiesel);

    // Choose the number of gallons used (k) first, then set xValue to an exact
    // whole multiple of rateDenominator. This guarantees x/rateDenominator is the
    // integer usedDiesel (no float artifact) and that xValue stays within the
    // domain: xValue = rateDenominator*k <= (maxRange/initialDiesel)*(initialDiesel/2) < maxRange.
    const usedDiesel = getRandomInt(Math.floor(initialDiesel / 4), Math.floor(initialDiesel / 2));
    const xValue = rateDenominator * usedDiesel;

    const result = initialDiesel - usedDiesel;

    // Distractors, all provably distinct from the answer (I-k) and from each
    // other because usedDiesel (k) is in [3,10] and result stays positive:
    //   initialDiesel (I)          — forgot to subtract the amount used
    //   initialDiesel + usedDiesel — added the amount used instead of subtracting
    //   0                          — assumed the tank is empty
    const distractorInitial = initialDiesel;
    const distractorAdded = initialDiesel + usedDiesel;
    const distractorEmpty = 0;

    const optionsData = [
      { text: result.toString(), isCorrect: true },
      { text: distractorInitial.toString(), isCorrect: false, reason: "is the initial amount, before any distance has been driven" },
      { text: distractorAdded.toString(), isCorrect: false, reason: "adds the amount of diesel used instead of subtracting it" },
      { text: distractorEmpty.toString(), isCorrect: false, reason: "is the amount only if the tank were completely empty" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The equation $d = ${initialDiesel} - \\frac{x}{${rateDenominator}}$ gives the estimated amount of diesel $d$, in gallons, that remains in the gas tank of a truck after being driven $x$ miles, where $x$ ranges from 0 to ${maxRange}. What is the estimated amount of diesel, in gallons, that remains in the gas tank of the truck when $x = ${xValue}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$ in the equation gives $d = ${initialDiesel} - \\frac{${xValue}}{${rateDenominator}} = ${initialDiesel} - ${usedDiesel} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
