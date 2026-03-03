import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 63be6c9a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 18, passes through (0,0) and (4,d)]
 * - Difficulty factors: [Parallel lines, finding y-coordinate]
 * - Distractor patterns: [A: y-intercept of original, B: slope, C: correct, D: using wrong equation]
 * - Constraints: [Clean integer result]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_63be6c9a = {
  metadata: {
    // id: "63be6c9a",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const slope = getRandomInt(10, 25);
    const x = getRandomInt(2, 8);
    const d = slope * x;
    const yIntOriginal = getRandomInt(1, 5);
    
    // STEP 2: Create options
    const optionsData = [
      { text: `$${yIntOriginal}$`, isCorrect: false },
      { text: `$${slope}$`, isCorrect: false },
      { text: `$${d}$`, isCorrect: true },
      { text: `$${d + yIntOriginal}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `In the $xy$-plane, line $s$ passes through the point $(0,0)$ and is parallel to the line represented by the equation $y=${slope}x+${yIntOriginal}$. If line $s$ also passes through the point $(${x},d)$, what is the value of $d$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. Since line $s$ is parallel to $y=${slope}x+${yIntOriginal}$, it has the same slope of ${slope}. Since line $s$ passes through $(0,0)$, its equation is $y=${slope}x$. Substituting $x=${x}$: $d=${slope}(${x})=${d}$.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-a04190b7.ts
/**
 * Question ID: a04190b7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [prices: 4.51, 6.07, total: 896.86]
 * - Difficulty factors: [Interpreting coefficient as unit price]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Direct interpretation]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */
