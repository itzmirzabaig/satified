import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 45bba652
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 3, sum: 5, target: 10]
 * - Difficulty factors: [Solving for expression x-5]
 * - Distractor patterns: [B is the constant in the expression, C is x value, D is x+5]
 * - Constraints: [5(x-5) = 10, so x-5 = 2]
 * - Question type: [Multiple Choice Text]
 */

export const generator_45bba652 = {
  metadata: {
    // id: "45bba652",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation: a(x-c) + b(x-c) = d
    const a = getRandomInt(2, 4);
    const b = getRandomInt(2, 4);
    const c = getRandomInt(3, 8);
    const targetValue = getRandomInt(2, 5); // value of (x-c)
    const d = (a + b) * targetValue;
    
    // Distractors
    const distractorA = c; // 5
    const distractorB = d / a; // wrong division
    const distractorC = targetValue + c; // x value
    const distractorD = targetValue + 2 * c; // x+5
    
    const correctText = `${targetValue}`;
    const optionsData = [
      { text: `$${targetValue}$`, isCorrect: true },
      { text: `$${distractorA}$`, isCorrect: false },
      { text: `$${distractorC}$`, isCorrect: false },
      { text: `$${distractorD}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    
    return {
      questionText: `If $${a}(x-${c})+${b}(x-${c})=${d}$, what is the value of $x-${c}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Let $u = x-${c}$. Then the equation becomes $${a}u+${b}u=${d}$, or $${a+b}u=${d}$. Therefore, $u=\\frac{${d}}{${a+b}}=${targetValue}$. The value of $x-${c}$ is ${targetValue}.`
    };
  }
};

/**
 * Question ID: eafdbbbd
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractions: 1/4, 1/3, result: -7, solution: 79]
 * - Difficulty factors: [Fractions with common binomial, negative result]
 * - Distractor patterns: [A is negative miscalculation, B makes terms zero, D is far off]
 * - Constraints: [(1/4 - 1/3)(x+5) = -7 → (-1/12)(x+5) = -7 → x+5 = 84 → x = 79]
 * - Question type: [Multiple Choice Text]
 */