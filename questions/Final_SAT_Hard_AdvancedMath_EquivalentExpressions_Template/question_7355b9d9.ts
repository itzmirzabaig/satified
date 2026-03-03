import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 7355b9d9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [factor theorem application with parameters]
 * - Difficulty factors: [Factor theorem, substituting root, solving for parameter n]
 * - Distractor patterns: [Wrong sign on n, reciprocal errors, fraction errors]
 * - Constraints: [k > 0, factor is k-x]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_7355b9d9 = {
  metadata: {
    // id: "7355b9d9",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const m = getRandomInt(20, 40);
    const coef = -1;
    
    // If factor is (k-x), then root is x=k
    // P(k) = -k² + (1/m)nk² = 0
    // So (1/m)n = 1, thus n = m
    
    const correctN = m;
    
    // STEP 2: Create options
    const optionsData = [
      { text: `$-${m}$`, isCorrect: false, reason: "may result from an error when determining the sign of n" },
      { text: `$-\\frac{1}{${m}}$`, isCorrect: false, reason: "may result from confusing the reciprocal relationship" },
      { text: `$\\frac{1}{${m}}$`, isCorrect: false, reason: "may result from a partial solution without clearing the fraction properly" },
      { text: `$${m}$`, isCorrect: true }
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
    const questionText = `If $k-x$ is a factor of the expression $-x^{2}+\\frac{1}{${m}}nk^{2}$, where $n$ and $k$ are constants and $k>0$, what is the value of $n$?`;
    
    // STEP 5: Explanation
    const explanation = `Choice ${correctLetter} is correct. By the Factor Theorem, if $k-x$ is a factor, then substituting $x=k$ makes the expression equal to zero.

Set $x=k$:
$$-(k)^{2}+\\frac{1}{${m}}nk^{2} = 0$$
$$-k^{2}+\\frac{nk^{2}}{${m}} = 0$$

Since $k>0$, we can divide by $k^{2}$:
$$-1+\\frac{n}{${m}} = 0$$
$$\\frac{n}{${m}} = 1$$
$$n = ${m}$$

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$${m}$`,
      explanation: explanation
    };
  }
};