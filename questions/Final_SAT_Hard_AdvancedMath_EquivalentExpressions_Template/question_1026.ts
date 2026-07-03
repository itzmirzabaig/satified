import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1026
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [single fraction addition]
 * - Difficulty factors: [Common denominator, factoring, combining terms]
 * - Distractor patterns: [Adding denominators, wrong factoring, forgetting to multiply second term]
 * - Constraints: [k > 0]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_1026 = {
  metadata: {
    id: "1026",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters ($a$ and $k$ stay symbolic in the expression)
    const n = getRandomInt(30, 50);

    // STEP 2: Create options
    // na/k + nak = na/k + nak^2/k = na(k^2+1)/k
    const correctAnswer = `\\frac{${n}a(k^{2}+1)}{k}`;

    const optionsData = [
      { text: `\\frac{${2 * n}a}{k}`, isCorrect: false, reason: `this would be equivalent to $\\frac{${n}a}{k} + \\frac{${n}a}{k}$, which treats the second term as if it were $\\frac{${n}a}{k}$` },
      { text: `\\frac{${2 * n}ak^{2}}{k}`, isCorrect: false, reason: `this would be equivalent to $\\frac{${n}ak^{2}}{k} + \\frac{${n}ak^{2}}{k}$, which treats the first term as if it were also $\\frac{${n}ak^{2}}{k}$` },
      { text: `\\frac{${n}a(k+1)}{k}`, isCorrect: false, reason: `this would be equivalent to $\\frac{${n}a}{k} + ${n}a$, which results from rewriting the second term as $\\frac{${n}ak}{k}$ without multiplying its numerator by $k$` },
      { text: correctAnswer, isCorrect: true }
    ];
    
    // STEP 3: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Question text
    const questionText = `Which expression is equivalent to $\\frac{${n}a}{k} + ${n}ak$, where $k > 0$?`;
    
    // STEP 5: Explanation
    const explanation = `Choice ${correctLetter} is correct. To add these terms, rewrite them with a common denominator.

Since $\\frac{k}{k} = 1$, multiply the second term by $\\frac{k}{k}$:
$$\\frac{k}{k} \\cdot ${n}ak = \\frac{${n}ak^{2}}{k}$$

Now add:
$$\\frac{${n}a}{k} + \\frac{${n}ak^{2}}{k} = \\frac{${n}a + ${n}ak^{2}}{k}$$

Factor out ${n}a from the numerator:
$$\\frac{${n}a(1 + k^{2})}{k} = \\frac{${n}a(k^{2}+1)}{k}$$

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
