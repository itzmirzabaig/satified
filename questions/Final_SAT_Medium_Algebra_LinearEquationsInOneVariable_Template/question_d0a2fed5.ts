import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: d0a2fed5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fraction coefficient: 6/7, constant: 18, result: 54, answer: 294]
 * - Difficulty factors: [Working with fractions, solving for coefficient×variable]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Target 7p requires multiplying by 7 after finding p]
 * - Question type: [Fill-in-the-blank]
 */

export const generator_d0a2fed5 = {
  metadata: {
    // id: "d0a2fed5",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation (a/b)p + c = d, find (b/a)*d effectively
    const num = getRandomInt(3, 9);
    const den = getRandomInt(5, 10);
    while (den <= num) { /* ensure den > num */ }
    
    const c = getRandomInt(10, 30);
    // Choose d so that we get clean numbers
    // (num/den)p = d - c, so p = den(d-c)/num
    // We want 7p or similar to be clean
    
    const targetMultiplier = den; // We'll ask for den*p
    const pValue = getRandomInt(3, 8);
    const dMinusC = (num * pValue) / den;
    const d = Math.round(dMinusC + c);
    
    const answer = targetMultiplier * pValue;
    
    return {
      questionText: `If \\( \\frac{${num}}{${den}} p+${c}=${d} \\), what is the value of \\( ${den}p \\) ?`,
      figureCode: null,
      options: null,
      correctAnswer: answer.toString(),
      explanation: `The correct answer is ${answer}. Subtracting ${c} from each side of the given equation yields \\( \\frac{${num}}{${den}} p=${d - c} \\). Multiplying each side of this equation by \\( \\frac{${den}}{${num}} \\) yields \\( p=${pValue} \\). Multiplying each side of this equation by ${den} yields \\( ${den}p=${answer} \\).`
    };
  }
};

/**
 * Question ID: 36ab4122
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [regular hours: 8, overtime multiplier: 1.5, total hours: 10, earnings: 137.50]
 * - Difficulty factors: [Piecewise pay calculation, setting up equation]
 * - Distractor patterns: [A, C, D don't satisfy the earnings equation]
 * - Constraints: [Total = 8p + 1.5p×(total-8)]
 * - Question type: [Multiple Choice Text]
 */