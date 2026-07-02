import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 973
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ratio j:k = 11:12, j×17, k×?]
 * - Difficulty factors: [Ratio preservation principle]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Answer is always same multiplier as j]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_973 = {
  metadata: {
    id: "973",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: j:k = 11:12, j×17, k×17 (answer is same multiplier)
    const ratio1 = getRandomInt(2, 20);
    const ratio2 = getRandomInt(2, 20);
    const multiplier = getRandomInt(2, 25);
    
    return {
      questionText: `For the values $j$ and $k$, the ratio of $j$ to $k$ is $${ratio1}$ to $${ratio2}$. If $j$ is multiplied by $${multiplier}$, what is $k$ multiplied by in order to maintain the same ratio?`,
      figureCode: null,
      options: null,
      correctAnswer: multiplier.toString(),
      explanation: `The correct answer is ${multiplier}. If one value is multiplied by a number, then the other value must be multiplied by the same number in order to maintain the same ratio. It's given that $j$ is multiplied by ${multiplier}. Therefore, in order to maintain the same ratio, $k$ must also be multiplied by ${multiplier}.`
    };
  }
};
