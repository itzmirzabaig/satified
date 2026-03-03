import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: a7e2859a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [first day: 430 (triple-digit), additional: 215 (triple-digit), max days: 10 (single-digit)]
 * - Difficulty factors: [Piecewise linear cost function, proper simplification]
 * - Distractor patterns: [B: wrong daily rate, C: wrong structure, D: didn't subtract one day]
 * - Constraints: [y = 430 + 215(x-1) for x ≤ 10, simplified to y = 215x + 215]
 * - Question type: [Word problem → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_a7e2859a = {
  metadata: {
    // id: "a7e2859a",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const firstDayCost = getRandomInt(35, 55) * 10 + getRandomInt(0, 9); // 350-559
    const additionalCost = Math.round(firstDayCost / 2); // Approximately half
    const maxDays = getRandomInt(8, 15);
    
    // STEP 2: Calculate equation
    // y = firstDayCost + additionalCost * (x - 1)
    // y = firstDayCost + additionalCost*x - additionalCost
    // y = additionalCost*x + (firstDayCost - additionalCost)
    const slope = additionalCost;
    const intercept = firstDayCost - additionalCost;
    
    // STEP 3: Create distractors
    const distractorB = `${firstDayCost}x - ${additionalCost}`;
    const distractorC = `${firstDayCost}x + ${additionalCost}`;
    const distractorD = `${additionalCost}x + ${firstDayCost}`;
    
    const correctText = `$y = ${slope}x + ${intercept}$`;
    
    const optionsData = [
      { text: `$y = ${distractorB}$`, isCorrect: false, reason: `incorrectly suggests a daily rate of \\$${firstDayCost}` },
      { text: `$y = ${distractorC}$`, isCorrect: false, reason: `incorrectly suggests a daily rate of \\$${firstDayCost} plus a base fee` },
      { text: `$y = ${distractorD}$`, isCorrect: false, reason: `a common distractor that would be correct if the cost were \\$${firstDayCost} up front plus \\$${additionalCost} for every day including the first` },
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
      // Fixed: Escape currency dollar signs with \$
      questionText: `The cost of renting a large canopy tent for up to ${maxDays} days is \\$${firstDayCost} for the first day and \\$${additionalCost} for each additional day. Which of the following equations gives the cost $y$, in dollars, of renting the tent for $x$ days, where $x$ is a positive integer and $x \\le ${maxDays}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The first day costs \\$${firstDayCost}, and each additional day costs \\$${additionalCost}. For $x$ days, there are $(x-1)$ additional days. So $y = ${firstDayCost} + ${additionalCost}(x-1) = ${firstDayCost} + ${additionalCost}x - ${additionalCost} = ${additionalCost}x + ${intercept}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 78391fcc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: -11, -10 (double-digit), y: 21, 18 (double-digit)]
 * - Difficulty factors: [Find x-intercept from table, negative x-intercept]
 * - Distractor patterns: [A: wrong calculation, C: wrong sign, D: wrong intercept]
 * - Constraints: [x-intercept is where y = 0]
 * - Question type: [Table/Figure → Multiple Choice Text]
 * - Figure generation: [Mafs graph with points and x-intercept]
 */

// File: generators/linear-functions/78391fcc.ts