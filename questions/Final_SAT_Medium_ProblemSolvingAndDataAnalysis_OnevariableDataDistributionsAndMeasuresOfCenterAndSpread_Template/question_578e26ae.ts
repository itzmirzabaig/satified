import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 578e26ae
 * 
 * ANALYSIS:
 * - Skill: Measures of Center and Spread (Effect of shifting data)
 * - Issue Fixed: The graph was "clustered and unreadable" because it tried to plot both Set A and the far-away Set B on one axis.
 *   Standard SAT format for this question shows Set A and describes Set B.
 * - Fix: Plot only Data Set A so the axis is legible.
 */

export const generator_578e26ae = {
  metadata: {
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "One-variable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate Data Set A
    // Use a small range (e.g., integers 22-26)
    const baseVal = getRandomInt(10, 30);
    const valuesA = [
      baseVal,
      baseVal + 1,
      baseVal + 1,
      baseVal + 2,
      baseVal + 2,
      baseVal + 2,
      baseVal + 3,
      baseVal + 4
    ];
    
    // STEP 2: Generate Shift for Set B
    const shift = getRandomInt(20, 50);
    
    // STEP 3: Calculate Stats
    // Median A
    const sortedA = [...valuesA].sort((a, b) => a - b);
    const mid = Math.floor(sortedA.length / 2);
    const medianA = (sortedA[mid - 1] + sortedA[mid]) / 2;
    
    // Range A
    const minA = sortedA[0];
    const maxA = sortedA[sortedA.length - 1];
    const rangeA = maxA - minA;
    
    // Stats B (Shifted)
    const medianB = medianA + shift;
    const rangeB = rangeA; // Range doesn't change with shift
    
    // STEP 4: Generate SVG for Data Set A ONLY
    const xMin = minA - 1;
    const xMax = maxA + 1;
    const width = 400;
    const height = 200;
    const padding = 40;
    
    // Map data value to x-coordinate
    const mapX = (val: number) => padding + ((val - xMin) / (xMax - xMin)) * (width - 2 * padding);
    
    // Count frequencies for dot stacking
    const counts: Record<number, number> = {};
    valuesA.forEach(v => { counts[v] = (counts[v] || 0) + 1; });
    
    // Generate Dots SVG
    let dotsSVG = '';
    const dotRadius = 6;
    const dotSpacing = 16; // Vertical space between dots
    const groundY = height - 50;
    
    for (const val of valuesA) {
        // We handle stacking by decrementing a temporary counter or calculating position based on index
        // Simpler: iterate unique values and stack
    }
    
    Object.keys(counts).forEach(key => {
        const val = parseInt(key);
        const count = counts[val];
        const cx = mapX(val);
        for (let i = 0; i < count; i++) {
            const cy = groundY - dotRadius - (i * dotSpacing);
            dotsSVG += `<circle cx="${cx}" cy="${cy}" r="${dotRadius}" fill="currentColor" />`;
        }
    });

    // Generate Axis SVG
    let axisSVG = `<line x1="${padding}" y1="${groundY}" x2="${width - padding}" y2="${groundY}" stroke="currentColor" stroke-width="2"/>`;
    
    // Ticks
    for (let x = xMin; x <= xMax; x++) {
        const cx = mapX(x);
        axisSVG += `<line x1="${cx}" y1="${groundY}" x2="${cx}" y2="${groundY + 5}" stroke="currentColor" stroke-width="2"/>`;
        axisSVG += `<text x="${cx}" y="${groundY + 20}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>`;
    }

    const svgContent = `
<div style="width: 100%; max-width: 400px; margin: 0 auto;">
  <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; color: inherit; font-family: sans-serif;">
    <text x="${width/2}" y="30" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Data Set A</text>
    ${axisSVG}
    ${dotsSVG}
  </svg>
</div>
`;

    // STEP 5: Options
    // Correct: Median B > Median A, Range B = Range A
    const optionsData = [
      { 
        text: "The median of data set B is greater than the median of data set A, and the range of data set B is equal to the range of data set A.", 
        isCorrect: true 
      },
      { 
        text: "The median of data set B is greater than the median of data set A, and the range of data set B is greater than the range of data set A.", 
        isCorrect: false 
      },
      { 
        text: "The median of data set B is equal to the median of data set A, and the range of data set B is equal to the range of data set A.", 
        isCorrect: false 
      },
      { 
        text: "The median of data set B is equal to the median of data set A, and the range of data set B is greater than the range of data set A.", 
        isCorrect: false 
      }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // STEP 6: Return Data
    return {
      questionText: `Data set A has values and is represented by the dot plot shown. Data set B is created by adding ${shift} to each of the values in data set A. Which of the following correctly compares the medians and the ranges of data sets A and B?`,
      figureCode: svgContent,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `
        Choice ${correctOption.letter} is correct.
        
        **Median:**
        When a constant $c$ is added to every value in a data set, the median increases by that constant $c$.
        Since Data Set B is created by adding ${shift} to values in Data Set A, the median of B is ${shift} greater than the median of A.
        
        **Range:**
        The range is calculated as Maximum Value - Minimum Value.
        If we add ${shift} to the max and ${shift} to the min:
        Range B = $(Max_A + ${shift}) - (Min_A + ${shift}) = Max_A - Min_A$.
        Therefore, the range remains unchanged.
        
        Thus, the median of B is greater, and the ranges are equal.
      `.trim()
    };
  }
};