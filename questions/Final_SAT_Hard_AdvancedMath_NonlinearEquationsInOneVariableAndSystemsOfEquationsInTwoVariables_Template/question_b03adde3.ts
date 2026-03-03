import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: b03adde3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [u-3=6/(t-2), solve for t]
 * - Difficulty factors: [Rational equation, multiply by denominator, isolate variable]
 * - Distractor patterns: [A: 1/u, B: wrong algebra, C: 1/(u-3), D: 2u/(u-3)/correct]
 * - Constraints: [Multiple algebraic steps, combine fractions]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_b03adde3 = {
  metadata: {
    // id: "b03adde3",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: u - a = b/(t-c), solve for t
    
    const a = getRandomInt(2, 5);
    const b = getRandomInt(4, 10);
    const c = getRandomInt(2, 5);
    
    // u - a = b/(t-c)
    // (t-c)(u-a) = b
    // t - c = b/(u-a)
    // t = c + b/(u-a) = (c(u-a) + b)/(u-a) = (cu - ca + b)/(u-a)
    
    const numeratorCoeff = c; // coefficient of u in final answer
    const numeratorConst = b - c * a; // constant in numerator
    const denominator = `(u-${a})`;
    
    // Format answer: (cu + (b-ca))/(u-a)
    // If b - ca = 0, then it's cu/(u-a)
    // Original had 2u/(u-3), so c=2, a=3, b=6, and 6-2*3=0 ✓
    
    // Make it match: b = c*a so numerator is just cu
    const finalB = c * a;
    
    const correctAnswer = `\\frac{${c}u}{u-${a}}`;
    
    // STEP 2: Create distractors
    const distractorA = `\\frac{1}{u}`;
    const distractorB = `\\frac{${c}u+${finalB}}{u-${a}}`; // Wrong numerator
    const distractorC = `\\frac{1}{u-${a}}`;
    
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false, reason: "incorrectly inverts the relationship" },
      { text: `$${distractorB}$`, isCorrect: false, reason: "does not correctly simplify the numerator" },
      { text: `$${distractorC}$`, isCorrect: false, reason: "forgets to multiply by u in the numerator" },
      { text: `$${correctAnswer}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Multiplying both sides by $(t-${c})$: $(t-${c})(u-${a})=${finalB}$. Dividing by $(u-${a})$: $t-${c}=\\frac{${finalB}}{u-${a}}$. Adding ${c}: $t=\\frac{${finalB}}{u-${a}}+${c}=\\frac{${finalB}+${c}(u-${a})}{u-${a}}=\\frac{${c}u}{u-${a}}$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `If $u-${a}=\\frac{${finalB}}{t-${c}}$, what is $t$ in terms of $u$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 7dbd46d9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system 8x+y=-11, 2x²=y+341, find x²]
 * - Difficulty factors: [System with linear and quadratic, substitution, solve quadratic]
 * - Distractor patterns: [A: -15, B: -11, C: 121, D: 225/correct]
 * - Constraints: [Substitute linear into quadratic, get two possible x² values]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/7dbd46d9.ts