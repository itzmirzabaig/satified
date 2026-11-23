import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 527
 * FIXED:
 * - SVG is 280 tall with a 60 bottom margin, enough for the x axis numbers
 *   and title without clipping or a large empty band.
 */

export const generator_527 = {
  metadata: {
    id: "527",
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
    // Trimmed the oversized empty band under the x axis (was a 130 bottom
    // margin); the plot area keeps the same 200 height.
    const height = 280;
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    
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
      const labelY = margin.top + chartHeight + 22;
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
    const xTitleY = margin.top + chartHeight + 48;

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
    // Before: the explanation contained raw line breaks and a numbered list,
    // and when a = 1 one choice printed as "1x^{2}". Coefficients of 1 are now
    // dropped and the explanation is plain sentences.
    const coef = (n: number) => (n === 1 ? '' : `${n}`);
    const lead = `y=${coef(a)}x^{2}`;
    const termB = b >= 0 ? `+${b}x` : `${b}x`;
    const wrongBVal = -b;
    const termWrongB = wrongBVal >= 0 ? `+${wrongBVal}x` : `${wrongBVal}x`;

    // Correct: y = ax^2 + bx + c
    const optCorrect = `${lead}${termB}+${c}`;
    // Constant term with the wrong sign
    const optWrongInt = `${lead}${termB}-${c}`;
    // x term with the wrong sign, which moves the vertex to x = -h
    const optWrongVertex = `${lead}${termWrongB}+${c}`;
    // Vertex coordinates dropped straight into standard form
    const optWrongShape = `${lead}-${h}x+${k}`;

    const optionsData = [
      { text: `$${optWrongInt}$`, isCorrect: false, reason: `the constant term of $${optWrongInt}$ is $-${c}$, so its graph would cross the y-axis at $y=-${c}$, but the data cross the y-axis near the positive value $y=${c}$` },
      { text: `$${optCorrect}$`, isCorrect: true, reason: '' },
      { text: `$${optWrongVertex}$`, isCorrect: false, reason: `the x term of $${optWrongVertex}$ has the wrong sign, so its axis of symmetry is $x=-${h}$, placing the lowest point to the left of the y-axis instead of near $x=${h}$` },
      { text: `$${optWrongShape}$`, isCorrect: false, reason: `$${optWrongShape}$ uses the coordinates of the lowest point, ${h} and ${k}, directly as coefficients; its graph would cross the y-axis at $y=${k}$, not near $y=${c}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "Of the following, which is the best model for the data in the scatterplot?",
      figureCode: `<div style="width:100%;max-width:460px;margin:0 auto;">${svgContent}</div>`,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The data form a parabola that opens upward, with its lowest point near $(${h}, ${k})$ and a y-intercept near $y=${c}$. The constant term of $${optCorrect}$ is ${c}, which matches the y-intercept. Its axis of symmetry is $x=-\\frac{${b}}{2(${a})}=${h}$, which matches the x-coordinate of the lowest point, and substituting $x=${h}$ gives $y=${a === 1 ? '' : `${a}`}(${h})^{2}${b < 0 ? '-' : '+'}${Math.abs(b)}(${h})+${c}=${k}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
