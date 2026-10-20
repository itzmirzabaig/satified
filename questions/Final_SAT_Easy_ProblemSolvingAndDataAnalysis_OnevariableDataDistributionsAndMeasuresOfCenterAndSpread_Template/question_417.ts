import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 417
 * FIXED:
 * - Replaced Mafs bar chart with a robust SVG bar graph.
 * - Labels "Gift A", "Gift B", etc. are clearly positioned below the axis.
 * - Uses "currentColor" for theme adaptability.
 * - Randomizes the target category (A, B, C, or D) for better variety.
 */

export const generator_417 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Data
    // The four bars have different heights, so the choices can be the four
    // bar values; the old code filled any gap with the answer plus or minus 2.
    let freqA = 3, freqB = 8, freqC = 15, freqD = 10;
    do {
      freqA = getRandomInt(3, 8);
      freqB = getRandomInt(8, 14);
      freqC = getRandomInt(15, 22);
      freqD = getRandomInt(10, 18);
    } while (new Set([freqA, freqB, freqC, freqD]).size < 4);

    const data = [
      { label: "Gift A", val: freqA },
      { label: "Gift B", val: freqB },
      { label: "Gift C", val: freqC },
      { label: "Gift D", val: freqD }
    ];

    // Select a random target to ask about (instead of always Gift C)
    const targetIndex = getRandomInt(0, 3);
    const targetItem = data[targetIndex];

    // 2. Setup SVG Dimensions
    const width = 500;
    const height = 350;
    const margin = { top: 40, bottom: 60, left: 50, right: 20 };
    
    const plotHeight = height - margin.top - margin.bottom;
    const plotWidth = width - margin.left - margin.right;
    
    // Scale Y-Axis
    const maxVal = Math.max(...data.map(d => d.val));
    // Round up to nearest 5 + 5 for headroom
    const yMax = Math.ceil(maxVal / 5) * 5 + 5; 
    
    const getY = (v: number) => margin.top + plotHeight - (v / yMax) * plotHeight;

    // 3. Generate Grid Lines & Y-Axis Labels
    const gridLines = [];
    const step = 5;
    for (let v = 0; v <= yMax; v += step) {
      const y = getY(v);
      gridLines.push(`
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.2" stroke-width="1" />
        <text x="${margin.left - 10}" y="${y + 5}" text-anchor="end" font-size="12" fill="currentColor" style="font-family: sans-serif; opacity: 0.8;">${v}</text>
      `);
    }

    // 4. Generate Bars & X-Axis Labels
    const barWidth = 60;
    const totalBarSpace = data.length * barWidth;
    const totalSpacing = plotWidth - totalBarSpace;
    const spacing = totalSpacing / (data.length + 1); 

    const bars = data.map((d, i) => {
      const x = margin.left + spacing + i * (barWidth + spacing);
      const y = getY(d.val);
      const h = getY(0) - y;
      
      // Position text below the axis
      const labelY = height - margin.bottom + 20;

      return `
        <!-- Bar: Blue 500 -->
        <rect x="${x}" y="${y}" width="${barWidth}" height="${h}" fill="#3b82f6" fill-opacity="0.9" />
        
        <!-- Value Label (Top) -->
        <text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor" style="font-family: sans-serif">${d.val}</text>
        
        <!-- Category Label (Bottom) -->
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
        <text x="${margin.left - 30}" y="${margin.top - 20}" text-anchor="start" font-size="12" font-weight="bold" fill="currentColor" style="font-family: sans-serif; opacity: 0.7;">Number of Volunteers</text>
      </svg>
    `;

    // 6. Generate Options: the four bar values (all different).
    const optionsData = data.map(d => ({
      text: d.val.toString(),
      isCorrect: d.label === targetItem.label,
      reason: d.label === targetItem.label ? '' : `${d.val} is the number of volunteers who chose ${d.label}, not ${targetItem.label}`
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The bar graph shows the number of volunteers who chose each of four gifts. How many volunteers chose ${targetItem.label}?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: targetItem.val.toString(),
      explanation: `Choice ${correctOption.letter} is correct. In the bar graph, the bar for ${targetItem.label} has a height of ${targetItem.val} on the vertical axis, so ${targetItem.val} volunteers chose ${targetItem.label}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};