import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: d94018fd
 * 
 * ANALYSIS:
 * - Skill: Data Distributions (Standard Deviation)
 * - Issue Fixed: "Clustered/unreadable graph". 
 *   - Previous issue: Plotting two widely separated clusters on one long axis made dots tiny.
 *   - Fix: Use two separate stacked axes with identical scaling factors to show the distributions clearly while preserving relative spread.
 */

export const generator_d94018fd = {
  metadata: {
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "One-variable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate Data
    // Bell-shaped frequency pattern (e.g., 1, 2, 4, 2, 1)
    const frequencies = [1, 2, 4, 5, 4, 2, 1]; 
    
    // Class A values (centered around small number, e.g., 3)
    const startA = 0;
    const dataA: number[] = [];
    frequencies.forEach((freq, idx) => {
        for(let i=0; i<freq; i++) dataA.push(startA + idx);
    });
    
    // Class B values (Shifted by large amount, e.g., +20)
    const shift = getRandomInt(15, 30);
    const dataB = dataA.map(val => val + shift);
    
    // STEP 2: Configure SVG Layout
    // We will draw two separate plots stacked vertically
    const width = 400;
    const plotHeight = 140; // Height per plot
    const padding = 40;
    
    // Calculate distinct axis ranges for each plot
    // We force the visible span (max-min) to be the same for both to maintain visual scale
    const span = frequencies.length + 2; // Add buffer
    
    const minA = Math.min(...dataA) - 1;
    const maxA = minA + span;
    
    const minB = Math.min(...dataB) - 1;
    const maxB = minB + span;

    // Helper to map value to x-coordinate (local to the plot's range)
    const mapX = (val: number, min: number, max: number) => 
        padding + ((val - min) / (max - min)) * (width - 2 * padding);

    // Helper to generate a single dot plot section
    const generatePlotSVG = (
        data: number[], 
        label: string, 
        color: string, 
        yOffset: number,
        xMin: number,
        xMax: number
    ) => {
        const axisY = yOffset + plotHeight - 30;
        
        // Ticks & Labels
        let axisSVG = `<line x1="${padding}" y1="${axisY}" x2="${width - padding}" y2="${axisY}" stroke="currentColor" stroke-width="1.5"/>`;
        for (let x = xMin; x <= xMax; x++) {
            const cx = mapX(x, xMin, xMax);
            axisSVG += `<line x1="${cx}" y1="${axisY}" x2="${cx}" y2="${axisY + 5}" stroke="currentColor" stroke-width="1"/>`;
            axisSVG += `<text x="${cx}" y="${axisY + 20}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>`;
        }
        
        // Label
        const labelSVG = `<text x="${width/2}" y="${yOffset + 20}" text-anchor="middle" font-size="14" font-weight="bold" fill="${color}">${label}</text>`;
        
        // Dots
        let dotsSVG = '';
        const dotRadius = 5;
        const counts: Record<number, number> = {};
        
        data.forEach(val => {
            counts[val] = (counts[val] || 0) + 1;
            const stackHeight = counts[val];
            const cx = mapX(val, xMin, xMax);
            const cy = axisY - 10 - (stackHeight * 12); // Stack upwards
            dotsSVG += `<circle cx="${cx}" cy="${cy}" r="${dotRadius}" fill="${color}" stroke="none" />`;
        });
        
        return axisSVG + labelSVG + dotsSVG;
    };

    // Construct full SVG
    const svgContent = `
<div style="width: 100%; max-width: 450px; margin: 0 auto;">
  <svg viewBox="0 0 ${width} ${plotHeight * 2}" style="width: 100%; height: auto; display: block; color: inherit; font-family: sans-serif;">
    ${generatePlotSVG(dataA, "Class A", "currentColor", 0, minA, maxA)}
    ${generatePlotSVG(dataB, "Class B", "#3b82f6", plotHeight, minB, maxB)}
  </svg>
</div>
`;

    // STEP 3: Options
    const optionsData = [
      { text: `The standard deviation of the number of glue sticks brought in by Class A is greater.`, isCorrect: false },
      { text: `The standard deviation of the number of glue sticks brought in by Class B is greater.`, isCorrect: false },
      { text: `The standard deviations are equal.`, isCorrect: true },
      { text: `The relationship cannot be determined from the information given.`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // STEP 4: Return Data
    return {
      questionText: `The dot plots above show the number of glue sticks brought in by each student in Class A and Class B. Which of the following statements about the standard deviations of the number of glue sticks brought in by the students in each class is true?`,
      figureCode: svgContent,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `
        Choice ${correctOption.letter} is correct.
        
        Standard deviation is a measure of how spread out the data values are from the mean.
        
        Looking at the dot plots:
        1. Class A's data forms a bell shape centered around 3.
        2. Class B's data forms the exact same bell shape, just centered around ${3 + shift}.
        
        Since Class B is simply Class A's data shifted by adding ${shift} to every value, the *spread* of the data remains exactly the same. Adding a constant to a dataset changes the mean but does not change the standard deviation.
        
        Therefore, the standard deviations are equal.
      `.trim()
    };
  }
};