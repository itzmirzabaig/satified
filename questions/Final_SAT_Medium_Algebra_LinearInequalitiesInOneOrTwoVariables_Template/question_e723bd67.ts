import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e723bd67
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 2, constant: 883 (three-digit), x values: 440-442]
 * - Difficulty factors: [Table verification, inequality testing with negative y values]
 * - Distractor patterns: [Tables where some points satisfy but not all]
 * - Constraints: [Must satisfy 2x - y > 883 for ALL table entries]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table in question content]
 */

export const generator_e723bd67 = {
  metadata: {
    // id: "e723bd67",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original uses 2x - y > 883 with x around 440
    // Generate similar magnitude: ax - y > c where a is small, c is large
    const a = getRandomInt(2, 5); // Coefficient of x
    const baseX = getRandomInt(400, 500); // Base x value
    const constant = a * baseX - getRandomInt(1, 10); // Constant term (ensures valid range)
    
    // STEP 2: Generate x values and corresponding valid y values for each table
    const x1 = baseX;
    const x2 = baseX + 1;
    const x3 = baseX + 2;
    
    // For inequality ax - y > c, we need y < ax - c
    const threshold1 = a * x1 - constant;
    const threshold2 = a * x2 - constant;
    const threshold3 = a * x3 - constant;
    
    // Generate y values that satisfy the inequality for correct table (Table D pattern)
    // Pattern: decreasing y as x increases, all strictly less than threshold
    const yD1 = threshold1 - getRandomInt(1, 5); // Just below threshold
    const yD2 = threshold2 - getRandomInt(1, 5);
    const yD3 = threshold3 - getRandomInt(1, 5);
    
    // Table A pattern (increasing y - wrong)
    const yA1 = threshold1 - getRandomInt(1, 3);
    const yA2 = yA1 + getRandomInt(1, 3); // Increasing
    const yA3 = yA2 + getRandomInt(1, 3);
    
    // Table B pattern (mixed order)
    const yB1 = threshold1 - getRandomInt(1, 3);
    const yB2 = threshold3 - getRandomInt(1, 3);
    const yB3 = threshold2 - getRandomInt(1, 3);
    
    // Table C pattern (wrong assignment)
    const yC1 = threshold2 - getRandomInt(1, 3);
    const yC2 = threshold1 - getRandomInt(1, 3);
    const yC3 = threshold3 - getRandomInt(1, 3);
    
    // STEP 3: Build table HTML strings
    const tableA = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yA1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yA2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yA3}</td></tr></tbody></table>`;
    
    const tableB = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yB1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yB2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yB3}</td></tr></tbody></table>`;
    
    const tableC = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yC1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yC2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yC3}</td></tr></tbody></table>`;
    
    const tableD = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yD3}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yD2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yD1}</td></tr></tbody></table>`;
    
    // STEP 4: Create options with tracking
    const optionsData = [
      { text: `Table A\n${tableA}`, isCorrect: false },
      { text: `Table B\n${tableB}`, isCorrect: false },
      { text: `Table C\n${tableC}`, isCorrect: false },
      { text: `Table D\n${tableD}`, isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 6: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. Substituting ${x1} for x yields ${a * x1} - y > ${constant}, so y < ${threshold1}. Substituting ${x2} for x yields ${a * x2} - y > ${constant}, so y < ${threshold2}. Substituting ${x3} for x yields ${a * x3} - y > ${constant}, so y < ${threshold3}. In the correct table, when x=${x1}, y=${yD1} (which is <${threshold1}); when x=${x2}, y=${yD2} (which is <${threshold2}); when x=${x3}, y=${yD3} (which is <${threshold3}). All values satisfy the inequality.`;
    
    // STEP 7: Return question data
    return {
      questionText: `$$${a}x - y > ${constant}$$ For which of the following tables are all the values of $x$ and their corresponding values of $y$ solutions to the given inequality?`,
      figureCode: null, // Tables are in options, not main figure
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `Table ${correctOption.letter}`,
      explanation: explanation
    };
  }
};
/**
 * Question ID: 9e5863bd
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min rate: 0.6, max rate: 1.8 (single decimal)]
 * - Difficulty factors: [Range interpretation, compound inequality construction]
 * - Distractor patterns: [A=summed values, B=only max, C=wrong range direction]
 * - Constraints: [Must be compound inequality 0.6 ≤ s ≤ 1.8]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/LinearInequalitiesInOneOrTwoVariables/9e5863bd.ts