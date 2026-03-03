import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_014c47ab = {
  metadata: {
    // id: "014c47ab",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate flower counts
    // We want P(Site A | Tulip) = tulipA / (tulipA + tulipB)
    // This should simplify to a nice fraction like 7/10
    
    // Generate tulip counts that create a nice conditional probability
    const tulipA = getRandomInt(25, 45);  // Tulips at Site A (35 in original)
    const tulipB = getRandomInt(10, 25);  // Tulips at Site B (15 in original)
    const totalTulips = tulipA + tulipB;
    
    // Generate daffodil counts
    const daffodilA = getRandomInt(20, 40);  // (31 in original)
    const daffodilB = getRandomInt(15, 30);  // (21 in original)
    
    const totalSiteA = tulipA + daffodilA;
    const totalSiteB = tulipB + daffodilB;
    const grandTotal = totalSiteA + totalSiteB;
    
    // STEP 2: Simplify conditional probability fraction
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const commonDivisor = gcd(tulipA, totalTulips);
    const simplifiedNum = tulipA / commonDivisor;
    const simplifiedDen = totalTulips / commonDivisor;
    
    // STEP 3: Build table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; text-align: center; font-family: serif;">
  <thead>
    <tr style="border-bottom: 2px solid #000;">
      <th style="padding: 8px; border-right: 1px solid #ccc;">Flower</th>
      <th style="padding: 8px; border-right: 1px solid #ccc;">Site A</th>
      <th style="padding: 8px; border-right: 1px solid #ccc;">Site B</th>
      <th style="padding: 8px;">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #ccc;">
      <td style="padding: 8px; border-right: 1px solid #ccc; font-weight: bold;">Tulip</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${tulipA}</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${tulipB}</td>
      <td style="padding: 8px; font-weight: bold;">${totalTulips}</td>
    </tr>
    <tr style="border-bottom: 1px solid #ccc;">
      <td style="padding: 8px; border-right: 1px solid #ccc; font-weight: bold;">Daffodil</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${daffodilA}</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${daffodilB}</td>
      <td style="padding: 8px; font-weight: bold;">${daffodilA + daffodilB}</td>
    </tr>
    <tr style="border-top: 2px solid #000; font-weight: bold;">
      <td style="padding: 8px; border-right: 1px solid #ccc;">Total</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${totalSiteA}</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${totalSiteB}</td>
      <td style="padding: 8px;">${grandTotal}</td>
    </tr>
  </tbody>
</table>`;
    
    const correctAnswer = `\\frac{${simplifiedNum}}{${simplifiedDen}}`;
    
    return {
      questionText: `The table shows the distribution of two types of flowers at two different sites. If a flower represented in the table is selected at random, what is the probability of selecting a flower from site A, given that the flower is a tulip?`,
      figureCode: tableCode,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `Given that the flower is a tulip, we look only at the Tulip row where the total is $${totalTulips}$. The number of tulips from Site A is $${tulipA}$. The probability is $\\frac{${tulipA}}{${totalTulips}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$.`
    };
  }
};

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

// File: generators/ProblemSolvingAndDataAnalysis/89f20d9e.ts