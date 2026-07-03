import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 635
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 1, 10, -24]
* - Difficulty factors: [Factoring, one of two solutions]
* - Distractor patterns: [Not applicable - multi-accept fill in]
* - Constraints: [Must factor nicely]
* - Question type: [Fill-in-the-blank, Multi-accept]
* - Figure generation: [None]
*/

export const generator_635 = {
 metadata: {
   id: "635",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate factorable quadratic
   // (z - r1)(z + r2) = z^2 + (r2 - r1)z - r1*r2, with r2 > r1 so the roots
   // are one positive (r1) and one negative (-r2) — "positive solution" is
   // always unambiguous, and b = r2 - r1 >= 1 is always positive.
   const r1 = getRandomInt(1, 5);
   const r2 = getRandomInt(6, 15);

   const b = r2 - r1; // Coefficient of z (1..14, never 0)
   const c = -r1 * r2; // Constant term (always negative, renders its own minus sign)
   const bTerm = b === 1 ? 'z' : `${b}z`;

   // STEP 2: Ask for the positive solution so the fill-in answer is a single
   // plain integer (the grader accepts exactly one typed value).
   return {
     questionText: `$$z^2+${bTerm}${c}=0$$\nWhat is the positive solution to the given equation?`,
     figureCode: null,
     options: [],
     correctAnswer: `${r1}`,
     explanation: `The left-hand side of the given equation factors as $(z-${r1})(z+${r2})$, since $-${r1} \\cdot ${r2} = ${c}$ and $-${r1} + ${r2} = ${b}$. Setting each factor equal to zero gives the solutions $z=${r1}$ and $z=-${r2}$. The positive solution is $z=${r1}$.`
   };
 }
};
