import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 44076c7d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table: (-1,10), (0,14), (1,20), quadratic f(x) = x² + 5x + 14]
 * - Difficulty factors: [Finding quadratic from three points, testing values]
 * - Distractor patterns: [Various coefficient combinations]
 * - Constraints: [f(0) = 14 gives constant term, test other points]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_44076c7d = {
  metadata: {
    // id: "44076c7d",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: f(x) = x² + 5x + 14
    // Randomize: quadratic f(x) = ax² + bx + c with a=1, and table values
    const b = getRandomInt(3, 8); // linear coefficient
    const c = getRandomInt(10, 20); // constant/y-intercept
    const a = 1; // keep simple
    
    // STEP 2: Calculate table values
    const y_neg1 = a * 1 + b * (-1) + c; // 1 - b + c
    const y_0 = c;
    const y_1 = a * 1 + b * 1 + c; // 1 + b + c
    
    // STEP 3: Build table code
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">$x$</th><th style="border: 1px solid currentColor; padding: 8px;">$f(x)$</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">-1</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y_neg1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">0</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y_0}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">1</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y_1}</td></tr></tbody></table>`;
    
    // STEP 4: Build question text
    const questionText = `For the quadratic function $f$, the table shows three values of $x$ and their corresponding values of $f(x)$. Which equation defines $f$?`;
    
    // STEP 5: Create options with tracking
    const wrongA_b = b + 2;
    const wrongC_b = b + 4;
    
    const optionsData = [
      { text: `$f(x) = ${Math.floor(b/2)}x^2 + ${Math.floor(b/2)}x + ${c}$`, isCorrect: false, reason: "does not satisfy the table values" },
      { text: `$f(x) = x^2 + ${b}x + ${c}$`, isCorrect: true },
      { text: `$f(x) = ${Math.floor(b*1.5)}x^2 - x + ${c}$`, isCorrect: false, reason: "does not satisfy the table values" },
      { text: `$f(x) = ${Math.floor(b/5)}x^2 + ${b}x + ${c}$`, isCorrect: false, reason: "does not satisfy the table values" }
    ];
    
    // STEP 6: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$f(x) = x^2 + ${b}x + ${c}$`;
    
    // STEP 7: Build explanation with dynamic letters
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. From the table, $f(0) = ${c}$, so the constant term is ${c}. Testing $x=1$ in choice ${correctLetter}: $1^2 + ${b}(1) + ${c} = ${1 + b + c} = ${y_1}$ ✓. Testing $x=-1$: $(-1)^2 + ${b}(-1) + ${c} = 1 - ${b} + ${c} = ${y_neg1}$ ✓. This matches the table. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    // STEP 8: Return question data
    return {
      questionText: questionText,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 94741362
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [K = 0.5mv², m=4, K=18, v=3]
 * - Difficulty factors: [Kinetic energy formula, solving for velocity]
 * - Distractor patterns: [B: forgot 0.5 factor, C: v² instead of v, D: extreme value]
 * - Constraints: [v = sqrt(2K/m)]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - formula application]
 */