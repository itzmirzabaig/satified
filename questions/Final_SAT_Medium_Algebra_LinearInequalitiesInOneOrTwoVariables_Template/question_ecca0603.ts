import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: ecca0603
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x bound: 22, y < x relationship]
 * - Difficulty factors: [System verification with table, two constraints]
 * - Distractor patterns: [B=fails y<x, C/D=fail x<22]
 * - Constraints: [Must satisfy y < x AND x < 22]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table in question content]
 */

export const generator_ecca0603 = {
  metadata: {
    // id: "ecca0603",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: y < x and x < 22, with x values 19,20,21 and y=x-1
    // Generate similar upper bound and pattern
    const xBound = getRandomInt(15, 30); // Upper bound for x
    const baseX = xBound - getRandomInt(2, 5); // Starting x value
    
    // STEP 2: Generate table data
    // Correct table (A pattern): x values ascending, y = x - 1
    const x1 = baseX;
    const x2 = baseX + 1;
    const x3 = baseX + 2;
    const yA1 = x1 - 1;
    const yA2 = x2 - 1;
    const yA3 = x3 - 1;
    
    // Table B pattern: y > x (fails y < x)
    const yB1 = x1 + 1;
    const yB2 = x2 + 2;
    const yB3 = x3 + 3;
    
    // Table C pattern: x > bound (fails x < bound)
    const xC1 = xBound + 1;
    const xC2 = xBound + 2;
    const xC3 = xBound + 3;
    const yC1 = xC1 - 1;
    const yC2 = xC2 - 1;
    const yC3 = xC3 - 1;
    
    // Table D pattern: both wrong
    const xD1 = xBound + 1;
    const xD2 = xBound + 2;
    const xD3 = xBound + 3;
    const yD1 = xD1 + 1;
    const yD2 = xD2 + 2;
    const yD3 = xD3 + 3;
    
    // STEP 3: Build table HTML strings
    const tableA = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yA1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yA2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yA3}</td></tr></tbody></table>`;
    
    const tableB = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yB1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yB2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yB3}</td></tr></tbody></table>`;
    
    const tableC = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${xC1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yC1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${xC2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yC2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${xC3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yC3}</td></tr></tbody></table>`;
    
    const tableD = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${xD1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yD1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${xD2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yD2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${xD3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yD3}</td></tr></tbody></table>`;
    
    // STEP 4: Create options with tracking
    const optionsData = [
      { text: `Table A\n${tableA}`, isCorrect: true },
      { text: `Table B\n${tableB}`, isCorrect: false },
      { text: `Table C\n${tableC}`, isCorrect: false },
      { text: `Table D\n${tableD}`, isCorrect: false }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    
    // STEP 6: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. For the correct choice, all x-values (${x1}, ${x2}, ${x3}) are less than ${xBound}. Also, for each pair, $y < x$ (${yA1} < ${x1}, ${yA2} < ${x2}, ${yA3} < ${x3}). The other tables either fail $y < x$ or fail $x < ${xBound}$.`;
    
    // STEP 7: Return question data
    return {
      questionText: `For which of the following tables are all the values of $x$ and their corresponding values of $y$ solutions to the given system of inequalities? $y < x$ and $x < ${xBound}`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `Table ${correctOption.letter}`,
      explanation: explanation
    };
  }
};
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

// File: generators/LinearInequalitiesInOneOrTwoVariables/6cb9bf45.ts