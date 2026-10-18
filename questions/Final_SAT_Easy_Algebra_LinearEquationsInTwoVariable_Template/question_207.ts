import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 207
 *
 * ORIGINAL ANALYSIS: [Linear equation word problem setup]
 */

export const generator_207 = {
  metadata: {
    id: "207",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const tLarge = getRandomInt(8, 15);
    const tSmall = getRandomInt(3, 7);
    // Box counts first, so the day's total is a time the machine can actually fill.
    const nLarge = getRandomInt(10, 30);
    const nSmall = getRandomInt(20, 60);
    const total = tLarge * nLarge + tSmall * nSmall;

    const optionsData = [
      { text: `$${tLarge}x + ${tSmall}y = ${total}$`, isCorrect: true, reason: '' },
      { text: `$${tSmall}x + ${tLarge}y = ${total}$`, isCorrect: false, reason: `it uses ${tSmall} minutes for each large box and ${tLarge} minutes for each small box` },
      { text: `$(x+y)(${tLarge} + ${tSmall}) = ${total}$`, isCorrect: false, reason: `it treats every box as taking ${tLarge + tSmall} minutes, the time for one large box and one small box combined` },
      { text: `$(${tLarge} + x)(${tSmall} + y) = ${total}$`, isCorrect: false, reason: `it adds each time to a number of boxes instead of multiplying, and then multiplies the two sums` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `A machine packs large boxes and small boxes. It takes ${tLarge} minutes to pack each large box and ${tSmall} minutes to pack each small box. On a certain day, the machine packs $x$ large boxes and $y$ small boxes in a total of ${total} minutes. Which equation represents this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${tLarge}x + ${tSmall}y = ${total}$`,
      explanation: `Choice ${correctLetter} is correct. Packing $x$ large boxes takes $${tLarge}x$ minutes, and packing $y$ small boxes takes $${tSmall}y$ minutes. Together they take the total of ${total} minutes, so $${tLarge}x + ${tSmall}y = ${total}$. ${shuffledOptions.filter(o => !o.isCorrect).map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
