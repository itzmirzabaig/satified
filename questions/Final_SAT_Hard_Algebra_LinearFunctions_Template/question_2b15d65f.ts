import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2b15d65f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [prices: 40, 60 (double-digit), demands: 15000, 20000 (5-digit)]
 * - Difficulty factors: [Linear modeling from two points, interpolation, real-world context]
 * - Distractor patterns: [B: arithmetic error, C: estimation error, D: midpoint error]
 * - Constraints: [Negative slope (demand decreases as price increases), linear relationship]
 * - Question type: [Word problem → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_2b15d65f = {
  metadata: {
    // id: "2b15d65f",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Generate price points (double-digit, 20-80 range)
    const price1 = getRandomInt(20, 45);
    const price2 = price1 + getRandomInt(15, 35); // Ensure gap of 15-35
    
    // Generate demand points (thousands, 10000-25000 range)
    const demand1 = getRandomInt(10, 25) * 1000;
    // Slope should be negative (demand decreases as price increases)
    // Calculate demand2 so we get a nice integer slope
    const priceDiff = price2 - price1;
    const slopeInDemand = -getRandomInt(100, 400) * priceDiff; // -100 to -400 demand per dollar * priceDiff
    const demand2 = demand1 + slopeInDemand; // This will decrease
    
    // Target price for question (between price1 and price2, closer to price2)
    const targetPrice = Math.round(price1 + (price2 - price1) * getRandomInt(6, 8) / 10);
    
    // STEP 2: Calculate derived values
    const slope = (demand2 - demand1) / (price2 - price1);
    const yIntercept = demand1 - slope * price1;
    const targetDemand = Math.round(slope * targetPrice + yIntercept);
    
    // STEP 3: Create distractors
    const distractorB = targetDemand + getRandomInt(100, 500); // Arithmetic error
    const distractorC = targetDemand + getRandomInt(500, 1000); // Estimation error
    const distractorD = Math.round((demand1 + demand2) / 2); // Midpoint demand error
    
    const correctText = targetDemand.toLocaleString();
    
    const optionsData = [
      { text: targetDemand.toLocaleString(), isCorrect: true },
      { text: distractorB.toLocaleString(), isCorrect: false, reason: "results from miscalculating the slope or arithmetic errors during the final subtraction" },
      { text: distractorC.toLocaleString(), isCorrect: false, reason: "could be a result of estimation errors or incorrect linear interpolation" },
      { text: distractorD.toLocaleString(), isCorrect: false, reason: "would be the demand if the price was the midpoint between the two given prices, since demand would be the midpoint between the two given demands" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      // Fixed: Prices are plain text with single $ for currency, not LaTeX math
      questionText: `An economist modeled the demand $Q$ for a certain product as a linear function of the selling price P. The demand was ${demand1.toLocaleString()} units when the selling price was ${price1} per unit, and the demand was ${demand2.toLocaleString()} units when the selling price was ${price2} per unit. Based on the model, what is the demand, in units, when the selling price is ${targetPrice} per unit?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Since $Q$ is a linear function of $P$, we use $Q = mP + b$. The slope is $m = \\frac{${demand2} - ${demand1}}{${price2} - ${price1}} = \\frac{${demand2 - demand1}}{${price2 - price1}} = ${slope}$. Using point (${price1}, ${demand1}): $${demand1} = ${slope}(${price1}) + b$, so $b = ${demand1} - ${slope * price1} = ${yIntercept}$. The model is $Q = ${slope}P + ${yIntercept}$. For $P = ${targetPrice}$: $Q = ${slope}(${targetPrice}) + ${yIntercept} = ${slope * targetPrice} + ${yIntercept} = ${targetDemand}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: e25f0807
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: -12, 6 (double-digit), y: -45, 45 (double-digit), slope: 5 (single-digit)]
 * - Difficulty factors: [Find linear equation from table, evaluate at fractional input]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Linear relationship, fractional evaluation point 1/4]
 * - Question type: [Table → Fill in the blank]
 * - Figure generation: [Mafs graph with points]
 */

// File: generators/linear-functions/e25f0807.ts