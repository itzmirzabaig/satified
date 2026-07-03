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
    // Draw parameters; retry the whole draw (bounded) until all four option
    // values are pairwise distinct, so no distractor can equal the correct
    // answer or another distractor for any draw.
    let fee = 0;
    let rate = 0;
    let miles = 0;
    let total = 0;
    let over = 0;
    let addMiles = 0;
    let doubled = 0;
    let tries = 0;
    do {
      fee = getRandomInt(15, 25);
      rate = getRandomInt(6, 9) / 10;      // 0.60, 0.70, 0.80, 0.90 (exact to 2 dp)
      miles = getRandomInt(30, 50);
      const mileageCost = rate * miles;    // at most one decimal place -> exact at 2 dp
      total = fee + mileageCost;           // correct: initial fee + mileage cost
      over = total + 10;                   // overestimates the total
      addMiles = fee + miles;              // adds miles instead of multiplying by rate
      doubled = mileageCost * 2;           // doubles the mileage cost
      tries++;
    } while (
      tries < 50 &&
      new Set([
        total.toFixed(2),
        over.toFixed(2),
        addMiles.toFixed(2),
        doubled.toFixed(2)
      ]).size !== 4
    );

    const mileageCost = rate * miles;

    const optionsData = [
      { text: total.toFixed(2), isCorrect: true },
      { text: over.toFixed(2), isCorrect: false, reason: "overestimates the total cost" },
      { text: addMiles.toFixed(2), isCorrect: false, reason: "adds the miles instead of multiplying by the rate" },
      { text: doubled.toFixed(2), isCorrect: false, reason: "doubles the mileage cost" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `A customer rented a truck to transport materials purchased from a hardware store. The customer was charged an initial fee of ${fee} dollars plus an additional ${rate.toFixed(2)} dollars per mile driven. If the truck was driven ${miles} miles, what was the total amount, in dollars, the customer was charged?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: total.toFixed(2),
      explanation: `Choice ${correctOption.letter} is correct. The total cost is the initial fee ($${fee}$) plus the mileage cost ($${rate.toFixed(2)} \\times ${miles} = ${mileageCost.toFixed(2)}$), giving $${fee} + ${mileageCost.toFixed(2)} = ${total.toFixed(2)}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
