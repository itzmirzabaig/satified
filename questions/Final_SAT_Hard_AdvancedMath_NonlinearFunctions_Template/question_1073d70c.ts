import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 1073d70c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [40 comments, 190% increase each hour]
 * - Difficulty factors: [Percent increase to growth factor, exponential model]
 * - Distractor patterns: [A: 1.19, B: 1.9, C: 19, D: 2.9]
 * - Constraints: [190% increase means 290% of original, factor is 2.9]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1073d70c = {
  metadata: {
    // id: "1073d70c",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const initial = getRandomInt(20, 80);
    const increasePct = getRandomInt(120, 250);
    const growthFactor = (100 + increasePct) / 100;
    
    const optionsData = [
      { text: `$C=${initial}(${((100+increasePct)/1000).toFixed(2)})^t$`, isCorrect: false },
      { text: `$C=${initial}(${increasePct/100})^t$`, isCorrect: false },
      { text: `$C=${initial}(${increasePct})^t$`, isCorrect: false },
      { text: `$C=${initial}(${growthFactor})^t$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `An article has ${initial} comments. Each hour, comments increase by ${increasePct}%. Which models comments $C$ after $t$ hours?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$C=${initial}(${growthFactor})^t$`,
      explanation: `Choice ${correctLetter} is correct. A ${increasePct}% increase means multiplying by $1+\\frac{${increasePct}}{100}=${growthFactor}$. The model is $C=${initial}(${growthFactor})^t$.`
    };
  }
};

/**
 * Question ID: 1fe10d97
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [p(t) = 90000(1.06)^t, convert to monthly]
 * - Difficulty factors: [Time unit conversion, exponential model adjustment]
 * - Distractor patterns: [Various incorrect conversions]
 * - Constraints: [r(m) = 90000(1.06)^(m/12)]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */