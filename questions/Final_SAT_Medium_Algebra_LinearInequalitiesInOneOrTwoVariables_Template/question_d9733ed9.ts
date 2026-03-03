import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: d9733ed9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4, intercept: 8, x values: 2,4,6]
 * - Difficulty factors: [Table verification, strict inequality y > 4x + 8]
 * - Distractor patterns: [A=only one point checks, others fail]
 * - Constraints: [Must satisfy y > 4x + 8 for ALL points]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table in question content]
 */

export const generator_d9733ed9 = {
  metadata: {
    // id: "d9733ed9",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: y > 4x + 8 with x = 2,4,6
    const slope = getRandomInt(3, 6);
    const intercept = getRandomInt(5, 15);
    
    // STEP 2: Generate x values
    const x1 = getRandomInt(1, 3);
    const x2 = x1 + getRandomInt(2, 3);
    const x3 = x2 + getRandomInt(2, 3);
    
    // Calculate thresholds
    const t1 = slope * x1 + intercept;
    const t2 = slope * x2 + intercept;
    const t3 = slope * x3 + intercept;
    
    // STEP 3: Generate table data
    // Table A (correct): all y > threshold
    const yA1 = t1 + getRandomInt(2, 5);
    const yA2 = t2 + getRandomInt(2, 5);
    const yA3 = t3 + getRandomInt(2, 5);
    
    // Table B: all y = exactly on line (fails strict >)
    const yB1 = t1;
    const yB2 = t2;
    const yB3 = t3;
    
    // Table C: below threshold
    const yC1 = t1 - getRandomInt(1, 4);
    const yC2 = t2 - getRandomInt(1, 4);
    const yC3 = t3 - getRandomInt(1, 4);
    
    // Table D: mixed
    const yD1 = t1 + getRandomInt(1, 3);
    const yD2 = t2 - getRandomInt(1, 3);
    const yD3 = t3 + getRandomInt(1, 3);
    
    // STEP 4: Build tables
    const tableA = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yA1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yA2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yA3}</td></tr></tbody></table>`;
    
    const tableB = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yB1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yB2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yB3}</td></tr></tbody></table>`;
    
    const tableC = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yC1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yC2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yC3}</td></tr></tbody></table>`;
    
    const tableD = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yD1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yD2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yD3}</td></tr></tbody></table>`;
    
    // STEP 5: Create options
    const optionsData = [
      { text: `Table A\n${tableA}`, isCorrect: true },
      { text: `Table B\n${tableB}`, isCorrect: false },
      { text: `Table C\n${tableC}`, isCorrect: false },
      { text: `Table D\n${tableD}`, isCorrect: false }
    ];
    
    // STEP 6: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    
    // STEP 7: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. For $x=${x1}$, $y > ${slope}(${x1})+${intercept} = ${t1}$. Only the correct table has $y=${yA1}$ (which is >${t1}). Checking other points in the correct table: for $x=${x2}, y=${yA2} > ${slope}(${x2})+${intercept}=${t2}$ (True); for $x=${x3}, y=${yA3} > ${slope}(${x3})+${intercept}=${t3}$ (True).`;
    
    // STEP 8: Return question data
    return {
      questionText: `For which of the following tables are all the values of $x$ and their corresponding values of $y$ solutions to the given inequality? $$y > ${slope}x + ${intercept}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `Table ${correctOption.letter}`,
      explanation: explanation
    };
  }
};
/**
 * Question ID: f2bbd43d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system: y > 14 and 4x + y < 18, y: 53]
 * - Difficulty factors: [System solving with one known coordinate]
 * - Distractor patterns: [B/C/D=don't satisfy second inequality]
 * - Constraints: [Must satisfy y > 14 AND 4x + y < 18 with y=53]
 * - Question type: [System→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/LinearInequalitiesInOneOrTwoVariables/f2bbd43d.ts