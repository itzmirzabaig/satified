import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 7eed640d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h(x) = -16x² + 100x + 10]
 * - Difficulty factors: [Quadratic context, x-intercept interpretation]
 * - Distractor patterns: [A: initial height, B: max height, C: time at max, D: time when hits ground]
 * - Constraints: [Positive x-intercept is when projectile hits ground]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_7eed640d = {
  metadata: {
    // id: "7eed640d",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const optionsData = [
      { text: `The initial height`, isCorrect: false },
      { text: `The maximum height`, isCorrect: false },
      { text: `The time at maximum height`, isCorrect: false },
      { text: `The time when the projectile hits the ground`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `$h(x)=-16x^2+100x+10$ models projectile height. What does the positive x-intercept represent?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `The time when the projectile hits the ground`,
      explanation: `Choice ${correctLetter} is correct. The x-intercept is where $h(x)=0$, meaning height is 0 (ground level). The positive intercept is when the projectile lands.`
    };
  }
};

/**
 * Question ID: 43926bd9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(1)=a, f(2)=a^5, f(3)=a^9, f(k)=a^29]
 * - Difficulty factors: [Exponential pattern recognition, solving for k]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Pattern: f(x) = a^(4x-3), so 4k-3=29, k=8]
 * - Question type: [Table→Fill-in-the-blank]
 * - Figure generation: [HTML Table required]
 */