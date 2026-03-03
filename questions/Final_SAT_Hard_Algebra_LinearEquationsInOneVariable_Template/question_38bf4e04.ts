import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 38bf4e04
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [9, 7, 4 (single-digit sizes), 5 (multiplier), 22 (constant), 100 (total)]
 * - Difficulty factors: [Same structure as f14484a5 - setting up equation from word problem]
 * - Distractor patterns: [A: multiply by sizes, B: n of each with sizes, C: forgets the n for 7-inch]
 * - Constraints: [Must sum to 100 total screws]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_38bf4e04 = {
  metadata: {
    // id: "38bf4e04",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (similar structure to f14484a5)
    let valid = false;
    let size1: number, size2: number, size3: number, multiplier: number, constantCount: number, totalItems: number, nCoeff: number;
    
    while (!valid) {
      size1 = getRandomInt(8, 12); // Large size
      size2 = getRandomInt(6, 9);  // Medium size (n refers to this)
      size3 = getRandomInt(3, 7);  // Small size
      
      multiplier = getRandomInt(4, 7);
      constantCount = getRandomInt(15, 30);
      totalItems = getRandomInt(90, 130);
      
      // STEP 2: Verify integer solution
      nCoeff = multiplier + 1;
      const constSum = totalItems - constantCount;
      
      if (constSum > 0 && constSum % nCoeff === 0) {
        valid = true;
      }
    }
    
    // STEP 3: Build equations
    const correctEquation = `${nCoeff}n + ${constantCount} = ${totalItems}`;
    const distractorA = `${size1}(${multiplier}n) + ${size2}n + ${size3}(${constantCount}) = ${totalItems}`;
    const distractorB = `${size1}n + ${size2}n + ${size3}n = ${totalItems}`;
    const distractorC = `${multiplier}n + ${constantCount} = ${totalItems}`;
    
    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "this multiplies the count of each screw by its length, which would give total length, not total count" },
      { text: distractorB, isCorrect: false, reason: "this assumes there are n screws of each size and multiplies by length" },
      { text: distractorC, isCorrect: false, reason: "this misses the n screws of ${size2}-inch length, only counting ${size1}-inch and ${size3}-inch screws" },
      { text: correctEquation, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Let's break down the problem to find the total number of screws. We are told the total is ${totalItems}.

The total number of screws is the sum of the ${size1}-inch, ${size2}-inch, and ${size3}-inch screws.
$$Total = (\\text{number of } ${size1}\\text{-inch}) + (\\text{number of } ${size2}\\text{-inch}) + (\\text{number of } ${size3}\\text{-inch})$$
$$${totalItems} = (\\text{number of } ${size1}\\text{-inch}) + (\\text{number of } ${size2}\\text{-inch}) + (\\text{number of } ${size3}\\text{-inch})$$

Now let's find the expression for each type of screw based on the variable $n$:
1.  **${size2}-inch screws:** The problem states there are $n$ number of ${size2}-inch concrete screws.
    *   $\\text{Number of } ${size2}\\text{-inch} = n$
2.  **${size1}-inch screws:** The problem states "the number of ${size1}-inch concrete screws that the factory makes is ${multiplier} times the number $n$ of ${size2}-inch concrete screws".
    *   $\\text{Number of } ${size1}\\text{-inch} = ${multiplier}n$
3.  **${size3}-inch screws:** The problem states "the number of ${size3}-inch concrete screws is ${constantCount}".
    *   $\\text{Number of } ${size3}\\text{-inch} = ${constantCount}$

Now, substitute these expressions back into the total equation:
$$Total = (${multiplier}n) + (n) + (${constantCount})$$
We know the total is ${totalItems}.
$$${totalItems} = ${multiplier}n + n + ${constantCount}$$

Combine like terms (${multiplier}n and $n$):
$$${multiplier}n + 1n = ${nCoeff}n$$
So, the equation becomes:
$$${correctEquation}$$

Choice ${correctLetter} is correct.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.

Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.

Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `A factory makes $${size1}$-inch, $${size2}$-inch, and $${size3}$-inch concrete screws. During a certain day, the number of $${size1}$-inch concrete screws that the factory makes is $${multiplier}$ times the number $n$ of $${size2}$-inch concrete screws, and the number of $${size3}$-inch concrete screws is $${constantCount}$. During this day, the factory makes $${totalItems}$ concrete screws total. Which equation represents this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEquation,
      explanation: explanation
    };
  }
};

/**
 * Question ID: b7e6394d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [100 (miles), 25 (mpg), $5 (savings), $4 (cost)]
 * - Difficulty factors: [Setting up equation for savings, cost per mile calculation]
 * - Distractor patterns: [A, B: use reciprocal 25/4 (miles per dollar), C: uses 95 = 100-5 confusing miles with dollars]
 * - Constraints: [m must result in $5 savings]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/linear-equations-in-one-variable/b7e6394d.ts