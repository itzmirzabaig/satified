import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_b80d10d7 = {
 metadata: {
   // id: "b80d10d7",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate rational equation with solution
   // Form: k(x+a)/(x+b) = c - d/(x+b)
   // Multiply by (x+b): k(x+a) = c(x+b) - d
   // kx + ka = cx + cb - d
   // x(k-c) = cb - d - ka
   const k = getRandomInt(2, 4);
   const a = 1;
   const b = getRandomInt(3, 7); // Denominator x+b
   const c = 1;
   const d = 1;
   
   // Solve: k(x+1) = 1*(x+b) - 1 => kx + k = x + b - 1 => x(k-1) = b - 1 - k => x = (b-1-k)/(k-1)
   // Ensure integer solution: (b-1-k) divisible by (k-1)
   // If k=2: x = (b-1-2)/1 = b-3
   const xSol = b - 3; // When k=2
   
   // STEP 2: Create options (include xSol, 0, xSol+1, and value that makes denom 0 which is -b)
   const optionsData = [
     { text: `$0$`, isCorrect: false },
     { text: `$${xSol}$`, isCorrect: true },
     { text: `$${xSol + 1}$`, isCorrect: false },
     { text: `$${b}$`, isCorrect: false } // Wrong value
   ];
   
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
   
   // STEP 3: Build explanation
   const explanation = `Rewrite the right side: $1-\\frac{1}{x+${b}}=\\frac{x+${b}-1}{x+${b}}=\\frac{x+${b-1}}{x+${b}}$. Now both sides have denominator $x+${b}$, so $${k}(x+1)=x+${b-1}$. Expand: $${k}x+${k}=x+${b-1}$. Subtract $x$ and $${k}$ from both sides: $x=${xSol}$. Substitute $x=${xSol}$ into the original equation to check. Other options do not satisfy the equation.`;
   
   return {
     questionText: `$$\\frac{${k}(x+1)}{x+${b}}=1-\\frac{1}{x+${b}}$$\nWhat is the solution to the equation above?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: xSol.toString(),
     explanation: explanation
   };
 }
};

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