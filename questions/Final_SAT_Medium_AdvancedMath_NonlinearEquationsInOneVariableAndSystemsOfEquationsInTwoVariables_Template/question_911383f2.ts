import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_911383f2 = {
 metadata: {
   // id: "911383f2",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate three distinct integer roots
   const r1 = getRandomInt(2, 6);
   const r2 = getRandomInt(-5, -2);
   const r3 = getRandomInt(1, 4);
   
   // STEP 2: Format factors with proper sign handling
   const factor1 = `(x-${r1})`;
   const factor2 = r2 >= 0 ? `(x-${r2})` : `(x+${Math.abs(r2)})`;
   const factor3 = r3 >= 0 ? `(x-${r3})` : `(x+${Math.abs(r3)})`;
   
   // STEP 3: Return with multi-accept format
   const roots = [r1, r2, r3].sort((a, b) => b - a); // Sort for consistent display
   
   return {
     questionText: `$$${factor1}${factor2}${factor3}=0$$\nWhat is a value of $x$ that satisfies the equation above?`,
     figureCode: null,
     options: null,
     correctAnswer: roots.join(", "),
     explanation: `The Zero Product Property states that if the product of several factors is zero, at least one must be zero. Set each factor to zero: $x-${r1}=0\\Rightarrow x=${r1}$, ${factor2}=0\\Rightarrow x=${r2}$, ${factor3}=0\\Rightarrow x=${r3}$. So, the solutions are $${r1}$, $${r2}$, and $${r3}$. Any of these values is acceptable.`
   };
 }
};

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