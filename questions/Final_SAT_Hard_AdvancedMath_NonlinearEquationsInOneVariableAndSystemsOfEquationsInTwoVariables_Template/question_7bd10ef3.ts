import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 7bd10ef3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [missing equation, likely 2x²-4x=t or similar, discriminant<0 condition]
 * - Difficulty factors: [Determining parameter range for no real solutions]
 * - Distractor patterns: [Only one option satisfies t < -2]
 * - Constraints: [Equation not shown, inferred from pattern]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_7bd10ef3 = {
  metadata: {
    // id: "7bd10ef3",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Based on explanation pattern: equation like 2x² - 4x = t → 2x² - 4x - t = 0
    // Discriminant: 16 + 8t < 0 → t < -2
    // So answer is A: -3
    
    const a = getRandomInt(1, 4);
    const b = -2 * getRandomInt(2, 5); // Even, negative
    
    // For discriminant b² - 4ac < 0 where c = -t (from ax² + bx - t = 0)
    // b² + 4at < 0 → t < -b²/(4a)
    
    const threshold = -1 * (b * b) / (4 * a);
    
    // Options should be: one < threshold, others > threshold
    const correctValue = Math.floor(threshold) - 1; // Less than threshold
    const distractor1 = Math.floor(threshold) + 1; // Greater than threshold
    const distractor2 = Math.floor(threshold) + 3;
    const distractor3 = Math.floor(threshold) + 5;
    
    // STEP 2: Create options
    const optionsData = [
      { text: `$${correctValue}$`, isCorrect: true },
      { text: `$${distractor1}$`, isCorrect: false, reason: "is greater than the threshold, so the discriminant would be non-negative" },
      { text: `$${distractor2}$`, isCorrect: false, reason: "is greater than the threshold, so the discriminant would be non-negative" },
      { text: `$${distractor3}$`, isCorrect: false, reason: "is greater than the threshold, so the discriminant would be non-negative" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Rearranging the equation $${a}x^2 ${b}x = t$ gives $${a}x^2 ${b}x - t = 0$. For no real solutions, the discriminant must be negative: $(${b})^2-4(${a})(-t)<0$, which simplifies to $${b*b}+${4*a}t<0$, so $t<${threshold}$. Of the choices, only $${correctValue}$ satisfies this condition.`;
    
    return {
      questionText: `In the equation above, $t$ is a constant. If the equation has no real solutions, which of the following could be the value of $t$?\n\n$${a}x^2 ${b}x = t$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

/**
 * Question ID: e11294f9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [three quadratics, roots r,s and t,u, new quadratic with roots r+t and s+u, find c]
 * - Difficulty factors: [Vieta's formulas, sum of roots, completing the square, product calculation]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Multiple steps: find roots, sum them, calculate product for new quadratic]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/e11294f9.ts