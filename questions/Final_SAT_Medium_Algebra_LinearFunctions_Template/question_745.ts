import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 745
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(0)=18, f(1)=20, slope=2]
 * - Difficulty factors: [Finding slope from two function values]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - straightforward calculation]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */

export const generator_745 = {
  metadata: {
    id: "745",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // f(0): 10-30
    const f0 = getRandomInt(10, 30);
    // f(1): f0 + 2 to f0 + 8
    const f1 = f0 + getRandomInt(2, 8);
    
    // STEP 2: Calculate slope
    const m = f1 - f0;
    
    // STEP 3: Return question data
    return {
      questionText: `The function $f$ is defined by $f(x)=mx+b$, where $m$ and $b$ are constants. If $f(0)=${f0}$ and $f(1)=${f1}$, what is the value of $m$?`,
      figureCode: null,
      options: null,
      correctAnswer: m.toString(),
      explanation: `The slope $m = \\frac{f(1) - f(0)}{1 - 0} = \\frac{${f1} - ${f0}}{1} = ${m}$.`
    };
  }
};
