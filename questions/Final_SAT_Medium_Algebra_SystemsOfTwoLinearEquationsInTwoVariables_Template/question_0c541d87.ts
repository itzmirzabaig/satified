import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 0c541d87
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [prices: 12.45, 19.42 (decimal currency), quantities: 1-4]
 * - Difficulty factors: [Word problem with decimals, system setup]
 * - Distractor patterns: [3.77, 3.88, 4.15, 4.34 - close price values]
 * - Constraints: [Decimal arithmetic, realistic prices]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_0c541d87 = {
  metadata: {
    // id: "0c541d87",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values - work backwards for clean decimals
    const eggPrice = (getRandomInt(300, 500) / 100); // $3.00 to $5.00
    const breadPrice = (getRandomInt(200, 500) / 100); // $2.00 to $5.00
    
    const bread1 = 1;
    const eggs1 = 2;
    const total1 = (breadPrice * bread1 + eggPrice * eggs1);
    
    const bread2 = 4;
    const eggs2 = 1;
    const total2 = (breadPrice * bread2 + eggPrice * eggs2);
    
    // Round to 2 decimal places
    const roundedTotal1 = Math.round(total1 * 100) / 100;
    const roundedTotal2 = Math.round(total2 * 100) / 100;
    
    // STEP 2: Build question text
    const questionText = `Two customers purchased the same kind of bread and eggs at a store. The first customer paid $${roundedTotal1.toFixed(2)}$ dollars for $${bread1}$ loaf of bread and $${eggs1}$ dozen eggs. The second customer paid $${roundedTotal2.toFixed(2)}$ dollars for $${bread2}$ loaves of bread and $${eggs2}$ dozen egg. What is the cost, in dollars, of $1$ dozen eggs?`;
    
    // STEP 3: Calculate distractors
    const distractor1 = breadPrice; // Bread price instead of eggs
    const distractor2 = eggPrice - 0.46; // Close but wrong
    const distractor3 = eggPrice - 0.19; // Close but wrong
    
    const correctText = eggPrice.toFixed(2);
    const optionsData = [
      { text: distractor1.toFixed(2), isCorrect: false },
      { text: distractor2.toFixed(2), isCorrect: false },
      { text: distractor3.toFixed(2), isCorrect: false },
      { text: correctText, isCorrect: true }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // STEP 5: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Let $b$ be the cost of one loaf of bread and $e$ be the cost of one dozen eggs. From the first customer's purchase, we can write the equation: $${bread1}b + ${eggs1}e = ${roundedTotal1.toFixed(2)}$. From the second customer's purchase, we can write the equation: $${bread2}b + ${eggs2}e = ${roundedTotal2.toFixed(2)}$. Now we have a system of two linear equations with two variables: 1) $b + ${eggs1}e = ${roundedTotal1.toFixed(2)}$ 2) $${bread2}b + e = ${roundedTotal2.toFixed(2)}$. We need to find the cost of $1$ dozen eggs, which is the variable $e$. We can solve this system by substitution or elimination. Let's use substitution. From equation (1), we can express $b$ in terms of $e$: $b = ${roundedTotal1.toFixed(2)} - ${eggs1}e$. Substitute this expression for $b$ into equation (2): $${bread2}(${roundedTotal1.toFixed(2)} - ${eggs1}e) + e = ${roundedTotal2.toFixed(2)}$. Distribute the $${bread2}$: $${(bread2 * roundedTotal1).toFixed(2)} - ${bread2 * eggs1}e + e = ${roundedTotal2.toFixed(2)}$. Combine like terms: $${(bread2 * roundedTotal1).toFixed(2)} - ${bread2 * eggs1 - 1}e = ${roundedTotal2.toFixed(2)}$. Subtract $${(bread2 * roundedTotal1).toFixed(2)}$ from both sides: $-${bread2 * eggs1 - 1}e = ${roundedTotal2.toFixed(2)} - ${(bread2 * roundedTotal1).toFixed(2)}$ $-${bread2 * eggs1 - 1}e = ${(roundedTotal2 - bread2 * roundedTotal1).toFixed(2)}$. Divide by $-${bread2 * eggs1 - 1}$: $e = ${eggPrice.toFixed(2)}$. So, the cost of $1$ dozen eggs is $${eggPrice.toFixed(2)}$. Let's double-check by finding the cost of bread. $b = ${roundedTotal1.toFixed(2)} - ${eggs1}(${eggPrice.toFixed(2)}) = ${roundedTotal1.toFixed(2)} - ${(eggs1 * eggPrice).toFixed(2)} = ${breadPrice.toFixed(2)}$. Let's plug into the second equation: $${bread2}(${breadPrice.toFixed(2)}) + ${eggPrice.toFixed(2)} = ${(bread2 * breadPrice).toFixed(2)} + ${eggPrice.toFixed(2)} = ${roundedTotal2.toFixed(2)}$. This matches. Therefore, the correct answer is ${correctLetter}. Why other options are incorrect: A. $${distractor1.toFixed(2)}$: This is the cost of a loaf of bread, not a dozen eggs. A student might solve for the wrong variable. B. $${distractor2.toFixed(2)}$: Incorrect calculation result. C. $${distractor3.toFixed(2)}$: Incorrect calculation result.`
    };
  }
};

/**
 * Question ID: 38a43902
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: -2, result: 40 (double-digit)]
 * - Difficulty factors: [Substitution, straightforward solve for x]
 * - Distractor patterns: [Fill in blank - no distractors to analyze]
 * - Constraints: [Integer answer]
 * - Question type: [Fill in the blank]
 * - Figure generation: [None]
 */