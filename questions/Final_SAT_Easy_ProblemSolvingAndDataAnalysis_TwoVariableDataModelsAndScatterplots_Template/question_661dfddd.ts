import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 661dfddd
 * FIXED:
 * - Significantly increased bottom margin to prevent x-axis labels from being cut off.
 * - simplified x-axis labels (0, 1, 2...) instead of (0, 1000, 2000...) for better readability.
 * - Explicitly calculated Y-positions to keep elements strictly inside the viewbox.
 */

export const generator_661dfddd = {
  metadata: {
    id: "661dfddd",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Realistic Data
    const startTemp = getRandomInt(60, 75); // Temp at sea level
    const lapseRate = getRandomInt(4, 7); 
    
    const dataPoints = [];
    const xMax = 5; // 5000 ft, represented as 5
    const xStep = 0.5; // Step by 500ft
    
    for (let x = 0; x <= xMax; x += xStep) {
      // Linear trend + random noise
      const noise = getRandomInt(-3, 3);
      const y = startTemp - (lapseRate * x) + noise;
      dataPoints.push({ x, y });
    }

    // 2. SVG Configuration
    const width = 450;
    const height = 320; // Enough height to fit everything
    const margin = { top: 30, right: 30, bottom: 80, left: 60 }; // Large bottom margin for labels
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Scales
    const yMax = 80;
    const yMin = 20;
    
    const getX = (val: number) => margin.left + (val / xMax) * chartWidth;
    const getY = (val: number) => margin.top + chartHeight - ((val - yMin) / (yMax - yMin)) * chartHeight;

    // 3. Generate SVG Elements
    
    // Grid Lines (Y-Axis)
    const gridLines = [];
    for (let v = 20; v <= 80; v += 10) {
      const y = getY(v);
      gridLines.push(`
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <text x="${margin.left - 10}" y="${y + 4}" text-anchor="end" font-size="12" fill="currentColor">${v}°</text>
      `);
    }

    // Grid Lines (X-Axis)
    // We plot 0, 1, 2, 3, 4, 5
    for (let v = 0; v <= xMax; v += 1) {
      const x = getX(v);
      // Axis Line ends at: margin.top + chartHeight
      // Text starts 20px below that
      const labelY = margin.top + chartHeight + 20;
      
      gridLines.push(`
        <line x1="${x}" y1="${margin.top}" x2="${x}" y2="${margin.top + chartHeight}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <text x="${x}" y="${labelY}" text-anchor="middle" font-size="12" fill="currentColor">${v}</text>
      `);
    }

    // Trend Line
    const x1 = 0;
    const y1 = startTemp;
    const x2 = xMax;
    const y2 = startTemp - (lapseRate * xMax);
    
    const trendLine = `
      <line 
        x1="${getX(x1)}" y1="${getY(y1)}" 
        x2="${getX(x2)}" y2="${getY(y2)}" 
        stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,5" opacity="0.7"
      />
    `;

    // Data Points
    const points = dataPoints.map(d => 
      `<circle cx="${getX(d.x)}" cy="${getY(d.y)}" r="4" fill="#3b82f6" stroke="currentColor" stroke-width="1" />`
    ).join('');

    const svgContent = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; overflow: visible;">
        <!-- Grid -->
        ${gridLines.join('')}
        
        <!-- Axes Main Lines -->
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + chartHeight}" stroke="currentColor" stroke-width="2"/>
        <line x1="${margin.left}" y1="${margin.top + chartHeight}" x2="${width - margin.right}" y2="${margin.top + chartHeight}" stroke="currentColor" stroke-width="2"/>
        
        <!-- Graph Data -->
        ${trendLine}
        ${points}
        
        <!-- Labels -->
        <text transform="rotate(-90, ${20}, ${height/2 - 20})" x="${20}" y="${height/2 - 20}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Temperature (°F)</text>
        
        <!-- X Label (Positioned 50px below the axis line) -->
        <text x="${margin.left + chartWidth/2}" y="${margin.top + chartHeight + 50}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Elevation (thousands of ft)</text>
      </svg>
    `;

    // 4. Options
    const optionsData = [
      { text: "As the elevation increases, the temperature tends to increase.", isCorrect: false },
      { text: "As the elevation increases, the temperature tends to decrease.", isCorrect: true },
      { text: "As the elevation decreases, the temperature tends to decrease.", isCorrect: false },
      { text: "There is no association between the elevation and the temperature.", isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "The scatterplot above shows the relationship between elevation and temperature for various locations. Which statement best describes the association between elevation and temperature?",
      figureCode: svgContent,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The scatterplot shows a downward trend: as values on the horizontal axis (Elevation) move to the right (increase), the values on the vertical axis (Temperature) move down (decrease). This indicates a negative association.`
    };
  }
};