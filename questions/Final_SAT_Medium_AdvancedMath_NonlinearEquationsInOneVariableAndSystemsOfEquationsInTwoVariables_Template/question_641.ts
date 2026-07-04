import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 641
*
* ORIGINAL ANALYSIS:
* - Number ranges: [expression: a*j + b]
* - Difficulty factors: [Isolating complex expression, not just single variable]
* - Distractor patterns: [B: multiplication, C: subtraction, D: reciprocal]
* - Constraints: [Distinct positive numbers]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_641 = {
 metadata: {
   id: "641",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },

 generate: (): QuestionData => {
   // STEP 1: Generate the linear expression a*j + b that must be isolated.
   const coeff = getRandomInt(2, 8);
   const constTerm = getRandomInt(3, 12);
   const expr = `${coeff}j + ${constTerm}`;

   // The given relation is  p = k / (a*j + b).  Solving for the expression:
   //   p(a*j + b) = k  =>  a*j + b = k / p.
   const givenEquation = `p = \\frac{k}{${expr}}`;

   // STEP 2: Create options (correct isolation plus three rearrangement errors).
   const correctText = `$${expr} = \\frac{k}{p}$`;

   const optionsData = [
     { text: correctText, isCorrect: true, type: "correct" },
     { text: `$${expr} = kp$`, isCorrect: false, type: "product" },
     { text: `$${expr} = k - p$`, isCorrect: false, type: "difference" },
     { text: `$${expr} = \\frac{p}{k}$`, isCorrect: false, type: "reciprocal" }
   ];

   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));

   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;

   const productLetter = shuffledOptions.find(opt => opt.type === "product").letter;
   const differenceLetter = shuffledOptions.find(opt => opt.type === "difference").letter;
   const reciprocalLetter = shuffledOptions.find(opt => opt.type === "reciprocal").letter;

   // STEP 3: Build explanation from the live expression.
   const explanation = `Choice ${correctLetter} is correct. Multiply both sides of the given equation by $${expr}$ to get $p(${expr}) = k$. Divide both sides by $p$ to isolate the expression: $${expr} = \\frac{k}{p}$. Option ${productLetter} multiplies by $p$ instead of dividing, Option ${differenceLetter} subtracts instead of dividing, and Option ${reciprocalLetter} inverts the fraction.`;

   return {
     questionText: `The equation $${givenEquation}$ relates the distinct positive numbers $p$, $k$, and $j$. Which equation correctly expresses $${expr}$ in terms of $p$ and $k$?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: correctText,
     explanation: explanation
   };
 }
};
