import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1086
 * 
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Nonlinear Functions
 * - Visual: Parabola y = ax² + bx + c
 * - Logic: Calculate bc.
 * - Changes: Converted to SVG, removed explicit dots for vertex/intercept.
 */

export const generator_1086 = {
  metadata: {
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Math Generation (Exact same logic as original)
    // y = a(x-h)² + k  =>  y = ax² - 2ahx + (ah² + k)
    // b = -2ah, c = ah² + k
    
    const a = getRandomInt(1, 4);
    const h = -getRandomInt(1, 4);  // Vertex x is negative
    const k = -getRandomInt(4, 12); // Vertex y is negative
    
    const b = -2 * a * h;
    const c = a * h * h + k;
    const bc = b * c;

    // Render the leading coefficient cleanly: "x^2" when a===1, else "ax^2".
    const aCoef = a === 1 ? '' : `${a}`;
    // Render the constant term with a proper leading sign (avoid "+ -7").
    const cTerm = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
    
    // 2. SVG Configuration
    // We replicate the dynamic viewbox logic from the original Mafs code
    // to ensure the curve is framed similarly.
    const xMin = h - 5;
    const xMax = h + 5; // Ensures we cross the y-axis (since h is negative, h+5 > 0)
    
    // Calculate Y extremes based on X window
    const yAtMinX = a * Math.pow(xMin - h, 2) + k;
    const yAtMaxX = a * Math.pow(xMax - h, 2) + k;
    
    const yMin = k - 5; // A bit below the vertex
    const yMax = Math.max(yAtMinX, yAtMaxX, c) + 2; // A bit above the highest point shown

    const width = 400;
    const height = 400;
    const margin = 20;

    const plotWidth = width - 2 * margin;
    const plotHeight = height - 2 * margin;

    // Scaling functions
    const scaleX = (val: number) => margin + ((val - xMin) / (xMax - xMin)) * plotWidth;
    const scaleY = (val: number) => margin + plotHeight - ((val - yMin) / (yMax - yMin)) * plotHeight;

    // 3. Generate SVG Elements

    // Grid Lines
    let grid = '';
    
    // Vertical Grid (Integers)
    const xStart = Math.ceil(xMin);
    const xEnd = Math.floor(xMax);
    for (let x = xStart; x <= xEnd; x++) {
        const xPos = scaleX(x);
        const isAxis = x === 0;
        const opacity = isAxis ? "0.8" : "0.15";
        const w = isAxis ? "2" : "1";
        grid += `<line x1="${xPos}" y1="${margin}" x2="${xPos}" y2="${height - margin}" stroke="currentColor" stroke-opacity="${opacity}" stroke-width="${w}" />`;
        
        // Axis Label
        if (x % 2 === 0 && x !== 0) {
           grid += `<text x="${xPos}" y="${scaleY(0) + 15}" text-anchor="middle" font-family="sans-serif" font-size="10" fill="currentColor" opacity="0.6">${x}</text>`;
        }
    }

    // Horizontal Grid (Integers)
    const yStart = Math.ceil(yMin);
    const yEnd = Math.floor(yMax);
    // Determine step size to avoid clutter if range is huge
    const yStep = (yMax - yMin) > 20 ? 5 : 2; 

    for (let y = yStart; y <= yEnd; y += 1) {
        const yPos = scaleY(y);
        const isAxis = y === 0;
        
        // Draw all lines, but vary opacity
        const opacity = isAxis ? "0.8" : (y % yStep === 0 ? "0.15" : "0.05");
        const w = isAxis ? "2" : "1";
        
        if (y % yStep === 0 || isAxis) {
            grid += `<line x1="${margin}" y1="${yPos}" x2="${width - margin}" y2="${yPos}" stroke="currentColor" stroke-opacity="${opacity}" stroke-width="${w}" />`;
            
            // Label
            if (y !== 0 && y % yStep === 0) {
                 grid += `<text x="${scaleX(0) - 5}" y="${yPos + 4}" text-anchor="end" font-family="sans-serif" font-size="10" fill="currentColor" opacity="0.6">${y}</text>`;
            }
        }
    }

    // Parabola Path
    const points: string[] = [];
    const step = 0.1;
    for (let x = xMin; x <= xMax; x += step) {
        const y = a * Math.pow(x - h, 2) + k;
        points.push(`${scaleX(x)},${scaleY(y)}`);
    }
    const pathData = points.join(' ');

    // Key points the student reads off the graph: the vertex (h, k) and the
    // y-intercept (0, c). Both are marked with a dot AND an explicit coordinate
    // label so their values are unambiguous regardless of gridline spacing.
    const vx = scaleX(h);
    const vy = scaleY(k);
    const iy = scaleY(c);
    const markers = `
        <circle cx="${vx}" cy="${vy}" r="4.5" fill="#3b82f6" stroke="white" stroke-width="1.5" />
        <text x="${vx + 8}" y="${vy + 16}" text-anchor="start" font-family="sans-serif" font-size="12" fill="#3b82f6" font-weight="bold">(${h}, ${k})</text>
        <circle cx="${scaleX(0)}" cy="${iy}" r="4.5" fill="#3b82f6" stroke="white" stroke-width="1.5" />
        <text x="${scaleX(0) + 8}" y="${iy + 4}" text-anchor="start" font-family="sans-serif" font-size="12" fill="#3b82f6" font-weight="bold">(0, ${c})</text>`;

    const svgContent = `
      <div style="width: 100%; max-width: 400px; margin: 0 auto; color: inherit;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block;">
            ${grid}
            <polyline points="${pathData}" fill="none" stroke="currentColor" stroke-width="2.5" />
            ${markers}
        </svg>
      </div>
    `;
    
    return {
      questionText: `The graph of $y=${aCoef}x^{2}+bx+c$ is shown, where $b$ and $c$ are constants. What is the value of $bc$?`,
      figureCode: svgContent,
      options: [],
      correctAnswer: bc.toString(),
      explanation: `From the graph, the vertex is at $(${h}, ${k})$ and the y-intercept is at $(0, ${c})$.
      <br/>
      With leading coefficient $a=${a}$, use the vertex form $y = a(x-h)^2 + k$:
      $$y = ${a}(x - (${h}))^2 + (${k})$$
      $$y = ${a}(x + ${Math.abs(h)})^2 - ${Math.abs(k)}$$
      $$y = ${a}(x^2 + ${2 * Math.abs(h)}x + ${h*h}) - ${Math.abs(k)}$$
      $$y = ${aCoef}x^2 + ${b}x ${cTerm}$$
      <br/>
      Comparing this to $y = ax^2 + bx + c$ gives $b = ${b}$ and $c = ${c}$ (which matches the y-intercept read from the graph).
      <br/>
      Therefore, $bc = (${b})(${c}) = ${bc}$.`
    };
  }
};