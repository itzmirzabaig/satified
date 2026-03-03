import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 717a1964
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 1, 10, -24]
* - Difficulty factors: [Factoring, one of two solutions]
* - Distractor patterns: [Not applicable - multi-accept fill in]
* - Constraints: [Must factor nicely]
* - Question type: [Fill-in-the-blank, Multi-accept]
* - Figure generation: [None]
*/

export const generator_717a1964 = {
 metadata: {
   // id: "717a1964",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate factorable quadratic
   // (z - r1)(z + r2) where r2 > r1
   const r1 = getRandomInt(1, 5);
   const r2 = getRandomInt(6, 15);
   
   const b = r2 - r1; // Coefficient of z
   const c = -r1 * r2; // Constant term
   
   // STEP 2: Return multi-accept
   return {
     questionText: `$$z^2+${b}z${c}=0$$\nWhat is one of the solutions to the given equation?`,
     figureCode: null,
     options: null,
     correctAnswer: `${r1}, -${r2}`,
     explanation: `Factor: $(z-${r1})(z+${r2})=0$. Solutions: $z=${r1}$ and $z=-${r2}$. Either is correct.`
   };
 }
};

/**
* Question ID: fad2f98c
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 3, -4, +5]
* - Difficulty factors: [Zero product property with three factors]
* - Distractor patterns: [A: -4 (wrong sign), C: 3 (coefficient), D: 5 (wrong sign)]
* - Constraints: [Solutions are 0, 4, -5]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/