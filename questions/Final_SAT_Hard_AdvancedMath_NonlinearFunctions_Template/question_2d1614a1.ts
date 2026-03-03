import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 2d1614a1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [P(t) = 290(1.04)^(4t/6)]
 * - Difficulty factors: [Exponential growth rate interpretation]
 * - Distractor patterns: [A: 0.38, B: 1.04, C: 4, D: 6]
 * - Constraints: [18 months = 1.5 years, growth factor over 18 months is 1.04]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_2d1614a1 = {
  metadata: {
    // id: "2d1614a1",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const P0 = getRandomInt(200, 400);
    const rate = (getRandomInt(102, 110) / 100);
    const months = getRandomInt(12, 24);
    
    const growth = Math.pow(rate, months / 12);
    const percentIncrease = Math.round((growth - 1) * 100);
    
    const optionsData = [
      { text: `$${(percentIncrease / 100).toFixed(2)}$`, isCorrect: false },
      { text: `$${rate.toFixed(2)}$`, isCorrect: false },
      { text: `$${percentIncrease}$`, isCorrect: true },
      { text: `$${Math.round(months / 3)}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `The function $P$ models the population, in thousands, of a city $t$ years after 2005: $P(t)=${P0}(${rate.toFixed(2)})^{\\frac{${months}t}{12}}$. At this rate, the population increases by $n% every ${months} months. What is $n$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: percentIncrease.toString(),
      explanation: `Choice ${correctLetter} is correct. Over ${months} months ($\\frac{${months}}{12}$ years), the growth factor is $(${rate.toFixed(2)})^{\\frac{${months}}{12}}\\approx${growth.toFixed(2)}$. This is a ${percentIncrease}% increase.`
    };
  }
};

/**
 * Question ID: 01668cd6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 33(0.4)^(x+3), g(x) = 33(0.16)(0.4)^(x-2)]
 * - Difficulty factors: [Exponential equivalent forms, maximum value display]
 * - Distractor patterns: [A: I only, B: II only, C: I and II, D: Neither]
 * - Constraints: [Analyze which form shows max value as coefficient]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */