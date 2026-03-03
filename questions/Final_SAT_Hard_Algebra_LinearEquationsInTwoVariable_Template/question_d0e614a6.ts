import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: d0e614a6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractions: 3/5, 3/4, result: 7]
 * - Difficulty factors: [Matching table to linear equation with fractions]
 * - Distractor patterns: [A, B, C, D table options]
 * - Constraints: [Must verify all three points satisfy equation]
 * - Question type: [Text → Multiple Choice with Table options]
 * - Figure generation: [NONE - tables only in options]
 */

export const generator_d0e614a6 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values - ensure clean fractions
    // Use values that will produce integer y values for integer x inputs
    const num1 = getRandomInt(1, 4);
    const den1 = getRandomInt(2, 5);
    const num2 = getRandomInt(1, 4);
    const den2 = getRandomInt(2, 5);
    const rhs = getRandomInt(5, 10);
    
    // Pre-calculate valid points to ensure we have enough
    const validPoints: {x: number, y: number}[] = [];
    
    // Try x values 0 through 10 to find points with integer y values
    for (let x = 0; x <= 10; x++) {
      // y = (den2/num2) * (rhs - (num1/den1)*x)
      const yVal = (den2 / num2) * (rhs - (num1 / den1) * x);
      
      // Check if y is a clean number (integer or simple fraction)
      if (Number.isInteger(yVal)) {
        validPoints.push({ x, y: yVal });
      }
    }
    
    // Ensure we have at least 4 valid points
    if (validPoints.length < 4) {
      // Fallback: use simpler coefficients that guarantee integer points
      return generator_d0e614a6.generate();
    }
    
    // Select 3 points for correct table (spaced out)
    const selected = [validPoints[0], validPoints[1], validPoints[2]];
    
    // Helper to format y value as simple string (no LaTeX in tables)
    const formatY = (y: number): string => {
      if (Number.isInteger(y)) return y.toString();
      // Convert to fraction string manually
      const sign = y < 0 ? '-' : '';
      const absY = Math.abs(y);
      // Check if it's a simple fraction like 1/2, 3/4, etc.
      const tolerance = 0.0001;
      for (let d = 2; d <= 12; d++) {
        const n = Math.round(absY * d);
        if (Math.abs(absY - n/d) < tolerance && n > 0) {
          return `${sign}${n}/${d}`;
        }
      }
      return absY.toFixed(2);
    };
    
    // Helper to build styled table HTML (borders only, no fill, NO LaTeX)
    const buildTable = (points: {x: number, y: number}[]) => {
      const rows = points.map(p => {
        const yStr = formatY(p.y);
        return `<tr><td style="border: 1px solid currentColor; padding: 8px 16px; text-align: center;">${p.x}</td><td style="border: 1px solid currentColor; padding: 8px 16px; text-align: center;">${yStr}</td></tr>`;
      }).join('');
      return `<table style="border-collapse: collapse; margin: 10px auto; text-align: center;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px 16px; font-weight: bold;">x</th><th style="border: 1px solid currentColor; padding: 8px 16px; font-weight: bold;">y</th></tr></thead><tbody>${rows}</tbody></table>`;
    };
    
    // Build tables
    const tableCorrect = buildTable(selected);
    
    // Build distractors with modified y values
    const distractor1 = selected.map(p => ({x: p.x, y: p.y + getRandomInt(1, 3)}));
    const distractor2 = selected.map(p => ({x: p.x, y: p.y * 2}));
    const distractor3 = selected.map(p => ({x: p.x + 1, y: p.y}));
    
    const tableA = buildTable(distractor1);
    const tableB = buildTable(distractor2);
    const tableC = buildTable(distractor3);
    
    // Create options array
    const optionsData = [
      { letter: 'A', table: tableA, isCorrect: false },
      { letter: 'B', table: tableB, isCorrect: false },
      { letter: 'C', table: tableC, isCorrect: false },
      { letter: 'D', table: tableCorrect, isCorrect: true }
    ];
    
    const shuffled = shuffle(optionsData);
    
    const correctOption = shuffled.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffled.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `$\\frac{${num1}}{${den1}}x + \\frac{${num2}}{${den2}}y = ${rhs}$ Which table gives three values of $x$ and their corresponding values of $y$ for the given equation?`,
      figureCode: null,
      options: shuffled.map(o => `${o.letter}. ${o.table}`),
      correctAnswer: `${correctOption.letter}. ${correctOption.table}`,
      explanation: `Choice ${correctOption.letter} is correct. Solving for $y$: $y = \\frac{${den2}}{${num2}}(${rhs} - \\frac{${num1}}{${den1}}x)$. Substituting the x-values from the correct table gives the corresponding y-values. Choice ${incorrectOptions[0].letter} is incorrect as the y-values do not satisfy the equation. Choice ${incorrectOptions[1].letter} is incorrect as the y-values do not satisfy the equation. Choice ${incorrectOptions[2].letter} is incorrect as the y-values do not satisfy the equation.`
    };
  }
};