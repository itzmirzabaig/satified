import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 640
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [roots: 4, -2, 1]
* - Difficulty factors: [Finding all roots, calculating product]
* - Distractor patterns: [A: sign error, B: sum instead of product, C: partial product]
* - Constraints: [Must calculate product of three roots]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_640 = {
 metadata: {
   id: "640",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate three roots (two positive, one negative for negative product)
   const r1 = getRandomInt(2, 6);
   const r2 = getRandomInt(2, 6);
   const r3 = getRandomInt(-5, -2);
   
   const product = r1 * r2 * r3;
   const sum = r1 + r2 + r3;
   
   // STEP 2: Create options
   const optionsData = [
     { text: `$${-product}$`, isCorrect: false, type: "sign_error" }, // Sign error
     { text: `$${sum}$`, isCorrect: false, type: "sum" }, // Sum instead of product
     { text: `$${r1 * r2}$`, isCorrect: false, type: "partial" }, // Partial product
     { text: `$${product}$`, isCorrect: true, type: "correct" }
   ];
   
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;

   // Identify each distractor by its actual type in the shuffled order, so the
   // explanation's reason always matches the letter the student sees.
   const signErrorLetter = shuffledOptions.find(opt => opt.type === "sign_error").letter;
   const sumLetter = shuffledOptions.find(opt => opt.type === "sum").letter;
   const partialLetter = shuffledOptions.find(opt => opt.type === "partial").letter;

   // STEP 3: Build explanation
   const factor1 = `(x-${r1})`;
   const factor2 = `(x-${r2})`;
   const factor3 = r3 >= 0 ? `(x-${r3})` : `(x+${Math.abs(r3)})`;

   const explanation = `The solutions are $x=${r1}$, $x=${r2}$, and $x=${r3}$. Their product is $(${r1})(${r2})(${r3}) = ${product}$, so Option ${correctLetter} is correct. Option ${signErrorLetter} ($${-product}$) has the wrong sign, dropping the negative from the root $x=${r3}$. Option ${sumLetter} ($${sum}$) is the sum of the solutions, not their product. Option ${partialLetter} ($${r1 * r2}$) is only the product of the two positive solutions.`;
   
   return {
     questionText: `What is the product of the solutions to the equation $${factor1}${factor2}${factor3}=0$?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: product.toString(),
     explanation: explanation
   };
 }
};
