import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 623
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficient a: 2-6, inside sqrt: bx with b: 2-5]
* - Difficulty factors: [Radical equation, isolation, final calculation of 6x not just x]
* - Distractor patterns: [3x, 9x, 12x - other multiples of x]
* - Constraints: [Must result in integer x — enforced answer-first:
*   x = b*s^2 so that sqrt(b*x) = b*s is an exact integer for every draw]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_623 = {
 metadata: {
   id: "623",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },

 generate: (): QuestionData => {
   // STEP 1: Answer-first construction. a*sqrt(bx) = c, find 6x.
   // Pick x = b*s^2 so bx = (b*s)^2 is a perfect square: sqrt(bx) = b*s = q.
   // Then c = a*q. Every intermediate value is an integer for every draw.
   const a = getRandomInt(2, 6);
   const b = getRandomInt(2, 5);
   const s = getRandomInt(2, 3);

   const x = b * s * s;      // integer, 8..45
   const q = b * s;          // sqrt(b*x), integer
   const c = a * q;          // right-hand side

   const finalAnswer = 6 * x;

   // Distractors are other multiples of x. Since x >= 8 > 0,
   // 3x < 6x < 9x < 12x are always four distinct values — no collision possible.
   const optionsData = [
     { text: String(3 * x), isCorrect: false, mult: 3 },
     { text: String(finalAnswer), isCorrect: true, mult: 6 },
     { text: String(9 * x), isCorrect: false, mult: 9 },
     { text: String(12 * x), isCorrect: false, mult: 12 }
   ];

   // STEP 2: Shuffle, then derive letters from the shuffled order.
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));

   const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
   const correctLetter = correctOption.letter;

   const wrongParts = shuffledOptions
     .filter(opt => !opt.isCorrect)
     .map(opt => `Choice ${opt.letter} is incorrect: it is the value of $\\,${opt.mult}x = ${opt.mult * x}$, not $\\,6x$.`)
     .join(' ');

   const explanation = `Choice ${correctLetter} is correct. Start with $\\,${a}\\sqrt{${b}x} = ${c}$. Divide both sides by ${a} to isolate the radical: $\\sqrt{${b}x} = ${q}$. Square both sides: $\\,${b}x = ${q * q}$. Divide both sides by ${b}: $x = ${x}$. Therefore $\\,6x = 6 \\cdot ${x} = ${finalAnswer}$. ${wrongParts}`;

   return {
     questionText: `If $\\,${a}\\sqrt{${b}x} = ${c}$, what is the value of $\\,6x$?`,
     figureCode: null,
     options: shuffledOptions.map(o => o.text),
     correctAnswer: correctOption.text,
     explanation: explanation
   };
 }
};
