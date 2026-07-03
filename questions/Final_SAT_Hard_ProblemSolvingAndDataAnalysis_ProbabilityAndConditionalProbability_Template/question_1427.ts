import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1427
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: Age groups with specific counts, conditional on "at least 10 years"
 * - Difficulty factors: Conditional probability from table, identifying correct sub-population, summing across multiple columns
 * - Distractor patterns: Not applicable (fill-in-the-blank)
 * - Constraints: Table must have consistent totals, age groups must create clean conditional probability
 * - Question type: Table → Fill-in-the-blank
 * - Figure generation: HTML table with age distribution
 */

export const generator_1427 = {
  metadata: {
    id: "1427",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate table structure with constraints
    // We need: Group A, B, C; Age groups 0-9, 10-19, 20+; Each group sums to same total
    
    let totalPerGroup!: number;
    let groupA_0_9!: number;
    let groupA_10_19!: number;
    let groupA_20_plus!: number;
    let groupB_0_9!: number;
    let groupB_10_19!: number;
    let groupB_20_plus!: number;
    let groupC_0_9!: number;
    let groupC_10_19!: number;
    let groupC_20_plus!: number;
    
    // Use while loop instead of recursion to ensure valid values
    let valid = false;
    let attempts = 0;
    const maxAttempts = 100;
    
    while (!valid && attempts < maxAttempts) {
      attempts++;
      totalPerGroup = getRandomInt(25, 40); // Total per group (30 in original)
      
      // Generate Group A distribution (target: need at least 10 count for interesting conditional)
      groupA_0_9 = getRandomInt(5, 10);
      groupA_10_19 = getRandomInt(10, 18);
      groupA_20_plus = totalPerGroup - groupA_0_9 - groupA_10_19;
      
      // Ensure positive values
      if (groupA_20_plus < 5) continue;
      
      // Generate Group B
      groupB_0_9 = getRandomInt(4, 12);
      groupB_10_19 = getRandomInt(3, 15);
      groupB_20_plus = totalPerGroup - groupB_0_9 - groupB_10_19;
      
      if (groupB_20_plus < 3) continue;
      
      // Group C is determined by column totals (each column sums to totalPerGroup)
      const total_0_9 = totalPerGroup; // Column must sum to totalPerGroup for each age group
      const total_10_19 = totalPerGroup;
      const total_20_plus = totalPerGroup;
      
      groupC_0_9 = total_0_9 - groupA_0_9 - groupB_0_9;
      groupC_10_19 = total_10_19 - groupA_10_19 - groupB_10_19;
      groupC_20_plus = total_20_plus - groupA_20_plus - groupB_20_plus;
      
      // Validate Group C values are positive
      if (groupC_0_9 < 1 || groupC_10_19 < 1 || groupC_20_plus < 1) continue;
      
      // Verify Group C sums correctly
      if (groupC_0_9 + groupC_10_19 + groupC_20_plus !== totalPerGroup) continue;
      
      valid = true;
    }
    
    // Fallback if we couldn't find valid values
    if (!valid) {
      totalPerGroup = 30;
      groupA_0_9 = 5;
      groupA_10_19 = 17;
      groupA_20_plus = 8;
      groupB_0_9 = 6;
      groupB_10_19 = 13;
      groupB_20_plus = 11;
      groupC_0_9 = 19;
      groupC_10_19 = 0;
      groupC_20_plus = 11;
    }
    
    // STEP 2: Calculate conditional probability
    // P(Group A | >= 10 years) = (Group A, 10-19 + Group A, 20+) / (Total >= 10 years)
    const groupA_atLeast10 = groupA_10_19 + groupA_20_plus;
    const total_atLeast10 = totalPerGroup + totalPerGroup; // = 2 * totalPerGroup
    
    // STEP 3: Simplify fraction
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const commonDivisor = gcd(groupA_atLeast10, total_atLeast10);
    const simplifiedNum = groupA_atLeast10 / commonDivisor;
    const simplifiedDen = total_atLeast10 / commonDivisor;
    
    // STEP 4: Build table
    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto; text-align: center; background: transparent; width: 100%; max-width: 560px;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Group</th>
      <th style="border: 1px solid currentColor; padding: 8px;">0-9 years</th>
      <th style="border: 1px solid currentColor; padding: 8px;">10-19 years</th>
      <th style="border: 1px solid currentColor; padding: 8px;">20+ years</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Group A</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${groupA_0_9}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${groupA_10_19}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${groupA_20_plus}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalPerGroup}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Group B</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${groupB_0_9}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${groupB_10_19}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${groupB_20_plus}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalPerGroup}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Group C</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${groupC_0_9}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${groupC_10_19}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${groupC_20_plus}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalPerGroup}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Total</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalPerGroup}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalPerGroup}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalPerGroup}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${3 * totalPerGroup}</td>
    </tr>
  </tbody>
</table>`;

    return {
      questionText: `The table shows the distribution of participants across three groups by age. One of these participants will be selected at random. What is the probability of selecting a participant from Group A, given that the participant is at least 10 years of age? (Express your answer as a fraction or decimal, not as a percent.)`,
      figureCode: tableCode,
      options: [],
      correctAnswer: `${simplifiedNum}/${simplifiedDen}`,
      explanation: `The condition "at least 10 years of age" restricts the sample space to the 10-19 and 20+ columns. Each of those columns totals ${totalPerGroup} participants, so the number of participants at least 10 years old is ${totalPerGroup} + ${totalPerGroup} = ${total_atLeast10}. Within Group A, the number at least 10 years old is ${groupA_10_19} + ${groupA_20_plus} = ${groupA_atLeast10}. The probability is $\\frac{${groupA_atLeast10}}{${total_atLeast10}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$.`
    };
  }
};
