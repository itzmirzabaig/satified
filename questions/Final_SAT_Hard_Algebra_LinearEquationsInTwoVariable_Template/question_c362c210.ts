import { getRandomInt, getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c362c210
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In Two Variables
 * - Context: Budget constraint / Pricing.
 * - Logic: Total = Price_1 * Qty_1 + Price_2 * Qty_2.
 * - Graph: Line connecting (0, Max_Wallflowers) and (Max_Cornflowers, 0).
 * - Goal: Find Price_Cornflower given Total and the X-intercept.
 * - Fixes: Ensures integer intercepts, adds explicit axis labels to graph.
 */

export const generator_c362c210 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Prices
    // We work in cents to avoid floating point issues during LCM calculation
    const possiblePrices = [1.50, 2.00, 2.50, 3.00, 4.00, 5.00];
    const priceCornflower = getRandomElement(possiblePrices);
    let priceWallflower = getRandomElement(possiblePrices);
    
    // Ensure prices are different for visual variety (slope != -1 usually)
    while (priceWallflower === priceCornflower) {
        priceWallflower = getRandomElement(possiblePrices);
    }

    const cC = Math.round(priceCornflower * 100);
    const cW = Math.round(priceWallflower * 100);

    // 2. Calculate Total to ensure Integer Intercepts
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const lcm = (a: number, b: number) => (a * b) / gcd(a, b);
    
    const baseLCM = lcm(cC, cW);
    
    // Scale total to be a realistic amount (e.g., $60 - $150)
    const minTargetCents = 6000; 
    const scaleFactor = Math.ceil(minTargetCents / baseLCM) + getRandomInt(0, 3);
    
    const totalCents = baseLCM * scaleFactor;
    const totalDollars = totalCents / 100;

    // 3. Calculate Intercepts
    // X-axis: Cornflowers
    const xInt = totalCents / cC; 
    // Y-axis: Wallflowers
    const yInt = totalCents / cW;

    // 4. Build SVG Graph
    const width = 400;
    const height = 350;
    const margin = { top: 20, right: 40, bottom: 60, left: 70 };
    
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    const xMax = xInt + Math.ceil(xInt * 0.2);
    const yMax = yInt + Math.ceil(yInt * 0.2);

    const scaleX = (x: number) => margin.left + (x / xMax) * plotWidth;
    const scaleY = (y: number) => margin.top + plotHeight - (y / yMax) * plotHeight;

    // Grid & Axes
    let svgContent = '';
    
    // Y-Axis Grid & Labels
    for (let i = 0; i <= yMax; i += Math.ceil(yMax/5)) {
        const yPos = scaleY(i);
        svgContent += `<line x1="${margin.left}" y1="${yPos}" x2="${width - margin.right}" y2="${yPos}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />`;
        if (i > 0) {
            svgContent += `<text x="${margin.left - 10}" y="${yPos + 5}" text-anchor="end" font-size="12" fill="currentColor">${i}</text>`;
        }
    }
    
    // X-Axis Grid & Labels
    for (let i = 0; i <= xMax; i += Math.ceil(xMax/5)) {
        const xPos = scaleX(i);
        svgContent += `<line x1="${xPos}" y1="${margin.top}" x2="${xPos}" y2="${margin.top + plotHeight}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />`;
        if (i > 0) {
            svgContent += `<text x="${xPos}" y="${margin.top + plotHeight + 20}" text-anchor="middle" font-size="12" fill="currentColor">${i}</text>`;
        }
    }

    // Main Axes
    svgContent += `
        <line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${width - margin.right}" y2="${margin.top + plotHeight}" stroke="currentColor" stroke-width="2" />
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotHeight}" stroke="currentColor" stroke-width="2" />
        <text x="${margin.left - 10}" y="${margin.top + plotHeight + 5}" text-anchor="end" font-size="12" fill="currentColor">0</text>
    `;

    // Axis Titles
    svgContent += `
        <text x="${width / 2}" y="${height - 15}" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">Number of Cornflowers</text>
        <text transform="rotate(-90)" x="${-height / 2}" y="${20}" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">Number of Wallflowers</text>
    `;

    // The Line
    svgContent += `<line x1="${scaleX(0)}" y1="${scaleY(yInt)}" x2="${scaleX(xInt)}" y2="${scaleY(0)}" stroke="currentColor" stroke-width="3" />`;

    // Intercept Points & Labels
    svgContent += `
        <circle cx="${scaleX(0)}" cy="${scaleY(yInt)}" r="5" fill="currentColor" />
        <text x="${scaleX(0) + 15}" y="${scaleY(yInt) + 5}" font-size="12" fill="currentColor" font-weight="bold">(0, ${yInt})</text>
        
        <circle cx="${scaleX(xInt)}" cy="${scaleY(0)}" r="5" fill="currentColor" />
        <text x="${scaleX(xInt)}" y="${scaleY(0) - 15}" text-anchor="middle" font-size="12" fill="currentColor" font-weight="bold">(${xInt}, 0)</text>
    `;

    const finalFigure = `
      <div style="width: 100%; max-width: 500px; margin: 0 auto;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; color: inherit;">
          ${svgContent}
        </svg>
      </div>
    `;

    // 5. Explanation & Return
    return {
      questionText: `The graph shown models the possible combinations of cornflowers and wallflowers that can be purchased for exactly $${totalDollars.toFixed(2)}. What is the price, in dollars, of 1 cornflower?`,
      figureCode: finalFigure,
      options: null, // Fill-in-the-blank
      correctAnswer: priceCornflower.toFixed(2),
      explanation: `
        The x-axis represents the "Number of Cornflowers".
        <br/>
        The x-intercept is the point $(${xInt}, 0)$. This point represents a scenario where only cornflowers are purchased, and zero wallflowers are purchased.
        <br/>
        At this point:
        <ul>
            <li>Number of Cornflowers = ${xInt}</li>
            <li>Total Cost = $${totalDollars.toFixed(2)}</li>
        </ul>
        <br/>
        To find the price of one cornflower, divide the total cost by the number of cornflowers:
        $$ \\text{Price} = \\frac{\\text{Total Cost}}{\\text{Quantity}} = \\frac{${totalDollars.toFixed(2)}}{${xInt}} = ${priceCornflower.toFixed(2)} $$
        <br/>
        Therefore, the price of 1 cornflower is $${priceCornflower.toFixed(2)}.
      `
    };
  }
};