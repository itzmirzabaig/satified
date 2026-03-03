import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: da602115
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [constant: 112 (triple-digit), coefficient: 4 (single-digit), inside abs: 4 (constant term)]
* - Difficulty factors: [Absolute value equation, algebraic manipulation, finding positive value of expression]
* - Distractor patterns: [Not applicable - fill in blank]
* - Constraints: [Absolute value must yield positive result, x-1 must be positive]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_da602115 = {
 metadata: {
   // id: "da602115",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate random values matching original magnitude
   // Original uses |4x - 4| = 112, asks for positive value of x-1
   // Generalize: |ax - a| = C where C is divisible by a
   const a = getRandomInt(2, 6); // Coefficient inside absolute value
   const result = a * getRandomInt(20, 35); // Triple-digit divisible by a (e.g., 112 = 4*28)
   
   // STEP 2: Calculate answer
   // |ax - a| = result => |a(x-1)| = result => a|x-1| = result => |x-1| = result/a
   const absValue = result / a;
   // Positive value of x-1 is absValue
   
   // STEP 3: Return question data
   return {
     questionText: `If $|${a}x - ${a}| = ${result}$, what is the positive value of $x - 1$?`,
     figureCode: null,
     options: null, // Fill-in-the-blank
     correctAnswer: absValue.toString(),
     explanation: `The given equation is $|${a}x - ${a}| = ${result}$. Factoring out $${a}$ from the term inside the absolute value brackets yields $|${a}(x - 1)| = ${result}$. Using the property $|ab| = |a| \\cdot |b|$, we can separate the constants: $|${a}| \\cdot |x - 1| = ${result}$, so $${a} \\cdot |x - 1| = ${result}$. Divide both sides by $${a}$: $|x - 1| = ${absValue}$. This means that $x - 1$ is either $${absValue}$ or $-${absValue}$. The question asks for the positive value of $x - 1$. Therefore, the positive value of $x - 1$ is $${absValue}$.`
   };
 }
};

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