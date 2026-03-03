import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 8a6de407
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(0)=18, f(1)=20, slope=2]
 * - Difficulty factors: [Finding slope from two function values]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - straightforward calculation]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */

export const generator_8a6de407 = {
  metadata: {
    // id: "8a6de407",
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

/**
 * Question ID: 265219
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [2000: 862, 2010: 846, slope=-1.6, P(t)=862-1.6t]
 * - Difficulty factors: [Linear model with negative slope over time]
 * - Distractor patterns: [B = wrong slope magnitude, C = wrong year reference, D = wrong year reference]
 * - Constraints: [None - straightforward modeling]
 * - Question type: [Table in Question→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */