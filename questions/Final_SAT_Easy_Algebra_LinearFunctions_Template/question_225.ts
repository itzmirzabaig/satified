import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 225
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fee: 15-25, rate: 0.60-0.90, miles: 30-50]
 * - Difficulty factors: [Linear model evaluation in word problem]
 * - Distractor patterns: [overestimate, adding miles, doubling mileage cost]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_225 = {
  metadata: {
    id: "225",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Work in tenths of a dollar so every value is exact. The four choices are
    // always distinct because the rate is below 1: rate * miles < rate * (fee +
    // miles) < fee + rate * miles (the answer) and rate * (fee + miles) < fee + miles.
    const fee = getRandomInt(15, 25);
    const rateTenths = getRandomInt(6, 9);   // 0.60, 0.70, 0.80, 0.90
    const rate = rateTenths / 10;
    const miles = getRandomInt(30, 50);
    const mileageCost = (rateTenths * miles) / 10;
    const total = (10 * fee + rateTenths * miles) / 10;
    const rateOnBoth = (rateTenths * (fee + miles)) / 10;

    const optionsData = [
      { text: total.toFixed(2), isCorrect: true, reason: '' },
      { text: mileageCost.toFixed(2), isCorrect: false, reason: `is the cost of the miles driven alone; it leaves out the initial fee of \\$${fee}` },
      { text: (fee + miles).toFixed(2), isCorrect: false, reason: `results from adding the ${miles} miles to the \\$${fee} fee instead of multiplying the miles by \\$${rate.toFixed(2)}` },
      { text: rateOnBoth.toFixed(2), isCorrect: false, reason: `results from multiplying both the fee and the miles by \\$${rate.toFixed(2)}; the rate applies only to the miles` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `A customer rented a truck to transport materials purchased from a hardware store. The customer was charged an initial fee of \\$${fee} plus an additional \\$${rate.toFixed(2)} per mile driven. If the truck was driven ${miles} miles, what was the total amount, in dollars, the customer was charged?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: total.toFixed(2),
      explanation: `Choice ${correctOption.letter} is correct. The cost of driving ${miles} miles at \\$${rate.toFixed(2)} per mile is $${rate.toFixed(2)}(${miles}) = ${mileageCost.toFixed(2)}$ dollars. Adding the initial fee gives a total of $${fee} + ${mileageCost.toFixed(2)} = ${total.toFixed(2)}$ dollars. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`).join(' ')}`
    };
  }
};
