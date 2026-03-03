import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 5dc386fb
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: State counts (39, 6, 4, 1), percentages with tenths place
 * - Difficulty factors: Conditional probability with "given" condition (states WITH sales tax), percentage conversion, rounding to tenths
 * - Distractor patterns: A: Uses total states incorrectly, B: Wrong base/percentage calculation, D: Different rounding error
 * - Constraints: Must result in percentage with distinct tenths digit, conditional population must be clear
 * - Question type: Table → Multiple choice text
 * - Figure generation: HTML table with tax distribution
 */

export const generator_5dc386fb = {
  metadata: {
    // id: "5dc386fb",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate table values
    // Structure: rows = Income Tax Yes/No, cols = Sales Tax Yes/No
    
    // We want P(No Income | Sales) = salesNoIncome / (salesIncome + salesNoIncome)
    // This should give a percentage with tenths place that's distinct
    
    // Generate values that create an interesting percentage
    const salesIncome = getRandomInt(35, 45);  // States with both (39 in original)
    const salesNoIncome = getRandomInt(4, 9);  // States with sales but no income (6 in original)
    const noSalesIncome = getRandomInt(2, 6);  // States with income but no sales (4 in original)
    const noSalesNoIncome = getRandomInt(1, 3); // States with neither (1 in original)
    
    // STEP 2: Calculate conditional probability
    const totalWithSales = salesIncome + salesNoIncome;
    const percentage = (salesNoIncome / totalWithSales) * 100;
    const percentageRounded = Math.round(percentage * 10) / 10;
    
    // Ensure rounding is clean
    const percentageString = percentageRounded.toFixed(1);
    
    // STEP 3: Build table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; text-align: center; font-family: serif;">
  <thead>
    <tr style="border-bottom: 2px solid #000;">
      <th style="padding: 8px; border-right: 1px solid #ccc;">Tax Type</th>
      <th style="padding: 8px; border-right: 1px solid #ccc;">State sales tax</th>
      <th style="padding: 8px;">No state sales tax</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #ccc;">
      <td style="padding: 8px; border-right: 1px solid #ccc; font-weight: bold;">State income tax</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${salesIncome}</td>
      <td style="padding: 8px;">${noSalesIncome}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-right: 1px solid #ccc; font-weight: bold;">No state income tax</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${salesNoIncome}</td>
      <td style="padding: 8px;">${noSalesNoIncome}</td>
    </tr>
  </tbody>
</table>`;
    
    // STEP 4: Generate options
    const correctAnswerText = `${percentageString}%`;
    
    // Distractor A: salesNoIncome / (total states) * 100 (wrong denominator)
    const distractorAPct = (salesNoIncome / (salesIncome + salesNoIncome + noSalesIncome + noSalesNoIncome)) * 100;
    const distractorA = `${Math.round(distractorAPct * 10) / 10}%`;
    
    // Distractor B: Wrong calculation (around 12%)
    const distractorBVal = getRandomElement(["12.0%", "11.5%", "12.5%"]);
    
    // Distractor D: Slightly different rounding or miscalculation (14.0%)
    const distractorDVal = "14.0%";
    
    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "results from using the total number of states as the denominator instead of only states with sales tax" },
      { text: distractorBVal, isCorrect: false, reason: "is an incorrect percentage calculation that doesn't match the data" },
      { text: correctAnswerText, isCorrect: true },
      { text: distractorDVal, isCorrect: false, reason: "results from an incorrect rounding or calculation method" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `To the nearest tenth of a percent, what percent of states with a state-level sales tax do not have a state-level income tax?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswerText,
      explanation: `Choice ${correctLetter} is correct. The total number of states with a sales tax is $${salesIncome} + ${salesNoIncome} = ${totalWithSales}$. Of these, $${salesNoIncome}$ have no income tax. The percentage is $\\frac{${salesNoIncome}}{${totalWithSales}} \\times 100 \\approx ${percentage.toFixed(2)}%, which to the nearest tenth is $${correctAnswerText}$.\n\nChoice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.\nChoice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.\nChoice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 014c47ab
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: Flower counts (15-35), two sites, two flower types
 * - Difficulty factors: Conditional probability with row condition (tulip), recognizing reduced sample space
 * - Distractor patterns: Not applicable (fill-in-the-blank)
 * - Constraints: Totals must match, conditional must simplify to clean fraction
 * - Question type: Table → Fill-in-the-blank
 * - Figure generation: HTML table with flower distribution
 */

// File: generators/ProblemSolvingAndDataAnalysis/014c47ab.ts