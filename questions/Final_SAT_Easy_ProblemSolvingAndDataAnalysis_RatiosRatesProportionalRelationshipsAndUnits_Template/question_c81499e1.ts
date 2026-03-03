import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: c81499e1
*
* ORIGINAL ANALYSIS:
* - Number ranges: [mass: 39 kg (double-digit), conversion: 1000 g/kg, answer: 39000 (5-digit)]
* - Difficulty factors: [Metric conversion, multiplication by 1000]
* - Distractor patterns: [None - fill in blank, common errors: 3900 (missing 0), 390000 (extra 0), 1039 (added), 39000 (correct)]
* - Constraints: [Simple multiplication by 1000]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_c81499e1 = {
  metadata: {
    // id: "c81499e1",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const massKg = getRandomInt(20, 80);
    const gramsPerKg = 1000;
    const massGrams = massKg * gramsPerKg;

    // Fixed: Plain text for units, no \\text{} needed
    const questionText = `A giant armadillo has a mass of ${massKg} kilograms. What is the giant armadillo's mass in grams? (1 kilogram = ${gramsPerKg.toLocaleString()} grams)`;
    
    // Fixed: Plain text for words, $...$ only for math expressions
    const explanation = `The correct answer is ${massGrams.toLocaleString()}. It's given that the giant armadillo has a mass of ${massKg} kilograms. Since 1 kilogram is equal to ${gramsPerKg.toLocaleString()} grams, ${massKg} kilograms is equal to ${massKg} × ${gramsPerKg.toLocaleString()} = ${massGrams.toLocaleString()} grams. Therefore, the giant armadillo's mass, in grams, is ${massGrams.toLocaleString()}.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: massGrams.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: 0700a2d5
*
* ORIGINAL ANALYSIS:
* - Number ranges: [77 rods (double-digit), conversion: 5.5 yards/rod, answer: 423.5 or 847/2]
* - Difficulty factors: [Decimal conversion factor, multiplication with decimal]
* - Distractor patterns: [None - fill in blank, common errors: 14 (divided), 82.5 (added), 4235 (decimal error), 423.5 (correct)]
* - Constraints: [ rods × 5.5 must give clean decimal or fraction]
* - Question type: [Fill-in-the-blank with multiple acceptable formats]
* - Figure generation: [None]
*/