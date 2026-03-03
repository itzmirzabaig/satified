import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_e438ec3f = {
  metadata: {
    // id: "e438ec3f",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate row counts and tree counts
    const birchRows = getRandomInt(4, 8);
    const mapleRows = getRandomInt(3, 7);
    
    // Birch: each row has tall and short trees
    const birchTallPerRow = getRandomInt(6, 10);
    const birchShortPerRow = getRandomInt(5, 9);
    
    // Maple: each row has tall and short trees  
    const mapleTallPerRow = getRandomInt(7, 12);
    const mapleShortPerRow = getRandomInt(6, 10);
    
    // STEP 2: Calculate totals
    const totalBirchTall = birchRows * birchTallPerRow;
    const totalMapleTall = mapleRows * mapleTallPerRow;
    const totalTall = totalBirchTall + totalMapleTall;
    
    // STEP 3: Calculate probability and simplify
    // P(Maple | Tall) = mapleTall / totalTall
    
    // Ensure the fraction simplifies nicely by working backwards
    // We want a fraction like 15/31 or similar "awkward" SAT fraction
    const targetNumerator = mapleRows * mapleTallPerRow;
    const targetDenominator = totalTall;
    
    // Calculate GCD for simplified form
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const commonDivisor = gcd(targetNumerator, targetDenominator);
    const simplifiedNum = targetNumerator / commonDivisor;
    const simplifiedDen = targetDenominator / commonDivisor;
    
    const correctAnswerText = `\\frac{${simplifiedNum}}{${simplifiedDen}}`;
    
    // STEP 4: Generate distractors
    // A: Probability of one specific maple tree from ALL trees
    const totalTrees = birchRows * (birchTallPerRow + birchShortPerRow) + 
                       mapleRows * (mapleTallPerRow + mapleShortPerRow);
    const distractorA = `\\frac{${mapleTallPerRow}}{${totalTrees}}`;
    
    // B: Random incorrect fraction (approx 30% = 3/10)
    const distractorB = `\\frac{3}{10}`;
    
    // D: Ignores row counts - treats as single row comparison
    // P(Maple tall | Tall in one row of each) = mapleTallPerRow / (birchTallPerRow + mapleTallPerRow)
    const distractorD = `\\frac{${mapleTallPerRow}}{${birchTallPerRow + mapleTallPerRow}}`;
    
    // STEP 5: Create and shuffle options
    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "results from calculating the probability of picking a single specific maple tree out of the total number of trees, ignoring the conditional statement" },
      { text: distractorB, isCorrect: false, reason: "is a random approximation that doesn't match the actual calculation" },
      { text: correctAnswerText, isCorrect: true },
      { text: distractorD, isCorrect: false, reason: "results from comparing tall trees in a single row of each type while ignoring the different number of rows for each species" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `A grove has $${birchRows}$ rows of birch trees and $${mapleRows}$ rows of maple trees. Each row of birch trees has $${birchTallPerRow}$ trees $20$ feet or taller and $${birchShortPerRow}$ trees shorter than $20$ feet. Each row of maple trees has $${mapleTallPerRow}$ trees $20$ feet or taller and $${mapleShortPerRow}$ trees shorter than $20$ feet. A tree from one of these rows will be selected at random. What is the probability of selecting a maple tree, given that the tree is $20$ feet or taller?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswerText,
      explanation: `Choice ${correctLetter} is correct. To find the probability of selecting a maple tree given that the tree is $20$ feet or taller, we use the formula for conditional probability: $P(\\text{Maple} | \\ge 20 \\text{ ft}) = \\frac{\\text{Number of maple trees } \\ge 20 \\text{ ft}}{\\text{Total number of trees } \\ge 20 \\text{ ft}}$.\n\nThere are $${birchRows}$ rows of birch trees with $${birchTallPerRow}$ trees $\\ge 20$ feet each, for a total of $${birchRows} \\times ${birchTallPerRow} = ${totalBirchTall}$ birch trees $\\ge 20$ feet.\n\nThere are $${mapleRows}$ rows of maple trees with $${mapleTallPerRow}$ trees $\\ge 20$ feet each, for a total of $${mapleRows} \\times ${mapleTallPerRow} = ${totalMapleTall}$ maple trees $\\ge 20$ feet.\n\nThe total number of trees $\\ge 20$ feet is $${totalBirchTall} + ${totalMapleTall} = ${totalTall}$.\n\nTherefore, $P(\\text{Maple} | \\ge 20 \\text{ ft}) = \\frac{${targetNumerator}}{${targetDenominator}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$.\n\nChoice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.\nChoice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.\nChoice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 585de39a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: Large numbers (millions), probability as decimal (0.43), rounding to nearest integer
 * - Difficulty factors: Setting up proportion from probability statement, working with large numbers/millions, rounding
 * - Distractor patterns: Not applicable (fill-in-the-blank)
 * - Constraints: Must ensure p rounds to a specific integer, probability should be a clean decimal
 * - Question type: Word problem → Fill-in-the-blank
 * - Figure generation: None
 */

// File: generators/ProblemSolvingAndDataAnalysis/585de39a.ts