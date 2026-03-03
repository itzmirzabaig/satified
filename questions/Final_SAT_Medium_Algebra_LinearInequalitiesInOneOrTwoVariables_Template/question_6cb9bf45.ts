import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 6cb9bf45
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 7, intercept: -4, x values: 3,5,8]
 * - Difficulty factors: [Table verification, strict inequality y > 7x - 4]
 * - Distractor patterns: [Tables with some points satisfying, some not]
 * - Constraints: [Must satisfy y > 7x - 4 for ALL points]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table in question content]
 */

export const generator_6cb9bf45 = {
  metadata: {
    // id: "6cb9bf45",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: y > 7x - 4
    // Generate similar: y > mx + b with m > 1
    const slope = getRandomInt(4, 9);
    const intercept = -getRandomInt(1, 6); // Negative intercept
    const absIntercept = Math.abs(intercept);
    
    // STEP 2: Generate x values
    const x1 = getRandomInt(2, 4);
    const x2 = x1 + getRandomInt(2, 3);
    const x3 = x2 + getRandomInt(2, 4);
    
    // Calculate thresholds
    const t1 = slope * x1 + intercept;
    const t2 = slope * x2 + intercept;
    const t3 = slope * x3 + intercept;
    
    // STEP 3: Generate y values for each table
    // Table D (correct): all y > threshold
    const yD1 = t1 + getRandomInt(2, 6);
    const yD2 = t2 + getRandomInt(2, 6);
    const yD3 = t3 + getRandomInt(2, 6);
    
    // Table A: mixed (some below)
    const yA1 = t1 - getRandomInt(1, 3);
    const yA2 = t2 + getRandomInt(1, 3);
    const yA3 = t3 + getRandomInt(1, 3);
    
    // Table B: mixed (some equal or below)
    const yB1 = t1 + getRandomInt(1, 3);
    const yB2 = t2 + getRandomInt(1, 3);
    const yB3 = t3 - getRandomInt(1, 3);
    
    // Table C: one below
    const yC1 = t1 + getRandomInt(2, 6);
    const yC2 = t2 - getRandomInt(1, 3);
    const yC3 = t3 + getRandomInt(2, 6);
    
    // STEP 4: Build table HTML strings
    const tableA = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yA1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yA2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yA3}</td></tr></tbody></table>`;
    
    const tableB = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yB1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yB2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yB3}</td></tr></tbody></table>`;
    
    const tableC = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yC1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yC2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yC3}</td></tr></tbody></table>`;
    
    const tableD = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yD1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yD2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yD3}</td></tr></tbody></table>`;
    
    // STEP 5: Create options with tracking
    const optionsData = [
      { text: `Table A\n${tableA}`, isCorrect: false },
      { text: `Table B\n${tableB}`, isCorrect: false },
      { text: `Table C\n${tableC}`, isCorrect: false },
      { text: `Table D\n${tableD}`, isCorrect: true }
    ];
    
    // STEP 6: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    
    // STEP 7: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. When $x=${x1}$, $y > ${slope}(${x1})${intercept >= 0 ? '+' : '-'}${absIntercept} = ${t1}$. When $x=${x2}$, $y > ${slope}(${x2})${intercept >= 0 ? '+' : '-'}${absIntercept} = ${t2}$. When $x=${x3}$, $y > ${slope}(${x3})${intercept >= 0 ? '+' : '-'}${absIntercept} = ${t3}$. In the correct table, ${yD1} > ${t1}, ${yD2} > ${t2}, and ${yD3} > ${t3}$. All other tables contain at least one point where $y$ is not strictly greater than the calculated boundary value.`;
    
    // STEP 8: Return question data
    return {
      questionText: `For which of the following tables are all the values of $x$ and their corresponding values of $y$ solutions to the given inequality $y > ${slope}x ${intercept >= 0 ? '+' : '-'} ${absIntercept}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `Table ${correctOption.letter}`,
      explanation: explanation
    };
  }
};
/**
 * Question ID: c41e5688
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -3, y-intercept: -1]
 * - Difficulty factors: [Graph to inequality conversion, dashed line, shading direction]
 * - Distractor patterns: [A/B=wrong inequality sign, C=wrong slope sign]
 * - Constraints: [Line through (0,-1) and (1,-4), y > -3x - 1]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs inequality graph]
 */

// File: generators/LinearInequalitiesInOneOrTwoVariables/c41e5688.ts