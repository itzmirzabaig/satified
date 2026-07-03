import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 629
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [constant: 30 (double-digit), subtracted value: 7]
* - Difficulty factors: [Difference of squares pattern, zero product property]
* - Distractor patterns: [Not applicable - multi-accept fill in]
* - Constraints: [Must simplify to (d-30)(d+30)=0]
* - Question type: [Fill-in-the-blank, Multi-accept]
* - Figure generation: [None]
*/

export const generator_629 = {
 metadata: {
   id: "629",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate random constant (difference of squares)
   const c = getRandomInt(10, 50); // Like 30
   const subValue = getRandomInt(2, 10); // Like 7

   // STEP 2: Calculate solutions
   // (d-c)(d+c) - subValue = -subValue => (d-c)(d+c) = 0 => d = ±c
   // The grader accepts a single typed value, so the question asks for the
   // positive solution (d = c); the explanation still derives both.
   const posSol = c;
   const negSol = -c;

   return {
     questionText: `$$(d-${c})(d+${c})-${subValue}=-${subValue}$$\nWhat is the positive solution to the given equation?`,
     figureCode: null,
     options: [],
     correctAnswer: `${posSol}`,
     explanation: `Adding ${subValue} to both sides of the given equation results in $(d-${c})(d+${c})=0$. By the zero product property, the product on the left-hand side equals zero when $d-${c}=0$ or $d+${c}=0$, so the two solutions are $d=${posSol}$ and $d=${negSol}$. The positive solution is $d=${posSol}$, so the correct answer is ${posSol}.`
   };
 }
};
