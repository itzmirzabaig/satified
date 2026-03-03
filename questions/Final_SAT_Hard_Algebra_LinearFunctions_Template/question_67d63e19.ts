import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 67d63e19
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [first day: $52, additional: $26]
 * - Difficulty factors: [Piecewise pricing, proper algebraic simplification]
 * - Distractor patterns: [B: wrong first day cost, C/D: wrong structures]
 * - Constraints: [C(d) = 52 + 26(d-1) = 26d + 26]
 * - Question type: [Word problem → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_67d63e19 = {
  metadata: {
    // id: "67d63e19",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const firstDayCost = getRandomInt(40, 70); // $40-70
    const additionalCost = Math.round(firstDayCost / 2); // Approximately half
    
    // STEP 2: Calculate simplified form
    // C(d) = firstDayCost + additionalCost(d - 1)
    // C(d) = firstDayCost + additionalCost*d - additionalCost
    // C(d) = additionalCost*d + (firstDayCost - additionalCost)
    const slope = additionalCost;
    const intercept = firstDayCost - additionalCost;
    
    // STEP 3: Create distractors
    const distractorB = `${additionalCost}d + ${firstDayCost}`;
    const distractorC = `${firstDayCost}d - ${additionalCost}`;
    const distractorD = `${firstDayCost}d + ${firstDayCost + additionalCost}`;
    
    const correctText = `$C(d)=${slope}d+${intercept}$`;
    
    const optionsData = [
      { text: `$C(d)=${slope}d+${intercept}$`, isCorrect: true },
      { text: `$C(d)=${distractorB}$`, isCorrect: false, reason: `gives cost of $${firstDayCost + additionalCost}, not $${firstDayCost}, for the first day` },
      { text: `$C(d)=${distractorC}$`, isCorrect: false, reason: `gives cost of $${firstDayCost - additionalCost}, not $${firstDayCost}, for the first day and uses wrong rate` },
      { text: `$C(d)=${distractorD}$`, isCorrect: false, reason: `gives cost of $${firstDayCost * 1 + firstDayCost + additionalCost}, not $${firstDayCost}, for the first day` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      // Fixed: Use \$ for currency dollar signs to escape LaTeX parsing
      questionText: `The cost of renting a carpet cleaner is \\$${firstDayCost} for the first day and \\$${additionalCost} for each additional day. Which of the following functions gives the cost $C(d)$, in dollars, of renting the carpet cleaner for $d$ days, where $d$ is a positive integer?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The cost is \\$${firstDayCost} for day 1 plus \\$${additionalCost} for each of the remaining $(d-1)$ days: $C(d) = ${firstDayCost} + ${additionalCost}(d-1) = ${firstDayCost} + ${additionalCost}d - ${additionalCost} = ${additionalCost}d + ${intercept}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};