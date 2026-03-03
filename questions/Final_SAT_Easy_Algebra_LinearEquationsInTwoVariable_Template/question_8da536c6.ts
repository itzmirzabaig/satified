import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 8da536c6
 *
 * ORIGINAL ANALYSIS: [Weighted growth rate equation]
 * - Number ranges: [growth1: 40-60%, growth2: 30-50%, totalGrowth: 35-55%, initial: 25-50]
 * - Difficulty factors: [Setting up weighted growth equation]
 * - Constraints: [Growth factors should be reasonable]
 */

export const generator_8da536c6 = {
  metadata: {
    // id: "8da536c6",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize growth percentages
    const g1 = getRandomInt(40, 60);
    const g2 = getRandomInt(30, 50);
    const gTotal = getRandomInt(35, 55);
    // Randomize initial amount
    const initial = getRandomInt(25, 50);

    const f1 = (1 + g1 / 100).toFixed(2);
    const f2 = (1 + g2 / 100).toFixed(2);
    const fT = (1 + gTotal / 100).toFixed(2);
    const totalValue = Math.round(initial * (1 + gTotal / 100));

    const optionsData = [
      { text: `$${f1}a + ${f2}b = ${initial}(${fT})$`, isCorrect: true },
      { text: `$${f1}a + ${fT}b = ${initial}(${f2})$`, isCorrect: false, reason: "swaps factors" },
      { text: `$${fT}a + ${(g1/100).toFixed(2)}b = ${initial}(${f2})$`, isCorrect: false, reason: "incorrect distribution" },
      { text: `$${f2}a + ${f1}b = ${initial}(${fT})$`, isCorrect: false, reason: "swaps group growth" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Group A increased ${g1}% ($a$ members), Group B increased ${g2}% ($b$ members), and the total increased ${gTotal}% from an initial ${initial} members. Which equation represents this?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: `$${f1}a + ${f2}b = ${initial}(${fT})$`,
      explanation: `Choice ${correctLetter} is correct. The growth factors are ${f1} for Group A, ${f2} for Group B, and the new total is ${initial} × ${fT} = ${totalValue}.`
    };
  }
};

/**
 * Question ID: f40552a9
 *
 * ORIGINAL ANALYSIS: [Reading y-intercept from Mafs graph]
 */
