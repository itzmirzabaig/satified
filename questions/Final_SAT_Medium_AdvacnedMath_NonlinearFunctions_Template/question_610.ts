import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 610
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential function find parameter then evaluate
 * - Number ranges: Coefficient 19, g(3)=2375, find g(4)
 * - Difficulty: Medium - solving for base then evaluating
 */

export const generator_610 = {
  metadata: {
    id: "610",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const coefficient = getRandomInt(10, 25);
    const base = 5; // Fixed for clean calculation
    const input1 = 3;
    const value1 = coefficient * Math.pow(base, input1); // 19 * 125 = 2375
    const input2 = 4;
    const value2 = coefficient * Math.pow(base, input2); // 19 * 625 = 11875
    
    const questionText = `The exponential function $g$ is defined by $g(x)=${coefficient} \\cdot a^{x}$, where $a$ is a positive constant. If $g(${input1})=${value1.toLocaleString()}$, what is the value of $g(${input2})$?`;
    
    const correctAnswer = value2.toString();
    
    const explanation = `First, find $a$ using $g(${input1})=${value1.toLocaleString()}$: ${coefficient} \\cdot a^{${input1}} = ${value1.toLocaleString()}, so $a^{${input1}} = ${value1/coefficient} = ${base}^{${input1}}$, thus $a = ${base}$. Then $g(${input2}) = ${coefficient} \\cdot ${base}^{${input2}} = ${coefficient} \\cdot ${Math.pow(base, input2)} = ${value2.toLocaleString()}$.`;
    
    return {
      questionText,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer,
      explanation
    };
  }
};
