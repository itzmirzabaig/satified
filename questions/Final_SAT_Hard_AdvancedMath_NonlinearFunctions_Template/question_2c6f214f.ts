import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 2c6f214f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [first term: 9, common ratio: 4]
 * - Difficulty factors: [Geometric sequence, explicit formula]
 * - Distractor patterns: [A: 4(9^n), B: 4(9^(n-1)), C: 9(4^n), D: 9(4^(n-1))]
 * - Constraints: [Correct formula is a·r^(n-1)]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_2c6f214f = {
  metadata: {
    // id: "2c6f214f",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const a = getRandomInt(3, 12);
    const r = getRandomInt(2, 6);
    
    const optionsData = [
      { text: `$w=${r}(${a}^n)$`, isCorrect: false },
      { text: `$w=${r}(${a}^{n-1})$`, isCorrect: false },
      { text: `$w=${a}(${r}^n)$`, isCorrect: false },
      { text: `$w=${a}(${r}^{n-1})$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `The first term of a sequence is $${a}$. Each term after the first is $${r}$ times the preceding term. If $w$ represents the $n$th term of the sequence, which equation gives $w$ in terms of $n$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$w=${a}(${r}^{n-1})$`,
      explanation: `Choice ${correctLetter} is correct. For a geometric sequence with first term $${a}$ and common ratio $${r}$, the nth term is $w=${a}(${r})^{n-1}$.`
    };
  }
};

/**
 * Question ID: 781c2f6e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [a: integer 1-5, b: integer > a]
 * - Difficulty factors: [Exponential functions, equivalent forms, y-intercept identification]
 * - Distractor patterns: [A: I only, B: II only, C: I and II, D: Neither]
 * - Constraints: [Must analyze both forms carefully]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */