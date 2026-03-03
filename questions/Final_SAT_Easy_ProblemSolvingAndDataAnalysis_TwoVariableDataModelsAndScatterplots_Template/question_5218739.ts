import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 5218739
 * FIXED:
 * - Fixed Type Error: Removed unsafe addition of potential 'undefined' in loop.
 * - Simplified logic: Generates data points linearly in one pass.
 * - ensures graph structure is monotonic (increasing) to prevent visual confusion.
 */

export const generator_5218739 = {
  metadata: {
    id: "5218739",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Setup Intervals and Labels
    // We strictly define the intervals we care about for the options
    const intervalDefinitions = [
      { label: "2003–2004", startYear: 2003, endYear: 2004, isGap: false },
      { label: "2004–2008", startYear: 2004, endYear: 2008, isGap: true }, // Gap year, not an option usually
      { label: "2008–2009", startYear: 2008, endYear: 2009, isGap: false },
      { label: "2009–2010", startYear: 2009, endYear: 2010, isGap: false },
      { label: "2010–2011", startYear: 2010, endYear: 2011, isGap: false }
    ];

    // Select which valid interval (not the gap) will have the Max Change
    const validOptionIndices = [0, 2, 3, 4]; // Indices in intervalDefinitions
    const winningIndex = validOptionIndices[getRandomInt(0, validOptionIndices.length - 1)];
    
    const maxChangeVal = getRandomInt(15, 25); // Large jump
    const standardChangeVal = getRandomInt(2, 5); // Small jump

    // 2. Generate Data Points
    let currentCount = getRandomInt(3, 8); // Initial value
    const dataPoints = [{ year: 2003, count: currentCount }];

    const optionsMap: Record<string, number> = {};

    intervalDefinitions.forEach((interval, idx) => {
      // Determine how much to add
      let addAmount = 0;
      
      if (interval.isGap) {
        // For the 4-year gap, add a random chunk so graph keeps going up
        addAmount = getRandomInt(8, 12); 
      } else if (idx === winningIndex) {
        addAmount = maxChangeVal;
      } else {
        addAmount = standardChangeVal;
      }

      currentCount += addAmount;
      dataPoints.push({ year: interval.endYear, count: currentCount });

      // Store the change value for options if it's not a gap
      if (!interval.isGap) {
        optionsMap[interval.label] = addAmount;
      }
    });

    const winningLabel = intervalDefinitions[winningIndex].label;

    // 3. SVG Configuration
    const width = 450;
    const height = 250;
    const margin = { top: 30, right: 30, bottom: 50, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const minYear = 2003;
    const maxYear = 2011;
    const maxCount = Math.max(...dataPoints.map(d => d.count));
    const yMax = Math.ceil(maxCount / 10) * 10 + 5; // Round up to nearest 10, plus padding

    const getX = (year: number) => margin.left + ((year - minYear) / (maxYear - minYear)) * chartWidth;
    const getY = (count: number) => margin.top + chartHeight - (count / yMax) * chartHeight;

    // 4. Generate SVG Elements
    
    // Grid Lines (every 10 units)
    const gridLines = [];
    for (let v = 0; v <= yMax; v += 10) {
      const y = getY(v);
      gridLines.push(`
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <text x="${margin.left - 10}" y="${y + 4}" text-anchor="end" font-size="12" fill="currentColor">${v}</text>
      `);
    }

    // Path Logic
    let pathD = `M ${getX(dataPoints[0].year)} ${getY(dataPoints[0].count)}`;
    dataPoints.forEach((d, i) => {
      if (i === 0) return;
      pathD += ` L ${getX(d.year)} ${getY(d.count)}`;
    });

    // Data Points
    const circles = dataPoints.map(d => 
      `<circle cx="${getX(d.year)}" cy="${getY(d.count)}" r="4" fill="#3b82f6" stroke="white" stroke-width="2" />`
    ).join('');

    // X-Axis Labels (Only show years present in data)
    const xLabels = dataPoints.map(d => 
      `<text x="${getX(d.year)}" y="${height - 15}" text-anchor="middle" font-size="11" fill="currentColor">${d.year}</text>`
    ).join('');

    const svgContent = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; user-select: none;">
        <!-- Grid -->
        ${gridLines.join('')}
        
        <!-- Axes -->
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
        <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
        
        <!-- Line Path -->
        <path d="${pathD}" fill="none" stroke="#3b82f6" stroke-width="2" />
        
        <!-- Points -->
        ${circles}
        
        <!-- X Labels -->
        ${xLabels}
        
        <!-- Axis Titles -->
        <text transform="rotate(-90, ${15}, ${height/2})" x="${15}" y="${height/2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Number of Movies</text>
        <text x="${margin.left + chartWidth/2}" y="${height - 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Year</text>
      </svg>
    `;

    // 5. Options
    // We only create options for the valid 1-year intervals (exclude the gap 2004-2008)
    const optionsList = intervalDefinitions
      .filter(i => !i.isGap)
      .map(i => ({
        text: i.label,
        isCorrect: i.label === winningLabel,
        value: optionsMap[i.label]
      }));

    const shuffledOptions = shuffle(optionsList).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "The line graph above shows the number of 3-D movies released for several years. Between which two consecutive years listed was there the greatest change in the number of 3-D movies released?",
      figureCode: svgContent,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To determine the greatest change, find the steepest segment of the graph between consecutive years. The change between ${correctOption.text} is ${correctOption.value} movies, which is the largest increase shown among the options.`
    };
  }
};