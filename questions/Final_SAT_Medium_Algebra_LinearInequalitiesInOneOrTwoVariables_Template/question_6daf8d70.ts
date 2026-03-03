import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 6daf8d70
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [max bushes: 164, ratio: 3]
 * - Difficulty factors: [System setup from word problem, constraint translation]
 * - Distractor patterns: [A/B=wrong inequality signs, C=swapped ratio]
 * - Constraints: [a + b ≤ 164, a ≤ 3b]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_6daf8d70 = {
  metadata: {
    // id: "6daf8d70",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: max 164 bushes, azaleas at most 3 times boxwoods
    const maxTotal = getRandomInt(100, 200);
    const ratio = getRandomInt(2, 5); // "at most ratio times"
    
    const bush1 = "azaleas";
    const bush2 = "boxwoods";
    const a = "a"; // azaleas
    const b = "b"; // boxwoods
    
    // STEP 2: Create options
    // Correct: a + b ≤ maxTotal, a ≤ ratio*b
    // A: ≥ for total, wrong ratio direction
    // B: ≥ for total, correct ratio
    // C: ≤ for total, wrong ratio direction (3a ≥ b means b ≤ 3a)
    
    const optionsData = [
      { text: `$${a} + ${b} \\geq ${maxTotal}$\n$${ratio}${a} \\geq ${b}$`, isCorrect: false },
      { text: `$${a} + ${b} \\geq ${maxTotal}$\n$${a} \\leq ${ratio}${b}$`, isCorrect: false },
      { text: `$${a} + ${b} \\leq ${maxTotal}$\n$${ratio}${a} \\geq ${b}$`, isCorrect: false },
      { text: `$${a} + ${b} \\leq ${maxTotal}$\n$${a} \\leq ${ratio}${b}$`, isCorrect: true }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. It's given that there will be no more than ${maxTotal} total bushes planted, which can be represented by $${a} + ${b} \\leq ${maxTotal}$. It's also given that the number of ${bush1} planted will be at most ${ratio} times the number of ${bush2} planted, which can be represented by $${a} \\leq ${ratio}${b}$. Choice ${incorrectOptions[0].letter} is incorrect because it uses $\\geq$ for the total (meaning at least ${maxTotal}) and reverses the ratio. Choice ${incorrectOptions[1].letter} is incorrect because it uses $\\geq$ for the total. Choice ${incorrectOptions[2].letter} is incorrect because it reverses the ratio relationship.`;
    
    // STEP 5: Return question data
    return {
      questionText: `A city employee will plant two types of bushes, ${bush1} and ${bush2}, in a park. There will be no more than $${maxTotal}$ total bushes planted, and the number of ${bush1} planted will be at most ${ratio} times the number of ${bush2} planted. Which of the following systems of inequalities best represents this situation, where $${a}$ is the number of ${bush1} that will be planted, and $${b}$ is the number of ${bush2} that will be planted?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${a} + ${b} \\leq ${maxTotal}, ${a} \\leq ${ratio}${b}`,
      explanation: explanation
    };
  }
};
/**
 * Question ID: 34aca984
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [length: 50, width: x, perimeter: ≤ 210]
 * - Difficulty factors: [Perimeter formula, inequality setup]
 * - Distractor patterns: [B=wrong inequality sign, C=wrong formula, D=wrong formula and sign]
 * - Constraints: [2(50) + 2x ≤ 210, or 2x + 100 ≤ 210]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/LinearInequalitiesInOneOrTwoVariables/34aca984.ts