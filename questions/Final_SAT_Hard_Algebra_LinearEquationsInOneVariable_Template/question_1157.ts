import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1157
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [9, 7, 4 (single-digit sizes), 5 (multiplier), 22 (constant), 100 (total)]
 * - Difficulty factors: [Same structure as f14484a5 - setting up equation from word problem]
 * - Distractor patterns: [A: multiply by sizes, B: n of each with sizes, C: forgets the n for 7-inch]
 * - Constraints: [Must sum to 100 total screws]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1157 = {
  metadata: {
    id: "1157",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Draw sizes and counts so the resulting equation has a positive
    // integer solution for n. Bounded retry (never unbounded).
    let size1 = 0, size2 = 0, size3 = 0, multiplier = 0, constantCount = 0, totalItems = 0, nCoeff = 0;
    for (let tries = 0; tries < 50; tries++) {
      size1 = getRandomInt(8, 12); // larger length
      size2 = getRandomInt(6, 9);  // medium length (the variable n counts these)
      size3 = getRandomInt(3, 7);  // smaller length

      multiplier = getRandomInt(4, 7);
      constantCount = getRandomInt(15, 30);
      totalItems = getRandomInt(90, 130);

      nCoeff = multiplier + 1;                       // coefficient of n after combining
      const constSum = totalItems - constantCount;   // must be a positive multiple of nCoeff
      if (constSum > 0 && constSum % nCoeff === 0) break;
    }
    // Deterministic fallback guaranteeing a valid, self-consistent draw even if
    // the loop exhausts (keeps constSum a positive multiple of nCoeff).
    if ((totalItems - constantCount) <= 0 || (totalItems - constantCount) % nCoeff !== 0) {
      constantCount = 20;
      nCoeff = multiplier + 1;
      totalItems = constantCount + nCoeff * getRandomInt(8, 16); // >= 52, integer n in [8,16]
    }

    // STEP 3: Build equations
    const correctEquation = `${nCoeff}n + ${constantCount} = ${totalItems}`;
    const distractorA = `${size1}(${multiplier}n) + ${size2}n + ${size3}(${constantCount}) = ${totalItems}`;
    const distractorB = `${size1}n + ${size2}n + ${size3}n = ${totalItems}`;
    const distractorC = `${multiplier}n + ${constantCount} = ${totalItems}`;
    
    const optionsData = [
      { text: distractorA, isCorrect: false, reason: `this multiplies each screw count by its length in inches, which gives a total length rather than a total count of screws` },
      { text: distractorB, isCorrect: false, reason: `this treats the lengths (${size1}, ${size2}, ${size3}) as the numbers of screws and assumes there are $n$ screws of every size` },
      { text: distractorC, isCorrect: false, reason: `this omits the $n$ screws that are ${size2} inches long, counting only the ${size1}-inch screws ($${multiplier}n$) and the ${size3}-inch screws ($${constantCount}$)` },
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

Combine like terms ($${multiplier}n$ and $n$):
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
