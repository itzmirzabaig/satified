import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 7b65bb28
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [prices: $3.60-$3.75]
 * - Difficulty factors: [Finding median of 5 decimal values]
 * - Distractor patterns: [Mean instead of median, mode instead of median]
 * - Constraints: [5 values, 3rd is median]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_7b65bb28 = {
  metadata: {
    // id: "7b65bb28",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate 5 gas prices with clear median
    const startPrice = getRandomInt(300, 380) / 100; // $3.00 to $3.80
    const prices = [
      startPrice + 0.109,
      startPrice + 0.009,
      startPrice + 0.229,
      startPrice + 0.179,
      startPrice + 0.229
    ].map(p => Math.round(p * 1000) / 1000);
    
    // STEP 2: Find median (3rd value when sorted, 0-indexed index 2)
    const sortedPrices = [...prices].sort((a, b) => a - b);
    const median = sortedPrices[2];
    
    // STEP 3: Build HTML table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
      <thead>
        <tr>
          <th style="border: 1px solid currentColor; padding: 8px;">Station 1</th>
          <th style="border: 1px solid currentColor; padding: 8px;">Station 2</th>
          <th style="border: 1px solid currentColor; padding: 8px;">Station 3</th>
          <th style="border: 1px solid currentColor; padding: 8px;">Station 4</th>
          <th style="border: 1px solid currentColor; padding: 8px;">Station 5</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${prices[0].toFixed(3)}</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${prices[1].toFixed(3)}</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${prices[2].toFixed(3)}</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${prices[3].toFixed(3)}</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${prices[4].toFixed(3)}</td>
        </tr>
      </tbody>
    </table>`;
    
    // STEP 4: Create options
    const mean = prices.reduce((a, b) => a + b, 0) / 5;
    
    const optionsData = [
      { text: `$${sortedPrices[1].toFixed(3)}$`, isCorrect: false },
      { text: `$${((sortedPrices[1] + sortedPrices[2]) / 2).toFixed(3)}$`, isCorrect: false },
      { text: `$${median.toFixed(3)}$`, isCorrect: true },
      { text: `$${Math.max(...prices).toFixed(3)}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `In the table above, Melissa recorded the price of one gallon of regular gas from five different local gas stations on the same day. What is the median of the gas prices Melissa recorded?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To find the median, arrange the prices in ascending order: ${sortedPrices.map(p => '$' + p.toFixed(3)).join(', ')}. The middle (3rd) value is $${median.toFixed(3)}$. Choice ${incorrectOptions[0].letter} is incorrect because that is the second value, not the median. Choice ${incorrectOptions[1].letter} is incorrect because that averages two values unnecessarily. Choice ${incorrectOptions[2].letter} is incorrect because that is the maximum value, not the median.`
    };
  }
};

/**
 * Question ID: be00d896
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [various patterns: constant, linear, exponential, clustered]
 * - Difficulty factors: [Comparing mean and median across different distributions]
 * - Distractor patterns: [Symmetric distributions where mean=median]
 * - Constraints: [Must identify right-skewed distribution for mean > median]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */