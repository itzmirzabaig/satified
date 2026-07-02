import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1475
 * 
 * ANALYSIS:
 * - Context: Factoring Quadratics.
 * - Problem: x^2 + bx + k = 0 has integer solutions. Find possible b.
 * - Logic: If solutions are integers, discriminant is perfect square.
 *   Sum of factors of k = b.
 */
export const generator_1475 = {
  metadata: {
    id: "1475",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    // Select k with multiple factor pairs to make it interesting
    const kVals = [12, 18, 20, 24, 30, 36];
    const k = kVals[Math.floor(Math.random() * kVals.length)];
    
    // Find all factor pairs (m, n) such that m*n = k
    // b = m + n
    const possibleBs: number[] = [];
    for (let i = 1; i <= Math.sqrt(k); i++) {
      if (k % i === 0) {
        possibleBs.push(i + (k / i));
        // Also negative factors? "b is a constant". Usually implies magnitude or positive in these multiple choice contexts unless specified.
        // We will stick to positive b for the options.
      }
    }
    
    // Select one valid b as the correct answer
    const correctB = possibleBs[Math.floor(Math.random() * possibleBs.length)];
    
    // Generate distractors
    // 1. k + 2 (often close to k+1)
    const d1 = k + 2;
    // 2. A difference of factors (n - m) instead of sum
    const d2 = Math.abs((k/1) - 1); // k-1
    // 3. Random close number
    let d3 = correctB + 3;
    if (possibleBs.includes(d3)) d3 += 2; // Avoid accidental correct answer

    const optionsData = [
      { text: correctB.toString(), isCorrect: true },
      { text: d1.toString(), isCorrect: false },
      { text: d2.toString(), isCorrect: false },
      { text: d3.toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `In the equation $x^2 + bx + ${k} = 0$, $b$ is a positive constant. If the equation has two integer solutions, which of the following could be the value of $b$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
For the quadratic equation $x^2 + bx + ${k} = 0$ to have integer solutions, it must be factorable into $(x + m)(x + n) = 0$, where $m$ and $n$ are integers.
      
This implies:
1.  $m \\cdot n = ${k}$
2.  $m + n = b$

We look for factor pairs of ${k} whose sum equals one of the options.
The factor pairs of ${k} are:
${possibleBs.map((val, i) => {
   // Reverse engineer factors from sum logic roughly for explanation display? 
   // Actually better to just iterate:
   // We know possibleBs holds the sums.
   return `- Factors adding to ${val}`; 
}).join('\n')}

The value ${correctB} appears in our list of possible sums (factors of ${k} that add up to ${correctB}).`
    };
  }
};
