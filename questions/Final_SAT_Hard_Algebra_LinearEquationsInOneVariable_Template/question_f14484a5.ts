import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: f14484a5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [10, 9, 7 (single-digit sizes), 4 (multiplier), 10 (constant), 100 (total)]
 * - Difficulty factors: [Setting up equation from word problem, distinguishing count vs size]
 * - Distractor patterns: [A: multiplies by sizes (perimeter confusion), B: assumes n of each type, C: forgets the n for 9-inch pans]
 * - Constraints: [Must sum to 100 total pans]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_f14484a5 = {
  metadata: {
    // id: "f14484a5",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving structure
    // Three pan sizes (single digits)
    let valid = false;
    let size1: number, size2: number, size3: number, multiplier: number, constantCount: number, totalPans: number, n: number, nCoeff: number;
    
    while (!valid) {
      size1 = getRandomInt(6, 12); // Large size
      size2 = getRandomInt(5, 9);  // Medium size (n refers to this)
      size3 = getRandomInt(4, 8);  // Small size
      
      multiplier = getRandomInt(3, 6);
      constantCount = getRandomInt(5, 15);
      totalPans = getRandomInt(80, 120);
      
      // STEP 2: Calculate n to verify the equation works
      // n + multiplier*n + constantCount = totalPans
      // (multiplier + 1)*n = totalPans - constantCount
      nCoeff = multiplier + 1;
      const constSum = totalPans - constantCount;
      
      // Ensure n is positive integer
      if (constSum > 0 && constSum % nCoeff === 0) {
        n = constSum / nCoeff;
        if (n > 0) {
          valid = true;
        }
      }
    }
    
    // STEP 3: Build equation options
    // Correct: multiplier*n + n + constantCount = totalPans → (multiplier+1)n + constantCount = totalPans
    const correctEquation = `${nCoeff}n + ${constantCount} = ${totalPans}`;
    
    // Distractor A: Multiply by sizes (perimeter/total length confusion)
    const distractorA = `${size1}(${multiplier}n) + ${size2}n + ${size3}(${constantCount}) = ${totalPans}`;
    
    // Distractor B: n of each, multiplied by sizes
    const distractorB = `${size1}n + ${size2}n + ${size3}n = ${totalPans}`;
    
    // Distractor C: Forgets the n for medium size
    const distractorC = `${multiplier}n + ${constantCount} = ${totalPans}`;
    
    // STEP 4: Create options
    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "this incorrectly multiplies the number of pans by their sizes, which would give total length, not total count" },
      { text: distractorB, isCorrect: false, reason: "this assumes there are n pans of each size and multiplies by size, which is incorrect" },
      { text: distractorC, isCorrect: false, reason: "this forgets to include the n ${size2}-inch pans themselves, only counting the ${size1}-inch pans (${multiplier}n) and ${size3}-inch pans (${constantCount})" },
      { text: correctEquation, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Let's break down the information given:
1. **Variable:** Let $n$ represent the number of ${size2}-inch frying pans made.
2. **${size1}-inch pans:** The number of ${size1}-inch pans is ${multiplier} times the number of ${size2}-inch pans. So, the number of ${size1}-inch pans is ${multiplier}n.
3. **${size3}-inch pans:** The number of ${size3}-inch pans is ${constantCount}.
4. **Total pans:** The total number of frying pans made is ${totalPans}.

The equation represents the sum of the quantities of each type of pan equaling the total.
* Number of ${size2}-inch pans = $n$
* Number of ${size1}-inch pans = ${multiplier}n
* Number of ${size3}-inch pans = ${constantCount}

Total = (${size1}-inch pans) + (${size2}-inch pans) + (${size3}-inch pans)
$${totalPans} = ${multiplier}n + n + ${constantCount}$

Now, combine like terms (${multiplier}n and $n$):
$${multiplier}n + 1n = ${nCoeff}n$

So the equation simplifies to:
$${correctEquation}$

Choice ${correctLetter} is correct.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.

Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.

Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `A manufacturing plant makes $${size1}$-inch, $${size2}$-inch, and $${size3}$-inch frying pans. During a certain day, the number of $${size1}$-inch frying pans that the manufacturing plant makes is $${multiplier}$ times the number $n$ of $${size2}$-inch frying pans it makes, and the number of $${size3}$-inch frying pans it makes is $${constantCount}$. During this day, the manufacturing plant makes $${totalPans}$ frying pans total. Which equation represents this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEquation,
      explanation: explanation
    };
  }
};

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

// File: generators/linear-equations-in-one-variable/38bf4e04.ts