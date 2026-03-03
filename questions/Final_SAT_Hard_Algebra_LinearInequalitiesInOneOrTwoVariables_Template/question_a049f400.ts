import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: a049f400
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 5, intercept: 6, x-values: 3,5,7]
 * - Difficulty factors: [Table verification, inequality testing for all rows]
 * - Distractor patterns: [Tables where most but not all values satisfy inequality]
 * - Constraints: [ALL values must satisfy y < 5x + 6]
 * - Question type: [Figure+Table→Multiple Choice Text]
 * - Figure generation: [Inequality shading with intersection region]
 */

export const generator_a049f400 = {
  metadata: {
    // id: "a049f400",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: y < 5x + 6, x = 3,5,7
    // Generate: slope 3-7, intercept 2-10, x-values arithmetic sequence
    
    const slope = getRandomInt(3, 7);
    const intercept = getRandomInt(2, 10);
    const startX = getRandomInt(2, 4);
    const xGap = getRandomInt(1, 3);
    const xValues = [startX, startX + xGap, startX + 2 * xGap];
    
    // STEP 2: Calculate threshold y-values
    const thresholdValues = xValues.map(x => slope * x + intercept);
    
    // STEP 3: Generate table data
    // Correct table: all y-values strictly less than threshold
    // Create correct y-values with margin below threshold
    const correctYValues = thresholdValues.map(t => t - getRandomInt(1, 4));
    
    // Distractor tables: at least one value fails
    const distractor1Y = [...correctYValues]; // One equals threshold (not less)
    distractor1Y[1] = thresholdValues[1];
    
    const distractor2Y = [...correctYValues]; // One exceeds threshold
    distractor2Y[2] = thresholdValues[2] + getRandomInt(1, 5);
    
    const distractor3Y = thresholdValues.map(t => t + getRandomInt(1, 3)); // All above
    
    // STEP 4: Build table HTML
    const buildTable = (yVals: number[]) => {
      return `<table style="border-collapse: collapse; margin: 10px 0;">
  <thead>
    <tr>
      <th style="border: 1px solid #ccc; padding: 8px;">x</th>
      <th style="border: 1px solid #ccc; padding: 8px;">y</th>
    </tr>
  </thead>
  <tbody>
    ${xValues.map((x, i) => `
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${x}</td>
      <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${yVals[i]}</td>
    </tr>`).join('')}
  </tbody>
</table>`;
    };
    
    // STEP 5: Build Mafs code - calculate viewBox
    const allX = [...xValues, 0];
    const allY = [...thresholdValues, ...correctYValues, ...distractor1Y, ...distractor2Y, ...distractor3Y, intercept];
    const xMin = Math.min(...allX) - 1;
    const xMax = Math.max(...allX) + 2;
    const yMin = Math.min(...allY) - 2;
    const yMax = Math.max(...allY) + 2;
    
    const mafsCode = `<Mafs pan={true} zoom={true} viewBox={{ x: [${xMin}, ${xMax}], y: [${yMin}, ${yMax}] }}>
  <Coordinates.Cartesian subdivisions={false} />
  <Plot.Inequality y={{ "<": (x) => ${slope} * x + ${intercept} }} color="#0c5" fillOpacity={0.2} strokeColor="#0c5" strokeOpacity={0.5} />
</Mafs>`;
    
    // STEP 6: Create options with tracking
    const optionsData = [
      { text: buildTable(correctYValues), isCorrect: true },
      { text: buildTable(distractor1Y), isCorrect: false },
      { text: buildTable(distractor2Y), isCorrect: false },
      { text: buildTable(distractor3Y), isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption.letter;
    
    // Build verification string
    const verifications = xValues.map((x, i) => {
      return `$${correctYValues[i]} < ${slope * x + intercept}$ (${correctYValues[i] < slope * x + intercept ? 'true' : 'false'})`;
    }).join(', ');
    
    return {
      questionText: `For which of the following tables are all the values of $x$ and their corresponding values of $y$ solutions to the given inequality $y < ${slope}x + ${intercept}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "Table " + correctLetter,
      explanation: `Choice ${correctLetter} is correct. Substituting the x-values from Table ${correctLetter} into the inequality $y < ${slope}x + ${intercept}$ shows that all corresponding y-values satisfy the condition: ${verifications}. The other tables contain at least one value that does not satisfy the inequality.`
    };
  }
};

/**
 * Question ID: 5bf5136d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sides: 6 and 12]
 * - Difficulty factors: [Triangle inequality theorem, compound inequality]
 * - Distractor patterns: [A: only upper bound, B: wrong direction, D: impossible values]
 * - Constraints: [Sum of any two sides > third side, x > 0]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */