import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 0380bbdc
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficient: 4, inside sqrt: 2x, target: 16]
* - Difficulty factors: [Radical equation, isolation, final calculation of 6x not just x]
* - Distractor patterns: [A: 3x (24), C: 9x (72), D: 12x (96) - multiples of x]
* - Constraints: [Must result in integer x]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_0380bbdc = {
 metadata: {
   // id: "0380bbdc",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate radical equation
   // a√(bx) = c, find kx
   // √(bx) = c/a, bx = (c/a)², x = (c/a)²/b, kx = k(c/a)²/b
   const a = getRandomInt(2, 6);
   const b = getRandomInt(2, 5);
   const c = a * getRandomInt(2, 5); // Ensure c/a is integer
   
   const xVal = (c / a) ** 2 / b;
   const k = 6; // Standard SAT follow-up
   const finalAnswer = k * xVal;
   
   // Distractors: 3x, 9x, 12x
   const distractor1 = 3 * xVal; // A
   const distractor2 = 9 * xVal; // C  
   const distractor3 = 12 * xVal; // D
   
   // STEP 2: Create options
   const optionsData = [
     { text: `$${distractor1}$`, isCorrect: false },
     { text: `$${finalAnswer}$`, isCorrect: true },
     { text: `$${distractor2}$`, isCorrect: false },
     { text: `$${distractor3}$`, isCorrect: false }
   ];
   
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   
   const explanation = `Divide both sides by $${a}$: $\\sqrt{${b}x}=${c/a}$. Square both sides: $${b}x=${(c/a) ** 2}$. So $x=${xVal}$. Then $6x=${finalAnswer}$. Option ${correctLetter} is correct. Other options are $3x$, $9x$, and $12x$ respectively.`;
   
   return {
     questionText: `If $${a}\\sqrt{${b}x} = ${c}$, what is the value of $6x$?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: finalAnswer.toString(),
     explanation: explanation
   };
 }
};

/**
* Question ID: 95ed0b69
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [expression: 4j+9]
* - Difficulty factors: [Isolating complex expression, not just single variable]
* - Distractor patterns: [B: multiplication, C: subtraction, D: reciprocal]
* - Constraints: [Distinct positive numbers]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/