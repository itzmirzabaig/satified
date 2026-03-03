import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 133f3e41
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [equation with reciprocals, 20/p = 20/q - 20/r - 20/s]
 * - Difficulty factors: [Divide by common factor, combine fractions, solve for q]
 * - Distractor patterns: [A: p+r+s, B: 20(p+r+s), C: prs/(pr+ps+rs)/correct, D: wrong with 20s]
 * - Constraints: [Harmonic mean type formula, combine reciprocals]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_133f3e41 = {
  metadata: {
    // id: "133f3e41",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: k/p = k/q - k/r - k/s, solve for q
    
    const k = getRandomInt(10, 30); // Common factor
    // Variables p, r, s will be generic
    
    // Divide by k: 1/p = 1/q - 1/r - 1/s
    // 1/q = 1/p + 1/r + 1/s = (rs + ps + pr)/(prs)
    // q = prs/(rs + ps + pr) = prs/(pr + ps + rs)
    
    const correctAnswer = `\\frac{prs}{pr+ps+rs}`;
    
    // STEP 2: Create distractors
    const distractorA = `p+r+s`;
    const distractorB = `${k}(p+r+s)`;
    const distractorD = `\\frac{prs}{${k}p+${k}r+${k}s}`;
    
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false, reason: "incorrectly adds the variables instead of using reciprocal relationship" },
      { text: `$${distractorB}$`, isCorrect: false, reason: "incorrectly includes the common factor and uses addition" },
      { text: `$${correctAnswer}$`, isCorrect: true },
      { text: `$${distractorD}$`, isCorrect: false, reason: "incorrectly includes the common factor in the denominator" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Dividing by $${k}$: $\\frac{1}{p}=\\frac{1}{q}-\\frac{1}{r}-\\frac{1}{s}$. Rearranging: $\\frac{1}{q}=\\frac{1}{p}+\\frac{1}{r}+\\frac{1}{s}=\\frac{rs+ps+pr}{prs}$. Thus $q=\\frac{prs}{pr+ps+rs}$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `$\\frac{${k}}{p} = \\frac{${k}}{q} - \\frac{${k}}{r} - \\frac{${k}}{s}$\n\nThe given equation relates the positive variables $p, q, r,$ and $s$. Which of the following is equivalent to $q$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 5910bfff
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [dew point formula D=T-(9/25)(100-H), solve for H]
 * - Difficulty factors: [Literal equation, multiple steps, distribute negative]
 * - Distractor patterns: [A: correct, B: sign error, C: wrong sign on T, D: sign error]
 * - Constraints: [Algebraic manipulation, isolate H]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/5910bfff.ts