import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 420
 * FIXED:
 * - Replaced Mafs line segments with standard SVG rectangles for bars.
 * - Added proper X-axis labels ("Group 1", etc.) positioned to avoid clipping.
 * - Uses "currentColor" for theme adaptability.
 * - Generated multiple choice options (including distractors based on other bars).
 */

export const generator_420 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Data
    // The three bar values are answer choices, and their ranges overlap, so
    // draw until they are distinct (bounded so the render can never hang).
    let val1 = getRandomInt(25, 40);
    let val2 = getRandomInt(40, 55);
    let val3 = getRandomInt(50, 65);
    let tries = 0;
    while (
      new Set([val1, val2, val3]).size !== 3 &&
      tries++ < 50
    ) {
      val1 = getRandomInt(25, 40);
      val2 = getRandomInt(40, 55);
      val3 = getRandomInt(50, 65);
    }

    const data = [
      { label: "Group 1", val: val1 },
      { label: "Group 2", val: val2 },
      { label: "Group 3", val: val3 }
    ];

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
        <text x="${margin.left - 30}" y="${margin.top - 20}" text-anchor="start" font-size="12" font-weight="bold" fill="currentColor" style="font-family: sans-serif; opacity: 0.7;">Books Collected</text>
      </svg>
    `;

    // 6. Generate Options
    // The question used to ask about Group 1 every time, with the answer plus
    // 10 as a "misread" choice even though every bar shows its value. Now a
    // group is chosen at random; the choices are the three bar values and the
    // total (at least 115, so it never matches a bar).
    const target = data[getRandomInt(0, 2)];
    const total = val1 + val2 + val3;
    const optionsData = [
      ...data.map(d => ({
        text: d.val.toString(),
        isCorrect: d === target,
        reason: d === target ? '' : `${d.val} is the number of books collected by ${d.label}, not ${target.label}`
      })),
      { text: total.toString(), isCorrect: false, reason: `${total} is the total number of books collected by all three groups` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The bar graph shows the number of books collected by each of three groups for a book drive. How many books were collected by ${target.label}?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: target.val.toString(),
      explanation: `Choice ${correctOption.letter} is correct. In the bar graph, the bar for ${target.label} has a height of ${target.val} on the vertical axis, so ${target.label} collected ${target.val} books. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};