import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 5c00c2c1
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential growth from percentage rate
 * - Number ranges: [initialPop: 20-30, growthPercent: 12-20%]
 * - Difficulty: Medium - creating exponential model from percentage
 */

export const generator_5c00c2c1 = {
  metadata: {
    // id: "5c00c2c1",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const initialPop = getRandomInt(20, 30);
    const growthPercent = getRandomInt(12, 20);
    const growthFactor = 1 + (growthPercent / 100);
    const startYear = getRandomInt(1770, 1800);

    const questionText = `There were no jackrabbits in Australia before ${startYear} when ${initialPop} jackrabbits were introduced. By 1920 the population of jackrabbits had reached 10 billion. If the population had grown exponentially, this would correspond to a ${growthPercent}\% increase, on average, in the population each year. Which of the following functions best models the population of jackrabbits $t$ years after ${startYear}?`;

    const correctAnswer = `p(t)=${initialPop}(${growthFactor.toFixed(3)})^t`;

    const optionsData = [
      { text: `p(t)=${growthFactor.toFixed(3)}(${initialPop})^{t}`, isCorrect: false, reason: "swaps initial value and growth factor" },
      { text: `p(t)=${initialPop}(2)^{${growthFactor.toFixed(3)} t}`, isCorrect: false, reason: "uses base 2 with growth factor as coefficient incorrectly" },
      { text: `p(t)=${initialPop}(${growthFactor.toFixed(3)})^{t}`, isCorrect: true },
      { text: `p(t)=(${initialPop} \\cdot ${growthFactor.toFixed(3)})^{t}`, isCorrect: false, reason: "raises product to power instead of just base" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer,
      explanation: `Choice ${correctLetter} is correct. The initial population is ${initialPop}, and a ${growthPercent}\% increase gives a growth factor of ${growthFactor.toFixed(3)}. The model is $p(t) = ${initialPop}(${growthFactor.toFixed(3)})^t$.`
    };
  }
};

/**
 * Question ID: 70ebd3d0
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential decay interpretation
 * - Number ranges: [initial: 10000, decayRate: 12.7%]
 * - Difficulty: Medium
 */
