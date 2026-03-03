import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 15d87c0f
 * FIXED:
 * - Reverted SVG height to 350 to ensure it fits within standard container constraints.
 * - Increased margin.bottom to 90px. This shrinks the internal plot height and moves the X-axis up,
 *   ensuring the labels are well within the visible area (approx 70px buffer) and not cut off.
 * - Adjusted label positioning to be slightly closer to the axis.
 */

export const generator_15d87c0f = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Data
    const chessCount = getRandomInt(30, 45);
    const dramaCount = chessCount + getRandomInt(8, 15);
    const roboticsCount = getRandomInt(40, 60);
    const yearbookCount = getRandomInt(25, 40);

    const data = [
      { label: "Chess", val: chessCount },
      { label: "Drama", val: dramaCount },
      { label: "Robotics", val: roboticsCount },
      { label: "Yearbook", val: yearbookCount }
    ];

    // 2. Setup SVG Dimensions
    const width = 500;
    // FIX: Keep height at 350 to prevent container clipping, but increase internal margins
    const height = 350; 
    
    // FIX: Increased bottom margin to 90 to pull the x-axis up and leave ample room for labels inside the viewbox
    const margin = { top: 40, bottom: 90, left: 60, right: 20 };
    
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
      
      // Calculate specific Y position for bottom labels
      // Axis is at height - margin.bottom. We place text 20px below that.
      // This results in Y ≈ 280 inside a 350px box, leaving ~70px buffer.
      const labelY = height - margin.bottom + 20;

      return `
        <!-- Bar: Blue 500 (#3b82f6) works well in both light and dark mode -->
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
      </svg>
    `;

    const difference = dramaCount - chessCount;

    const optionsData = [
      { text: difference.toString(), isCorrect: true },
      { text: chessCount.toString(), isCorrect: false },
      { text: dramaCount.toString(), isCorrect: false },
      { text: (chessCount + dramaCount).toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "How many more students are in drama than in chess?",
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: difference.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Based on the bar graph, there are ${dramaCount} students in drama and ${chessCount} in chess. The difference is ${dramaCount} - ${chessCount} = ${difference}.`
    };
  }
};