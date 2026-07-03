import { getRandomInt, getRandomElement, shuffle, round } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 189
 *
 * ORIGINAL ANALYSIS: [Weighted growth rate equation]
 * - Number ranges: [growth1: 40-60%, growth2: 30-50%, totalGrowth: 35-55%, initial: 25-50]
 * - Difficulty factors: [Setting up weighted growth equation]
 * - Constraints: [Growth factors should be reasonable]
 */

export const generator_189 = {
  metadata: {
    id: "189",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize growth percentages. The distractors are permutations of the
    // three growth factors, so any two equal percentages would make two option
    // strings identical. Redraw (bounded) until g1, g2, gTotal are pairwise
    // distinct — this guarantees all four option strings differ for every draw.
    let g1 = getRandomInt(40, 60);
    let g2 = getRandomInt(30, 50);
    let gTotal = getRandomInt(35, 55);
    let tries = 0;
    while ((g1 === g2 || g1 === gTotal || g2 === gTotal) && tries++ < 50) {
      g1 = getRandomInt(40, 60);
      g2 = getRandomInt(30, 50);
      gTotal = getRandomInt(35, 55);
    }
    // Randomize initial amount
    const initial = getRandomInt(25, 50);

    const f1 = (1 + g1 / 100).toFixed(2);
    const f2 = (1 + g2 / 100).toFixed(2);
    const fT = (1 + gTotal / 100).toFixed(2);
    // New total = initial members grown by the overall factor. initial is an
    // integer and fT has exactly two decimals, so this is exact to 2 places.
    const newTotal = round(initial * (1 + gTotal / 100), 2);

    const correctText = `$${f1}a + ${f2}b = ${initial}(${fT})$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${f1}a + ${fT}b = ${initial}(${f2})$`, isCorrect: false, reason: "swaps a group factor with the total factor" },
      { text: `$${fT}a + ${(g1 / 100).toFixed(2)}b = ${initial}(${f2})$`, isCorrect: false, reason: "uses the wrong growth factors on the left side" },
      { text: `$${f2}a + ${f1}b = ${initial}(${fT})$`, isCorrect: false, reason: "swaps the two group growth factors" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;
    const firstWrong = shuffled.find(o => !o.isCorrect)!;

    return {
      questionText: `A club has two groups. Group A started with $a$ members and grew ${g1}%, and Group B started with $b$ members and grew ${g2}%. The club's total membership started at ${initial} and grew ${gTotal}% overall. Which equation represents this situation?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Group A's new size is $${f1}a$ and Group B's new size is $${f2}b$, so together they equal the new total, $${initial}(${fT}) = ${newTotal}$ members. Choice ${firstWrong.letter} is incorrect because it ${firstWrong.reason}.`
    };
  }
};
