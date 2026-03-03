import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 1853bb35
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [45% decrease]
 * - Difficulty factors: [Percent decrease to decay factor]
 * - Distractor patterns: [A: 0.55(14)^x, B: 1.45(14)^x, C: 14(0.55)^x, D: 14(1.45)^x]
 * - Constraints: [Decay factor = 1 - 0.45 = 0.55]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1853bb35 = {
  metadata: {
    // id: "1853bb35",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const initial = getRandomInt(10, 30);
    const decrease = getRandomInt(30, 60);
    const decayFactor = (100 - decrease) / 100;
    
    const optionsData = [
      { text: `$q(x)=${decayFactor.toFixed(2)}(${initial})^x$`, isCorrect: false },
      { text: `$q(x)=${(1 + decrease/100).toFixed(2)}(${initial})^x$`, isCorrect: false },
      { text: `$q(x)=${initial}(${decayFactor.toFixed(2)})^x$`, isCorrect: true },
      { text: `$q(x)=${initial}(${(1 + decrease/100).toFixed(2)})^x$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `$q(0)=${initial}$ and $q$ decreases by ${decrease}% for each increase of $x$ by 1. Which defines $q$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$q(x)=${initial}(${decayFactor.toFixed(2)})^x$`,
      explanation: `Choice ${correctLetter} is correct. A ${decrease}% decrease means retaining ${100-decrease}%, or ${decayFactor.toFixed(2)}$. The initial value is ${initial}.`
    };
  }
};

/**
 * Question ID: 17833
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (1.84)^(x/4)]
 * - Difficulty factors: [Rewriting exponential, percent change]
 * - Distractor patterns: [A: 16, B: 21, C: 46, D: 96]
 * - Constraints: [(1.84)^(1/4) ≈ 1.16, so p ≈ 16]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */