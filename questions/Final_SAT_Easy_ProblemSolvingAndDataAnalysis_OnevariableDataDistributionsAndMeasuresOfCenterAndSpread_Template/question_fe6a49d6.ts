import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: fe6a49d6
 * FIXED:
 * - Applied exact SVG styling from reference generator.
 * - Used HTML attributes (kebab-case) instead of JSX props inside string templates.
 * - Added proper "currentColor" theming and layout logic.
 * - Adjusted Y-axis scaling for small integer frequencies (0-10 range).
 */

export const generator_fe6a49d6 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Data
    const targetCount = getRandomInt(76, 80); // The "X" value (e.g., 78)
    const freqTarget = getRandomInt(5, 9);    // The answer (Height of bar at X)
    
    const freq1 = getRandomInt(1, 4);
    const freq2 = getRandomInt(2, 5);
    const freq3 = getRandomInt(3, 6);

    // Map data to objects for the loop
    // X-axis: Number of walnuts (e.g., 75, 76, 77, 78)
    // Y-axis: Frequency
    const chartData = [
      { label: (targetCount - 3).toString(), val: freq1 },
      { label: (targetCount - 2).toString(), val: freq2 },
      { label: (targetCount - 1).toString(), val: freq3 },
      { label: targetCount.toString(), val: freqTarget }
    ];

    const totalContainers = chartData.reduce((sum, d) => sum + d.val, 0);

    // 2. Setup SVG Dimensions (Matches Reference)
    const width = 500;
    const height = 350;
    const margin = { top: 40, bottom: 60, left: 50, right: 20 };
    
    const plotHeight = height - margin.top - margin.bottom;
    const plotWidth = width - margin.left - margin.right;
    
    // Scale Y-Axis
    // Unlike the reference (which handles large numbers), frequencies are small (0-10).
    // We set yMax to the next even number above the max value to keep the grid clean.
    const maxVal = Math.max(...chartData.map(d => d.val));
    const yMax = maxVal + (maxVal % 2 === 0 ? 2 : 1); 
    
    const getY = (v: number) => margin.top + plotHeight - (v / yMax) * plotHeight;

    // 3. Generate Grid Lines & Y-Axis Labels
    const gridLines = [];
    // Step by 1 for small frequencies, or 2 if max is large. Here max is ~9, so step by 1 is fine.
    const step = 1; 
    for (let v = 0; v <= yMax; v += step) {
      const y = getY(v);
      // Only draw text for even numbers if it gets too crowded, but for <10, all numbers are fine.
      // To match reference clean style, we'll draw lines for all, text for all.
      gridLines.push(`
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.2" stroke-width="1" />
        <text x="${margin.left - 10}" y="${y + 5}" text-anchor="end" font-size="12" fill="currentColor" style="font-family: sans-serif; opacity: 0.8;">${v}</text>
      `);
    }

    // 4. Generate Bars & X-Axis Labels
    const barWidth = 60;
    const totalBarSpace = chartData.length * barWidth;
    const totalSpacing = plotWidth - totalBarSpace;
    const spacing = totalSpacing / (chartData.length + 1); 

    const bars = chartData.map((d, i) => {
      const x = margin.left + spacing + i * (barWidth + spacing);
      const y = getY(d.val);
      const h = getY(0) - y;
      
      const labelY = height - margin.bottom + 20;

      return `
        <!-- Bar -->
        <rect x="${x}" y="${y}" width="${barWidth}" height="${h}" fill="#3b82f6" fill-opacity="0.9" />
        
        <!-- Value Label (Top of bar) -->
        <text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor" style="font-family: sans-serif">${d.val}</text>
        
        <!-- Category Label (Bottom Axis) -->
        <text x="${x + barWidth / 2}" y="${labelY}" text-anchor="middle" font-size="14" fill="currentColor" style="font-family: sans-serif">${d.label}</text>
      `;
    }).join('');

    // 5. Construct Final SVG String
    const figureCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; user-select: none; overflow: visible;">
        <!-- Grid -->
        ${gridLines.join('')}
        
        <!-- X Axis Line -->
        <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2" />
        
        <!-- Bars and Labels -->
        ${bars}
        
        <!-- Y Axis Title -->
        <text x="${margin.left - 30}" y="${margin.top - 20}" text-anchor="start" font-size="12" font-weight="bold" fill="currentColor" style="font-family: sans-serif; opacity: 0.7;">Frequency</text>
        
        <!-- X Axis Title -->
        <text x="${margin.left + plotWidth / 2}" y="${height - 10}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor" style="font-family: sans-serif; opacity: 0.7;">Number of Walnuts</text>
      </svg>
    `;

    // 6. Generate Options
    const optionsData = [
      { text: freq1.toString(), isCorrect: false },
      { text: freqTarget.toString(), isCorrect: true }, // The frequency (height)
      { text: targetCount.toString(), isCorrect: false }, // The value (x-axis label)
      { text: (freqTarget + targetCount).toString(), isCorrect: false } // Distractor
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The bar graph shows the frequency distribution of the number of walnuts in ${totalContainers} containers. How many of these containers contain exactly ${targetCount} walnuts?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To determine the number of containers with exactly ${targetCount} walnuts, find the label "${targetCount}" on the horizontal axis (Number of Walnuts). The height of the bar above ${targetCount} corresponds to ${freqTarget} on the vertical axis (Frequency).`
    };
  }
};