import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 94237701
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scores 2-10, different frequencies for groups A and B]
 * - Difficulty factors: [Calculating medians from frequency tables, finding difference]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Group A has 9 values (median is 5th), Group B has 11 values (median is 6th)]
 * - Question type: [Table→Fill in the blank]
 */

export const generator_94237701 = {
  metadata: {
    // id: "94237701",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate score values
    const minScore = getRandomInt(1, 4);
    const scores = Array.from({length: 7}, (_, i) => minScore + i);
    
    // STEP 2: Generate frequencies for Group A (9 total, median at position 5)
    // Ensure median is one of the lower values
    let valid = false;
    let freqA: number[] = [];
    let freqB: number[] = [];
    let totalA = 0;
    let totalB = 0;
    let medianA = 0;
    let medianB = 0;
    let difference = 0;
    let attempts = 0;
    
    while (!valid && attempts < 100) {
      freqA = scores.map(() => getRandomInt(0, 3));
      totalA = freqA.reduce((a, b) => a + b, 0);
      
      if (totalA === 9) {
        // Find median of A
        let cumA = 0;
        for (let i = 0; i < freqA.length; i++) {
          cumA += freqA[i];
          if (cumA >= 5) {
            medianA = scores[i];
            break;
          }
        }
        
        // STEP 3: Generate frequencies for Group B (11 total, median at position 6)
        // Ensure median is higher than A's median
        freqB = scores.map(() => getRandomInt(0, 4));
        totalB = freqB.reduce((a, b) => a + b, 0);
        
        if (totalB === 11) {
          let cumB = 0;
          for (let i = 0; i < freqB.length; i++) {
            cumB += freqB[i];
            if (cumB >= 6) {
              medianB = scores[i];
              break;
            }
          }
          
          if (medianB > medianA) {
            difference = medianB - medianA;
            valid = true;
          }
        }
      }
      attempts++;
    }
    
    // Fallback if no valid configuration found
    if (!valid) {
      freqA = [0, 2, 3, 2, 1, 1, 0]; // Sum = 9, median at score 4
      freqB = [0, 0, 2, 3, 3, 2, 1]; // Sum = 11, median at score 6
      totalA = 9;
      totalB = 11;
      medianA = minScore + 2;
      medianB = minScore + 4;
      difference = 2;
    }
    
    // STEP 4: Build table HTML
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Score</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Group A</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Group B</th>
    </tr>
  </thead>
  <tbody>
    ${scores.map((s, i) => `
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${s}</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${freqA[i]}</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${freqB[i]}</td>
    </tr>`).join('')}
  </tbody>
</table>`;
    
    // STEP 5: Return question data
    return {
      questionText: "The table shows the frequency distribution of scores for group A and group B. The median of group B is how much greater than the median of group A?",
      figureCode: tableCode,
      options: null,
      correctAnswer: difference.toString(),
      explanation: `The correct answer is ${difference}. Group A has ${totalA} values, so the median is the ${Math.ceil(totalA/2)}th value, which is ${medianA}. Group B has ${totalB} values, so the median is the ${Math.ceil(totalB/2)}th value, which is ${medianB}. The difference is ${medianB} - ${medianA} = ${difference}.`
    };
  }
};