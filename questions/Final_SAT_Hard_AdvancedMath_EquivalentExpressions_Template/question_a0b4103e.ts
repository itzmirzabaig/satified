import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: a0b4103e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractional coefficients, difference of squares pattern]
 * - Difficulty factors: [Recognizing difference of squares pattern, solving for k]
 * - Distractor patterns: [Square root of wrong term, forgetting to multiply by 3, arithmetic errors]
 * - Constraints: [k must be positive]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_a0b4103e = {
  metadata: {
    // id: "a0b4103e",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const n = getRandomInt(2, 5);
    const c = getRandomInt(2, 6);
    
    // (1/n)(x² - k²) = (1/n)x² - k²/n
    // So k²/n = c, thus k² = nc, k = √(nc)
    
    const kSquared = n * c;
    const k = Math.sqrt(kSquared);
    
    // STEP 2: Create options
    const correctAnswer = k === Math.floor(k) ? `$${k}$` : `$\\sqrt{${kSquared}}$`;
    
    const optionsData = [
      { text: `$${c}$`, isCorrect: false, reason: `this would give $(x-${c})(x+${c}) = x^{2} - ${c*c}$, so $\\frac{1}{${n}}(x^{2} - ${c*c}) = \\frac{1}{${n}}x^{2} - \\frac{${c*c}}{${n}} \\neq \\frac{1}{${n}}x^{2} - ${c}$` },
      { text: `$${n*c}$`, isCorrect: false, reason: `this would give $\\frac{1}{${n}}(x-${n*c})(x+${n*c}) = \\frac{1}{${n}}x^{2} - ${n*c}$, not $\\frac{1}{${n}}x^{2} - ${c}$` },
      { text: k === Math.floor(k) ? `$${k/2}$` : `$\\sqrt{${c}}$`, isCorrect: false, reason: `this would give a constant term of $-\\frac{${c}}{${n}}$, not $-${c}$` },
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
    const questionText = `The expression $\\frac{1}{${n}}x^{2}-${c}$ can be rewritten as $\\frac{1}{${n}}(x-k)(x+k)$, where $k$ is a positive constant. What is the value of $k$?`;
    
    // STEP 5: Explanation
    const explanation = `Choice ${correctLetter} is correct. Expand the rewritten form:
$$\\frac{1}{${n}}(x-k)(x+k) = \\frac{1}{${n}}(x^{2} - k^{2}) = \\frac{1}{${n}}x^{2} - \\frac{k^{2}}{${n}}$$

Set equal to the original expression $\\frac{1}{${n}}x^{2} - ${c}$:
$$\\frac{k^{2}}{${n}} = ${c}$$

Solve for $k$:
$$k^{2} = ${c} \\cdot ${n} = ${kSquared}$$
$$k = \\sqrt{${kSquared}} = ${k === Math.floor(k) ? k : `\\sqrt{${kSquared}}`}$$

Since $k$ is positive, $k = ${correctAnswer}$.

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

/**
 * Question ID: c6e85cd7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [exponential equation with cube root]
 * - Difficulty factors: [Converting between radical and rational exponent forms, solving exponential equation]
 * - Distractor patterns: [Wrong exponent arithmetic, forgetting to divide by 8]
 * - Constraints: [Must solve for c]
 * - Question type: [Fill-in-the-blank - fraction]
 * - Figure generation: [None]
 */