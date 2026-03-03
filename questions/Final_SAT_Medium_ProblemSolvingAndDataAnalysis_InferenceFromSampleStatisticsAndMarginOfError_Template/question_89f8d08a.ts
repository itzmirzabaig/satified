import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 89f8d08a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sample size: 80 (double-digit), sample count: 20 (clean fraction), total: 1,500 (triple-digit)]
 * - Difficulty factors: [Sample proportion scaling, avoiding "exact" claims with estimates]
 * - Distractor patterns: [A=75 (calculation error: 20/80 * 300), B=exact claim with wrong calc, C=estimate but wrong calc]
 * - Constraints: [Must calculate: (sample count/sample size) * total population]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual statistics question]
 */

export const generator_89f8d08a = {
  metadata: {
    // id: "89f8d08a",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Inference From Sample Statistics And Margin Of Error",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Total population: 1,000 to 3,000
    const totalPopulation = getRandomInt(10, 30) * 100;
    // Sample size: divisor of 100 or easily divisible (40, 50, 80, 100, 125, 200)
    const sampleSizes = [40, 50, 80, 100, 125, 200];
    const sampleSize = getRandomElement(sampleSizes);
    // Sample count with characteristic: create clean fraction (1/4, 1/5, 1/2, etc.)
    const denominators = [2, 4, 5, 8, 10];
    const denominator = getRandomElement(denominators);
    const sampleCount = sampleSize / denominator;
    // Context
    const contexts = [
      { action: "purchased fruit", item: "receipts", place: "last Thursday" },
      { action: "bought organic products", item: "transactions", place: "yesterday" },
      { action: "used a coupon", item: "sales records", place: "last weekend" },
      { action: "purchased a gift card", item: "receipts", place: "last month" }
    ];
    const context = getRandomElement(contexts);
    
    // Calculate estimated total
    const estimatedTotal = (sampleCount / sampleSize) * totalPopulation;
    
    // Calculate distractors
    // Wrong calculation: 1/4 of total but wrong base
    const wrongCalc1 = (sampleCount / sampleSize) * (totalPopulation / 5); // Arbitrary wrong base
    // Exact claim with wrong number
    const wrongExact = Math.round((sampleCount / sampleSize) * totalPopulation) - 50;
    // Wrong fraction
    const wrongFraction = Math.round((sampleCount / (sampleSize * 2)) * totalPopulation);
    
    // STEP 2: Create options with tracking
    const correctText = `The best estimate for the number of customers who ${context.action} ${context.place} is ${estimatedTotal.toLocaleString()}.`;
    
    const optionsData = [
      { 
        text: `Exactly ${wrongExact.toLocaleString()} customers must have ${context.action} ${context.place}.`, 
        isCorrect: false,
        reason: "claims an exact number which is impossible from a random sample, and uses incorrect calculation"
      },
      { 
        text: `Exactly ${estimatedTotal.toLocaleString()} customers must have ${context.action} ${context.place}.`, 
        isCorrect: false,
        reason: "claims an exact number which is impossible from random sampling"
      },
      { 
        text: `The best estimate for the number of customers who ${context.action} ${context.place} is ${wrongFraction.toLocaleString()}.`, 
        isCorrect: false,
        reason: "uses incorrect calculation of the proportion"
      },
      { 
        text: correctText, 
        isCorrect: true,
        reason: "correctly scales the sample proportion to the total population using estimation"
      }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 4: Return question data
    return {
      questionText: `A store manager reviewed the ${context.item} from ${sampleSize} customers who were selected at random from all the customers who made purchases ${context.place}. Of those selected, ${sampleCount} ${context.item} showed that the customer had ${context.action}. If ${totalPopulation.toLocaleString()} customers made purchases ${context.place}, which of the following is the most appropriate conclusion?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. It's given that the manager took a random selection of the ${context.item} of ${sampleSize} customers from a total of ${totalPopulation.toLocaleString()}. It's also given that of those ${sampleSize} ${context.item}, ${sampleCount} showed that the customer had ${context.action}. This means that an appropriate estimate of the fraction of customers who ${context.action} is ${sampleCount}/${sampleSize}, or 1/${denominator}. Multiplying this fraction by the total number of customers yields (1/${denominator})(${totalPopulation.toLocaleString()}) = ${estimatedTotal.toLocaleString()}. Therefore, the best estimate for the number of customers who ${context.action} is ${estimatedTotal.toLocaleString()}. \n\nChoice ${incorrectOptions[0].letter} and ${incorrectOptions[1].letter} are incorrect because an exact number of customers can't be known from taking a random selection. Additionally, choice ${incorrectOptions[0].letter} may also be the result of a calculation error. Choice ${incorrectOptions[2].letter} is incorrect and may result from a calculation error.`
    };
  }
};

/**
 * Question ID: 9ee22c16
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sample size: 400 (triple-digit), female A: 202, female B: 20, male A: 34, male B: 144, total pop: 6,000]
 * - Difficulty factors: [Table interpretation, stratified sample scaling, total calculation across categories]
 * - Distractor patterns: [Calculation errors, using wrong denominator, forgetting to multiply by total]
 * - Constraints: [Must sum correct category across genders, then scale: (sample_count/sample_size) * total_pop]
 * - Question type: [Table→Fill in the blank]
 * - Figure generation: [HTML Table - must preserve table structure]
 */

// File: generators/inference-from-sample-statistics-and-margin-of-error/9ee22c16.ts