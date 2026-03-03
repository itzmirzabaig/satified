import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f7e39fe9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = mx - 28, x values: 10,15,20,25, f(x): 82,137,192,247]
 * - Difficulty factors: [Finding slope from table with given intercept]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Intercept -28 given, find m]
 * - Question type: [Table in Question→Fill in Blank]
 * - Figure generation: [HTML Table]
 */

export const generator_f7e39fe9 = {
  metadata: {
    // id: "f7e39fe9",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Slope: 8-15 (medium range)
    const m = getRandomInt(8, 15);
    // Intercept: -30 to -20
    const b = -getRandomInt(20, 30);
    // Starting x value
    const xStart = getRandomInt(8, 12) * 5; // 40, 45, 50, 55, 60
    const xStep = 5;
    
    // STEP 2: Generate table values
    const x1 = xStart;
    const y1 = m * x1 + b;
    const x2 = x1 + xStep;
    const y2 = m * x2 + b;
    const x3 = x2 + xStep;
    const y3 = m * x3 + b;
    const x4 = x3 + xStep;
    const y4 = m * x4 + b;
    
    // STEP 3: Build table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">f(x)</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y3}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x4}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y4}</td></tr></tbody></table>`;
    
    // STEP 4: Return question data
    return {
      questionText: `The table shows four values of $x$ and their corresponding values of $f(x)$. There is a linear relationship between $x$ and $f(x)$ that is defined by the equation $f(x)=m x ${b < 0 ? '-' : '+'} ${Math.abs(b)}$, where $m$ is a constant. What is the value of $m$? ${tableCode}`,
      figureCode: null,
      options: null,
      correctAnswer: m.toString(),
      explanation: `Substituting $x=${x1}$ and $f(x)=${y1}$ into $f(x)=mx${b < 0 ? '-' : '+'}${Math.abs(b)}$ yields ${y1} = ${m}(${x1}) ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${m * x1} ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${y1}$. Therefore, $m=${m}$.`
    };
  }
};

/**
 * Question ID: 5cf1bbc9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system cost: 100, game cost: 25 per game, points: (0,100), (1,125)]
 * - Difficulty factors: [Interpreting slope in context]
 * - Distractor patterns: [B = y-intercept interpretation, C = wrong cost, D = wrong cost]
 * - Constraints: [Must have Mafs figure]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs graph with line and points]
 */