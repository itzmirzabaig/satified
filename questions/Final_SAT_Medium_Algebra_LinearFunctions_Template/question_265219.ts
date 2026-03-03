import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 265219
 * 
 * FIXES:
 * - Handled long decimals by converting to fractions.
 * - Used styled HTML table.
 * - Logic: P(t) = P_start + slope * t.
 */
export const generator_265219 = {
  metadata: {
    id: "265219",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup
    // Start year: 1995-2005
    const startYear = getRandomInt(1995, 2005);
    // Years later: 8-12
    const yearsLater = getRandomInt(8, 12);
    const midYear = startYear + yearsLater;
    
    // Population values
    const startPop = getRandomInt(800, 900);
    // Ensure midPop is less than startPop (decreasing)
    const popDrop = getRandomInt(10, 50);
    const midPop = startPop - popDrop;
    
    // Calculate slope = (mid - start) / years
    const slopeVal = (midPop - startPop) / yearsLater;
    
    // Helper to format slope as fraction if decimal is messy
    const formatSlope = (val: number): { str: string; isNegative: boolean } => {
      // Check if integer or simple decimal
      if (Number.isInteger(val)) {
        return { str: Math.abs(val).toString(), isNegative: val < 0 };
      }
      if (Math.abs(val * 10 - Math.round(val * 10)) < 0.001) {
        return { str: Math.abs(val).toFixed(1), isNegative: val < 0 };
      }
      
      // Convert to fraction
      const num = Math.abs(midPop - startPop);
      const den = yearsLater;
      
      // GCD using while loop (no recursion)
      const gcd = (a: number, b: number): number => {
        let num1 = a;
        let num2 = b;
        while (num2 !== 0) {
          const temp = num2;
          num2 = num1 % num2;
          num1 = temp;
        }
        return num1;
      };
      
      const common = gcd(num, den);
      const simpNum = num / common;
      const simpDen = den / common;
      return { str: `\\frac{${simpNum}}{${simpDen}}`, isNegative: val < 0 };
    };

    const slopeInfo = formatSlope(slopeVal);
    // Build equation: "800 - 5/3 t" (space around minus, no double negative)
    const sign = slopeInfo.isNegative ? '-' : '+';
    const correctEq = `P(t) = ${startPop} ${sign} ${slopeInfo.str}t`;
    
    // Distractors
    // D1: Wrong magnitude (multiply by 10)
    const wrongSlopeInfo = formatSlope(slopeVal * 10);
    const d1Sign = wrongSlopeInfo.isNegative ? '-' : '+';
    const d1 = `P(t) = ${startPop} ${d1Sign} ${wrongSlopeInfo.str}t`;
    
    // D2: Wrong sign (positive slope)
    const d2 = `P(t) = ${startPop} + ${slopeInfo.str}t`;
    
    // D3: Wrong variable shift
    const d3Sign = slopeInfo.isNegative ? '-' : '+';
    const d3 = `P(t) = ${startPop} ${d3Sign} ${slopeInfo.str}(t - ${startYear})`;

    const optionsData = [
      { text: `$${correctEq}$`, isCorrect: true },
      { text: `$${d1}$`, isCorrect: false },
      { text: `$${d2}$`, isCorrect: false },
      { text: `$${d3}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // Table HTML with proper styling
    const tableHTML = `
      <table style="border-collapse: collapse; margin: 20px auto; border: 1px solid currentColor; font-family: sans-serif; min-width:200px; background: transparent;">
        <thead>
          <tr>
            <th style="border: 1px solid currentColor; padding: 8px; background: transparent;">Year</th>
            <th style="border: 1px solid currentColor; padding: 8px; background: transparent;">Population</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${startYear}</td>
            <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${startPop}</td>
          </tr>
          <tr>
            <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${midYear}</td>
            <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${midPop}</td>
          </tr>
        </tbody>
      </table>
    `;

    // Build slope string for explanation (with sign)
    const expSlopeStr = slopeInfo.isNegative ? `-${slopeInfo.str}` : slopeInfo.str;

    return {
      questionText: `The table above shows the population of Greenleaf, Idaho, for the years ${startYear} and ${midYear}. If the relationship between population and year is linear, which of the following functions $P$ models the population of Greenleaf $t$ years after ${startYear}?
      
${tableHTML}`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Identify Points:**
    $t$ is years after ${startYear}.
    At $t=0$, Population = ${startPop}. (y-intercept)
    At $t=${yearsLater}$ ($= ${midYear} - ${startYear}$), Population = ${midPop}.

2.  **Calculate Slope:**
    Slope $m = \\frac{\\text{Change in Population}}{\\text{Change in Time}} = \\frac{${midPop} - ${startPop}}{${yearsLater}} = ${expSlopeStr}$.

3.  **Form Equation:**
    $P(t) = \\text{Initial Value} + \\text{Slope} \\cdot t$
    $P(t) = ${startPop} ${sign} ${slopeInfo.str}t$.`
    };
  }
};