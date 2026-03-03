import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: c81f1c2f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 45x + 600, x = 50]
 * - Difficulty factors: [Function evaluation with larger numbers]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - straightforward evaluation]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */

export const generator_c81f1c2f = {
  metadata: {
    // id: "c81f1c2f",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Rate: 30-60
    const rate = getRandomInt(30, 60);
    // Fixed fee: 400-800
    const fixedFee = getRandomInt(400, 800);
    // Number of crates: 30-70
    const crates = getRandomInt(30, 70);
    
    // STEP 2: Calculate answer
    const totalFee = rate * crates + fixedFee;
    
    // STEP 3: Return question data
    return {
      questionText: `The function $f$ gives the monthly fee $f(x)$, in dollars, a facility charges to keep $x$ crates in storage. The function is defined by $f(x)=${rate}x+${fixedFee}$. What is the monthly fee, in dollars, the facility charges to keep ${crates} crates in storage?`,
      figureCode: null,
      options: null,
      correctAnswer: totalFee.toString(),
      explanation: `Substituting ${crates} for $x$ in $f(x)=${rate}x+${fixedFee}$ yields $f(${crates})=${rate}(${crates})+${fixedFee}=${rate * crates}+${fixedFee}=${totalFee}$.`
    };
  }
};

/**
 * Question ID: 0d5495a6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h(0) = 45]
 * - Difficulty factors: [Identifying y-intercept]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - straightforward identification]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */