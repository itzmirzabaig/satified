import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 94749372
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 2x + 3, parallel line has same slope 2]
 * - Difficulty factors: [Understanding parallel lines have equal slopes]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - straightforward concept]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */

export const generator_94749372 = {
  metadata: {
    // id: "94749372",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Slope: 1-6
    const m = getRandomInt(1, 6);
    // Intercept: 1-10
    const b = getRandomInt(1, 10);
    
    // STEP 2: Return question data
    return {
      questionText: `For the given function $f(x)=${m}x+${b}$, the graph of $y=f(x)$ in the $xy$-plane is parallel to line $j$. What is the slope of line $j$?`,
      figureCode: null,
      options: null,
      correctAnswer: m.toString(),
      explanation: `The given function is in slope-intercept form $y=mx+b$ where $m=${m}$ is the slope. Parallel lines have equal slopes, so line $j$ also has slope ${m}.`
    };
  }
};

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