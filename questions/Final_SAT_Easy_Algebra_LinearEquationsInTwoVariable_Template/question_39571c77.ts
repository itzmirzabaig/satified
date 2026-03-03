import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 39571c77
 *
 * ORIGINAL ANALYSIS: [Snail count from total cost]
 * - Number ranges: [pR: 5-12, pN: 3-8, nN: 1-4]
 * - Constraints: [total must be divisible to give integer nR]
 */

export const generator_39571c77 = {
  metadata: {
    // id: "39571c77",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate random prices and quantities
    const pR = getRandomInt(5, 12); // rabbit snail price
    const pN = getRandomInt(3, 8);  // nerite snail price
    const nN = getRandomInt(1, 4);  // number of nerite snails
    const nR = getRandomInt(3, 8);  // number of rabbit snails (result)
    
    // Calculate total to ensure clean integer
    const total = pR * nR + pN * nN;

    const optionsData = [
      { text: nR.toString(), isCorrect: true },
      { text: (pN * nN).toString(), isCorrect: false, reason: "uses nerite cost only" },
      { text: (pR + pN).toString(), isCorrect: false, reason: "sums prices" },
      { text: (nR + 1).toString(), isCorrect: false, reason: "calculation error" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Rabbit snails cost ${pR} dollars each and nerite snails cost ${pN} dollars each. The total cost is ${total} dollars. If ${nN} nerite snails were bought, how many rabbit snails?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: nR.toString(),
      explanation: `Choice ${correctLetter} is correct. Nerite snails cost ${pN * nN} dollars. Remaining for rabbit snails: ${total} - ${pN * nN} = ${pR * nR} dollars. Number of rabbit snails: ${pR * nR} / ${pR} = ${nR}.`
    };
  }
};

/**
 * Question ID: 768b2425
 *
 * ORIGINAL ANALYSIS: [Hourly rate coefficient meaning]
 */