import { getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 5c24c861
 * FIXED:
 * - Radically increased SVG height (400px) and bottom margin (100px).
 * - This guarantees X-axis numbers and titles are NOT cut off.
 * - Added 'overflow: visible' style to SVG.
 */

export const generator_5c24c861 = {
  metadata: {
    id: "5c24c861",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Define Scenarios
    const scenarios = [
      { speed: 50, k: 0.08, dist: 200 },        
      { speed: 60, k: 0.05, dist: 180 },        
      { speed: 40, k: 0.1, dist: 160 },         
      { speed: 70, k: 0.06, dist: 294 }         
    ];

    const scenario = getRandomElement(scenarios);
    const { speed, k, dist } = scenario;

    // 2. SVG Configuration
    // WIDE margins to prevent clipping
    const width = 450;
    const height = 400; 
    const margin = { top: 40, right: 40, bottom: 100, left: 80 }; 
    
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Scales
    const xMax = 80;
    const yMax = 350;

    // Helper functions
    const getX = (val: number) => margin.left + (val / xMax) * chartWidth;
    const getY = (val: number) => margin.top + chartHeight - (val / yMax) * chartHeight;

    // 3. Generate SVG Elements

    // Grid Lines
    const gridLines = [];
    
    // Y-Axis (Distance)
    for (let v = 0; v <= yMax; v += 50) {
      const y = getY(v);
      gridLines.push(`
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <text x="${margin.left - 15}" y="${y + 5}" text-anchor="end" font-size="12" fill="currentColor">${v}</text>
      `);
    }

    // X-Axis (Speed)
    for (let v = 0; v <= xMax; v += 10) {
      const x = getX(v);
      // Position numbers 25px below the axis line
      const labelY = margin.top + chartHeight + 25;
      gridLines.push(`
        <line x1="${x}" y1="${margin.top}" x2="${x}" y2="${margin.top + chartHeight}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <text x="${x}" y="${labelY}" text-anchor="middle" font-size="12" fill="currentColor">${v}</text>
      `);
    }

    // Quadratic Curve
    const curvePoints = [];
    for (let x = 0; x <= xMax; x += 2) {
      const y = k * x * x;
      if (y <= yMax) {
        curvePoints.push(`${getX(x)},${getY(y)}`);
      }
    }
    const curvePath = curvePoints.join(" ");

    // Guide Lines (Red Dashed)
    const targetX = getX(speed);
    const targetY = getY(dist);
    const guideLines = `
      <line x1="${targetX}" y1="${getY(0)}" x2="${targetX}" y2="${targetY}" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,4" />
      <line x1="${margin.left}" y1="${targetY}" x2="${targetX}" y2="${targetY}" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,4" />
      <circle cx="${targetX}" cy="${targetY}" r="6" fill="#ef4444" />
    `;

    // Title Positions
    const xTitleY = height - 20; // 20px from the very bottom
    const yTitleX = 25; // 25px from the left edge

    const svgContent = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; overflow: visible;">
        <!-- Axes Lines -->
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + chartHeight}" stroke="currentColor" stroke-width="2"/>
        <line x1="${margin.left}" y1="${margin.top + chartHeight}" x2="${width - margin.right}" y2="${margin.top + chartHeight}" stroke="currentColor" stroke-width="2"/>
        
        <!-- Grid & Labels -->
        ${gridLines.join('')}

        <!-- Curve -->
        <polyline points="${curvePath}" fill="none" stroke="#3b82f6" stroke-width="3" />
        
        <!-- Target -->
        ${guideLines}
        
        <!-- Y-Axis Title -->
        <text transform="rotate(-90, ${yTitleX}, ${height/2})" x="${yTitleX}" y="${height/2}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Stopping Distance (ft)</text>
        
        <!-- X-Axis Title -->
        <text x="${margin.left + chartWidth/2}" y="${xTitleY}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Speed (mph)</text>
      </svg>
    `;

    // 4. Options
    const optionsData = [
      { text: `${Math.round(dist * 0.5)}`, isCorrect: false },
      { text: `${Math.round(dist * 0.75)}`, isCorrect: false },
      { text: `${dist}`, isCorrect: true },
      { text: `${Math.round(dist * 1.25)}`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The graph above shows the braking distance for a car at various speeds. According to the model, which is the best estimate for stopping distance at ${speed} mph?`,
      figureCode: svgContent,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To find the stopping distance at ${speed} mph, locate ${speed} on the horizontal axis (Speed). Follow the dashed vertical line up to the curve, and then follow the dashed horizontal line to the left to read the value on the vertical axis (Stopping Distance). The value corresponds to ${dist} feet.`
    };
  }
};