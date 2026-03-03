import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 3b4b8831
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficient: 38 (double-digit 30-50), perfect square: 9 (actual perfect square)]
* - Difficulty factors: [Quadratic equation, isolating x², perfect square roots, identifying negative solution]
* - Distractor patterns: [Not applicable - fill in blank]
* - Constraints: [Must use perfect square, not random number]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_3b4b8831 = {
 metadata: {
   // id: "3b4b8831",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate random values
   // Original uses 38x² = 38(9) where 9 is perfect square
   // Use double-digit coefficient (30-50 range) and actual perfect square
   const coeff = getRandomInt(30, 50); // Double-digit coefficient like 38
   const base = getRandomInt(2, 5); // 2, 3, 4, or 5
   const perfectSquare = base * base; // 4, 9, 16, or 25 (NOT random 4-25)
   
   // STEP 2: Calculate answer
   // coeff * x² = coeff * perfectSquare => x² = perfectSquare => x = ±base
   const negativeSolution = -base;
   
   // STEP 3: Return question data
   return {
     questionText: `$$${coeff}x^2 = ${coeff}(${perfectSquare})$$ What is the negative solution to the given equation?`,
     figureCode: null,
     options: null,
     correctAnswer: negativeSolution.toString(),
     explanation: `To solve the given equation for $x$, start with $${coeff}x^2 = ${coeff}(${perfectSquare})$. Divide both sides by $${coeff}$ to get $x^2 = ${perfectSquare}$. Take the square root of both sides: $x = \\pm ${base}$. The question asks for the negative solution, so the answer is $${negativeSolution}$. The other solution, $${base}$, is not negative.`
   };
 }
};

/**
* Question ID: f5247e52
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients a and c are positive constants (conceptual)]
* - Difficulty factors: [Conceptual understanding of parabola vs horizontal line, vertex analysis]
* - Distractor patterns: [A: Zero (thinks no intersection), B: One (thinks tangent), D: More than two (thinks possible)]
* - Constraints: [a > 0, c > 0 ensures parabola opens up with vertex below x-axis, line y=a+c is above x-axis]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None - conceptual question]
*/