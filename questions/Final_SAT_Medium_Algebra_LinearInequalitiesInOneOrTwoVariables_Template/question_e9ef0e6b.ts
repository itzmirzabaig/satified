import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: e9ef0e6b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [daily miles: 72-77, days: 16]
 * - Difficulty factors: [Range multiplication, compound inequality]
 * - Distractor patterns: [A=addition instead of multiplication, C=added to x, D=divided by days]
 * - Constraints: [72*16 ≤ x ≤ 77*16]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_e9ef0e6b = {
  metadata: {
    // id: "e9ef0e6b",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 72-77 miles/day for 16 days
    const minDaily = getRandomInt(50, 100);
    const maxDaily = minDaily + getRandomInt(5, 15);
    const days = getRandomInt(10, 25);
    
    // STEP 2: Calculate products
    const minTotal = minDaily * days;
    const maxTotal = maxDaily * days;
    
    // STEP 3: Create options
    // A: Addition (wrong)
    // B: Multiplication (correct)
    // C: Added to x (wrong)
    // D: Coefficient on x (wrong)
    
    const optionsData = [
      { text: `$${minDaily} + ${days} \\leq x \\leq ${maxDaily} + ${days}$`, isCorrect: false },
      { text: `$(${minDaily})(${days}) \\leq x \\leq (${maxDaily})(${days})$`, isCorrect: true },
      { text: `$${minDaily} \\leq ${days} + x \\leq ${maxDaily}$`, isCorrect: false },
      { text: `$${minDaily} \\leq ${days}x \\leq ${maxDaily}$`, isCorrect: false }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 5: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. The whale travels at least ${minDaily} miles per day for ${days} days, so minimum distance is $${minDaily} \\times ${days} = ${minTotal}$. Maximum is $${maxDaily} \\times ${days} = ${maxTotal}$. Therefore, $${minTotal} \\leq x \\leq ${maxTotal}$, or $(${minDaily})(${days}) \\leq x \\leq (${maxDaily})(${days})$. Choice ${incorrectOptions[0].letter} adds days to miles instead of multiplying. Choice ${incorrectOptions[1].letter} adds days to the total distance. Choice ${incorrectOptions[2].letter} incorrectly multiplies days by x.`;
    
    // STEP 6: Return question data
    return {
      questionText: `A model estimates that whales from a certain species travel $${minDaily}$ to $${maxDaily}$ miles in the ocean each day during their migration. Based on this model, which inequality represents the estimated total number of miles, $x$, a whale could travel in $${days}$ days of its migration?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${minTotal} \\leq x \\leq ${maxTotal}`,
      explanation: explanation
    };
  }
};
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

// File: generators/LinearInequalitiesInOneOrTwoVariables/f02b4509.ts