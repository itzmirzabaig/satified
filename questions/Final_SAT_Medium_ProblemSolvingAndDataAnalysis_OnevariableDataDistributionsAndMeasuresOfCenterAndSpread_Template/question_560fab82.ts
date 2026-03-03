import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 560fab82
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [values: 19-25, frequencies: 1-7]
 * - Difficulty factors: [Identifying minimum from frequency table]
 * - Distractor patterns: [Value with lowest frequency, second lowest value]
 * - Constraints: [Minimum is lowest value with frequency > 0]
 * - Question type: [Table→Fill in the blank]
 * - Figure generation: [HTML Table]
 */

export const generator_560fab82 = {
  metadata: {
    // id: "560fab82",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate values with frequencies
    const baseValue = getRandomInt(10, 25);
    const values = [baseValue, baseValue + 2, baseValue + 4, baseValue + 6];
    const frequencies = [
      getRandomInt(5, 8),
      1,
      getRandomInt(5, 8),
      getRandomInt(3, 5)
    ];
    
    const minValue = values[0];
    
    // STEP 2: Build HTML table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
      <thead>
        <tr>
          <th style="border: 1px solid currentColor; padding: 8px;">Value</th>
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
      questionText: `The table shows the frequency of values in a data set. What is the minimum value of the data set?`,
      figureCode: tableCode,
      options: null,
      correctAnswer: minValue.toString(),
      explanation: `The minimum value is the least value with a frequency greater than zero. In this set, ${minValue} is the lowest value with frequency ${frequencies[0]}. Note that frequency indicates how many times a value appears, and the minimum is determined by the value itself, not by how frequently it appears.`
    };
  }
};

/**
 * Question ID: d94018fd
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [glue sticks: 1-7, frequencies varying]
 * - Difficulty factors: [Comparing standard deviations of shifted distributions]
 * - Distractor patterns: [Thinking spread changes with shift, thinking they're different]
 * - Constraints: [Identical shapes = identical standard deviations]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs Dot Plot]
 */