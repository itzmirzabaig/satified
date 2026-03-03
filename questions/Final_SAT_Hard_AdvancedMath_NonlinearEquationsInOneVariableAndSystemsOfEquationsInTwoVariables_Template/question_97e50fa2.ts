import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 97e50fa2
 * 
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Nonlinear Equations (System)
 * - Visual: Parabola f(x) shown. g(x) described but NOT shown.
 * - Math: f(x) = -0.5(x-4)^2 + k, g(x) = -x + k.
 * - Intersection: -0.5(x-4)^2 + k = -x + k => (x-4)^2 = 2x => x^2 - 10x + 16 = 0 => x=2, 8.
 */

export const generator_97e50fa2 = {
  metadata: {
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Math Configuration
    // We randomize 'k' (vertical shift) to add variety.
    // The intersection x-values remain constant (2 and 8) because k cancels out.
    const k = getRandomInt(8, 14); 
    const h = 4;
    const a = 0.5;

    // 2. SVG Configuration
    const width = 400;
    const height = 400;
    const margin = 40;
    
    // Graph bounds
    const xMin = -2, xMax = 10;
    const yMin = -2, yMax = k + 2;
    
    const plotWidth = width - 2 * margin;
    const plotHeight = height - 2 * margin;

    // Scaling functions
    const scaleX = (x: number) => margin + ((x - xMin) / (xMax - xMin)) * plotWidth;
    const scaleY = (y: number) => margin + plotHeight - ((y - yMin) / (yMax - yMin)) * plotHeight;

    // 3. Generate SVG Elements
    
    // Grid and Axes
    let grid = '';
    
    // Vertical grid lines (every 1 unit)
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
        const xPos = scaleX(x);
        const opacity = x === 0 ? "0.8" : "0.15"; // Y-axis darker
        const strokeWidth = x === 0 ? "2" : "1";
        grid += `<line x1="${xPos}" y1="${margin}" x2="${xPos}" y2="${height - margin}" stroke="currentColor" stroke-opacity="${opacity}" stroke-width="${strokeWidth}" />`;
        
        // Label major ticks
        if (x % 2 === 0 && x !== 0) {
             grid += `<text x="${xPos}" y="${scaleY(0) + 15}" text-anchor="middle" font-family="sans-serif" font-size="12" fill="currentColor" opacity="0.7">${x}</text>`;
        }
    }

    // Horizontal grid lines (every 2 units)
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += 2) {
        const yPos = scaleY(y);
        const opacity = y === 0 ? "0.8" : "0.15"; // X-axis darker
        const strokeWidth = y === 0 ? "2" : "1";
        grid += `<line x1="${margin}" y1="${yPos}" x2="${width - margin}" y2="${yPos}" stroke="currentColor" stroke-opacity="${opacity}" stroke-width="${strokeWidth}" />`;
        
        // Label
        if (y !== 0) {
             grid += `<text x="${scaleX(0) - 8}" y="${yPos + 4}" text-anchor="end" font-family="sans-serif" font-size="12" fill="currentColor" opacity="0.7">${y}</text>`;
        }
    }

    // Parabola Path Definition
    // f(x) = -0.5(x-4)^2 + k
    const points: string[] = [];
    const step = 0.1;
    for (let x = xMin; x <= xMax; x += step) {
        const y = -a * Math.pow(x - h, 2) + k;
        if (y >= yMin - 5) { // Only plot if within reasonable view
             points.push(`${scaleX(x)},${scaleY(y)}`);
        }
    }
    const pathData = points.join(' ');
    
    // Vertex Point
    const vertexX = scaleX(h);
    const vertexY = scaleY(k);

    const svgContent = `
      <div style="width: 100%; max-width: 400px; margin: 0 auto; color: inherit;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block;">
            <!-- Grid & Axes -->
            ${grid}
            
            <!-- Parabola f(x) -->
            <polyline points="${pathData}" fill="none" stroke="currentColor" stroke-width="2.5" />
            
            <!-- Vertex Point -->
            <circle cx="${vertexX}" cy="${vertexY}" r="4" fill="currentColor" />
        </svg>
      </div>
    `;

    // 4. Question Text & Explanation
    return {
      questionText: `The graph of the function $f$, defined by $f(x)=-\\frac{1}{2}(x-4)^{2}+${k}$, is shown in the xy-plane above. If the function $g$ (not shown) is defined by $g(x)=-x+${k}$, what is one possible value of $a$ such that $f(a)=g(a)$?`,
      figureCode: svgContent,
      options: null, // Fill in the blank
      correctAnswer: "2, 8",
      explanation: `
      To find the values where $f(a) = g(a)$, we set the equations equal to each other:
      $$-\\frac{1}{2}(a-4)^{2}+${k} = -a+${k}$$
      Subtract ${k} from both sides:
      $$-\\frac{1}{2}(a-4)^{2} = -a$$
      Multiply both sides by -2:
      $$(a-4)^{2} = 2a$$
      Expand the squared term:
      $$a^2 - 8a + 16 = 2a$$
      Rearrange into standard quadratic form ($ax^2+bx+c=0$):
      $$a^2 - 10a + 16 = 0$$
      Factor the quadratic:
      $$(a-2)(a-8) = 0$$
      $$a=2 \\text{ or } a=8$$
      `
    };
  }
};