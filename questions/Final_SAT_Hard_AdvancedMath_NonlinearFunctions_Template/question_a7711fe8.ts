import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: a7711fe8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (x-2)² - 4]
 * - Difficulty factors: [Vertex form, minimum value]
 * - Distractor patterns: [A: -4 (correct), B: -2, C: 2, D: 4]
 * - Constraints: [Minimum is k in (x-h)² + k]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_a7711fe8 = {
  metadata: {
    // id: "a7711fe8",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const h = getRandomInt(1, 6);
    const k = -getRandomInt(2, 8);
    
    const optionsData = [
      { text: `$${k}$`, isCorrect: true },
      { text: `$${k + 2}$`, isCorrect: false },
      { text: `$${h}$`, isCorrect: false },
      { text: `$${-k}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `What is the minimum of $f(x)=(x-${h})^2${k}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: k.toString(),
      explanation: `Choice ${correctLetter} is correct. In vertex form $f(x)=(x-h)^2+k$, the minimum value is $k=${k}$.`
    };
  }
};

/**
 * Question ID: 1a722d7d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [p(x) = ((x-c)² + 160)/(2c), p(c) = 10]
 * - Difficulty factors: [Rational function, solving for parameter, evaluation]
 * - Distractor patterns: [A: 10.00, B: 10.25, C: 10.75, D: 11.00]
 * - Constraints: [p(c) = 160/(2c) = 10, so c = 8, then p(12) = 11]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */