import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: a4f61d75
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [constant: 12]
* - Difficulty factors: [Factoring, finding factor pairs, sum of roots]
* - Distractor patterns: [Not applicable - multi-accept fill in]
* - Constraints: [Two integer solutions, a>0]
* - Question type: [Fill-in-the-blank, Multi-accept]
* - Figure generation: [None]
*/

export const generator_a4f61d75 = {
 metadata: {
   // id: "a4f61d75",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate factor pairs of a number
   const product = getRandomInt(12, 20); // Like 12
   const pairs = [];
   
   // Find factor pairs (both negative since sum is positive and product positive)
   for (let i = 1; i <= Math.sqrt(product); i++) {
     if (product % i === 0) {
       const j = product / i;
       // Both negative: (-i, -j) gives sum -(i+j) and product ij
       // We want a = -(sum) = i+j > 0
       pairs.push(i + j);
     }
   }
   
   // STEP 2: Return multi-accept
   const validA = pairs.join(", ");
   
   return {
     questionText: `In the equation $x^2-ax+${product}=0$, $a$ is a constant and $a>0$. If the equation has two integer solutions, what is a possible value of $a$?`,
     figureCode: null,
     options: null,
     correctAnswer: validA,
     explanation: `The equation factors as $(x+c)(x+d)=0$ with $c$ and $d$ integers, $cd=${product}$, $c+d=a$. The integer pairs (both negative) are ${pairs.map(p => {
       // Reverse engineer pair from sum
       for (let i = 1; i < p; i++) {
         if (i * (p - i) === product) return `(-${i},-${p-i})`;
       }
       return '';
     }).filter(x => x).join(', ')}, so $a=${validA}$. Any of these values is acceptable.`
   };
 }
};

/**
* Question ID: 062f86db
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 5, -37, -24]
* - Difficulty factors: [Factoring quadratic, positive solution]
* - Distractor patterns: [A: 3/5 (wrong factor), B: 3 (other root), D: 37 (coefficient)]
* - Constraints: [Must factor to integers]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/