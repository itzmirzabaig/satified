import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: a29e89fc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [masses: 3000-4100 grams]
 * - Difficulty factors: [Calculating mean of 5 values]
 * - Distractor patterns: [Median instead of mean, forgetting to divide]
 * - Constraints: [5 values, result should be clean integer]
 * - Question type: [Text→Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_a29e89fc = {
  metadata: {
    // id: "a29e89fc",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate 5 masses that sum to a round number divisible by 5
    const base = getRandomInt(30, 45) * 100; // 3000-4500 range
    const variation = getRandomInt(10, 50);
    
    // Create values around base that sum nicely
    const m1 = base + variation * 10;
    const m2 = base + variation * 10;
    const m3 = base - variation * 20;
    const m4 = base + variation * 30;
    const m5 = base - variation * 30;
    
    const masses = [m1, m2, m3, m4, m5];
    const sum = masses.reduce((a, b) => a + b, 0);
    const mean = sum / 5;
    
    return {
      questionText: `The list gives the mass, in grams, of alpine marmots. ${masses.join('; ')} What is the mean mass, in grams, of these alpine marmots?`,
      figureCode: null,
      options: null,
      correctAnswer: mean.toString(),
      explanation: `The correct answer is ${mean.toLocaleString()}. The mean of a data set is the sum of the values in the data set divided by the number of values in the data set. The sum of the masses is ${sum.toLocaleString()} grams. The number of alpine marmots is 5. Therefore, the mean mass is $\\\\frac{${sum.toLocaleString()}}{5}$, or ${mean.toLocaleString()}.`
    };
  }
};

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