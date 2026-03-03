import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 70ebd3d0
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential decay interpretation - percent decrease
 * - Number ranges: [initialValue: 100-150, decayRate: 8-15%]
 * - Difficulty: Medium - understanding exponential decay rate interpretation
 * - Distractor patterns: Confusing linear vs exponential, wrong unit scale
 */

export const generator_70ebd3d0 = {
  metadata: {
    // id: "70ebd3d0",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const initialValue = getRandomInt(100, 150);
    const decayRate = getRandomInt(8, 15);
    const decayBase = 1 - (decayRate / 100);
    const percentDecrease = decayRate;
    const unitScale = 100; // d is in hundreds of meters

    const questionText = `The function $N(d)=${initialValue}(${decayBase.toFixed(2)})^{d}$ can be used to model the number of species of brachiopods at various ocean depths $d$, where $d$ is in hundreds of meters. Which of the following does the model predict?`;

    const correctAnswer = `For every increase in depth by ${unitScale} meters, the number of brachiopod species decreases by ${percentDecrease}%.`;

    const optionsData = [
      { text: `For every increase in depth by 1 meter, the number of brachiopod species decreases by ${initialValue}.`, isCorrect: false, reason: "treats the decrease as linear and uses the initial value as the amount" },
      { text: `For every increase in depth by 1 meter, the number of brachiopod species decreases by ${percentDecrease}%.`, isCorrect: false, reason: "forgets that d is in hundreds of meters, not single meters" },
      { text: `For every increase in depth by ${unitScale} meters, the number of brachiopod species decreases by ${initialValue}.`, isCorrect: false, reason: "treats the decrease as linear using initial value" },
      { text: `For every increase in depth by ${unitScale} meters, the number of brachiopod species decreases by ${percentDecrease}%.`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer,
      explanation: `Choice ${correctLetter} is correct. The base ${decayBase.toFixed(2)} represents a ${percentDecrease}% decrease, and since $d$ is in hundreds of meters, the decrease occurs every ${unitScale} meters.`
    };
  }
};

/**
 * Question ID: e1391dd6
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential growth (Moore's Law)
 * - Number ranges: [startYear: 1980-1990, initialTransistors: 200000-300000]
 * - Difficulty: Medium - requires understanding doubling time
 */
