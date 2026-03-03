import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: a456cfd2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [data values: 6-14, frequencies: 0-11]
 * - Difficulty factors: [Identifying maximum from frequency table]
 * - Distractor patterns: [Value with highest frequency, value before gap]
 * - Constraints: [Must have gap with 0 frequency, then reappear]
 * - Question type: [Table→Fill in the blank]
 * - Figure generation: [HTML Table]
 */

export const generator_a456cfd2 = {
  metadata: {
    // id: "a456cfd2",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate data values with a gap (0 frequency) then continuation
    const startValue = getRandomInt(5, 8);
    const values = [];
    const frequencies = [];
    
    // Generate values with pattern: increasing freq, then gap, then max value
    for (let i = 0; i < 5; i++) {
      values.push(startValue + i);
      frequencies.push(getRandomInt(2, 5) + i); // Increasing
    }
    
    // Add gap with 0 frequency
    values.push(startValue + 5);
    frequencies.push(0);
    
    // Add final maximum value with moderate frequency
    const maxValue = startValue + 6;
    values.push(maxValue);
    frequencies.push(getRandomInt(4, 8));
    
    // STEP 2: Build HTML table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
      <thead>
        <tr>
          <th style="border: 1px solid currentColor; padding: 8px;">Data value</th>
          <th style="border: 1px solid currentColor; padding: 8px;">Frequency</th>
        </tr>
      </thead>
      <tbody>
        ${values.map((val, i) => `
        <tr>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${val}</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${frequencies[i]}</td>
        </tr>`).join('')}
      </tbody>
    </table>`;
    
    return {
      questionText: `The frequency table summarizes the data values in a data set. What is the maximum data value in the data set?`,
      figureCode: tableCode,
      options: null,
      correctAnswer: maxValue.toString(),
      explanation: `The maximum value is the largest value present in the data set regardless of frequency (as long as frequency > 0). Here, the value ${maxValue} occurs ${frequencies[frequencies.length - 1]} times, making it the maximum. Note that although there is a gap at value ${values[values.length - 2]} with frequency 0, the maximum is still ${maxValue} because it has a positive frequency.`
    };
  }
};

/**
 * Question ID: 3f2ee20a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sample size: ~2500, mean: ~186, std dev: 12-20]
 * - Difficulty factors: [Understanding standard deviation as measure of spread]
 * - Distractor patterns: [Confusing mean with spread, thinking identical data]
 * - Constraints: [Same mean, different std dev]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */