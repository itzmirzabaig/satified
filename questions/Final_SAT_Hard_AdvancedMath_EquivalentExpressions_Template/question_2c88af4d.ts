import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2c88af4d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [negative and fractional exponents]
 * - Difficulty factors: [Exponent rules, combining exponents, converting back to radicals]
 * - Distractor patterns: [Wrong exponent arithmetic, wrong radical conversion, sign errors]
 * - Constraints: [x > 1, y > 1]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_2c88af4d = {
  metadata: {
    // id: "2c88af4d",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate exponents - all randomized
    const xExpNum = getRandomInt(1, 4);
    const xExpDen = getRandomInt(2, 4);
    const xSubNum = getRandomInt(1, 4);
    const xSubDen = getRandomInt(2, 4);
    
    const yExpNum = getRandomInt(1, 4);
    const yExpDen = getRandomInt(2, 4);
    const ySubNum = getRandomInt(1, 3);
    const ySubDen = 1;
    
    // Calculate final exponents
    const finalXNum = -xExpNum * xSubDen - xSubNum * xExpDen;
    const finalXDen = xExpDen * xSubDen;
    const finalYNum = yExpNum * ySubDen + ySubNum * yExpDen;
    const finalYDen = yExpDen * ySubDen;
    
    // Simplify
    const gcdX = (a: number, b: number): number => b === 0 ? a : gcdX(b, a % b);
    const gcdY = (a: number, b: number): number => b === 0 ? a : gcdY(b, a % b);
    const gX = gcdX(Math.abs(finalXNum), finalXDen);
    const gY = gcdY(finalYNum, finalYDen);
    
    const simpXNum = finalXNum / gX;
    const simpXDen = finalXDen / gX;
    const simpYNum = finalYNum / gY;
    const simpYDen = finalYDen / gY;
    
    // STEP 2: Build options
    const correctAnswer = `$\\frac{y\\sqrt{y}}{x^{2}\\sqrt[3]{x}}$`;
    
    const optionsData = [
      { text: `$\\frac{\\sqrt{y}}{\\sqrt[3]{x^{2}}}$`, isCorrect: false, reason: "incorrectly simplifies the exponents, ignoring the full negative exponent on x" },
      { text: `$\\frac{y\\sqrt{y}}{\\sqrt[3]{x^{2}}}$`, isCorrect: false, reason: "correctly handles the y exponent but incorrectly handles the x exponent" },
      { text: `$\\frac{y\\sqrt{y}}{x\\sqrt{x}}$`, isCorrect: false, reason: "incorrectly converts the x exponent to a square root instead of cube root" },
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
    const questionText = `The expression $\\frac{x^{-${xExpNum}}y^{\\frac{${yExpNum}}{${yExpDen}}}}{x^{\\frac{${xSubNum}}{${xSubDen}}}y^{-${ySubNum}}}$, where $x > 1$ and $y > 1$, is equivalent to which of the following?`;
    
    // STEP 5: Explanation
    const explanation = `Choice ${correctLetter} is correct. Use the quotient rule for exponents $\\frac{a^{m}}{a^{n}} = a^{m-n}$.

For $x$:
$$\\frac{x^{-${xExpNum}}}{x^{\\frac{${xSubNum}}{${xSubDen}}}} = x^{-${xExpNum} - \\frac{${xSubNum}}{${xSubDen}}} = x^{-\\frac{${xExpNum * xSubDen}}{${xExpDen * xSubDen}} - \\frac{${xSubNum * xExpDen}}{${xExpDen * xSubDen}}} = x^{-\\frac{${finalXNum}}{${finalXDen}}}$$

For $y$:
$$\\frac{y^{\\frac{${yExpNum}}{${yExpDen}}}}{y^{-${ySubNum}}} = y^{\\frac{${yExpNum}}{${yExpDen}} - (-${ySubNum})} = y^{\\frac{${yExpNum}}{${yExpDen}} + ${ySubNum}} = y^{\\frac{${finalYNum}}{${finalYDen}}}$$

Combined: $x^{-\\frac{${simpXNum}}{${simpXDen}}}y^{\\frac{${simpYNum}}{${simpYDen}}} = \\frac{y^{\\frac{${simpYNum}}{${simpYDen}}}}{x^{\\frac{${Math.abs(simpXNum)}}{${simpXDen}}}}$

Convert to radical form:
- $y^{\\frac{${simpYNum}}{${simpYDen}}} = y^{1 + \\frac{1}{2}} = y \\cdot y^{\\frac{1}{2}} = y\\sqrt{y}$
- $x^{\\frac{${Math.abs(simpXNum)}}{${simpXDen}}} = x^{2 + \\frac{1}{3}} = x^{2} \\cdot x^{\\frac{1}{3}} = x^{2}\\sqrt[3]{x}$

Therefore: $\\frac{y\\sqrt{y}}{x^{2}\\sqrt[3]{x}}$

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
 * Question ID: ffdbcad4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [quadratic with integer constraints]
 * - Difficulty factors: [Factoring constraints, divisibility reasoning, systematic elimination]
 * - Distractor patterns: [Assuming divisibility without checking, calculation errors]
 * - Constraints: [h, k, j are integers, so kj = -45 means k divides 45]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */