import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 54d93874
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Andrew: 6 rocks, Maria: 6 rocks with unknown x, mean difference 0.1 kg]
 * - Difficulty factors: [Setting up equation from means, solving for unknown]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Maria's mean = Andrew's mean + 0.1, solve for x]
 * - Question type: [Table→Fill in the blank]
 */

export const generator_54d93874 = {
  metadata: {
    // id: "54d93874",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate Andrew's rocks (6 values)
    let valid = false;
    let andrewValues: number[] = [];
    let mariaValues: number[] = [];
    let x = 0;
    let attempts = 0;
    
    while (!valid && attempts < 100) {
      andrewValues = Array.from({length: 6}, () => getRandomInt(20, 50) / 10); // 2.0 to 5.0
      
      // STEP 2: Calculate Andrew's mean
      const andrewSum = andrewValues.reduce((a, b) => a + b, 0);
      const andrewMean = andrewSum / 6;
      
      // STEP 3: Determine target mean for Maria
      const meanDifference = getRandomInt(1, 3) / 10; // 0.1 to 0.3
      const targetMariaMean = andrewMean + meanDifference;
      
      // STEP 4: Generate 5 of Maria's rocks and calculate x
      mariaValues = Array.from({length: 5}, () => getRandomInt(25, 45) / 10);
      const mariaSumWithoutX = mariaValues.reduce((a, b) => a + b, 0);
      
      // x = targetMean * 6 - sumOfOther5
      const calculatedX = (targetMariaMean * 6) - mariaSumWithoutX;
      
      // Ensure x is reasonable (positive, not too large)
      if (calculatedX > 0 && calculatedX <= 10) {
        x = Math.round(calculatedX * 10) / 10;
        valid = true;
      }
      attempts++;
    }
    
    // Fallback
    if (!valid) {
      andrewValues = [2.5, 2.7, 2.8, 3.0, 3.2, 3.4];
      mariaValues = [2.8, 3.0, 3.1, 3.3, 3.5];
      x = 3.6;
    }
    
    const andrewSum = andrewValues.reduce((a, b) => a + b, 0);
    const andrewMean = andrewSum / 6;
    const meanDifference = 0.1; // Simplified for fallback
    
    // STEP 5: Build table HTML
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Person</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Masses (kilograms)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Andrew</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${andrewValues.join(", ")}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Maria</td>
      <td style="border: 1px solid currentColor; padding: 8px;">x, ${mariaValues.join(", ")}</td>
    </tr>
  </tbody>
</table>`;
    
    // STEP 6: Return question data
    return {
      questionText: `Andrew and Maria each collected six rocks, shown in the table. Maria's mean mass is ${meanDifference} kg greater than Andrew's. What is the value of x?`,
      figureCode: tableCode,
      options: null,
      correctAnswer: x.toFixed(1),
      explanation: `The correct answer is ${x.toFixed(1)}. Andrew's mean is (${andrewValues.join(" + ")})/6 = ${andrewSum.toFixed(1)}/6 = ${andrewMean.toFixed(2)} kg. Maria's mean is ${andrewMean.toFixed(2)} + ${meanDifference} = ${(andrewMean + meanDifference).toFixed(2)} kg. Setting up the equation for Maria's mean: (x + ${mariaValues.reduce((a,b)=>a+b,0).toFixed(1)})/6 = ${(andrewMean + meanDifference).toFixed(2)}. Solving: x + ${mariaValues.reduce((a,b)=>a+b,0).toFixed(1)} = ${((andrewMean + meanDifference) * 6).toFixed(1)}, so x = ${x.toFixed(1)}.`
    };
  }
};

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

// File: generators/onevariable-data-distributions/94237701.ts