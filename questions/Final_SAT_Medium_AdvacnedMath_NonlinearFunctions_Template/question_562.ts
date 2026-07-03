import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 562
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential growth from percentage rate
 * - Number ranges: [initialPop: 20-30, growthPercent: 12-20%]
 * - Difficulty: Medium - creating exponential model from percentage
 */

export const generator_562 = {
  metadata: {
    id: "562",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const initialPop = getRandomInt(20, 30);
    const growthPercent = getRandomInt(12, 20);
    // growthPercent is an integer, so the growth factor has exactly 2 decimals
    const factorStr = (1 + growthPercent / 100).toFixed(2);
    const startYear = getRandomInt(1770, 1800);

    const questionText = `There were no jackrabbits in Australia before ${startYear}, when ${initialPop} jackrabbits were introduced. By 1920 the jackrabbit population had reached approximately 10 billion. If the population had grown exponentially, this growth would correspond to a ${growthPercent}% increase, on average, in the population each year. Which of the following functions best models the population $p(t)$ of jackrabbits $t$ years after ${startYear}?`;

    const correctText = `$p(t)=${initialPop}(${factorStr})^{t}$`;

    const optionsData = [
      { text: `$p(t)=${factorStr}(${initialPop})^{t}$`, isCorrect: false, reason: `swaps the initial population and the growth factor; the initial population ${initialPop} must be the coefficient, and the growth factor ${factorStr} must be the base` },
      { text: `$p(t)=${initialPop}(2)^{${factorStr}t}$`, isCorrect: false, reason: `uses a base of 2, which models the population doubling, instead of using the growth factor ${factorStr} as the base` },
      { text: correctText, isCorrect: true, reason: '' },
      { text: `$p(t)=\\left(${initialPop} \\cdot ${factorStr}\\right)^{t}$`, isCorrect: false, reason: `raises the product of the initial population and the growth factor to the power $t$, instead of multiplying the initial population by the growth factor raised to the power $t$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. An exponential growth model has the form $p(t)=a(b)^{t}$, where $a$ is the initial value and $b$ is the growth factor per year. The initial population is ${initialPop}, and a ${growthPercent}% average increase each year gives a growth factor of $b=1+${(growthPercent / 100).toFixed(2)}=${factorStr}$. So the model is $p(t)=${initialPop}(${factorStr})^{t}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation
    };
  }
};
