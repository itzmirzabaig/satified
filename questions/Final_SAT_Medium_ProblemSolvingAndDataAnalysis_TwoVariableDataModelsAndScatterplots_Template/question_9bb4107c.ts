import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 9bb4107c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-values: 0-8, y-values: 3-9, time interval: 2 to 6]
 * - Difficulty factors: [Reading piecewise graph, calculating average rate of change]
 * - Distractor patterns: [Fill-in-the-blank, exact answer 0.5 or 1/2]
 * - Constraints: [Must have specific points at x=2 and x=6 readable from graph]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Polyline graph with momentum over time]
 */

export const generator_9bb4107c = {
  metadata: {
    // id: "9bb4107c",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base values for the graph
    // Create a piecewise linear graph with readable points
    const startY = getRandomInt(3, 5);
    const midY1 = startY + getRandomInt(2, 4);
    const midY2 = midY1 + getRandomInt(-2, 2);
    const endY = midY2 + getRandomInt(1, 3);
    
    // Points for the polyline: [0, startY], [1, midY1], [6, midY2], [8, endY]
    // But we need specific readable values at x=2 and x=6
    const x2 = 2;
    const y2 = startY + 3; // Point at x=2
    const x6 = 6;
    const y6 = y2 + 2; // Point at x=6 (original: 6 to 8, difference of 2)
    
    // STEP 2: Build polyline points
    const polylinePoints = [[0, startY], [1, midY1], [x2, y2], [4, y2 - 1], [x6, y6], [7, y6 + 1], [8, endY]];
    
    // STEP 3: Calculate answer
    const rateOfChange = (y6 - y2) / (x6 - x2);
    const answerDecimal = rateOfChange.toFixed(1);
    const answerFraction = "1/2";
    
    // Calculate viewBox bounds
    const xMin = -0.5;
    const xMax = 8.5;
    const yMin = Math.min(startY, y2 - 1, endY) - 1;
    const yMax = Math.max(midY1, y6 + 1, endY) + 1;
    
    // STEP 4: Build Mafs code
    const pointsString = polylinePoints.map(p => `[${p[0]}, ${p[1]}]`).join(', ');
    
    const mafsCode = null;
    
    return {
      questionText: `The graph shows the momentum $y$, in newton-seconds, of an object $x$ seconds after the object started moving, for $0 \\le x \\le 8$. What is the average rate of change, in newton-seconds per second, in the momentum of the object from $x=${x2}$ to $x=${x6}$?`,
      figureCode: null,
      options: null,
      correctAnswer: `${answerDecimal}, ${answerFraction}`,
      explanation: `The average rate of change is the slope between the points at $x=${x2}$ and $x=${x6}$. At $x=${x2}, y=${y2}$. At $x=${x6}, y=${y6}$. Slope $= (${y6} - ${y2}) / (${x6} - ${x2}) = ${y6 - y2} / ${x6 - x2} = ${rateOfChange}.`
    };
  }
};

/**
 * Question ID: 2e74e403
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-values: 0-10, y-values: 1-8, slope: approximately -0.7]
 * - Difficulty factors: [Estimating slope from scatterplot with line of best fit]
 * - Distractor patterns: [7 (ignoring sign/decimal), 0.7 (wrong sign), -7 (wrong magnitude)]
 * - Constraints: [Line must show negative slope around -0.7]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with downward trend line]
 */