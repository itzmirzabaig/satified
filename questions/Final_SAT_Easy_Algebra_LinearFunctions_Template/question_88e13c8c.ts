import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 88e13c8c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [monthly: 300-500, fixed: 800-1200, months: 24-48]
 * - Difficulty factors: [Function evaluation with large numbers]
 * - Distractor patterns: [subtracted fixed, forgot fixed, swapped parameters]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_88e13c8c = {
  metadata: {
    // id: "88e13c8c",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const monthlyPayment = getRandomInt(300, 500);

    const fixedCost = getRandomInt(800, 1200);

    const numMonths = getRandomInt(24, 48);

    const totalCost = (monthlyPayment * numMonths) + fixedCost;

    const distractor1 = (monthlyPayment * numMonths) - fixedCost;

    const distractor2 = monthlyPayment * numMonths;

    const distractor3 = (fixedCost * numMonths) + monthlyPayment;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: "results from subtracting the fixed cost instead of adding it" },
      { text: distractor2.toString(), isCorrect: false, reason: "results from forgetting to add the fixed cost" },
      { text: totalCost.toString(), isCorrect: true },
      { text: distractor3.toString(), isCorrect: false, reason: "results from swapping the monthly payment and fixed cost" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The total cost $f(x)$, in dollars, to lease a car for $${numMonths}$ months from a particular car dealership is given by $f(x) = ${numMonths}x + ${fixedCost}$, where $x$ is the monthly payment, in dollars. What is the total cost to lease a car when the monthly payment is $${monthlyPayment}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: totalCost.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting $${monthlyPayment}$ for $x$ gives $f(${monthlyPayment}) = ${numMonths}(${monthlyPayment}) + ${fixedCost} = $${monthlyPayment * numMonths} + $${fixedCost} = $${totalCost}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

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

