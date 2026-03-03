import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c5e38487
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 56, acetic acid: 10]
 * - Difficulty factors: [Simple subtraction in context]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Water = total - acid]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_c5e38487 = {
  metadata: {
    // id: "c5e38487",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const total = getRandomInt(40, 100);
    const acid = getRandomInt(5, total - 10);
    const water = total - acid;
    
    return {
      questionText: `A chemist combines water and acetic acid to make a mixture with a volume of ${total} milliliters (mL). The volume of acetic acid in the mixture is ${acid} mL. What is the volume of water, in mL, in the mixture? (Assume that the volume of the mixture is the sum of the volumes of water and acetic acid before they were mixed.)`,
      figureCode: null,
      options: null,
      correctAnswer: water.toString(),
      explanation: `The correct answer is ${water}. It's given that a chemist combines water and acetic acid to make a mixture with a volume of ${total} milliliters (mL) and that the volume of acetic acid in the mixture is ${acid} mL. Let \\( x \\) represent the volume of water, in mL, in the mixture. The equation \\( x + ${acid} = ${total} \\) represents this situation. Subtracting ${acid} from both sides of this equation yields \\( x = ${water} \\). Therefore, the volume of water, in mL, in the mixture is ${water}.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-9f3cb472.ts
/**
 * Question ID: 9f3cb472
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -1/3, point: (9, 10)]
 * - Difficulty factors: [Point-slope form, solving for y-intercept]
 * - Distractor patterns: [A: wrong slope, B: using point as coefficients, C: wrong intercept, D: correct]
 * - Constraints: [Clean arithmetic for intercept]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */
