import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 2f51abc2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = |59-2x|, solve f(k) = 3k]
 * - Difficulty factors: [Absolute value equation, extraneous solution check]
 * - Distractor patterns: [A: 59/5, B: 59/2, C: 177/5, D: 59]
 * - Constraints: [Must check which solution is valid]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_2f51abc2 = {
  metadata: {
    // id: "2f51abc2",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const a = getRandomInt(40, 80);
    const b = getRandomInt(2, 5);
    const c = getRandomInt(2, 5);
    
    const sol1_num = a;
    const sol1_den = b + c;
    
    const optionsData = [
      { text: `$\\frac{${sol1_num}}{${sol1_den}}$`, isCorrect: true },
      { text: `$\\frac{${sol1_num}}{${b}}$`, isCorrect: false },
      { text: `$\\frac{${a * c}}{${sol1_den}}$`, isCorrect: false },
      { text: `$${a}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `The function $f$ is defined by $f(x)=|${a}-${b}x|$. For which of the following values of $k$ does $f(k)=${c}k$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$\\frac{${sol1_num}}{${sol1_den}}$`,
      explanation: `Choice ${correctLetter} is correct. We solve $|${a}-${b}k|=${c}k$. Case 1: ${a}-${b}k=${c}k$ gives $k=\\frac{${sol1_num}}{${sol1_den}}$. Case 2: $-(${a}-${b}k)=${c}k$ gives a negative solution which is invalid since ${c}k \\geq 0$.`
    };
  }
};

/**
 * Question ID: d139cf4b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(t) = 55t - 2t², g(t) = f(t) + 3]
 * - Difficulty factors: [Vertex of transformed quadratic, maximum value expression]
 * - Distractor patterns: [Various forms with 55/2, 55/4]
 * - Constraints: [Maximum at t = -b/(2a) = 55/4]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */