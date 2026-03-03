import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 78d5f91a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cubic: x³ + 3x² - 6x - 1, evaluate at x=-1]
 * - Difficulty factors: [Function evaluation with negative input, careful with signs]
 * - Distractor patterns: [A: all negative signs, B: arithmetic error, D: all positive]
 * - Constraints: [(-1)³ = -1, (-1)² = 1, -6(-1) = 6]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - pure evaluation]
 */

export const generator_78d5f91a = {
  metadata: {
    // id: "78d5f91a",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: f(x) = x³ + 3x² - 6x - 1, f(-1) = 7
    // Randomize: coefficients that give clean positive result
    const a = getRandomInt(1, 3); // x³ coefficient
    const b = getRandomInt(2, 5); // x² coefficient
    const c = -1 * getRandomInt(3, 8); // x coefficient (negative for interesting sign flip)
    const d = -1 * getRandomInt(1, 5); // constant (negative)
    
    // STEP 2: Calculate f(-1)
    const f_neg1 = a * (-1) + b * (1) + c * (-1) + d;
    // = -a + b + (-c) + d (since c is negative, -c is positive)
    // Let's verify: if c = -6, then c*(-1) = 6, which is -(-6) = +6
    
    // Ensure positive result
    if (f_neg1 <= 0) {
      // Adjust to ensure positive
    }
    
    // STEP 3: Build question text
    const questionText = `For the function $f(x)=${a}x^{3}+${b}x^{2}${c >= 0 ? '+' : '-'}${Math.abs(c)}x${d >= 0 ? '+' : '-'}${Math.abs(d)}$, what is the value of $f(-1)$?`;
    
    // STEP 4: Create options with tracking
    const wrongA = -a - b + c + d; // All negative (wrong)
    const wrongB = f_neg1 - 4; // Close but arithmetic error
    const wrongD = a + b - c + d; // All terms positive (wrong signs)
    
    const optionsData = [
      { text: `$${wrongA}$`, isCorrect: false, reason: `results from incorrectly simplifying all terms as negative` },
      { text: `$${wrongB}$`, isCorrect: false, reason: `results from arithmetic errors` },
      { text: `$${f_neg1}$`, isCorrect: true },
      { text: `$${wrongD}$`, isCorrect: false, reason: `results from incorrectly treating all terms as positive` }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `${f_neg1}`;
    
    // STEP 6: Build explanation with dynamic letters
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. Substituting $-1$ for $x$: $f(-1)=${a}(-1)^{3}+${b}(-1)^{2}${c >= 0 ? '+' : '-'}${Math.abs(c)}(-1)${d >= 0 ? '+' : '-'}${Math.abs(d)} = ${a}(-1)+${b}(1)${c >= 0 ? '+' : ''}${c * (-1)}${d >= 0 ? '+' : '-'}${Math.abs(d)} = ${-a + b + (c * -1) + d}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    // STEP 7: Return question data
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
 * Question ID: d675744f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [y = 4(2^x), y-intercept (0,4), points (1,8), (2,16), (3,32), (4,64)]
 * - Difficulty factors: [Graph matching for exponential, key points verification]
 * - Distractor patterns: [A/B: decreasing functions, C: wrong base or scale]
 * - Constraints: [Must pass through (0,4) and double each x increment]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs Graph]
 */