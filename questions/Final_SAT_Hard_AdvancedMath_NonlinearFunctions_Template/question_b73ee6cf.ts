import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: b73ee6cf
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [population 50000, 3% increase, target 60000]
 * - Difficulty factors: [Exponential growth setup, solving for time]
 * - Distractor patterns: [Various incorrect equation setups]
 * - Constraints: [Correct: 60000 = 50000(1.03)^t]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_b73ee6cf = {
  metadata: {
    // id: "b73ee6cf",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const initial = getRandomInt(30, 80) * 1000;
    const target = Math.round(initial * getRandomInt(12, 16) / 10);
    const rate = getRandomInt(2, 6);
    const growthFactor = 1 + rate / 100;
    
    const optionsData = [
      { text: `$${initial}=${target}(${(rate/100).toFixed(2)})^t$`, isCorrect: false },
      { text: `$${initial}=${target}(${rate})^t$`, isCorrect: false },
      { text: `$${target}=${initial}(${(rate/100).toFixed(2)})^t$`, isCorrect: false },
      { text: `$${target}=${initial}(${growthFactor.toFixed(2)})^t$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `Population is ${initial} and increases ${rate}% each year. Which equation estimates years $t$ to reach ${target}?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$${target}=${initial}(${growthFactor.toFixed(2)})^t$`,
      explanation: `Choice ${correctLetter} is correct. Exponential growth: final = initial × (growth factor)^time. So $${target}=${initial}(${growthFactor.toFixed(2)})^t$.`
    };
  }
};

/**
 * Question ID: 08d03fe4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(1) = k, find form showing k]
 * - Difficulty factors: [Exponential evaluation, form recognition]
 * - Distractor patterns: [Various forms, need f(1) visible as coefficient]
 * - Constraints: [If f(x) = 128(2)^(x-1), then f(1) = 128]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */