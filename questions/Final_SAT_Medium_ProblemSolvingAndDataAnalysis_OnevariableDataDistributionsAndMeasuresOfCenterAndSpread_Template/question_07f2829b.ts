import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 07f2829b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [tourist numbers: 20-85 million, 9 countries]
 * - Difficulty factors: [Finding median of two different years, calculating difference]
 * - Distractor patterns: [Mean instead of median, wrong year comparison]
 * - Constraints: [Must have 9 values, median is 5th value]
 * - Question type: [Table→Fill in the blank]
 * - Figure generation: [HTML Table]
 */

export const generator_07f2829b = {
  metadata: {
    // id: "07f2829b",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate 9 countries with 2012 and 2013 data
    const countries = ['France', 'United States', 'Spain', 'China', 'Italy', 'Turkey', 'Germany', 'United Kingdom', 'Russia'];
    
    // Generate base values for 2012 (unordered)
    const base2012 = [83.0, 66.7, 57.5, 57.7, 46.4, 35.7, 30.4, 26.3, 24.7];
    const variations = base2012.map(() => (Math.random() - 0.5) * 10);
    
    const data2012 = base2012.map((base, i) => Math.round((base + variations[i]) * 10) / 10);
    const data2013 = data2012.map((val, i) => {
      const change = (Math.random() - 0.3) * 5; // Slight upward trend
      return Math.round((val + change) * 10) / 10;
    });
    
    // STEP 2: Find medians (5th value in ordered list of 9, 0-indexed index 4)
    const sorted2012 = [...data2012].sort((a, b) => a - b);
    const sorted2013 = [...data2013].sort((a, b) => a - b);
    const median2012 = sorted2012[4];
    const median2013 = sorted2013[4];
    const difference = Math.round((median2013 - median2012) * 10) / 10;
    
    // STEP 3: Build HTML table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
      <thead>
        <tr>
          <th style="border: 1px solid currentColor; padding: 8px;">Country</th>
          <th style="border: 1px solid currentColor; padding: 8px;">2012</th>
          <th style="border: 1px solid currentColor; padding: 8px;">2013</th>
        </tr>
      </thead>
      <tbody>
        ${countries.map((country, i) => `
        <tr>
          <td style="border: 1px solid currentColor; padding: 8px;">${country}</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${data2012[i].toFixed(1)}</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${data2013[i].toFixed(1)}</td>
        </tr>`).join('')}
      </tbody>
    </table>`;
    
    return {
      questionText: `The table above shows the number of international tourist arrivals, rounded to the nearest tenth of a million, to the top nine tourist destinations in both 2012 and 2013. Based on the information given in the table, how much greater, in millions, was the median number of international tourist arrivals to the top nine tourist destinations in 2013 than the median number in 2012, to the nearest tenth of a million?`,
      figureCode: tableCode,
      options: null,
      correctAnswer: difference.toFixed(1),
      explanation: `To find the median, order the values from least to greatest. For 2012: ${sorted2012.map(v => v.toFixed(1)).join(', ')}. The median (5th value) is ${median2012.toFixed(1)}. For 2013: ${sorted2013.map(v => v.toFixed(1)).join(', ')}. The median is ${median2013.toFixed(1)}. The difference is $${median2013.toFixed(1)} - ${median2012.toFixed(1)} = ${difference.toFixed(1)}$.`
    };
  }
};

/**
 * Question ID: 578e26ae
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [data values: 22-26, shift: 46]
 * - Difficulty factors: [Understanding effect of adding constant on median and range]
 * - Distractor patterns: [Thinking range changes, thinking median stays same]
 * - Constraints: [Shifted data maintains same spread]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs Dot Plot]
 */