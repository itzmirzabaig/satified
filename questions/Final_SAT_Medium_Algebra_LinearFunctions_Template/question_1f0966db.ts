import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 1f0966db
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 9/7 x + 8/7, solve f(x) = 5, x = 3]
 * - Difficulty factors: [Solving linear equation with fractions]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - straightforward solving]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */

export const generator_1f0966db = {
  metadata: {
    // id: "1f0966db",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Target f(x): 3-8
    const target = getRandomInt(3, 8);
    // Slope: fraction num/denom
    const num = getRandomInt(2, 5);
    const denom = getRandomInt(3, 7);
    // Intercept: small fraction
    const intNum = getRandomInt(1, 5);
    
    // Calculate x: (num/denom)*x + intNum/denom = target
    // (num*x + intNum)/denom = target
    // num*x + intNum = target*denom
    // x = (target*denom - intNum)/num
    const x = (target * denom - intNum) / num;
    
    // STEP 2: Return question data
    return {
      questionText: `The function $f$ is defined by $f(x) = \\frac{${num}}{${denom}}x + \\frac{${intNum}}{${denom}}$. For what value of $x$ does $f(x) = ${target}$?`,
      figureCode: null,
      options: null,
      correctAnswer: x.toString(),
      explanation: `Setting $f(x) = ${target}$: $\\frac{${num}}{${denom}}x + \\frac{${intNum}}{${denom}} = ${target}$. Multiplying by ${denom}: ${num}x + ${intNum} = ${target * denom}$. So ${num}x = ${target * denom - intNum}$, giving $x = ${x}$.`
    };
  }
};

/**
 * Question ID: 441558e7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [y = 0.67x + 2.6, x = 58, y ≈ 41]
 * - Difficulty factors: [Linear model evaluation with decimals]
 * - Distractor patterns: [B = wrong calculation, C = swapped, D = way off]
 * - Constraints: [None - straightforward evaluation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */