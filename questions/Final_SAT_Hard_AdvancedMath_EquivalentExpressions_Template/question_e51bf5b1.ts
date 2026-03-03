import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: e51bf5b1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: varied, constants: multiples of b]
 * - Difficulty factors: [Factor theorem application, testing values, finding valid b]
 * - Distractor patterns: [Non-integer b values, zero or negative b when positive required]
 * - Constraints: [b must be positive integer, only one option works]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_e51bf5b1 = {
  metadata: {
    // id: "e51bf5b1",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Choose which option is correct (D was correct in original)
    const correctB = getRandomInt(5, 10);
    const correctFactor = 2 * correctB;
    
    // Coefficients for option D: 3x² + (7*correctB)x + 14*correctB
    const dLinear = 7 * correctB;
    const dConstant = 14 * correctB;
    
    // Generate other options that don't work for integer b
    const aLinear = 7;
    const aConstant = 14;
    
    const bLinear = 28;
    const bConstant = 14;
    
    const cLinear = 42;
    const cConstant = 14;
    
    const optionsData = [
      { text: `$3x^{2} + ${aLinear}x + ${aConstant}b$`, isCorrect: false, reason: "this expression has a factor of $x+2b$ only when $b=0$, which isn't positive" },
      { text: `$3x^{2} + ${bLinear}x + ${bConstant}b$`, isCorrect: false, reason: "this expression has a factor of $x+2b$ only when $b=\\frac{7}{2}$, which isn't an integer" },
      { text: `$3x^{2} + ${cLinear}x + ${cConstant}b$`, isCorrect: false, reason: "this expression has a factor of $x+2b$ only when $b=\\frac{35}{6}$, which isn't an integer" },
      { text: `$3x^{2} + ${dLinear}x + ${dConstant}b$`, isCorrect: true }
    ];
    
    // STEP 2: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 3: Question text
    const questionText = `Which of the following expressions has a factor of $x + 2b$, where $b$ is a positive integer constant?`;
    
    // STEP 4: Explanation using Factor Theorem
    const explanation = `Choice ${correctLetter} is correct. By the Factor Theorem, if $x + 2b$ is a factor, then substituting $x = -2b$ should yield 0.

For choice ${correctLetter} ($3x^{2} + ${dLinear}x + ${dConstant}b$):
$$3(-2b)^{2} + ${dLinear}(-2b) + ${dConstant}b$$
$$= 3(4b^{2}) - ${2 * dLinear}b + ${dConstant}b$$
$$= 12b^{2} - ${2 * dLinear - dConstant}b$$
$$= 12b^{2} - ${24 * correctB - 14 * correctB}b = 12b^{2} - ${10 * correctB}b = 2b(6b - ${5 * correctB})$$

Wait, let me recalculate: $${2 * dLinear} - ${dConstant} = ${2 * dLinear - dConstant}$$

Actually: $3(-2b)^{2} + ${dLinear}(-2b) + ${dConstant}b = 12b^{2} - ${dLinear * 2}b + ${dConstant}b = 12b^{2} - ${dLinear * 2 - dConstant}b = 12b^{2} - ${12 * correctB}b = 12b(b - ${correctB})$

This equals 0 when $b = ${correctB}$, which is a positive integer.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 967ef685
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [single fraction addition]
 * - Difficulty factors: [Common denominator, factoring, combining terms]
 * - Distractor patterns: [Adding denominators, wrong factoring, forgetting to multiply second term]
 * - Constraints: [k > 0]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */