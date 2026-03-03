import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 48f83c34
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [height: 9, length: x, width: x-7]
 * - Difficulty factors: [Volume formula, dimension relationships]
 * - Distractor patterns: [A: x(x+9)(x+7), B: x(x+9)(x-7), C: x(x+11)(x-1), D: 9x(x-7)]
 * - Constraints: [V = 9 × x × (x-7)]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_48f83c34 = {
  metadata: {
    // id: "48f83c34",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const height = getRandomInt(6, 15);
    const diff = getRandomInt(4, 10);
    
    const optionsData = [
      { text: `$V(x)=x(x+${height})(x+${diff})$`, isCorrect: false },
      { text: `$V(x)=x(x+${height})(x-${diff})$`, isCorrect: false },
      { text: `$V(x)=x(x+${height+diff})(x-${diff-3})$`, isCorrect: false },
      { text: `$V(x)=${height}x(x-${diff})$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `A rectangular prism has height $${height}$. The base length is $x$, which is ${diff} more than the width. Which gives the volume?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$V(x)=${height}x(x-${diff})$`,
      explanation: `Choice ${correctLetter} is correct. Width is $x-${diff}$. Volume $V=${height}\\cdot x\\cdot(x-${diff})=${height}x(x-${diff})$.`
    };
  }
};