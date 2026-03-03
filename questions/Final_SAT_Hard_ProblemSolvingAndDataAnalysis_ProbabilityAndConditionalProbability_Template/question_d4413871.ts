import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: d4413871
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: Small counts (single-digit to low double-digit), probability = 1/9
 * - Difficulty factors: Conditional probability, solving for unknown in table, setting up equation from probability statement
 * - Distractor patterns: Not applicable (fill-in-the-blank)
 * - Constraints: Must ensure integer solution for x, probability fraction must simplify correctly
 * - Question type: Table → Fill-in-the-blank
 * - Figure generation: HTML table with rhesus factor data
 */

export const generator_d4413871 = {
  metadata: {
    // id: "d4413871",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    // We need P(B | rhesus negative) = numerator / denominator = 1/9
    // Let numerator = count of B negative, denominator = total rhesus negative
    
    // Generate a valid fraction that equals 1/9
    // We need: typeB_negative / (A_neg + B_neg + AB_neg + O_neg) = 1/9
    // So: 9 * B_neg = A_neg + B_neg + AB_neg + O_neg
    
    const bNegative = getRandomInt(2, 5); // Must be >= 2 for reasonable numbers
    
    // Total rhesus negative must be 9 * bNegative
    const totalNegative = 9 * bNegative;
    
    // Generate the other rhesus negative counts that sum to totalNegative - bNegative
    const remaining = totalNegative - bNegative;
    
    // Split remaining among A, AB, and O (ensuring at least 1 for each for realism)
    const aNegative = getRandomInt(1, remaining - 2);
    const abNegative = getRandomInt(1, remaining - aNegative - 1);
    const xValue = remaining - aNegative - abNegative; // This must equal totalNegative - aNegative - bNegative - abNegative
    
    // STEP 2: Generate rhesus positive numbers (don't affect the probability calculation but needed for table completeness)
    const aPositive = getRandomInt(25, 40);
    const bPositive = getRandomInt(7, 12);
    const abPositive = getRandomInt(2, 5);
    const oPositive = getRandomInt(30, 45);
    
    // STEP 3: Build HTML table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; text-align: center; font-family: serif;">
  <thead>
    <tr style="border-bottom: 2px solid #000;">
      <th style="padding: 8px; border-right: 1px solid #ccc;">Rhesus factor</th>
      <th style="padding: 8px; border-right: 1px solid #ccc;">A</th>
      <th style="padding: 8px; border-right: 1px solid #ccc;">B</th>
      <th style="padding: 8px; border-right: 1px solid #ccc;">AB</th>
      <th style="padding: 8px;">O</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #ccc;">
      <td style="padding: 8px; border-right: 1px solid #ccc; font-weight: bold;">+</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${aPositive}</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${bPositive}</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${abPositive}</td>
      <td style="padding: 8px;">${oPositive}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-right: 1px solid #ccc; font-weight: bold;">-</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${aNegative}</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${bNegative}</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${abNegative}</td>
      <td style="padding: 8px;">x</td>
    </tr>
  </tbody>
</table>`;
    
    // STEP 4: Calculate answer
    const correctAnswer = xValue.toString();
    
    return {
      questionText: `Human blood can be classified into four common blood types—A, B, AB, and O. It is also characterized by the presence or absence of the rhesus factor. The table shows the distribution of blood type and rhesus factor for a group of people. If one of these people who is rhesus negative is chosen at random, the probability that the person has blood type B is $\\frac{1}{9}$. What is the value of $x$?`,
      figureCode: tableCode,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The total number of rhesus negative people is $${aNegative} + ${bNegative} + ${abNegative} + x = ${aNegative + bNegative + abNegative} + x$. Given the probability of selecting a type B person from this group is $\\frac{1}{9}$, we set up the equation: $\\frac{${bNegative}}{${aNegative + bNegative + abNegative} + x} = \\frac{1}{9}$. Cross-multiplying gives $${bNegative * 9} = ${aNegative + bNegative + abNegative} + x$, so $x = ${correctAnswer}$.`
    };
  }
};

/**
 * Question ID: e438ec3f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: Rows (5-6), counts per category (6-9 trees), heights (20 feet threshold)
 * - Difficulty factors: Conditional probability with two conditions (maple AND >=20ft), requires calculating sub-population, tree structure with rows
 * - Distractor patterns: A: ignores rows/total context, B: random fraction, D: ignores different number of rows between species
 * - Constraints: Must maintain row structure, ensure integer probabilities throughout
 * - Question type: Word problem → Multiple choice text
 * - Figure generation: None (conceptual)
 */

// File: generators/ProblemSolvingAndDataAnalysis/e438ec3f.ts