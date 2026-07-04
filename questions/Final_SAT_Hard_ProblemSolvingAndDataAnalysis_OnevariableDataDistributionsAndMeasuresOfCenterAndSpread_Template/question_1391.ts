import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1391
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ranges 0-10 for books, different ranges for two classes]
 * - Difficulty factors: [Reading box plots to find min/max, calculating range, finding difference]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Range = max - min for each class, positive difference between ranges]
 * - Question type: [Figure→Fill in the blank]
 */

export const generator_1391 = {
  metadata: {
    id: "1391",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate ranges for two classes
    const classAMin = getRandomInt(0, 3);
    const classAMax = classAMin + getRandomInt(4, 8);
    const rangeA = classAMax - classAMin;
    
    const classBMin = getRandomInt(1, 5);
    const classBMax = classBMin + getRandomInt(6, 12);
    const rangeB = classBMax - classBMin;
    
    // STEP 2: Generate quartiles for box plots
    const classAQ1 = classAMin + Math.floor((classAMax - classAMin) * 0.25);
    const classAMedian = classAMin + Math.floor((classAMax - classAMin) * 0.5);
    const classAQ3 = classAMin + Math.floor((classAMax - classAMin) * 0.75);
    
    const classBQ1 = classBMin + Math.floor((classBMax - classBMin) * 0.25);
    const classBMedian = classBMin + Math.floor((classBMax - classBMin) * 0.5);
    const classBQ3 = classBMin + Math.floor((classBMax - classBMin) * 0.75);
    
    // STEP 3: Build a custom SVG with TWO stacked box plots sharing one
    // numbered horizontal axis. Each box plot renders min/max whisker end-caps,
    // a Q1-Q3 box rectangle, and a median line, so the student can read the
    // minimum and maximum of each class directly off the labeled axis.
    const width = 460;
    const height = 300;
    const margin = { top: 30, bottom: 55, left: 30, right: 30 };

    // Axis range padded to whole numbers so min/max sit comfortably inside.
    const axisMin = Math.min(classAMin, classBMin) - 1;
    const axisMax = Math.max(classAMax, classBMax) + 1;
    const axisRange = axisMax - axisMin;

    const getX = (val: number) =>
      margin.left + ((val - axisMin) / axisRange) * (width - margin.left - margin.right);

    // Vertical centres for the two box plots and the shared axis.
    const rowA = margin.top + 45;
    const rowB = margin.top + 130;
    const axisY = height - margin.bottom;
    const boxHeight = 44;
    const halfH = boxHeight / 2;

    // One box plot as an SVG fragment.
    const boxPlot = (
      cy: number,
      bMin: number,
      bQ1: number,
      bMed: number,
      bQ3: number,
      bMax: number,
      label: string
    ) => `
      <text x="${margin.left}" y="${cy - halfH - 10}" text-anchor="start" font-size="13" font-style="italic" fill="currentColor">${label}</text>
      <line x1="${getX(bMin)}" y1="${cy}" x2="${getX(bQ1)}" y2="${cy}" stroke="currentColor" stroke-width="2" />
      <line x1="${getX(bMin)}" y1="${cy - 10}" x2="${getX(bMin)}" y2="${cy + 10}" stroke="currentColor" stroke-width="2" />
      <line x1="${getX(bQ3)}" y1="${cy}" x2="${getX(bMax)}" y2="${cy}" stroke="currentColor" stroke-width="2" />
      <line x1="${getX(bMax)}" y1="${cy - 10}" x2="${getX(bMax)}" y2="${cy + 10}" stroke="currentColor" stroke-width="2" />
      <rect x="${getX(bQ1)}" y="${cy - halfH}" width="${getX(bQ3) - getX(bQ1)}" height="${boxHeight}" fill="#3b82f6" fill-opacity="0.2" stroke="currentColor" stroke-width="2" />
      <line x1="${getX(bMed)}" y1="${cy - halfH}" x2="${getX(bMed)}" y2="${cy + halfH}" stroke="currentColor" stroke-width="3" />
    `;

    // Numbered horizontal axis with a tick + label at every integer.
    let axisTicks = `<line x1="${margin.left}" y1="${axisY}" x2="${width - margin.right}" y2="${axisY}" stroke="currentColor" stroke-width="2" />`;
    for (let v = axisMin; v <= axisMax; v += 1) {
      const x = getX(v);
      axisTicks +=
        `<line x1="${x}" y1="${axisY}" x2="${x}" y2="${axisY + 7}" stroke="currentColor" stroke-width="1" />` +
        `<text x="${x}" y="${axisY + 22}" text-anchor="middle" font-size="11" fill="currentColor" style="opacity:0.85;">${v}</text>`;
    }

    const mafsCode = `<div style="width:100%;max-width:460px;margin:0 auto;"><svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${axisTicks}${boxPlot(rowA, classAMin, classAQ1, classAMedian, classAQ3, classAMax, 'Class A')}${boxPlot(rowB, classBMin, classBQ1, classBMedian, classBQ3, classBMax, 'Class B')}<text x="${width / 2}" y="${height - 12}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor" style="opacity:0.8;">Number of books read</text></svg></div>`;
    
    // STEP 4: Calculate answer
    const difference = Math.abs(rangeB - rangeA);
    
    // STEP 5: Return question data
    return {
      questionText: "The two box plots show the distribution of number of books read over the summer by the students in two different English classes. What is the positive difference between the ranges of number of books read over the summer for the two classes?",
      figureCode: mafsCode,
      options: [],
      correctAnswer: difference.toString(),
      explanation: `The correct answer is ${difference}. The range is the difference between maximum and minimum values. Class A range is ${classAMax} - ${classAMin} = ${rangeA}; Class B range is ${classBMax} - ${classBMin} = ${rangeB}. The positive difference is |${rangeB} - ${rangeA}| = ${difference}.`
    };
  }
};
