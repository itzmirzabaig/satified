import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1136
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (x-2)² - 4]
 * - Difficulty factors: [Vertex form, minimum value]
 * - Distractor patterns: [A: -4 (correct), B: -2, C: 2, D: 4]
 * - Constraints: [Minimum is k in (x-h)² + k]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1136 = {
  metadata: {
    id: "1136",
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
