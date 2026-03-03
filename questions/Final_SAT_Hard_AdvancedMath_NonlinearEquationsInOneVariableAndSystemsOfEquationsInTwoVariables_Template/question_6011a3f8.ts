import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 6011a3f8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [64x²+bx+25=0, find b for more than one solution (b²>6400)]
 * - Difficulty factors: [Discriminant > 0 condition, find which value satisfies]
 * - Distractor patterns: [A: -91/correct, B: -80 (disc=0), C: 5 (disc<0), D: 40 (disc<0)]
 * - Constraints: [Discriminant must be positive, only one option satisfies]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_6011a3f8 = {
  metadata: {
    // id: "6011a3f8",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: ax² + bx + c = 0, find which b gives discriminant > 0
    
    const a = getRandomInt(40, 80); // Like 64
    const c = getRandomInt(10, 30); // Like 25
    
    // Discriminant: b² - 4ac > 0 → b² > 4ac
    const threshold = Math.sqrt(4 * a * c);
    
    // Options: one with |b| > threshold (correct), one with |b| = threshold, two with |b| < threshold
    
    const correctB = -1 * Math.floor(threshold) - getRandomInt(5, 15); // Like -91
    const boundaryB = -Math.floor(threshold); // Like -80 (discriminant = 0)
    const wrongB1 = getRandomInt(2, Math.floor(threshold) - 5); // Like 5
    const wrongB2 = getRandomInt(Math.floor(threshold) - 15, Math.floor(threshold) - 5); // Like 40
    
    // STEP 2: Create options
    const optionsData = [
      { text: `$${correctB}$`, isCorrect: true },
      { text: `$${boundaryB}$`, isCorrect: false, reason: "gives discriminant equal to 0, so exactly one solution" },
      { text: `$${wrongB1}$`, isCorrect: false, reason: "gives negative discriminant, so no real solutions" },
      { text: `$${wrongB2}$`, isCorrect: false, reason: "gives negative discriminant, so no real solutions" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. For more than one real solution, the discriminant must be positive: $b^2-4(${a})(${c})>0$, so $b^2>${4*a*c}$. Thus $|b|>${Math.floor(threshold)}$. Of the choices, only $${correctB}$ satisfies this.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `$${a}x^2 + bx + ${c} = 0$\n\nIn the given equation, $b$ is a constant. For which of the following values of $b$ will the equation have more than one real solution?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};