import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 7f84b136
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Group A: 375, Group C: 690, result: 184%]
 * - Difficulty factors: [Finding what percent one number is of another, large numbers]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [p = (C / A) * 100]
 * - Question type: [Text with Table→Fill-in-the-blank]
 * - Figure generation: [HTML Table]
 */

export const generator_7f84b136 = {
  metadata: {
    // id: "7f84b136",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate table data
    // Original: Group A=375, Group C=690, p=184%
    // Generate values where C is roughly 150-250% of A
    const groupA = getRandomInt(20, 50) * 10; // 200-500
    const percentC = getRandomInt(150, 250); // 150% to 250%
    const groupC = Math.round((groupA * percentC) / 100);
    
    // Generate other groups to fill out the table
    const groupB = getRandomInt(30, 80);
    const groupD = getRandomInt(40, 100);
    const total = groupA + groupB + groupC + groupD;
    
    // STEP 2: Calculate answer
    const p = Math.round((groupC / groupA) * 100);
    const correctAnswer = p.toString();
    
    // STEP 3: Build table HTML
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; font-family: serif;">
  <thead>
    <tr style="border-bottom: 2px solid #333;">
      <th style="border: 1px solid currentColor; padding: 8px 16px; text-align: left;">Group</th>
      <th style="border: 1px solid currentColor; padding: 8px 16px; text-align: center;">Number of objects</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px 16px;">A</td>
      <td style="border: 1px solid currentColor; padding: 8px 16px; text-align: center;">${groupA.toLocaleString()}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px 16px;">B</td>
      <td style="border: 1px solid currentColor; padding: 8px 16px; text-align: center;">${groupB}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px 16px;">C</td>
      <td style="border: 1px solid currentColor; padding: 8px 16px; text-align: center;">${groupC.toLocaleString()}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px 16px;">D</td>
      <td style="border: 1px solid currentColor; padding: 8px 16px; text-align: center;">${groupD}</td>
    </tr>
    <tr style="border-top: 2px solid #333;">
      <td style="border: 1px solid currentColor; padding: 8px 16px; font-weight: bold;">Total</td>
      <td style="border: 1px solid currentColor; padding: 8px 16px; text-align: center; font-weight: bold;">${total.toLocaleString()}</td>
    </tr>
  </tbody>
</table>`;
    
    // STEP 4: Return question data
    return {
      questionText: `The table summarizes the number of objects in each group. The number of objects in group C is \\( p \\% \\) of the number of objects in group A. What is the value of \\( p \\)?`,
      figureCode: tableCode,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. It's given in the table that there are ${groupA} objects in group A and ${groupC} objects in group C. It's also given that the number of objects in group C is \\( p \\% \\) of the number of objects in group A. Therefore, ${groupC} is \\( p \\% \\) of ${groupA}, which can be represented by \\( ${groupC}=\\left(\\frac{p}{100}\\right)(${groupA}) \\), or \\( ${groupC}=${(groupA/100).toFixed(2).replace(/\.?0+$/, '')}p \\). Dividing both sides of this equation by ${(groupA/100).toFixed(2).replace(/\.?0+$/, '')} yields \\( ${correctAnswer}=p \\).`
    };
  }
};
/**
 * Question ID: 94c65646
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [part: 432, percent: 96%, whole: 450]
 * - Difficulty factors: [Finding the whole given the part and percentage]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [whole = part / (percent/100)]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [No figure]
 */
