import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: ce6b52d8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 1, 4, constants: -10, 40]
 * - Difficulty factors: [Solving for expression 3t rather than t]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Target expression 3t appears naturally in solution]
 * - Question type: [Fill-in-the-blank]
 */

export const generator_ce6b52d8 = {
  metadata: {
    // id: "ce6b52d8",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation where we solve for coefficient*t
    // Form: a(bt - c) + t = d + et
    // We want to find bt
    
    const a = getRandomInt(2, 4);
    const b = getRandomInt(2, 5);
    const c = getRandomInt(5, 15);
    const d = getRandomInt(30, 60);
    const e = getRandomInt(2, 6);
    
    // 2(bt - c) + t = d + et
    // 2bt - 2c + t = d + et
    // (2b + 1 - e)t = d + 2c
    // bt = b(d + 2c)/(2b + 1 - e)
    
    const targetCoeff = a * b + 1 - e;
    const constant = d + a * c;
    const tValue = constant / targetCoeff;
    const targetValue = b * tValue;
    
    // Ensure integer result
    const answer = Math.round(targetValue);
    
    return {
      questionText: `If $${a}(${b}t - ${c}) + t = ${d} + ${e}t$, what is the value of $${b}t$?`,
      figureCode: null,
      options: null,
      correctAnswer: answer.toString(),
      explanation: `The correct answer is ${answer}. Distributing on the left gives $${a*b}t - ${a*c} + t = ${d} + ${e}t$. Combining like terms: $$${a*b + 1}t - ${a*c} = ${d} + ${e}t$$. Adding ${a*c} to both sides and subtracting ${e}t$ from both sides yields $$${a*b + 1 - e}t = ${d + a*c}$$. Therefore $${b}t = ${answer}$$.`
    };
  }
};

/**
 * Question ID: 76f29fa5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base cost: 950, hourly rate: 50, hours threshold: 2, total: 1100]
 * - Difficulty factors: [Piecewise cost modeling, correct equation setup]
 * - Distractor patterns: [A multiplies base by (t-2), B uses 2t, D uses 2t in wrong place]
 * - Constraints: [Total = Base + Rate×(t - 2) for t > 2]
 * - Question type: [Multiple Choice Text]
 */