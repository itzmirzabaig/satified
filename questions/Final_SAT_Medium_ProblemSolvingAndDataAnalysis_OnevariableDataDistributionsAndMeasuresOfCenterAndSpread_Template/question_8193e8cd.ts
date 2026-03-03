import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 8193e8cd
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [5 numbers, sum and mean relationship]
 * - Difficulty factors: [Understanding mean as fraction of sum]
 * - Distractor patterns: [1/4, 1/6, 5/1 as distractors]
 * - Constraints: [Mean = Sum / n, so Mean/Sum = 1/n]
 * - Question type: [Text→Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_8193e8cd = {
  metadata: {
    // id: "8193e8cd",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate 5 numbers
    const numbers = [
      getRandomInt(1, 5),
      getRandomInt(5, 15),
      getRandomInt(1, 5),
      getRandomInt(3, 10),
      getRandomInt(3, 10)
    ];
    
    const sum = numbers.reduce((a, b) => a + b, 0);
    const n = numbers.length;
    const mean = sum / n;
    const fraction = `\\\\frac{1}{${n}}`;
    
    return {
      questionText: `The mean of the list of numbers ${numbers.join(', ')} is what fraction of the sum of the five numbers?`,
      figureCode: null,
      options: null,
      correctAnswer: fraction,
      explanation: `The correct answer is ${fraction}. The mean of the list of numbers is found by dividing the sum of the numbers (${sum}) by the number of values in the list (${n}). Since there are ${n} numbers in the list, the mean is $\\\\frac{${sum}}{${n}} = ${mean}$, which is ${fraction} of the sum ${sum}. This relationship holds for any data set: the mean equals the sum divided by n, so the mean is always $\\\\frac{1}{n}$ of the sum.`
    };
  }
};

/**
 * Question ID: 25fc031a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [units sold: represented in histograms]
 * - Difficulty factors: [Comparing standard deviation from histogram shape]
 * - Distractor patterns: [Confusing center with spread, thinking wider range = higher std dev]
 * - Constraints: [Tighter cluster = lower std dev regardless of position]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs Histogram]
 */