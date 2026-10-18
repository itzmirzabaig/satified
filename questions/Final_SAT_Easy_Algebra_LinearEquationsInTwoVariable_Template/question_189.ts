import { getRandomInt, getRandomElement, shuffle, round } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 189
 *
 * ORIGINAL ANALYSIS: [Weighted growth rate equation]
 * - Number ranges: [growth1: 40-60%, growth2: 30-50%, totalGrowth: 35-55%, initial: 25-50]
 * - Difficulty factors: [Setting up weighted growth equation]
 * - Constraints: [Growth factors should be reasonable]
 *
 * FIX NOTES:
 * The three growth rates were drawn independently, so the club could grow
 * 42% overall while its groups grew 44% and 45%, which is impossible (the
 * overall rate is a weighted average of the group rates). The overall rate is
 * now computed from hidden group sizes, so the situation always has a
 * solution. One distractor (0.44b on the left) was replaced, the explanation
 * no longer states a fractional member count (41.18 members), and every wrong
 * choice now has a reason.
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
    // The overall growth of the club is the weighted average of the two group
    // growth rates, so it must lie strictly between them. Draw the (hidden)
    // starting sizes a and b and two different group rates, then keep the draw
    // only when the overall rate (g1*a + g2*b)/(a + b) is a whole percent. The
    // three rates are then pairwise distinct, so all four choices differ.
    let a = 10, b = 10, g1 = 40, g2 = 30, gTotal = 35;
    do {
      a = getRandomInt(10, 25);
      b = getRandomInt(10, 25);
      g1 = getRandomInt(40, 60);
      g2 = getRandomInt(30, 50);
      gTotal = (g1 * a + g2 * b) / (a + b);
    } while (g1 === g2 || !Number.isInteger(gTotal));
    const initial = a + b;

    const f1 = (1 + g1 / 100).toFixed(2);
    const f2 = (1 + g2 / 100).toFixed(2);
    const fT = (1 + gTotal / 100).toFixed(2);

    const correctText = `$${f1}a + ${f2}b = ${initial}(${fT})$`;

    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      { text: `$${f2}a + ${f1}b = ${initial}(${fT})$`, isCorrect: false, reason: `it applies Group B's growth factor to Group A and Group A's growth factor to Group B` },
      { text: `$${f1}a + ${f2}b = ${initial}$`, isCorrect: false, reason: `its right side, ${initial}, is the club's starting membership, not its membership after growing ${gTotal}%` },
      { text: `$${f1}a + ${fT}b = ${initial}(${f2})$`, isCorrect: false, reason: `it uses the club's overall growth factor for Group B and Group B's growth factor for the whole club` }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `A club has two groups. Group A started with $a$ members and grew ${g1}%, and Group B started with $b$ members and grew ${g2}%. The club's total membership started at ${initial} and grew ${gTotal}% overall. Which equation represents this situation?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Increasing a quantity by ${g1}% multiplies it by ${f1}, so Group A's new size is $${f1}a$. Similarly, Group B's new size is $${f2}b$. The club's new total membership is its starting membership, ${initial}, increased by ${gTotal}%, or $${initial}(${fT})$. The two groups together make up the club, so $${f1}a + ${f2}b = ${initial}(${fT})$. ${shuffled.filter(o => !o.isCorrect).map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
