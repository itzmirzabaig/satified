import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 94b48cbf
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 7, 2, -31]
 * - Difficulty factors: [Finding intercepts, computing ratio b/a]
 * - Distractor patterns: [A: -7/2, B: -2/7, C: 2/7, D: 7/2 (correct)]
 * - Constraints: [Negative intercepts, positive ratio]
 * - Question type: [Text → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_94b48cbf = {
  metadata: {
    // id: "94b48cbf",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const a = getRandomInt(2, 10);
    const b = getRandomInt(2, 10);
    const c = -getRandomInt(20, 50); // Negative for negative intercepts
    
    // x-intercept: (-c/a, 0), y-intercept: (0, -c/b)
    const xInt = -c / a;
    const yInt = -c / b;
    const ratio = (yInt / xInt); // = a/b (both positive)
    
    // Simplify a/b
    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
    const divisor = gcd(a, b);
    const num = a / divisor;
    const den = b / divisor;
    
    const ratioStr = den === 1 ? num.toString() : `\\frac{${num}}{${den}}`;
    
    const optionsData = [
      { text: `$-\\frac{${a}}{${b}}$`, isCorrect: false, reason: "incorrectly keeps the negative sign" },
      { text: `$-\\frac{${b}}{${a}}$`, isCorrect: false, reason: "inverts and adds negative sign incorrectly" },
      { text: `$\\frac{${b}}{${a}}$`, isCorrect: false, reason: "inverts the ratio" },
      { text: `$${ratioStr}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `The graph of $${a}x + ${b}y = ${c}$ in the $xy$-plane has an $x$-intercept at $(a, 0)$ and a $y$-intercept at $(0, b)$, where $a$ and $b$ are constants. What is the value of $\\frac{b}{a}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: `${o.letter}. ${o.text}` })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. For x-intercept: $${a}x = ${c}$, so $x = \\frac{${c}}{${a}} = ${xInt}$. For y-intercept: $${b}y = ${c}$, so $y = \\frac{${c}}{${b}} = ${yInt}$. Therefore $\\frac{b}{a} = \\frac{${yInt}}{${xInt}} = ${ratioStr}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 98d3393a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [vertical line x=2]
 * - Difficulty factors: [Understanding perpendicular to vertical is horizontal]
 * - Distractor patterns: [A: 0 (correct), B: -1/2, C: -2, D: undefined]
 * - Constraints: [Horizontal line has slope 0]
 * - Question type: [Text → Multiple Choice Text]
 * - Figure generation: [None]
 */