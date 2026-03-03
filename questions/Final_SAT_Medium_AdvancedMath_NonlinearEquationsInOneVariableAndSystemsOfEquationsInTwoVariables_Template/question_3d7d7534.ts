import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 3d7d7534
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [constant: 30 (double-digit), subtracted value: 7]
* - Difficulty factors: [Difference of squares pattern, zero product property]
* - Distractor patterns: [Not applicable - multi-accept fill in]
* - Constraints: [Must simplify to (d-30)(d+30)=0]
* - Question type: [Fill-in-the-blank, Multi-accept]
* - Figure generation: [None]
*/

export const generator_3d7d7534 = {
 metadata: {
   // id: "3d7d7534",
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
   const sol1 = c;
   const sol2 = -c;
   
   // STEP 3: Return with multi-accept format
   return {
     questionText: `$$(d-${c})(d+${c})-${subValue}=-${subValue}$$\nWhat is a solution to the given equation?`,
     figureCode: null,
     options: null,
     correctAnswer: `${sol1}, ${sol2}`,
     explanation: `The given equation is $(d-${c})(d+${c})-${subValue}=-${subValue}$. Add $${subValue}$ to both sides: $(d-${c})(d+${c})=0$. By the zero product property, $d-${c}=0$ or $d+${c}=0$, so $d=${sol1}$ or $d=${sol2}$. Both are solutions.`
   };
 }
};

/**
* Question ID: 911383f2
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [roots: 4, -2, 1 (small integers)]
* - Difficulty factors: [Zero product property, cubic equation]
* - Distractor patterns: [Not applicable - multi-accept fill in]
* - Constraints: [Three distinct integer roots]
* - Question type: [Fill-in-the-blank, Multi-accept]
* - Figure generation: [None]
*/