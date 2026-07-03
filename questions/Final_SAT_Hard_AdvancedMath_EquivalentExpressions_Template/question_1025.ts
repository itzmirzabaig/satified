import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1025
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [large constants, distribution and combining]
 * - Difficulty factors: [Careful distribution, combining like terms, computing a+b]
 * - Distractor patterns: [Distribution errors, sign errors, arithmetic errors]
 * - Constraints: [Result in form ay² + b, find a+b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1025 = {
  metadata: {
    id: "1025",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const baseC = getRandomInt(5000, 8000);
    const a = getRandomInt(50, 150);
    const n = getRandomInt(5, 15);
    const m = getRandomInt(800, 1200);
    
    // Calculate result
    const resultA = a + n * n;
    const resultB = baseC - n * m;
    const correctAnswer = resultA + resultB;
    
    // STEP 2: Question text
    const questionText = `The expression $$(${baseC}+${a}y^{2})+${n}(${n}y^{2}-${m})$$ can be written in the form $ay^{2}+b$, where $a$ and $b$ are constants. What is the value of $a+b$?`;
    
    // STEP 3: Explanation
    const explanation = `Distribute the ${n}:
$$(${baseC}+${a}y^{2})+(${n*n}y^{2}-${n*m})$$

Combine like terms:
- $y^{2}$ terms: $${a}y^{2} + ${n*n}y^{2} = ${resultA}y^{2}$
- Constants: $${baseC} - ${n*m} = ${resultB}$

So $a = ${resultA}$ and $b = ${resultB}$.

Therefore, $a+b = ${resultA} + ${resultB} = ${correctAnswer}$.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer.toString(),
      explanation: explanation
    };
  }
};
