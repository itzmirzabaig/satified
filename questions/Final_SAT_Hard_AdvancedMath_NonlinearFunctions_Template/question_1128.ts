import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1128
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 10, max: 1034, time to max: 8, find h(10)]
 * - Difficulty factors: [Projectile height model, vertex form evaluation]
 * - Distractor patterns: [A: 234, B: 778, C: 970, D: 1014]
 * - Constraints: [Must compute h(10) using vertex form]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1128 = {
  metadata: {
    id: "1128",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const initial = getRandomInt(5, 20);
    const maxH = getRandomInt(500, 1200);
    const timeToMax = getRandomInt(5, 12);
    const evalTime = timeToMax + getRandomInt(2, 5);
    
    const a = Math.round((initial - maxH) / (timeToMax * timeToMax));
    const h_eval = a * Math.pow(evalTime - timeToMax, 2) + maxH;
    
    const optionsData = [
      { text: `$${Math.abs(h_eval - 200)}$`, isCorrect: false },
      { text: `$${Math.floor(h_eval * 0.8)}$`, isCorrect: false },
      { text: `$${h_eval}$`, isCorrect: true },
      { text: `$${maxH - 20}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `A quadratic models height above ground. Initial height is $${initial}$ feet, maximum is $${maxH}$ feet at ${timeToMax} seconds. What is the height at ${evalTime} seconds?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: h_eval.toString(),
      explanation: `Choice ${correctLetter} is correct. The model is $h(t)=${a}(t-${timeToMax})^2+${maxH}$. At $t=${evalTime}$: $h(${evalTime})=${a}(${evalTime-timeToMax})^2+${maxH}=${h_eval}$.`
    };
  }
};
