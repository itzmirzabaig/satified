import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: bbf9e5ce
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [first 25: $21, additional: $14, n >= 25]
 * - Difficulty factors: [Piecewise pricing, function simplification]
 * - Distractor patterns: [B: added without subtracting, C: wrong structure, D: wrong base]
 * - Constraints: [f(n) = 21*25 + 14(n-25) = 14n + 175]
 * - Question type: [Word problem → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_bbf9e5ce = {
  metadata: {
    // id: "bbf9e5ce",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const threshold = getRandomInt(15, 35); // First "25" people threshold
    const firstRate = getRandomInt(15, 30); // $15-30 per person
    const additionalRate = getRandomInt(10, 20); // $10-20 per additional
    
    const baseCost = firstRate * threshold;
    
    // STEP 2: Calculate simplified form
    // f(n) = baseCost + additionalRate(n - threshold)
    // f(n) = baseCost + additionalRate*n - additionalRate*threshold
    // f(n) = additionalRate*n + (baseCost - additionalRate*threshold)
    const slope = additionalRate;
    const intercept = baseCost - additionalRate * threshold;
    
    // STEP 3: Create distractors
    const distractorB = `${additionalRate}n + ${baseCost}`;
    const distractorC = `${firstRate + additionalRate}n - ${additionalRate * threshold}`;
    const distractorD = `${additionalRate}n + ${firstRate}`;
    
    const correctText = `$f(n) = ${slope}n + ${intercept}$`;
    
    const optionsData = [
      { text: `$f(n) = ${slope}n + ${intercept}$`, isCorrect: true },
      { text: `$f(n) = ${distractorB}$`, isCorrect: false, reason: `incorrectly adds the base cost without subtracting the cost for the first ${threshold} people from the variable part` },
      { text: `$f(n) = ${distractorC}$`, isCorrect: false, reason: `doesn't follow the structure of the problem's pricing model` },
      { text: `$f(n) = ${distractorD}$`, isCorrect: false, reason: `suggests a base fee of \\$${firstRate} plus \\$${additionalRate} per person, ignoring the higher rate for the first ${threshold} people` }
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
      questionText: `For groups of ${threshold} or more people, a museum charges \\$${firstRate} per person for the first ${threshold} people and \\$${additionalRate} for each additional person. Which function $f$ gives the total charge, in dollars, for a tour group with $n$ people, where $n \\ge ${threshold}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The cost for the first ${threshold} people is $${threshold} \\times ${firstRate} = ${baseCost}$. The additional people cost \\$${additionalRate}$(n - ${threshold})$. Total: $f(n) = ${baseCost} + ${additionalRate}(n - ${threshold}) = ${baseCost} + ${additionalRate}n - ${additionalRate * threshold} = ${additionalRate}n + ${intercept}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};