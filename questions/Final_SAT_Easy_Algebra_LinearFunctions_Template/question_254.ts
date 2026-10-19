import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 254
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initialDiesel: 12-20, rateDenominator: 20-32, maxRange: initialDiesel * rateDenominator]
 * - Difficulty factors: [Linear decay model, fraction rate]
 * - Distractor patterns: [initial amount, added amount used, amount used]
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
    const rateDenominator = getRandomInt(20, 32);
    // The tank is empty when x = initialDiesel * rateDenominator, so that is
    // where the domain ends. It used to be a separate random number (for
    // example 0 to 514 when the tank empties at 512 miles), which allowed
    // negative amounts of diesel.
    const maxRange = initialDiesel * rateDenominator;

    // Choose the number of gallons used first so x / rateDenominator is a whole
    // number. Using fewer than half the diesel keeps the amount used different
    // from the amount left.
    const usedDiesel = getRandomInt(Math.floor(initialDiesel / 4), Math.floor((initialDiesel - 1) / 2));
    const xValue = rateDenominator * usedDiesel;

    const result = initialDiesel - usedDiesel;

    // Distinct for every draw: used < result < initial < initial + used.
    const optionsData = [
      { text: result.toString(), isCorrect: true, reason: '' },
      { text: initialDiesel.toString(), isCorrect: false, reason: `${initialDiesel} is the amount of diesel when $x = 0$, before the truck is driven` },
      { text: (initialDiesel + usedDiesel).toString(), isCorrect: false, reason: `it results from adding the ${usedDiesel} gallons used to ${initialDiesel} instead of subtracting them` },
      { text: usedDiesel.toString(), isCorrect: false, reason: `${usedDiesel} is the number of gallons used in driving ${xValue} miles, not the number of gallons that remain` }
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
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$ in the given equation yields $d = ${initialDiesel} - \\frac{${xValue}}{${rateDenominator}} = ${initialDiesel} - ${usedDiesel} = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
