import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 0bd33265
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Functions
 * - Concept: Inverse functions / Solving for a variable.
 * - Equation: h = (9(v - 273.15))/5 + 32
 * - Fix: Changed \\\\frac to \\frac to ensure the fraction renders correctly as a math symbol 
 *        instead of the text "frac".
 */

export const generator_0bd33265 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Target Values
    // We start with a clean Integer Kelvin value to ensure the final answer is nice.
    const kelvinAnswer = getRandomInt(300, 500); 
    
    // 2. Calculate Fahrenheit
    // Formula: h = 9/5 * (v - 273.15) + 32
    const term = (kelvinAnswer - 273.15);
    const fahrenheitValue = (9/5 * term) + 32;
    
    // Round to 2 decimal places for display (standard for temp)
    // Note: Since we start with integer K, this usually results in .XX decimals
    const fahrenheitDisplay = parseFloat(fahrenheitValue.toFixed(2));
    
    // 3. Explanation Math
    // We walk through the reverse steps:
    // h - 32 = 9/5(v - 273.15)
    const step1 = fahrenheitDisplay - 32;
    // (h - 32) * 5 = 9(v - 273.15)
    const step2 = step1 * 5;
    // (h - 32) * 5 / 9 = v - 273.15
    const step3 = step2 / 9;
    // v = step3 + 273.15

    return {
      questionText: `The equation $h = \\frac{9(v-273.15)}{5} + 32$ gives the corresponding temperature $h$, in degrees Fahrenheit, of any substance that has a temperature of $v$ kelvins, where $v>0$. If a substance has a temperature of ${fahrenheitDisplay} degrees Fahrenheit, what is the corresponding temperature, in kelvins, of this substance?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: kelvinAnswer.toString(),
      explanation: `
        To find the temperature in kelvins ($v$), substitute $h = ${fahrenheitDisplay}$ into the equation and solve for $v$:
        $$ ${fahrenheitDisplay} = \\frac{9(v-273.15)}{5} + 32 $$
        Subtract 32 from both sides:
        $$ ${fahrenheitDisplay} - 32 = \\frac{9(v-273.15)}{5} $$
        $$ ${step1.toFixed(2)} = \\frac{9(v-273.15)}{5} $$
        Multiply both sides by 5:
        $$ ${step1.toFixed(2)} \\cdot 5 = 9(v-273.15) $$
        $$ ${step2.toFixed(2)} = 9(v-273.15) $$
        Divide by 9:
        $$ \\frac{${step2.toFixed(2)}}{9} = v - 273.15 $$
        $$ ${step3.toFixed(2)} = v - 273.15 $$
        Add 273.15 to both sides:
        $$ ${step3.toFixed(2)} + 273.15 = v $$
        $$ v = ${kelvinAnswer} $$
      `
    };
  }
};