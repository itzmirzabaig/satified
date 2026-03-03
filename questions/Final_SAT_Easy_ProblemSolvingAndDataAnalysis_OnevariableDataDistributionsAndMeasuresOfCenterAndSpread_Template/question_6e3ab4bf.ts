import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 6e3ab4bf
 * FIXED:
 * - Replaced Mafs bar chart with a robust SVG bar graph.
 * - Labels "Gift A", "Gift B", etc. are clearly positioned below the axis.
 * - Uses "currentColor" for theme adaptability.
 * - Randomizes the target category (A, B, C, or D) for better variety.
 */

export const generator_6e3ab4bf = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Data
    const freqA = getRandomInt(3, 8);
    const freqB = getRandomInt(8, 14);
    const freqC = getRandomInt(15, 22);
    const freqD = getRandomInt(10, 18);

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

    // 6. Generate Options
    // Start with the correct answer
    const optionsData = [
      { text: targetItem.val.toString(), isCorrect: true },
    ];
    
    // Add other bar values as distractors
    data.forEach(d => {
      if (d.label !== targetItem.label) {
        // Prevent duplicate options if multiple bars have same height
        if (!optionsData.some(o => o.text === d.val.toString())) {
             optionsData.push({ text: d.val.toString(), isCorrect: false });
        }
      }
    });

    // Fill remaining spots if needed
    while (optionsData.length < 4) {
      const fakeVal = targetItem.val + getRandomInt(-2, 2);
      if (fakeVal > 0 && !optionsData.some(o => o.text === fakeVal.toString())) {
        optionsData.push({ text: fakeVal.toString(), isCorrect: false });
      }
    }

    const shuffledOptions = shuffle(optionsData).slice(0, 4).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The bar graph above shows the number of volunteers who chose different gifts. How many volunteers chose ${targetItem.label}?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: targetItem.val.toString(),
      explanation: `Choice ${correctOption.letter} is correct. According to the bar graph, the height of the bar for ${targetItem.label} corresponds to ${targetItem.val} on the vertical axis.`
    };
  }
};