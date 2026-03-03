import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: af2ba762
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base price: 2.74 (decimal), rate: 0.19 (decimal), months: 3]
 * - Difficulty factors: [Interpreting linear model in point-slope form, understanding what constant represents]
 * - Distractor patterns: [A: rate of change, B: total difference, C: wrong date]
 * - Constraints: [F(x) = 2.74 - 0.19(x-3), interpret constant 2.74]
 * - Question type: [Word problem → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_af2ba762 = {
  metadata: {
    // id: "af2ba762",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Base price (2.00-3.50 range)
    const basePriceDollars = getRandomInt(2, 3);
    const basePriceCents = getRandomInt(0, 99);
    const basePrice = `${basePriceDollars}.${basePriceCents.toString().padStart(2, '0')}`;
    const basePriceNum = parseFloat(basePrice);
    
    // Rate of decrease (0.10-0.30 range)
    const rateDollars = 0;
    const rateCents = getRandomInt(10, 30);
    const rate = `${rateDollars}.${rateCents.toString().padStart(2, '0')}`;
    const rateNum = parseFloat(rate);
    
    // Reference month (2-5 range)
    const refMonth = getRandomInt(2, 5);
    
    // Time period description
    const months = ['September', 'October', 'November', 'December', 'January', 'February'];
    const startMonthIdx = 0;
    const refMonthIdx = refMonth;
    const startMonth = months[startMonthIdx];
    const endMonth = months[refMonthIdx];
    
    const year = 2014 + getRandomInt(0, 5); // 2014-2019
    
    // Calculate price at month 0 for distractor C
    const priceAtMonth0 = (basePriceNum + rateNum * refMonth).toFixed(2);
    
    // STEP 2: Create options
    const correctText = `The average price per gallon on ${endMonth} 1, ${year}`;
    
    const optionsData = [
      { text: `The average monthly decrease in the price per gallon`, isCorrect: false, reason: "the value ${basePrice} is a constant, not a multiple of x, so it cannot represent a rate of change in price" },
      { text: `The difference in the average price per gallon from ${startMonth} 1, ${year}, to ${endMonth} 1, ${year}`, isCorrect: false, reason: "the difference would be $F(${refMonth}) - F(0) = ${basePrice} - ${rate}(0 - ${refMonth}) = -(${rateNum * refMonth})$, not ${basePrice}" },
      { text: `The average price per gallon on ${startMonth} 1, ${year}`, isCorrect: false, reason: `the average price on ${startMonth} 1 would be $F(0) = ${basePrice} - ${rate}(0 - ${refMonth}) = ${priceAtMonth0}$, not ${basePrice}` },
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
      questionText: `According to data provided by the US Department of Energy, the average price per gallon of regular gasoline in the United States from ${startMonth} 1, ${year}, to ${endMonth} 1, ${year}, is modeled by the function $F$ defined below, where $F(x)$ is the average price per gallon $x$ months after ${startMonth} 1. $F(x)=${basePrice}-${rate}(x-${refMonth})$ The constant $${basePrice}$ in this function estimates which of the following?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Since ${basePrice} is a constant term, it represents an actual price of gas rather than a measure of change. To determine what gas price it represents, find x such that $F(x) = ${basePrice}$, or ${basePrice} = ${basePrice} - ${rate}(x - ${refMonth})$. This gives $0 = -${rate}(x - ${refMonth})$, so $x = ${refMonth}$. Therefore, the average price is $${basePrice} per gallon ${refMonth} months after ${startMonth} 1, ${year}, which is ${endMonth} 1, ${year}. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: d1f50dbe
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coverage: 170 (triple-digit), fence area: w (variable)]
 * - Difficulty factors: [Unit conversion, two coats = double the stain]
 * - Distractor patterns: [A: one coat only, B: multiplied instead of divided, C: wrong multiplier]
 * - Constraints: [Two coats means 2 * (w/170) = w/85]
 * - Question type: [Word problem → Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/linear-functions/d1f50dbe.ts