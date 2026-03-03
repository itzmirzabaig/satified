import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: d1f50dbe
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Functions
 * - Concept: Modeling with Linear Equations (Rates).
 * - Logic: Total Stain = (Total Area / Coverage per Gallon) * Number of Coats.
 * - Fixes: Corrected LaTeX fraction escaping (from \\\\frac to \\frac).
 *          Ensured coverage is a multiple of coats for clean integer simplification.
 */

export const generator_d1f50dbe = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Parameters
    // Number of coats (typically 2, but could be 3 or 4)
    const coats = getRandomInt(2, 4);
    
    // Base coverage for the final simplified equation (e.g., 100 sq ft effectively per gallon)
    const effectiveCoverage = getRandomInt(4, 9) * 10 + getRandomInt(0, 1) * 5; // e.g. 40-95
    
    // The stated single-coat coverage must be higher
    // If it takes 2 coats, the single-coat coverage is 2 * effectiveCoverage
    const coverage = effectiveCoverage * coats;

    // 2. Options
    // Correct Equation: S = (w / coverage) * coats = w / (coverage / coats) = w / effectiveCoverage
    const correctEq = `S = \\frac{w}{${effectiveCoverage}}`;
    
    // Distractor A: Forgot to multiply by coats (Single coat only)
    const distA = `S = \\frac{w}{${coverage}}`;
    
    // Distractor B: Multiplied by coverage instead of dividing
    const distB = `S = ${coverage}w`;
    
    // Distractor C: Weird multiplication
    const distC = `S = ${effectiveCoverage}w`;

    const optionsData = [
      { text: `$${correctEq}$`, isCorrect: true },
      { text: `$${distA}$`, isCorrect: false },
      { text: `$${distB}$`, isCorrect: false },
      { text: `$${distC}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    // 3. Explanation
    return {
      questionText: `One gallon of stain will cover ${coverage} square feet of a surface. A yard has a total fence area of $w$ square feet. Which equation represents the total amount of stain $S$, in gallons, needed to stain the fence in this yard ${coats} times?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `
        Choice ${correctOption.letter} is correct.
        <br/><br/>
        1. <strong>Calculate gallons for one coat:</strong>
        To cover $w$ square feet once, we divide the area by the coverage rate:
        $$ \\text{Gallons for 1 coat} = \\frac{w}{${coverage}} $$
        <br/>
        2. <strong>Calculate gallons for ${coats} coats:</strong>
        Since we need to stain the fence ${coats} times, we multiply the amount for one coat by ${coats}:
        $$ S = ${coats} \\times \\frac{w}{${coverage}} $$
        $$ S = \\frac{${coats}w}{${coverage}} $$
        <br/>
        3. <strong>Simplify the fraction:</strong>
        $$ S = \\frac{w}{\\frac{${coverage}}{${coats}}} $$
        $$ S = \\frac{w}{${effectiveCoverage}} $$
      `
    };
  }
};