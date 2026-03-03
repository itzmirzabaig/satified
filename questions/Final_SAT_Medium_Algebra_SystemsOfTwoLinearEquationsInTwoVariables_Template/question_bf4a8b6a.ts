import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: bf4a8b6a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [group size: 21 (double-digit), prices: 60-80, revenue: 1440 (4-digit)]
 * - Difficulty factors: [Word problem, system setup, substitution method]
 * - Distractor patterns: [3, 9, 12, 18 - plausible child counts]
 * - Constraints: [Ensure integer solutions, valid counts]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_bf4a8b6a = {
  metadata: {
    // id: "bf4a8b6a",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values - preserve double-digit group sizes
    const groupSize = getRandomInt(15, 35); // 15-35 people
    const adultPrice = getRandomInt(50, 90); // $50-$90 per adult
    const childPrice = adultPrice - getRandomInt(10, 30); // Child price less than adult
    
    // STEP 2: Calculate solution - need integer values
    // Work backwards to ensure integer solution
    const numChildren = getRandomInt(3, Math.floor(groupSize / 2));
    const numAdults = groupSize - numChildren;
    const revenue = adultPrice * numAdults + childPrice * numChildren;
    
    // STEP 3: Build question text
    const questionText = `A company that provides whale-watching tours takes groups of $${groupSize}$ people at a time. The company's revenue is $${adultPrice}$ dollars per adult and $${childPrice}$ dollars per child. If the company's revenue for one group consisting of adults and children was $${revenue}$ dollars, how many people in the group were children?`;
    
    // STEP 4: Generate distractors
    const distractor1 = Math.floor(numChildren / 4); // Too small
    const distractor2 = Math.floor(groupSize / 2) - 1; // Close to half
    const distractor3 = groupSize - numChildren; // Swapped (adults instead of children)
    
    const correctText = numChildren.toString();
    const optionsData = [
      { text: distractor1.toString(), isCorrect: false },
      { text: distractor2.toString(), isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractor3.toString(), isCorrect: false }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // Calculate GCD for explanation
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const priceGcd = gcd(adultPrice, childPrice);
    
    // STEP 6: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Let $a$ be the number of adults and $c$ be the number of children in the group.\nFrom the problem, we know:\n1. The total number of people is $${groupSize}$:\n$a + c = ${groupSize}$\n2. The total revenue is $${revenue}$ dollars, with adults paying $${adultPrice}$ and children paying $${childPrice}$:\n$${adultPrice}a + ${childPrice}c = ${revenue}$\n\nWe can simplify the second equation by dividing everything by $${priceGcd}$:\n$${adultPrice/priceGcd}a + ${childPrice/priceGcd}c = ${revenue/priceGcd}$\n\nFrom the first equation, we can express $a$ in terms of $c$:\n$a = ${groupSize} - c$\n\nSubstitute this expression for $a$ into the simplified revenue equation:\n$${adultPrice/priceGcd}(${groupSize} - c) + ${childPrice/priceGcd}c = ${revenue/priceGcd}$\n$${adultPrice/priceGcd * groupSize} - ${adultPrice/priceGcd}c + ${childPrice/priceGcd}c = ${revenue/priceGcd}$\n$${adultPrice/priceGcd * groupSize} - ${(adultPrice - childPrice)/priceGcd}c = ${revenue/priceGcd}$\n$c = ${numChildren}$\n\nSo, there were $${numChildren}$ children in the group.\n\nLet's check the number of adults:\n$a = ${groupSize} - ${numChildren} = ${numAdults}$ adults.\n\nCheck the revenue:\n$(${numAdults} \\times ${adultPrice}) + (${numChildren} \\times ${childPrice}) = ${numAdults * adultPrice} + ${numChildren * childPrice} = ${revenue}$.\nThe calculation is correct.\n\nTherefore, the number of children is $${numChildren}$.`
    };
  }
};

// Helper for GCD
Math.gcd = function(a: number, b: number): number {
  return b === 0 ? a : Math.gcd(b, a % b);
};

/**
 * Question ID: 0dd6227f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: 1 and 8 (single digit), intercepts: 20 and 0]
 * - Difficulty factors: [Slope-intercept form recognition, intersection counting]
 * - Distractor patterns: [0, 1, 2, 8 - common misconception counts]
 * - Constraints: [Different slopes guarantee one intersection]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */