import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 630897df
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [331.3, 0.606 (decimals)]
* - Difficulty factors: [Literal equation with decimals, solving for T]
* - Distractor patterns: [A: adds instead of subtracts, B: subtracts 0.606, C: adds 331.3]
* - Constraints: [Real-world context]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_630897df = {
 metadata: {
   // id: "630897df",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate similar decimal constants
   const base = (getRandomInt(300, 340) + Math.random()).toFixed(1);
   const rate = (Math.random() * 0.5 + 0.3).toFixed(3);
   
   // STEP 2: Create options
   const correctText = `$$T=\\frac{v-${base}}{${rate}}$$`;
   
   const optionsData = [
     { text: `$$T=\\frac{v+${rate}}{${base}}$$`, isCorrect: false },
     { text: `$$T=\\frac{v-${rate}}{${base}}$$`, isCorrect: false },
     { text: `$$T=\\frac{v+${base}}{${rate}}$$`, isCorrect: false },
     { text: correctText, isCorrect: true }
   ];
   
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   
   const explanation = `To solve for $T$, subtract $${base}$ from both sides: $v-${base}=${rate}T$. Divide both sides by $${rate}$: $T=\\frac{v-${base}}{${rate}}$. Option ${correctLetter} is correct. Other options result from incorrect algebraic steps.`;
   
   return {
     questionText: `The speed of sound in dry air, $v$, can be modeled by the formula $v = ${base} + ${rate}T$, where $T$ is the temperature in degrees Celsius and $v$ is measured in meters per second. Which of the following correctly expresses $T$ in terms of $v$ ?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: correctText,
     explanation: explanation
   };
 }
};

/**
* Question ID: 29ed5d39
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [constant: 20, numerator: 16]
* - Difficulty factors: [Rational equation, isolating reciprocal]
* - Distractor patterns: [A: subtracts 20 from numerator, B/C: wrong operations]
* - Constraints: [n ≠ 0, p > 20 ensures denominator positive]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/