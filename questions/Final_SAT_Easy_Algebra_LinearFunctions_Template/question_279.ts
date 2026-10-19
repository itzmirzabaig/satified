import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 279
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [growthRate: 4.1-6.9, initialLength: 140-180]
 * - Difficulty factors: [Modeling growth]
 * - Distractor patterns: [reversed values, 12-month growth as monthly rate, no starting length]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_279 = {
  metadata: {
    id: "279",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The rate used to always end in .8. Every wrong choice is now a real
    // modeling slip; the old ones used one number as both the slope and the
    // constant (for example y = 6.8x + 6.8).
    let tenths = 48;
    do {
      tenths = getRandomInt(41, 69);
    } while (tenths % 10 === 0);
    const growthRate = (tenths / 10).toFixed(1);
    const yearGrowth = (tenths * 12 / 10).toFixed(1);

    const initialLength = getRandomInt(140, 180);

    const correctEquation = `$y = ${growthRate}x + ${initialLength}$`;

    const optionsData = [
      { text: `$y = ${initialLength}x + ${growthRate}$`, isCorrect: false, reason: `it gives a length of ${growthRate} cm at birth and a growth of ${initialLength} cm per month, which reverses the two values` },
      { text: `$y = ${yearGrowth}x + ${initialLength}$`, isCorrect: false, reason: `${yearGrowth} cm is the total growth over the first 12 months, $12(${growthRate})$, not the growth per month` },
      { text: `$y = ${growthRate}x$`, isCorrect: false, reason: `it leaves out the length at birth; this equation gives a length of 0 cm when $x = 0$, not ${initialLength} cm` },
      { text: correctEquation, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The length, $y$, of a white whale was ${initialLength} centimeters (cm) when it was born and increased an average of ${growthRate} cm per month for the first 12 months after it was born. Which equation best represents this situation, where $x$ is the number of months after the whale was born and $y$ is the length, in cm, of the whale?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. The whale was ${initialLength} cm long at birth, when $x = 0$, and its length increased by ${growthRate} cm each month. After $x$ months, its length increased by $${growthRate}x$ cm, so its length is $y = ${growthRate}x + ${initialLength}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
