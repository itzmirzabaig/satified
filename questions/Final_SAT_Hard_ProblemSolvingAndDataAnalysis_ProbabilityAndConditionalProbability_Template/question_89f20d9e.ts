import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 89f20d9e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: Group totals of 30, age groups that sum appropriately
 * - Difficulty factors: Conditional probability, identifying correct sub-population, fraction simplification
 * - Distractor patterns: A: Wrong condition (uses 0-9 or wrong subset), B: Correct calculation (5/12), C: Uses wrong numerator (17/30), D: Uses wrong base (5/6)
 * - Constraints: Must have equal totals per group, conditional must simplify cleanly
 * - Question type: Table → Multiple choice text
 * - Figure generation: HTML table with age distribution
 */

export const generator_89f20d9e = {
  metadata: {
    // id: "89f20d9e",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate table values similar to 6a715bed but with different constraints
    // We need P(Group A | >= 10) to simplify to something like 5/12
    
    let totalPerGroup: number;
    let groupA_0_9: number;
    let groupA_10_19: number;
    let groupA_20_plus: number;
    let groupB_0_9: number;
    let groupB_10_19: number;
    let groupB_20_plus: number;
    let groupC_0_9: number;
    let groupC_10_19: number;
    let groupC_20_plus: number;
    
    // Use while loop instead of recursion
    let valid = false;
    let attempts = 0;
    const maxAttempts = 100;
    
    while (!valid && attempts < maxAttempts) {
      attempts++;
      totalPerGroup = getRandomInt(25, 35); // Keep consistent for this generator type
      
      // Generate distributions that give an interesting simplified fraction
      groupA_0_9 = getRandomInt(3, 8);      // Was 5
      groupA_10_19 = getRandomInt(12, 20);  // Was 17
      groupA_20_plus = totalPerGroup - groupA_0_9 - groupA_10_19; // Was 8
      
      if (groupA_20_plus < 3 || groupA_20_plus > 12) continue;
      
      groupB_0_9 = getRandomInt(4, 10);     // Was 6
      groupB_10_19 = getRandomInt(5, 15);
      groupB_20_plus = totalPerGroup - groupB_0_9 - groupB_10_19;
      
      if (groupB_10_19 < 3 || groupB_20_plus < 3) continue;
      
      // Group C determined by column constraints (each column sums to totalPerGroup)
      const col1Total = totalPerGroup;
      const col2Total = totalPerGroup;
      const col3Total = totalPerGroup;
      
      groupC_0_9 = col1Total - groupA_0_9 - groupB_0_9;
      groupC_10_19 = col2Total - groupA_10_19 - groupB_10_19;
      groupC_20_plus = col3Total - groupA_20_plus - groupB_20_plus;
      
      if (groupC_0_9 < 1 || groupC_10_19 < 1 || groupC_20_plus < 1) continue;
      
      // Verify Group C sums to totalPerGroup
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
    const groupA_atLeast10 = groupA_10_19 + groupA_20_plus;
    const total_atLeast10 = totalPerGroup + totalPerGroup; // Should be 60
    
    // Simplify
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const commonDivisor = gcd(groupA_atLeast10, total_atLeast10);
    const simplifiedNum = groupA_atLeast10 / commonDivisor;
    const simplifiedDen = total_atLeast10 / commonDivisor;
    
    const correctAnswerText = `\\frac{${simplifiedNum}}{${simplifiedDen}}`;
    
    // STEP 3: Generate distractors
    // A: Group A 0-9 years / total >= 10 (wrong numerator)
    const distractorA_real = `\\frac{${groupA_0_9}}{${total_atLeast10}}`; // Was 5/18 in original structure
    
    // C: Just Group A 10-19 / 30 (ignores 20+ and wrong denominator)
    const distractorC_real = `\\frac{${groupA_10_19}}{${totalPerGroup}}`;
    
    // D: Group A at least 10 / (total - Group A 0-9) or similar confusion
    const distractorD_real = `\\frac{${groupA_atLeast10 + 1}}{${total_atLeast10 - 1}}`; // Slightly off
    
    // Ensure our distractors don't accidentally match correct answer
    if (distractorA_real === correctAnswerText || distractorC_real === correctAnswerText) {
      // Regenerate with while loop instead of recursion
      return generator_89f20d9e.generate();
    }
    
    const optionsData = [
      { text: distractorA_real, isCorrect: false, reason: "results from using the number of Group A participants aged 0–9 years in the numerator instead of those at least 10 years old" },
      { text: correctAnswerText, isCorrect: true },
      { text: distractorC_real, isCorrect: false, reason: "results from using only the 10–19 age group numerator with the wrong denominator (total group members instead of total at least 10 years)" },
      { text: distractorD_real, isCorrect: false, reason: "results from an incorrect calculation using unrelated values from the table" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Build table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; text-align: center; font-family: serif;">
  <thead>
    <tr style="border-bottom: 2px solid #000;">
      <th style="padding: 8px; border-right: 1px solid #ccc;">Group</th>
      <th style="padding: 8px; border-right: 1px solid #ccc;">0–9 years</th>
      <th style="padding: 8px; border-right: 1px solid #ccc;">10–19 years</th>
      <th style="padding: 8px; border-right: 1px solid #ccc;">20+ years</th>
      <th style="padding: 8px;">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #ccc;">
      <td style="padding: 8px; border-right: 1px solid #ccc; font-weight: bold;">Group A</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${groupA_0_9}</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${groupA_10_19}</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${groupA_20_plus}</td>
      <td style="padding: 8px; font-weight: bold;">${totalPerGroup}</td>
    </tr>
    <tr style="border-bottom: 1px solid #ccc;">
      <td style="padding: 8px; border-right: 1px solid #ccc; font-weight: bold;">Group B</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${groupB_0_9}</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${groupB_10_19}</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${groupB_20_plus}</td>
      <td style="padding: 8px; font-weight: bold;">${totalPerGroup}</td>
    </tr>
    <tr style="border-bottom: 1px solid #ccc;">
      <td style="padding: 8px; border-right: 1px solid #ccc; font-weight: bold;">Group C</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${groupC_0_9}</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${groupC_10_19}</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${groupC_20_plus}</td>
      <td style="padding: 8px; font-weight: bold;">${totalPerGroup}</td>
    </tr>
    <tr style="border-top: 2px solid #000; font-weight: bold;">
      <td style="padding: 8px; border-right: 1px solid #ccc;">Total</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${totalPerGroup}</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${totalPerGroup}</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${totalPerGroup}</td>
      <td style="padding: 8px;">${3 * totalPerGroup}</td>
    </tr>
  </tbody>
</table>`;
    
    return {
      questionText: `One of these participants will be selected at random. What is the probability of selecting a participant from group A, given that the participant is at least 10 years of age?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswerText,
      explanation: `Choice ${correctLetter} is correct. The total number of participants at least 10 years old is $${totalPerGroup} + ${totalPerGroup} = ${total_atLeast10}$. In Group A, the number of participants at least 10 years old is $${groupA_10_19} + ${groupA_20_plus} = ${groupA_atLeast10}$. The probability is $\\frac{${groupA_atLeast10}}{${total_atLeast10}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$.\n\nChoice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.\nChoice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.\nChoice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};