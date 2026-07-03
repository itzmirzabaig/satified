import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 639
*
* Zero-product property on a factored cubic (x - r1)(x - r2)(x - r3) = 0.
* r2 is negative, r1 and r3 are positive and forced distinct, so the three
* roots are distinct integers. The question asks for the GREATEST solution so
* the fill-in answer is a single, uniquely determined integer.
*
* FIXES:
* - correctAnswer was `roots.join(", ")` (e.g. "4, -2, 1") -> FILLIN_FORMAT,
*   because the fill-in grader compares against ONE value. Reworded the prompt
*   to "greatest value of x" and set correctAnswer to that single integer.
* - Guarded r1 != r3 so the factors are distinct (header promised distinct
*   roots; previously r1 and r3 could collide into a repeated factor).
* - Rebuilt the explanation with per-factor balanced $...$ and removed the
*   bare `$<digit>$` math that tripped the DOLLAR_RISK heuristic.
*/

export const generator_639 = {
 metadata: {
   id: "639",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },

 generate: (): QuestionData => {
   // STEP 1: three distinct integer roots (r2 < 0 < r1, r3; force r1 != r3).
   const r1 = getRandomInt(2, 6);
   const r2 = getRandomInt(-5, -2);
   let r3 = getRandomInt(1, 4);
   let tries = 0;
   while (r3 === r1 && tries++ < 50) {
     r3 = getRandomInt(1, 4);
   }

   // STEP 2: factors with proper sign handling.
   // subtracting a negative root becomes addition, e.g. root -3 -> (x + 3).
   const fac = (r: number) => (r >= 0 ? `(x-${r})` : `(x+${Math.abs(r)})`);
   const factor1 = fac(r1);
   const factor2 = fac(r2);
   const factor3 = fac(r3);

   // STEP 3: the greatest solution is a single, well-defined integer.
   const roots = [r1, r2, r3];
   const answer = Math.max(...roots);

   // Per-factor "set to zero" steps, each a self-contained math segment.
   const step = (r: number) =>
     r >= 0 ? `$x-${r}=0$ gives $x=${r}$` : `$x+${Math.abs(r)}=0$ gives $x=${r}$`;

   const explanation = `By the Zero Product Property, if a product of factors is zero, at least one factor must be zero. Setting each factor equal to zero: ${step(r1)}, ${step(r2)}, and ${step(r3)}. The solutions are $x=${r1}$, $x=${r2}$, and $x=${r3}$, so the greatest value of $x$ is ${answer}.`;

   return {
     questionText: `$$${factor1}${factor2}${factor3}=0$$
What is the greatest value of $x$ that satisfies the equation above?`,
     figureCode: null,
     options: [],
     correctAnswer: String(answer),
     explanation
   };
 }
};
