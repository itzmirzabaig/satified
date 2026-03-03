import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 0231050d
 * 
 * FIXES:
 * - Replaced broken code with a proper SVG line graph.
 * - Logic: Plots snowfall data over years. 
 * - Task: Calculate percent decrease between two specific years (2003 and 2007).
 */

export const generator_0231050d = {
  metadata: {
    id: "0231050d",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Data
    // Start (2003): High value
    const val2003 = getRandomInt(40, 60);
    // End (2007): significantly lower to make percent decrease interesting
    const decreasePct = getRandomInt(40, 75); 
    const val2007 = Math.round(val2003 * (1 - decreasePct / 100));
    
    // Intermediate years (2004-2006) - random fluctuation generally trending down or random
    const val2004 = getRandomInt(val2007, val2003);
    const val2005 = getRandomInt(val2007 - 5, val2004 + 5);
    const val2006 = getRandomInt(val2007, val2005 + 5);
    
    // Other years (2008-2012) just for graph fullness
    const otherVals = Array.from({ length: 5 }, () => getRandomInt(5, 50));
    
    const dataPoints = [
      { year: 2003, val: val2003 },
      { year: 2004, val: val2004 },
      { year: 2005, val: val2005 },
      { year: 2006, val: val2006 },
      { year: 2007, val: val2007 },
      ...otherVals.map((v, i) => ({ year: 2008 + i, val: v }))
    ];

    // Calculate percent decrease
    // (Old - New) / Old * 100
    // Round to nearest whole number as per typical SAT integer answer format, 
    // though the question asks for value of p.
    const p = Math.round(((val2003 - val2007) / val2003) * 100);

    // 2. SVG Generation
    const width = 500;
    const height = 300;
    const padding = { left: 50, right: 30, top: 20, bottom: 50 };
    
    const xMin = 2002, xMax = 2013; // Pad years slightly
    const yMin = 0, yMax = Math.max(...dataPoints.map(d => d.val)) + 10;
    
    const mapX = (year: number) => padding.left + ((year - xMin) / (xMax - xMin)) * (width - padding.left - padding.right);
    const mapY = (val: number) => height - padding.bottom - ((val - yMin) / (yMax - yMin)) * (height - padding.top - padding.bottom);
    
    // Generate Path
    const pathD = "M " + dataPoints.map(d => `${mapX(d.year)} ${mapY(d.val)}`).join(" L ");
    
    // Generate Points
    const pointsSvg = dataPoints.map(d => 
      `<circle cx="${mapX(d.year)}" cy="${mapY(d.val)}" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5" />`
    ).join('');

    // Axis Ticks
    const xTicks = [];
    for (let y = 2003; y <= 2012; y++) {
      // Only show every other year if crowded, or all if space permits. 
      // With 10 points, every year is fine if rotated or abbreviated. 
      // Let's show '03, '04...
      const label = `'${y.toString().slice(2)}`;
      xTicks.push(`<text x="${mapX(y)}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="12" fill="currentColor">${label}</text>`);
      // Grid line
      xTicks.push(`<line x1="${mapX(y)}" y1="${height - padding.bottom}" x2="${mapX(y)}" y2="${height - padding.bottom + 5}" stroke="currentColor" />`);
    }

    const yTicks = [];
    for (let v = 0; v <= yMax; v += 10) {
      yTicks.push(`
        <line x1="${padding.left}" y1="${mapY(v)}" x2="${width - padding.right}" y2="${mapY(v)}" stroke="currentColor" stroke-opacity="0.1" />
        <text x="${padding.left - 10}" y="${mapY(v) + 4}" text-anchor="end" font-size="12" fill="currentColor">${v}</text>
      `);
    }

    const svgCode = `
      <div style="width: 100%; max-width: 500px; margin: 0 auto; font-family: sans-serif;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
          <!-- Axes -->
          <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="currentColor" stroke-width="2" />
          <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="currentColor" stroke-width="2" />
          
          <!-- Grid & Ticks -->
          <g>${xTicks.join('')}</g>
          <g>${yTicks.join('')}</g>
          
          <!-- Line Graph -->
          <path d="${pathD}" fill="none" stroke="#3b82f6" stroke-width="2" />
          ${pointsSvg}
          
          <!-- Axis Labels -->
          <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Year</text>
          <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" font-size="14" font-weight="bold" fill="currentColor">Snowfall (in)</text>
        </svg>
      </div>
    `;
    
    return {
      questionText: `The line graph shows the total amount of snow, in inches, recorded each year in Washington, DC, from 2003 to 2012. If $p$ is the percent decrease in the annual snowfall from 2003 to 2007, what is the value of $p$ (rounded to the nearest whole number)?`,
      figureCode: svgCode,
      options: null, // Fill-in-the-blank
      correctAnswer: p.toString(),
      explanation: `
1. **Identify Data Points:**
   From the graph:
   - In 2003, snowfall = ${val2003} inches.
   - In 2007, snowfall = ${val2007} inches.

2. **Calculate Percent Decrease:**
   Percent Decrease = $\\frac{\\text{Old Value} - \\text{New Value}}{\\text{Old Value}} \\times 100$
   $p = \\frac{${val2003} - ${val2007}}{${val2003}} \\times 100$
   $p = \\frac{${val2003 - val2007}}{${val2003}} \\times 100$
   $p \\approx ${p}$%`
    };
  }
};

/**
 * Question ID: 993000da
 * 
 * ANALYSIS:
 * - Context: Chained Percentages.
 * - Given: 
 *   - a is X% of b.
 *   - b is Y% of c.
 * - Find: a is what percent of c?
 * - Logic: 
 *   a = (X/100) * b
 *   b = (Y/100) * c
 *   a = (X/100) * (Y/100) * c
 *   Percentage = (X*Y)/100.
 */

export const generator_993000da = {
  metadata: {
    id: "993000da",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    const pct1 = getRandomInt(120, 250); // e.g. 230%
    const pct2 = getRandomInt(20, 80);   // e.g. 60%
    
    // a = (pct1/100) * b
    // b = (pct2/100) * c
    // a = (pct1/100) * (pct2/100) * c = (pct1 * pct2 / 10000) * c
    // Percent = (pct1 * pct2) / 100
    
    const finalPct = (pct1 * pct2) / 100;
    
    // Distractors
    const d1 = pct1 + pct2; // Addition error
    const d2 = pct1 - pct2; // Subtraction error
    const d3 = Math.round(finalPct / 10); // Decimal error

    const optionsData = [
      { text: `${finalPct}%`, isCorrect: true },
      { text: `${d1}%`, isCorrect: false },
      { text: `${d2}%`, isCorrect: false },
      { text: `${d3}%`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `If $a$ is ${pct1}% of $b$, and $b$ is ${pct2}% of $c$, then $a$ is what percent of $c$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1. **Translate statements to equations:**
   $a = \\frac{${pct1}}{100} b = ${pct1/100} b$
   $b = \\frac{${pct2}}{100} c = ${pct2/100} c$

2. **Substitute $b$ into the first equation:**
   $a = ${pct1/100} (${pct2/100} c)$
   $a = (${pct1/100} \\times ${pct2/100}) c$
   $a = ${(pct1 * pct2) / 10000} c$

3. **Convert to percentage:**
   To express as a percentage, multiply by 100:
   ${(pct1 * pct2) / 10000} \\times 100 = ${finalPct}%
   
   Therefore, $a$ is ${finalPct}% of $c$.`
    };
  }
};