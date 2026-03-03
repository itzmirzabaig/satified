import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: d62ad380
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [s: 3,6,9, P: 8,18,28, slope: 10/3, intercept: -2]
 * - Difficulty factors: [Finding linear equation from table data]
 * - Distractor patterns: [A: wrong slope, B: wrong intercept, D: inverted slope]
 * - Constraints: [Clean fraction slope]
 * - Question type: [Table+Figure→Multiple Choice Text]
 * - Figure generation: [SVG plot with points]
 */

export const generator_d62ad380 = {
  metadata: {
    // id: "d62ad380",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate linear relationship with fraction slope
    // Use slope = a/b where b divides the x-spacing (which is 3)
    const b = getRandomElement([1, 3]); // 1 gives integer slope, 3 gives fraction like 10/3
    const a = getRandomInt(2, 10);
    const slope = a / b;
    const intercept = getRandomInt(-5, 5);
    
    const sVals = [3, 6, 9];
    const pVals = sVals.map(s => slope * s + intercept);
    
    // Ensure clean integer values for P
    let attempts = 0;
    let validSlope = slope;
    let validIntercept = intercept;
    let validPVals = pVals;
    let validA = a;
    let validB = b;
    
    while (!validPVals.every(p => Number.isInteger(p)) && attempts < 100) {
      const newB = getRandomElement([1, 3]);
      const newA = getRandomInt(2, 10);
      validSlope = newA / newB;
      validIntercept = getRandomInt(-5, 5);
      validPVals = sVals.map(s => validSlope * s + validIntercept);
      validA = newA;
      validB = newB;
      attempts++;
    }
    
    // STEP 2: Build SVG code with plotted points
    const maxP = Math.max(...validPVals);
    const minP = Math.min(...validPVals);
    const yPadding = 5;
    const ymax = Math.max(0, maxP) + yPadding;
    const ymin = Math.min(0, minP) - yPadding;
    
    const xmin = 0;
    const xmax = 12;
    const W = 400;
    const H = 300;
    const P = 45;
    
    const mx = (x: number) => P + (x - xmin) / (xmax - xmin) * (W - 2 * P);
    const my = (y: number) => H - P - (y - ymin) / (ymax - ymin) * (H - 2 * P);
    
    // Generate axis ticks
    let xTicks = '';
    const xstep = 3;
    for (let x = 0; x <= xmax; x += xstep) {
      xTicks += `<line x1="${mx(x)}" y1="${my(0)}" x2="${mx(x)}" y2="${my(0) + 4}" stroke="currentColor" stroke-width="1"/>`;
      xTicks += `<text x="${mx(x)}" y="${my(0) + 15}" text-anchor="middle" font-size="10" fill="currentColor">${x}</text>`;
    }
    
    let yTicks = '';
    const ystep = Math.ceil((ymax - ymin) / 6);
    for (let y = Math.ceil(ymin / ystep) * ystep; y <= ymax; y += ystep) {
      if (y === 0) continue;
      yTicks += `<line x1="${mx(0) - 4}" y1="${my(y)}" x2="${mx(0)}" y2="${my(y)}" stroke="currentColor" stroke-width="1"/>`;
      yTicks += `<text x="${mx(0) - 8}" y="${my(y) + 3}" text-anchor="end" font-size="10" fill="currentColor">${y}</text>`;
    }
    
    // Plot the three data points
    const points = sVals.map((s, i) => [s, validPVals[i]] as [number, number]);
    const pointCircles = points.map(([s, p]) => 
      `<circle cx="${mx(s)}" cy="${my(p)}" r="4" fill="currentColor" stroke="currentColor" stroke-width="2"/>`
    ).join('');
    
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;">
  <svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;color:inherit;" xmlns="http://www.w3.org/2000/svg">
    <!-- Border -->
    <rect x="${P}" y="${P}" width="${W - 2 * P}" height="${H - 2 * P}" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>
    <!-- X axis -->
    <line x1="${P}" y1="${my(0)}" x2="${W - P}" y2="${my(0)}" stroke="currentColor" stroke-width="1.5"/>
    <!-- Y axis -->
    <line x1="${mx(0)}" y1="${P}" x2="${mx(0)}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>
    <!-- X tick labels -->
    ${xTicks}
    <!-- Y tick labels -->
    ${yTicks}
    <!-- Data points -->
    ${pointCircles}
  </svg>
</div>`;
    
    // STEP 3: Build table HTML with proper styling
    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto; text-align: center; background: transparent;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Side length, $s$ (inches)</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Price, $P$ (dollars)</th>
    </tr>
  </thead>
  <tbody>
    ${sVals.map((s, i) => `<tr>
      <td style="border: 1px solid currentColor; padding: 8px;">${s}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${validPVals[i]}</td>
    </tr>`).join('')}
  </tbody>
</table>`;
    
    // STEP 4: Create options
    const wrongIntercept1 = Math.round(validPVals[0]);
    const wrongSlope2 = validB / validA; // inverted
    
    // Build slope string safely
    let slopeStr: string;
    if (Number.isInteger(validSlope)) {
      slopeStr = validSlope.toString();
    } else {
      slopeStr = `\\frac{${validA}}{${validB}}`;
    }
    
    const optionsData = [
      { text: `$P=${Math.round(validSlope)}s+${validIntercept + 12}$`, isCorrect: false },
      { text: `$P=${slopeStr}s+${wrongIntercept1}$`, isCorrect: false },
      { text: `$P=${slopeStr}s${validIntercept < 0 ? '-' : '+'}${Math.abs(validIntercept)}$`, isCorrect: true },
      { text: `$P=\\frac{${validB}}{${validA}}s${validIntercept < 0 ? '-' : '+'}${Math.abs(validIntercept) + 2}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    // Calculate values for explanation
    const deltaP = validPVals[1] - validPVals[0];
    const deltaS = sVals[1] - sVals[0];
    
    return {
      questionText: `An artist paints and sells square tiles. The selling price $P$, in dollars, of a painted tile is a linear function of the side length of the tile $s$, in inches, as shown in the table below. Which equation could represent this relationship?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. The slope is $\\frac{${validPVals[1]}-${validPVals[0]}}{${sVals[1]}-${sVals[0]}} = \\frac{${deltaP}}{${deltaS}} = ${slopeStr}$. Using point $(${sVals[0]}, ${validPVals[0]})$: $${validPVals[0]} = ${slopeStr}(${sVals[0]}) + b \\implies b = ${validIntercept}$. Equation: $P = ${slopeStr}s ${validIntercept < 0 ? '-' : '+'} ${Math.abs(validIntercept)}$.`
    };
  }
};