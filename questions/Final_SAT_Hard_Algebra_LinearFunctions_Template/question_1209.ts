import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1209
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base price: 2.74 (decimal), rate: 0.19 (decimal), months: 3]
 * - Difficulty factors: [Interpreting linear model in point-slope form, understanding what constant represents]
 * - Distractor patterns: [A: rate of change, B: total difference, C: wrong date]
 * - Constraints: [F(x) = 2.74 - 0.19(x-3), interpret constant 2.74]
 * - Question type: [Word problem → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1209 = {
  metadata: {
    id: "1209",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Base price (2.00-3.99 range), stored in cents to avoid float artifacts.
    const basePriceCents = getRandomInt(200, 399);
    const basePrice = (basePriceCents / 100).toFixed(2); // e.g. "2.74"

    // Rate of decrease (0.10-0.30 range), stored in cents.
    const rateCents = getRandomInt(10, 30);
    const rate = (rateCents / 100).toFixed(2); // e.g. "0.19"

    // Reference month (2-5), which indexes into the month list below.
    const refMonth = getRandomInt(2, 5);

    // Month names: index 0 is the start month, index refMonth is the end month.
    const months = ['September', 'October', 'November', 'December', 'January', 'February'];
    const startMonth = months[0];
    const endMonth = months[refMonth];

    const year = 2014 + getRandomInt(0, 5); // 2014-2019

    // F(0) = base - rate*(0 - refMonth) = base + rate*refMonth (all in cents → exact).
    const priceAtMonth0Cents = basePriceCents + rateCents * refMonth;
    const priceAtMonth0 = (priceAtMonth0Cents / 100).toFixed(2);
    // Difference F(refMonth) - F(0) = base - (base + rate*refMonth) = -rate*refMonth.
    const differenceCents = -(rateCents * refMonth);
    const difference = (differenceCents / 100).toFixed(2); // negative, e.g. "-0.57"

    // STEP 2: Create options
    const correctText = `The average price per gallon on ${endMonth} 1, ${year}`;

    const optionsData = [
      {
        text: `The average monthly decrease in the price per gallon`,
        isCorrect: false,
        reason: `the value \\$${basePrice} is a constant term, not a coefficient of $x$, so it cannot represent a rate of change in price`
      },
      {
        text: `The difference in the average price per gallon from ${startMonth} 1, ${year}, to ${endMonth} 1, ${year}`,
        isCorrect: false,
        reason: `that difference is $F(${refMonth})-F(0)=${basePrice}-${priceAtMonth0}=${difference}$, not $${basePrice}$`
      },
      {
        text: `The average price per gallon on ${startMonth} 1, ${year}`,
        isCorrect: false,
        reason: `the average price on ${startMonth} 1 would be $F(0)=${basePrice}-${rate}(0-${refMonth})=${priceAtMonth0}$, not $${basePrice}$`
      },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `According to data provided by the US Department of Energy, the average price per gallon of regular gasoline in the United States from ${startMonth} 1, ${year}, to ${endMonth} 1, ${year}, is modeled by the function $F$ defined below, where $F(x)$ is the average price per gallon, in dollars, $x$ months after ${startMonth} 1. $$F(x)=${basePrice}-${rate}(x-${refMonth})$$ The constant $${basePrice}$ in this function estimates which of the following?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Because $${basePrice}$ is the constant term, it represents an actual price rather than a measure of change. To find which price, solve $F(x)=${basePrice}$: setting $${basePrice}=${basePrice}-${rate}(x-${refMonth})$ gives $0=-${rate}(x-${refMonth})$, so $x=${refMonth}$. Thus the model estimates an average price of \\$${basePrice} per gallon ${refMonth} months after ${startMonth} 1, ${year}, which is ${endMonth} 1, ${year}. Choice ${incorrectOptions[0].letter} is incorrect because ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because ${incorrectOptions[2].reason}.`
    };
  }
};
