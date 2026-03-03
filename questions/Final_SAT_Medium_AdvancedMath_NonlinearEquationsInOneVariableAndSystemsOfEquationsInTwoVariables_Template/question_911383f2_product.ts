import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 911383f2-product
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [roots: 4, -2, 1]
* - Difficulty factors: [Finding all roots, calculating product]
* - Distractor patterns: [A: sign error, B: sum instead of product, C: partial product]
* - Constraints: [Must calculate product of three roots]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_911383f2_product = {
 metadata: {
   // id: "911383f2-product",
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
   const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
   
   // STEP 3: Build explanation
   const factor1 = `(x-${r1})`;
   const factor2 = `(x-${r2})`;
   const factor3 = r3 >= 0 ? `(x-${r3})` : `(x+${Math.abs(r3)})`;
   
   const explanation = `The solutions are $x=${r1}$, $x=${r2}$, $x=${r3}$. Their product is $(${r1})(${r2})(${r3}) = ${product}$. Option ${correctLetter} is correct. Option ${incorrectOptions[0].letter} is a sign error, ${incorrectOptions[1].letter} and ${incorrectOptions[2].letter} are sums or partial products, not the full product.`;
   
   return {
     questionText: `What is the product of the solutions to the equation $${factor1}${factor2}${factor3}=0$?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: product.toString(),
     explanation: explanation
   };
 }
};

/**
* Question ID: b80d10d7
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 2, 1, 1, denominators: x+5]
* - Difficulty factors: [Rational equation, common denominators, checking extraneous]
* - Distractor patterns: [A: x=0 (random), C: x=3 (wrong), D: x=5 (extraneous/makes denom 0)]
* - Constraints: [Solution must not make denominator zero]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/