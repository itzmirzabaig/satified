import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 80f1f3a9
 * FIXED:
 * - Replaced Mafs with robust SVG.
 * - Bars are colored to match their labels (Blue, Green, Red, Yellow).
 * - Randomizes which color corresponds to the target frequency (not always Green).
 * - Ensures clear visibility of labels and values in all themes.
 */

export const generator_80f1f3a9 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Data
    const targetFreq = getRandomInt(65, 75);
    
    // Define categories with their display colors
    const categories = [
      { name: "Blue", color: "#3b82f6" },   // Blue 500
      { name: "Green", color: "#22c55e" },  // Green 500
      { name: "Red", color: "#ef4444" },    // Red 500
      { name: "Yellow", color: "#eab308" }  // Yellow 500
    ];

    // Shuffle categories so the answer isn't always the same position/color
    // But we usually want them ordered on the graph? 
    // The prompt implies specific colors. Let's keep the order on graph fixed (Blue, Green, Red, Yellow) 
    // but randomize which one gets the target value.
    
    // Actually, let's keep the standard order "Blue, Green, Red, Yellow" on the X-axis 
    // but randomize the values assigned to them.
    const orderedCategories = ["Blue", "Green", "Red", "Yellow"];
    
    // Pick a random index to be the correct answer
    const correctIndex = getRandomInt(0, 3);
    const correctCategory = orderedCategories[correctIndex];

    // Assign values
    const data = orderedCategories.map((name, i) => {
      let val;
      if (i === correctIndex) {
        val = targetFreq;
      } else {
        // Generate random values distinct from targetFreq
        do {
          val = getRandomInt(10, 80);
        } while (val === targetFreq || Math.abs(val - targetFreq) < 5); // Ensure distinctness
      }
      
      // Match color code
      const colorObj = categories.find(c => c.name === name)!;
      
      return {
        label: name,
        val: val,
        color: colorObj.color
      };
    });

    // 2. Setup SVG Dimensions
    const width = 500;
    const height = 350;
    const margin = { top: 40, bottom: 60, left: 50, right: 20 };
    
    const plotHeight = height - margin.top - margin.bottom;
    const plotWidth = width - margin.left - margin.right;
    
    // Scale Y-Axis
    const maxVal = Math.max(...data.map(d => d.val));
    const yMax = Math.ceil(maxVal / 10) * 10 + 10;
    
    const getY = (v: number) => margin.top + plotHeight - (v / yMax) * plotHeight;

    // 3. Generate Grid Lines & Y-Axis Labels
    const gridLines = [];
    for (let v = 0; v <= yMax; v += 10) {
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
      
      const labelY = height - margin.bottom + 20;

      return `
        <!-- Bar with specific color -->
        <rect x="${x}" y="${y}" width="${barWidth}" height="${h}" fill="${d.color}" fill-opacity="0.9" />
        
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
        <text x="${margin.left - 30}" y="${margin.top - 20}" text-anchor="start" font-size="12" font-weight="bold" fill="currentColor" style="font-family: sans-serif; opacity: 0.7;">Frequency</text>
      </svg>
    `;

    // 6. Generate Options
    const optionsData = orderedCategories.map(name => ({
      text: name,
      isCorrect: name === correctCategory
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `A data set consists of ${data.reduce((a,b)=>a+b.val,0)} items. The bar graph shows the frequency of each color in the data set. Which color appears exactly ${targetFreq} times?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctCategory,
      explanation: `Choice ${correctOption.letter} is correct. Looking at the graph, find the value ${targetFreq} on the vertical axis (Frequency). The bar that reaches exactly this height corresponds to ${correctCategory} on the horizontal axis.`
    };
  }
};