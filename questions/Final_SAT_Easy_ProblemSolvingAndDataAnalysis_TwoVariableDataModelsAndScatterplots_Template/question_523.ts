import { getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 523
 * FIXED:
 * - Radically increased SVG height (400px) and bottom margin (100px).
 * - This guarantees X-axis numbers and titles are NOT cut off.
 * - Added 'overflow: visible' style to SVG.
 */

export const generator_523 = {
  metadata: {
    id: "523",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Define Scenarios
    // Before: the four scenarios used different, unrealistic coefficients
    // (200 ft of braking at 50 mph). One realistic model, d = 0.05s^2
    // (about 180 ft at 60 mph), is now used for every speed.
    const k = 0.05;
    const speed = getRandomElement([40, 50, 60, 70]);
    const dist = Math.round(k * speed * speed);

    // 2. SVG Configuration
    // WIDE margins to prevent clipping
    const width = 450;
    // Trimmed the oversized empty band under the x axis (was 400 tall with a
    // 100 bottom margin).
    const height = 350;
    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    
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
    const xTitleY = height - 12;
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
        <text transform="rotate(-90, ${yTitleX}, ${height/2})" x="${yTitleX}" y="${height/2}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Stopping distance (ft)</text>
        
        <!-- X-Axis Title -->
        <text x="${margin.left + chartWidth/2}" y="${xTitleY}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Speed (mph)</text>
      </svg>
    `;

    // 4. Options
    // Before: the wrong choices were 0.5, 0.75 and 1.25 times the answer with
    // no reasons. Now each is a real misreading: the curve 10 mph too low,
    // 10 mph too high, or the speed itself read as the distance.
    const below = Math.round(k * (speed - 10) * (speed - 10));
    const above = Math.round(k * (speed + 10) * (speed + 10));
    const optionsData = [
      { text: `${dist}`, isCorrect: true, reason: '' },
      { text: `${below}`, isCorrect: false, reason: `${below} is the stopping distance at ${speed - 10} mph, not ${speed} mph` },
      { text: `${above}`, isCorrect: false, reason: `${above} is the stopping distance at ${speed + 10} mph, not ${speed} mph` },
      { text: `${speed}`, isCorrect: false, reason: `${speed} is the speed in miles per hour, not the stopping distance in feet` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The graph shows the stopping distance, in feet, of a car at various speeds, in miles per hour (mph), according to a model. According to the model, which of the following is the best estimate of the stopping distance, in feet, for a speed of ${speed} mph?`,
      figureCode: `<div style="width:100%;max-width:460px;margin:0 auto;">${svgContent}</div>`,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Locate ${speed} on the horizontal axis, follow the dashed vertical line up to the curve, and then follow the dashed horizontal line left to the vertical axis. The curve reaches a stopping distance of about ${dist} feet at ${speed} mph. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};