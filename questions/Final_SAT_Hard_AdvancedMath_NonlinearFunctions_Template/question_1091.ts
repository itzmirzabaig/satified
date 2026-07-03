import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1091
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient a: negative, multiples of a: 15 and 7]
 * - Difficulty factors: [Absolute value with negative parameter, function evaluation]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [a < 0, products must yield clean integer]
 * - Question type: [Fill-in-the-blank function evaluation]
 * - Figure generation: [None]
 */

export const generator_1091 = {
  metadata: {
    id: "1091",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // g(x) = |x|/a - 14 where a < 0
    // g(ma) = |ma|/a - 14 = -m - 14 (since a < 0, |ma| = -ma)
    // g(na) = |na|/a - 14 = -n - 14
    // Product: (-m-14)(-n-14) = (m+14)(n+14)
    
    const m = getRandomInt(10, 20);
    let n = getRandomInt(5, 12);
    if (n === m) n = m - 1; // keep the two inputs distinct; m >= 10 keeps n in [5, 12]

    const val1 = -(m + 14);
    const val2 = -(n + 14);
    const product = val1 * val2;
    
    return {
      questionText: `The function $g$ is defined by $g(x)=\\frac{|x|}{a}-14$, where $a<0$. What is the product of $g(${m}a)$ and $g(${n}a)$?`,
      figureCode: null,
      options: [],
      correctAnswer: product.toString(),
      explanation: `Since $a<0$, the value $${m}a$ is negative, so $|${m}a|=-${m}a$. Thus $g(${m}a)=\\frac{-${m}a}{a}-14=-${m}-14=${val1}$. Similarly, $g(${n}a)=\\frac{-${n}a}{a}-14=-${n}-14=${val2}$. The product is $(${val1})(${val2})=${product}$.`
    };
  }
};
