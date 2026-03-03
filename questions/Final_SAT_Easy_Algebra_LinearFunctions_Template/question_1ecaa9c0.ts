import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 1ecaa9c0
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fee: 15-25, rate: 0.60-0.90, miles: 30-50]
 * - Difficulty factors: [Linear model evaluation in word problem]
 * - Distractor patterns: [overestimate, adding miles, doubling mileage cost]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_1ecaa9c0 = {
  metadata: {
    // id: "1ecaa9c0",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const fee = getRandomInt(15, 25);

    const rateNum = (getRandomInt(6, 9) / 10);

    const rate = rateNum.toFixed(2);

    const miles = getRandomInt(30, 50);

    const total = fee + (parseFloat(rate) * miles);

    const optionsData = [
      { text: total.toFixed(2), isCorrect: true },
      { text: (total + 10).toFixed(2), isCorrect: false, reason: "overestimates the total cost" },
      { text: (fee + miles).toFixed(2), isCorrect: false, reason: "adds miles instead of multiplying by rate" },
      { text: (parseFloat(rate) * miles * 2).toFixed(2), isCorrect: false, reason: "doubles the mileage cost" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Robert rented a truck to transport materials he purchased from a hardware store. He was charged an initial fee of ${fee}.00 plus an additional ${rate} per mile driven. If the truck was driven ${miles} miles, what was the total amount Robert was charged?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: total.toFixed(2),
      explanation: `Choice ${correctOption.letter} is correct. The total cost is the initial fee (${fee}) plus the mileage cost (${rate} \\times ${miles} = ${(parseFloat(rate) * miles).toFixed(2)}), giving $${total.toFixed(2)}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 8643d906
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initialPop: 200-300, growthRate: 8-12, years: 30]
 * - Difficulty factors: [Interpreting function evaluation in context]
 * - Distractor patterns: [reversing input/output, wrong year]
 * - Constraints: [Base year 1990]
 * - Question type: [Interpretation→Multiple Choice Text]
 * - Figure generation: null
 */

