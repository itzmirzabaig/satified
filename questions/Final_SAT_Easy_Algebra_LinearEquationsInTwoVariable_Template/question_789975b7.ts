import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 789975b7
 *
 * ORIGINAL ANALYSIS: [Mixture equation percentages]
 * - Number ranges: [pct1: 50-70, pct2: 30-50, total: 150-350]
 * - Difficulty factors: [Converting percentages to decimals]
 * - Constraints: [Percentages should sum reasonably]
 */

export const generator_789975b7 = {
  metadata: {
    // id: "789975b7",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize percentages (pct1 > pct2)
    const pct1 = getRandomInt(50, 70);
    const pct2 = getRandomInt(30, 50);
    // Randomize total filler amount
    const total = getRandomInt(150, 350);

    const dec1 = (pct1 / 100).toFixed(1);
    const dec2 = (pct2 / 100).toFixed(1);

    const optionsData = [
      { text: `$${dec1}x + ${dec2}y = ${total}$`, isCorrect: true },
      { text: `$${dec2}x + ${dec1}y = ${total}$`, isCorrect: false, reason: "swaps percentages" },
      { text: `$${pct1}x + ${pct2}y = ${total}$`, isCorrect: false, reason: "uses integers" },
      { text: `$${pct2}x + ${pct1}y = ${total}$`, isCorrect: false, reason: "uses integers and swaps" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Fertilizer A is ${pct1}% filler ($x$ pounds) and Fertilizer B is ${pct2}% filler ($y$ pounds). The total filler is ${total} pounds. Which equation represents this?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: `$${dec1}x + ${dec2}y = ${total}$`,
      explanation: `Choice ${correctLetter} is correct. Convert percentages to decimals: ${pct1}% = ${dec1} and ${pct2}% = ${dec2}, giving the equation $${dec1}x + ${dec2}y = ${total}$.`
    };
  }
};

/**
 * Question ID: cea27ab2
 *
 * ORIGINAL ANALYSIS: [Standard form table verification]
 */
