import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 585de39a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: Large numbers (millions), probability as decimal (0.43), rounding to nearest integer
 * - Difficulty factors: Setting up proportion from probability statement, working with large numbers/millions, rounding
 * - Distractor patterns: Not applicable (fill-in-the-blank)
 * - Constraints: Must ensure p rounds to a specific integer, probability should be a clean decimal
 * - Question type: Word problem → Fill-in-the-blank
 * - Figure generation: None
 */

export const generator_585de39a = {
  metadata: {
    // id: "585de39a",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    // We need p/97 = probability, where p rounds to a nice integer
    // Let's work backwards: pick a target p and probability
    
    // Generate final subscriber count (97 million in original, let's vary)
    // Keep it in the 80-120 million range for realistic "growth from 83M"
    const finalSubscribers = getRandomInt(85, 115);
    
    // Pick a probability that gives a clean p value when multiplied
    // Common SAT decimals: 0.42, 0.43, 0.44, 0.45, etc.
    const probabilityOptions = [0.42, 0.43, 0.44, 0.45, 0.46, 0.38, 0.39, 0.40, 0.41];
    const probability = getRandomElement(probabilityOptions);
    
    // Calculate p and round it
    const pExact = probability * finalSubscribers;
    const pRounded = Math.round(pExact);
    
    // Ensure the rounding is unambiguous (not X.5 case)
    const decimalPart = pExact - Math.floor(pExact);
    if (decimalPart === 0.5 || decimalPart === 0.5 - 1e-10) {
      // Use while loop instead of recursion to regenerate
      return generator_585de39a.generate();
    }
    
    // Generate initial subscriber count (less than final)
    const initialSubscribers = getRandomInt(finalSubscribers - 20, finalSubscribers - 5);
    
    // STEP 2: Determine correct answer
    const correctAnswer = pRounded.toString();
    
    return {
      questionText: `On May 10, 2015, there were $${initialSubscribers}$ million Internet subscribers in Nigeria. The major Internet providers were MTN, Globacom, Airtel, Etisalat, and Visafone. By September 30, 2015, the number of Internet subscribers in Nigeria had increased to $${finalSubscribers}$ million. If an Internet subscriber in Nigeria on September 30, 2015, is selected at random, the probability that the person selected was an MTN subscriber is $${probability}$. There were $p$ million MTN subscribers in Nigeria on September 30, 2015. To the nearest integer, what is the value of $p$?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The probability of selecting an MTN subscriber is equal to the number of MTN subscribers divided by the total number of subscribers. This gives the equation $\\frac{p}{${finalSubscribers}} = ${probability}$. Multiplying both sides by $${finalSubscribers}$ yields $p = (${probability})(${finalSubscribers}) = ${pExact.toFixed(2)}$, which to the nearest integer is $${correctAnswer}$.`
    };
  }
};

/**
 * Question ID: 6a715bed
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: Age groups with specific counts, conditional on "at least 10 years"
 * - Difficulty factors: Conditional probability from table, identifying correct sub-population, summing across multiple columns
 * - Distractor patterns: Not applicable (fill-in-the-blank)
 * - Constraints: Table must have consistent totals, age groups must create clean conditional probability
 * - Question type: Table → Fill-in-the-blank
 * - Figure generation: HTML table with age distribution
 */

// File: generators/ProblemSolvingAndDataAnalysis/6a715bed.ts