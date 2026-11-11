import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 507
*
* ORIGINAL ANALYSIS:
* - Number ranges: [mass: 39 kg (double-digit), conversion: 1000 g/kg, answer: 39000 (5-digit)]
* - Difficulty factors: [Metric conversion, multiplication by 1000]
* - Distractor patterns: [None - fill in blank, common errors: 3900 (missing 0), 390000 (extra 0), 1039 (added), 39000 (correct)]
* - Constraints: [Simple multiplication by 1000]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_507 = {
  metadata: {
    id: "507",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Before: masses up to 80 kg (giant armadillos weigh at most about 50 to
    // 60 kg), and the multiplication used a bare × outside math.
    const massKg = getRandomInt(20, 50);
    const gramsPerKg = 1000;
    const massGrams = massKg * gramsPerKg;

    const questionText = `A giant armadillo has a mass of ${massKg} kilograms. What is the giant armadillo's mass in grams? (1 kilogram = ${gramsPerKg.toLocaleString('en-US')} grams)`;

    const explanation = `The correct answer is ${massGrams.toLocaleString('en-US')}. It's given that the giant armadillo has a mass of ${massKg} kilograms. Since 1 kilogram is equal to ${gramsPerKg.toLocaleString('en-US')} grams, ${massKg} kilograms is equal to $${massKg} \\times 1{,}000 = ${massGrams.toLocaleString('en-US').replace(/,/g, '{,}')}$ grams. Therefore, the giant armadillo's mass, in grams, is ${massGrams.toLocaleString('en-US')}.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: massGrams.toString(),
      explanation: explanation
    };
  }
};
