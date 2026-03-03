import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: bf47ad54
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [values 70, 80, 90, 100 with varying frequencies]
 * - Difficulty factors: [Recognizing symmetry vs skew in frequency tables, calculating weighted means mentally]
 * - Distractor patterns: [Student may calculate all four means instead of recognizing symmetry pattern]
 * - Constraints: [Tables B, C, D are symmetric with mean 85; Table A is skewed right with higher mean]
 * - Question type: [Table→Multiple Choice Text]
 */

export const generator_bf47ad54 = {
  metadata: {
    // id: "bf47ad54",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base values (evenly spaced)
    const startValue = getRandomInt(60, 80);
    const step = getRandomInt(8, 12);
    const values = [0, 1, 2, 3].map(i => startValue + i * step);
    const middle = (values[0] + values[3]) / 2; // The "center" value (85 in original)
    
    // STEP 2: Generate symmetric frequencies for tables B, C, D
    // Pattern: a, b, b, a for perfect symmetry
    const symmetricBase = getRandomInt(4, 8);
    const symmetricFreqs = [
      symmetricBase,
      getRandomInt(symmetricBase - 2, symmetricBase + 2),
      getRandomInt(symmetricBase - 2, symmetricBase + 2),
      symmetricBase
    ];
    
    // For table A: skew toward higher values (higher frequencies for higher values)
    const skewedFreqs = [
      getRandomInt(3, 6),
      getRandomInt(4, 7),
      getRandomInt(6, 9),
      getRandomInt(7, 11)
    ];
    
    // STEP 3: Calculate means
    const calcMean = (freqs: number[]) => {
      const sum = values.reduce((acc, val, i) => acc + val * freqs[i], 0);
      const count = freqs.reduce((a, b) => a + b, 0);
      return sum / count;
    };
    
    const meanA = calcMean(skewedFreqs);
    const meanSymmetric = calcMean(symmetricFreqs); // Should be middle
    
    // STEP 4: Build table HTML (showing all four tables)
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Table A</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Table B</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Table C</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Table D</th>
    </tr>
  </thead>
  <tbody>
    ${values.map((v, i) => `
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${v}: ${skewedFreqs[i]}</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${v}: ${symmetricFreqs[i]}</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${v}: ${symmetricFreqs[(i + 1) % 4]}</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${v}: ${symmetricFreqs[(i + 2) % 4]}</td>
    </tr>`).join('')}
  </tbody>
</table>`;
    
    // STEP 5: Create options (Table A always has greatest mean due to right skew)
    const optionsData = [
      { text: "Table A", isCorrect: true },
      { text: "Table B", isCorrect: false },
      { text: "Table C", isCorrect: false },
      { text: "Table D", isCorrect: false }
    ];
    
    // STEP 6: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    // STEP 7: Return question data
    return {
      questionText: "Each of the following frequency tables represents a data set. Which data set has the greatest mean?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "Table A",
      explanation: `Choice ${correctLetter} is correct. Tables B, C, and D have symmetric frequency distributions (frequencies mirror around the center), giving them a mean of ${middle}. Table A is skewed toward higher values (higher frequencies for ${values[2]} and ${values[3]}), giving it a mean of ${meanA.toFixed(1)}, which is greater than ${middle}.`
    };
  }
};

/**
 * Question ID: 4ff597db
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [20 employees, mean 6.7 years, new mean 6.25 with 19 employees]
 * - Difficulty factors: [Working backwards from means to find individual value, careful with employee count]
 * - Distractor patterns: [A: change in mean, B/C: wrong employee count assumption]
 * - Constraints: [Original total = 20 × 6.7, New total = 19 × 6.25, Difference is answer]
 * - Question type: [Text→Multiple Choice Text]
 */

// File: generators/onevariable-data-distributions/4ff597db.ts