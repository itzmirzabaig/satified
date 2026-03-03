import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: f02b4509
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [max weight: 4600, trailer: 500, box: 120]
 * - Difficulty factors: [Maximization with constraint, integer solution]
 * - Distractor patterns: [B/C/D=values exceeding weight limit]
 * - Constraints: [500 + 120b ≤ 4600, b ≤ 34.166... → 34]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_f02b4509 = {
  metadata: {
    // id: "f02b4509",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const maxWeight = getRandomInt(4000, 6000);
    const trailerWeight = getRandomInt(300, 700);
    const boxWeight = getRandomInt(80, 150);
    
    // STEP 2: Calculate maximum boxes
    const remainingCapacity = maxWeight - trailerWeight;
    const maxBoxesExact = remainingCapacity / boxWeight;
    const maxBoxes = Math.floor(maxBoxesExact);
    
    // STEP 3: Create distractors (all exceed limit)
    const distractor1 = maxBoxes + 1;
    const distractor2 = maxBoxes + getRandomInt(2, 5);
    const distractor3 = maxBoxes + getRandomInt(5, 10);
    
    // STEP 4: Create options
    const optionsData = [
      { text: `$${maxBoxes}$`, isCorrect: true },
      { text: `$${distractor1}$`, isCorrect: false },
      { text: `$${distractor2}$`, isCorrect: false },
      { text: `$${distractor3}$`, isCorrect: false }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 6: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. Let $b$ be the number of boxes. The combined weight is $${trailerWeight} + ${boxWeight}b \\leq ${maxWeight}$. Solving: $${boxWeight}b \\leq ${remainingCapacity}$, so $b \\leq ${maxBoxesExact.toFixed(2)}$. Since boxes must be whole numbers, the maximum is ${maxBoxes}. Choice ${incorrectOptions[0].letter} would give total weight ${trailerWeight + boxWeight * distractor1} which exceeds ${maxWeight}. Choices ${incorrectOptions[1].letter} and ${incorrectOptions[2].letter} also exceed the weight limit.`;
    
    // STEP 7: Return question data
    return {
      questionText: `A moving truck can tow a trailer if the combined weight of the trailer and the boxes it contains is no more than $${maxWeight}$ pounds. What is the maximum number of boxes this truck can tow in a trailer with a weight of $${trailerWeight}$ pounds if each box weighs $${boxWeight}$ pounds?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: maxBoxes.toString(),
      explanation: explanation
    };
  }
};
/**
 * Question ID: 90bd9ef8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [current cost: 4334, new cost: 2712, install: 25000]
 * - Difficulty factors: [Savings calculation, inequality setup for payback]
 * - Distractor patterns: [A=wrong direction, C=wrong operation, D=ratio error]
 * - Constraints: [25000 < (4334-2712)*t]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/LinearInequalitiesInOneOrTwoVariables/90bd9ef8.ts