import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 82aaa0a1
 * FIXED:
 * - Set SVG height to 500px (very tall) to prevent clipping.
 * - Set Bottom Margin to 130px to create a massive safe zone for labels.
 * - Positioned X-axis numbers and titles well within the visible boundary.
 */

export const generator_82aaa0a1 = {
  metadata: {
    id: "82aaa0a1",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Quadratic Parameters
    // Equation: y = a(x - h)^2 + k
    const a = getRandomInt(1, 2); 
    const h = getRandomInt(2, 4);
    const k = getRandomInt(5, 12);
    
    // Standard Form coefficients: y = ax^2 + bx + c
    const b = -2 * a * h;
    const c = a * h * h + k;

    // Generate Scatter Points (x=0 to x=6)
    const points: {x: number, y: number}[] = [];
    const xMax = 7;
    
    for (let x = 0; x <= 6; x += 0.5) {
      const exactY = a * Math.pow(x - h, 2) + k;
      const noise = getRandomInt(-2, 2);
      points.push({ x, y: Math.max(0, exactY + noise) });
    }

    // 2. SVG Configuration
    const width = 450;
    const height = 350  ; // Drastically increased height
    const margin = { top: 20, right: 30, bottom: 130, left: 60 }; // Huge bottom margin
    
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Determine Y scale
    const maxYVal = Math.max(...points.map(p => p.y));
    const yMax = Math.ceil((maxYVal + 5) / 10) * 10; 

    const getX = (val: number) => margin.left + (val / xMax) * chartWidth;
    const getY = (val: number) => margin.top + chartHeight - (val / yMax) * chartHeight;

    // 3. Generate SVG Elements

    // Grid Lines & Labels
    const gridLines = [];

    // Y-Axis
    for (let v = 0; v <= yMax; v += 10) {
      const y = getY(v);
      gridLines.push(`
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <text x="${margin.left - 15}" y="${y + 5}" text-anchor="end" font-size="12" fill="currentColor">${v}</text>
      `);
    }

    // X-Axis
    for (let v = 0; v <= xMax; v += 1) {
      const x = getX(v);
      // Labels positioned 30px below axis line (well within the 130px margin)
      const labelY = margin.top + chartHeight + 30;
      gridLines.push(`
        <line x1="${x}" y1="${margin.top}" x2="${x}" y2="${margin.top + chartHeight}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <text x="${x}" y="${labelY}" text-anchor="middle" font-size="12" fill="currentColor">${v}</text>
      `);
    }

    // Scatter Points
    const circles = points.map(p => 
      `<circle cx="${getX(p.x)}" cy="${getY(p.y)}" r="4" fill="#3b82f6" stroke="currentColor" stroke-width="1" />`
    ).join('');

    // Axis Titles Positions
    // Y Title: centered vertically
    // X Title: positioned 80px below the graph (still has 50px buffer before bottom edge)
    const xTitleY = margin.top + chartHeight + 80;

    const svgContent = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; overflow: visible;">
        <!-- Axes -->
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + chartHeight}" stroke="currentColor" stroke-width="2"/>
        <line x1="${margin.left}" y1="${margin.top + chartHeight}" x2="${width - margin.right}" y2="${margin.top + chartHeight}" stroke="currentColor" stroke-width="2"/>
        
        <!-- Grid & Numbers -->
        ${gridLines.join('')}
        
        <!-- Data -->
        ${circles}
        
        <!-- Y Axis Title -->
        <text transform="rotate(-90, ${20}, ${height/2})" x="${20}" y="${height/2}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">y</text>
        
        <!-- X Axis Title -->
        <text x="${margin.left + chartWidth/2}" y="${xTitleY}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">x</text>
      </svg>
    `;

    // 4. Generate Options
    const termB = b >= 0 ? `+${b}x` : `${b}x`;
    
    // Correct: y = ax^2 + bx + c
    const optCorrect = `y=${a}x^{2}${termB}+${c}`;
    
    // Distractor 1: Wrong intercept sign (y = ax^2 + bx - c)
    const optWrongInt = `y=${a}x^{2}${termB}-${c}`;
    
    // Distractor 2: Wrong Vertex Direction/Sign
    const wrongBVal = -b;
    const termWrongB = wrongBVal >= 0 ? `+${wrongBVal}x` : `${wrongBVal}x`;
    const optWrongVertex = `y=${a}x^{2}${termWrongB}+${c}`;

    // Distractor 3: Linear/Wrong form
    const optWrongShape = `y=${a}x^{2}-${h}x+${k}`;

    const optionsData = [
      { text: `$${optWrongInt}$`, isCorrect: false },
      { text: `$${optCorrect}$`, isCorrect: true },
      { text: `$${optWrongVertex}$`, isCorrect: false },
      { text: `$${optWrongShape}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "Of the following, which is the best model for the data in the scatterplot?",
      figureCode: svgContent,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The scatterplot shows data that forms an upward-opening parabola. 
      The data suggests a y-intercept (where $x=0$) near $y=${c}$ and a vertex (lowest point) around $x=${h}$.
      
      Looking at the correct equation $${correctOption.text}$:
      1. The constant term is $+${c}$, matching the y-intercept.
      2. The axis of symmetry for $y=ax^2+bx+c$ is $x = -b/(2a)$. Here, $x = -(${b}) / (2 \\cdot ${a}) = ${h}$, which matches the vertex x-coordinate.
      
      Choice ${incorrectOptions[0].letter} is incorrect because the y-intercept is negative. 
      Choices ${incorrectOptions[1].letter} and ${incorrectOptions[2].letter} do not align with the vertex or intercepts shown in the graph.`
    };
  }
};