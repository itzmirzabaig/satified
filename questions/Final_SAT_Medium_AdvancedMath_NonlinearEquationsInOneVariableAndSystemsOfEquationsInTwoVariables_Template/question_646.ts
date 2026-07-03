import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 646
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 2, 1, 1, denominators: x+5]
* - Difficulty factors: [Rational equation, common denominators, checking extraneous]
* - Distractor patterns: [x+1 (arithmetic slip), b-1 (constant mishandled), -b (extraneous, zero denom)]
* - Constraints: [Solution must not make denominator zero]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*
* FIX: The original hardcoded xSol = b - 3, which is only the correct root
* when k = 2, and its option set could collide (duplicate "0"). Rebuilt with
* answer-first construction: choose the integer root x0 and k, then derive b
* so the equation is exactly satisfied for every k in [2,4]; all four options
* are provably distinct.
*/

export const generator_646 = {
 metadata: {
   id: "646",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },

 generate: (): QuestionData => {
   // Equation:  k(x+1)/(x+b) = 1 - 1/(x+b).
   // Multiply both sides by (x+b):  k(x+1) = (x+b) - 1 = x + b - 1.
   //   => kx + k = x + b - 1  =>  x(k-1) = b - 1 - k  =>  x = (b-1-k)/(k-1).
   //
   // ANSWER-FIRST: pick the integer root x0 and k, then solve for b so the
   // equation holds exactly:
   //   k(x0+1) = x0 + b - 1  =>  b = x0*(k-1) + k + 1.
   // With x0 in [1,5] and k in [2,4], b >= 4 > 0, so the denominator x0 + b > 0
   // (never zero) and x0 is a valid, non-extraneous solution.
   let rx0 = getRandomInt(1, 5);
   let rk = getRandomInt(2, 4);
   let rb = rx0 * (rk - 1) + rk + 1; // makes rx0 the exact solution

   // Four pedagogically-motivated options:
   //   correct : rx0
   //   slip    : rx0 + 1
   //   constant: rb - 1  (mishandled the -1 on the right)
   //   trap    : -rb      (value that makes the denominator zero -> extraneous)
   // These are provably distinct for the ranges above; the bounded guard below
   // is defensive so no draw can ever emit duplicate options.
   const buildOptions = () => [
     { text: `$${rx0}$`, isCorrect: true },
     { text: `$${rx0 + 1}$`, isCorrect: false },
     { text: `$${rb - 1}$`, isCorrect: false },
     { text: `$${-rb}$`, isCorrect: false }
   ];
   let optionsData = buildOptions();
   let guard = 0;
   while (new Set(optionsData.map(o => o.text)).size !== 4 && guard++ < 50) {
     rx0 = getRandomInt(1, 5);
     rk = getRandomInt(2, 4);
     rb = rx0 * (rk - 1) + rk + 1;
     optionsData = buildOptions();
   }

   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));

   const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
   const slipLetter = shuffledOptions.find(o => o.text === `$${rx0 + 1}$`)!.letter;
   const constLetter = shuffledOptions.find(o => o.text === `$${rb - 1}$`)!.letter;
   const trapLetter = shuffledOptions.find(o => o.text === `$${-rb}$`)!.letter;

   const explanation =
     `Rewrite the right side over a common denominator: $\\frac{(x+${rb})-1}{x+${rb}}=\\frac{x+${rb - 1}}{x+${rb}}$. ` +
     `Both sides now have denominator $x+${rb}$, so $x+${rb - 1}=${rk}(x+1)$. ` +
     `Expand and collect: $x+${rb - 1}=${rk}x+${rk}$. Subtract $x$ and ${rk} from both sides to get $x=${rx0}$. ` +
     `Since $x+${rb}=${rx0 + rb}\\neq 0$, the solution is valid, so Choice ${correctLetter} is correct. ` +
     `Choice ${slipLetter} is off by one from an arithmetic slip. ` +
     `Choice ${constLetter} comes from mishandling the $-1$ on the right side. ` +
     `Choice ${trapLetter} makes the denominator $x+${rb}$ equal to zero, so it is extraneous.`;

   return {
     questionText: `$$\\frac{${rk}(x+1)}{x+${rb}}=1-\\frac{1}{x+${rb}}$$\nWhat is the solution to the equation above?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: `$${rx0}$`,
     explanation: explanation
   };
 }
};
