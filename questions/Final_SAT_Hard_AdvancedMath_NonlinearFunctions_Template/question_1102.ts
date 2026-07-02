import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1102
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 7, max: 51.1, time to max: 3]
 * - Difficulty factors: [Quadratic symmetry, projectile motion]
 * - Distractor patterns: [A: 3 (time to max), B: 6 (correct), C: 7 (initial height), D: 9 (arbitrary)]
 * - Constraints: [Symmetric around vertex, return to initial height at 2×time_to_max]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1102 = {
  metadata: {
    id: "1102",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const initialH = getRandomInt(5, 15);
    const maxH = getRandomInt(30, 80);
    const timeToMax = getRandomInt(2, 6);
    const answer = 2 * timeToMax;
    
    const optionsData = [
      { text: `$${timeToMax}$`, isCorrect: false },
      { text: `$${answer}$`, isCorrect: true },
      { text: `$${initialH}$`, isCorrect: false },
      { text: `$${answer + 3}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `A quadratic function models a projectile's height, in meters, above the ground. The model estimates that the projectile was launched from an initial height of $${initialH}$ meters and reached a maximum height of $${maxH}$ meters ${timeToMax} seconds after the launch. How many seconds after the launch does the model estimate that the projectile will return to a height of $${initialH}$ meters?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: answer.toString(),
      explanation: `Choice ${correctLetter} is correct. The parabola is symmetric about its vertex. Since the projectile starts at height $${initialH}$ at $t=0$ and reaches maximum at $t=${timeToMax}$, it returns to height $${initialH}$ at $t=2\\times${timeToMax}=${answer}$ seconds.`
    };
  }
};
