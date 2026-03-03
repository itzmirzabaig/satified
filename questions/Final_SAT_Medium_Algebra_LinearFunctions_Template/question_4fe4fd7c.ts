import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4fe4fd7c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [c(x) = mx + 500, c(100) = 800, find c(1000)]
 * - Difficulty factors: [Two-step: find m, then evaluate at new point]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - straightforward calculation]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */

export const generator_4fe4fd7c = {
  metadata: {
    // id: "4fe4fd7c",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Fixed cost: 300-600
    const fixedCost = getRandomInt(300, 600);
    // Production amount 1: 50-150
    const amount1 = getRandomInt(50, 150);
    // Cost at amount1: fixedCost + (reasonable variable cost)
    const varCostPerUnit = getRandomInt(2, 5);
    const cost1 = fixedCost + varCostPerUnit * amount1;
    // Production amount 2: 800-1200
    const amount2 = getRandomInt(800, 1200);
    
    // STEP 2: Calculate answer
    // c(amount1) = m * amount1 + fixedCost = cost1
    // m = (cost1 - fixedCost) / amount1 = varCostPerUnit
    const m = (cost1 - fixedCost) / amount1;
    const cost2 = m * amount2 + fixedCost;
    
    // STEP 3: Return question data
    return {
      questionText: `A company's total cost, in dollars, to produce $x$ shirts is given by the function $c(x) = mx + ${fixedCost}$, where $m$ is a constant. The total cost to produce ${amount1} shirts is $${cost1}. What is the total cost, in dollars, to produce ${amount2} shirts?`,
      figureCode: null,
      options: null,
      correctAnswer: cost2.toString(),
      explanation: `First find $m$: $c(${amount1}) = m(${amount1}) + ${fixedCost} = ${cost1}$, so $m(${amount1}) = ${cost1 - fixedCost}$, giving $m = ${m}$. Then $c(${amount2}) = ${m}(${amount2}) + ${fixedCost} = ${cost2}$.`
    };
  }
};

/**
 * Question ID: 2f34cd1c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 55.20 - 0.16x, evaluate at x = 326]
 * - Difficulty factors: [Decimal arithmetic, function evaluation]
 * - Distractor patterns: [A = initial value, C = rate only, D = wrong calculation]
 * - Constraints: [None - straightforward evaluation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */