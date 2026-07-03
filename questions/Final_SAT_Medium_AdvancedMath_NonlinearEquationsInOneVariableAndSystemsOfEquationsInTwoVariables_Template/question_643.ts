import { getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 643
*
* ORIGINAL ANALYSIS:
* - Number ranges: [constant: 12]
* - Difficulty factors: [Factoring, finding factor pairs, sum of roots]
* - Distractor patterns: [Not applicable - fill in]
* - Constraints: [Two positive-integer roots, a > 0]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*
* FIX: The original returned several comma-separated values as the answer,
* which the grader (single typed number/fraction) cannot accept. We now ask
* for the LEAST possible value of a, which is a single, uniquely-determined
* integer: the smallest sum among the factor pairs of the constant.
*/

export const generator_643 = {
 metadata: {
   id: "643",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },

 generate: (): QuestionData => {
   // x^2 - a x + product = 0 with two positive-integer roots p, q means
   //   p + q = a,  p * q = product,  a > 0.
   // Every factor pair (p, q) of `product` yields a valid a = p + q.
   // We ask for the LEAST such a, which is the sum of the factor pair
   // closest to sqrt(product) -> a single unique integer answer.
   //
   // Curated composite constants, each with at least two distinct factor
   // pairs so "least possible" is a genuine (non-trivial) choice. Every value
   // here has its MINIMAL-sum pair made of two DISTINCT factors, so the two
   // solutions are always distinct positive integers (36 is excluded because
   // its closest pair is 6x6, a repeated root).
   const product = getRandomElement([12, 18, 20, 24, 28, 30, 40]);

   // All unordered factor pairs (p <= q) and their sums.
   const pairs: Array<[number, number]> = [];
   for (let p = 1; p * p <= product; p++) {
     if (product % p === 0) pairs.push([p, product / p]);
   }
   const sums = pairs.map(([p, q]) => p + q);
   const minSum = Math.min(...sums);
   const maxSum = Math.max(...sums); // = 1 + product (the pair 1 x product)

   // The factor pair achieving the least sum (closest to sqrt(product)).
   const [pMin, qMin] = pairs[sums.indexOf(minSum)];

   const pairList = pairs
     .map(([p, q]) => `$(${p},\\,${q})$`)
     .join(', ');

   return {
     questionText: `In the equation $x^2-ax+${product}=0$, $a$ is a constant and $a>0$. If the equation has two positive integer solutions, what is the least possible value of $a$?`,
     figureCode: null,
     options: [],
     correctAnswer: String(minSum),
     explanation: `If the two solutions are $p$ and $q$, then $x^2-ax+${product}=(x-p)(x-q)$, so $p+q=a$ and $pq=${product}$. ` +
       `The positive factor pairs of ${product} are ${pairList}, giving the sums ${sums.slice().sort((x, y) => x - y).join(', ')}. ` +
       `The smallest sum comes from the pair closest together, $(${pMin},\\,${qMin})$, so the least possible value is $a=${pMin}+${qMin}=${minSum}$. ` +
       `(The largest possible value would be $a=1+${product}=${maxSum}$.)`
   };
 }
};
