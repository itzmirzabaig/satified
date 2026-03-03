import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f60aa0dc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 9, 8, constants: 2, 18]
 * - Difficulty factors: [Solving for expression 4-3x]
 * - Distractor patterns: [A is sign error, B is value of x, C is too small]
 * - Constraints: [Let u = 4-3x, solve 9u+2=8u+18]
 * - Question type: [Multiple Choice Text]
 */

export const generator_f60aa0dc = {
  metadata: {
    // id: "f60aa0dc",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation: a(expr) + b = c(expr) + d
    const a = getRandomInt(5, 10);
    const c = getRandomInt(3, a - 1); // c < a
    const b = getRandomInt(1, 5);
    const d = getRandomInt(10, 25);
    
    // Target expression value
    const targetValue = d - b; // Since (a-c)*u = d-b, u = (d-b)/(a-c)
    // But let's set it up so a*u + b = c*u + d
    // u = (d-b)/(a-c)
    
    // Expression: (e - f*x), we'll use (4-3x) pattern
    const e = getRandomInt(3, 6);
    const f = getRandomInt(2, 5);
    
    // Distractors
    const distractorA = -targetValue;
    const xValue = (e - targetValue) / f;
    const distractorB = Math.round(xValue);
    const distractorC = Math.round(targetValue / 4);
    
    const correctText = `${targetValue}`;
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false },
      { text: `$${distractorB}$`, isCorrect: false },
      { text: `$${distractorC}$`, isCorrect: false },
      { text: `$${targetValue}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    
    return {
      questionText: `If $${a}(${e}-${f}x)+${b}=${c}(${e}-${f}x)+${d}$, what is the value of $${e}-${f}x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Let $u = ${e}-${f}x$. Then $${a}u+${b}=${c}u+${d}$. Subtracting $${c}u$ from both sides: $${a-c}u+${b}=${d}$. Subtracting ${b}: $${a-c}u=${d-b}$. So $u=${targetValue}$.`
    };
  }
};

/**
 * Question ID: 8c515062
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 17, rate: 1oz/4hrs, remaining: 6, answer: 44]
 * - Difficulty factors: [Rate problem, units conversion]
 * - Distractor patterns: [A is division error, B is remaining amount, C uses remaining instead of evaporated]
 * - Constraints: [(Initial - Remaining) × Rate = Time]
 * - Question type: [Multiple Choice Text]
 */