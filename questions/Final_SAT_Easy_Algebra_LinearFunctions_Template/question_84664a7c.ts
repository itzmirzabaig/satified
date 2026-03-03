import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 84664a7c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 12-20, maxRange: 300-600, xValue: mid-range]
 * - Difficulty factors: [Linear decay model, fraction rate]
 * - Distractor patterns: [empty tank, rounded error, different distance calculation, initial amount]
 * - Constraints: [Ensure clean result]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_84664a7c = {
  metadata: {
    // id: "84664a7c",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initialDiesel = getRandomInt(12, 20);

    const maxRange = getRandomInt(300, 600);

    const rateDenominator = Math.floor(maxRange / initialDiesel);

    const xValue = rateDenominator * getRandomInt(Math.floor(initialDiesel / 4), Math.floor(initialDiesel / 2));

    const result = initialDiesel - (xValue / rateDenominator);

    const distractor1 = 0;

    const distractor3 = initialDiesel - (60 / rateDenominator);

    const distractor4 = initialDiesel;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: "is the amount when the tank is empty" },
      { text: result.toString(), isCorrect: true },
      { text: Math.round(distractor3).toString(), isCorrect: false, reason: "is the amount at 60 miles, not the requested distance" },
      { text: distractor4.toString(), isCorrect: false, reason: "is the initial amount when no miles have been driven" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The equation $d = ${initialDiesel} - \\frac{x}{${rateDenominator}}$ gives the estimated amount of diesel $d$, in gallons, that remains in the gas tank of a truck after being driven $x$ miles, where $0 \\leq x \\leq ${maxRange}$. What is the estimated amount of diesel, in gallons, that remains in the gas tank of the truck when $x = ${xValue}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$ in the equation gives $d = ${initialDiesel} - \\frac{${xValue}}{${rateDenominator}} = ${initialDiesel} - ${xValue / rateDenominator} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 7fac16fb
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initialHeight: 10-25, ratePerSecond: 5-12]
 * - Difficulty factors: [Modeling linear growth from word problem]
 * - Distractor patterns: [incorrect combinations, division error, swapped rate/intercept]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

