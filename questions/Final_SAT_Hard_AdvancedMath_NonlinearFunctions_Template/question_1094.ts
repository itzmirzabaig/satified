import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1094
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [45% decrease]
 * - Difficulty factors: [Percent decrease to decay factor]
 * - Distractor patterns: [A: 0.55(14)^x, B: 1.45(14)^x, C: 14(0.55)^x, D: 14(1.45)^x]
 * - Constraints: [Decay factor = 1 - 0.45 = 0.55]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1094 = {
  metadata: {
    id: "1094",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const initial = getRandomInt(10, 30);
    const decrease = getRandomInt(30, 60);
    const decayStr = ((100 - decrease) / 100).toFixed(2);
    const growthStr = ((100 + decrease) / 100).toFixed(2);

    const correctText = `$q(x)=${initial}(${decayStr})^x$`;

    const optionsData = [
      { key: 'correct', text: correctText, isCorrect: true },
      { key: 'swapDecay', text: `$q(x)=${decayStr}(${initial})^x$`, isCorrect: false },
      { key: 'swapGrowth', text: `$q(x)=${growthStr}(${initial})^x$`, isCorrect: false },
      { key: 'growth', text: `$q(x)=${initial}(${growthStr})^x$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.key === 'correct')!.letter;
    const swapDecayLetter = shuffledOptions.find(o => o.key === 'swapDecay')!.letter;
    const swapGrowthLetter = shuffledOptions.find(o => o.key === 'swapGrowth')!.letter;
    const growthLetter = shuffledOptions.find(o => o.key === 'growth')!.letter;

    return {
      questionText: `The function $q$ is such that $q(0)=${initial}$, and the value of $q(x)$ decreases by ${decrease}% for each increase of $x$ by $1$. Which of the following equations defines $q$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. A ${decrease}% decrease for each increase of $x$ by $1$ means the value retains ${100 - decrease}% of its previous value, so the decay factor is $\\frac{${100 - decrease}}{100}=${decayStr}$. Since $q(0)=${initial}$, the initial value is ${initial}, giving $q(x)=${initial}(${decayStr})^x$. Choice ${swapDecayLetter} is incorrect; it swaps the initial value and the decay factor. Choice ${growthLetter} is incorrect because a base of ${growthStr} models a ${decrease}% increase, not a decrease. Choice ${swapGrowthLetter} is incorrect; it uses the growth factor ${growthStr} and also swaps it with the initial value.`
    };
  }
};
