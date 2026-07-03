import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 465
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table values 2-9, totals 14-80]
 * - Difficulty factors: [Reading three-way table, marginal probability]
 * - Distractor patterns: [A: single-cell numerator, B: wrong margin (grade), D: other mascot]
 * - Constraints: [4 mascots × 3 grades, all totals must be consistent]
 * - Question type: [Three-way Table → HTML Table]
 * - Figure generation: [Generate mascot voting data]
 */

export const generator_465 = {
  metadata: {
    id: "465",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

    // All four choices are "(count) / (grand total)", so two choices collide
    // exactly when their numerators are equal. Re-draw the table until the four
    // numerators (lionTotal, lion6, total6, badgerTotal) are pairwise distinct.
    // Bounded retry (<=50) per house style.
    let badger6 = 0, badger7 = 0, badger8 = 0, badgerTotal = 0;
    let lion6 = 0, lion7 = 0, lion8 = 0, lionTotal = 0;
    let longhorn6 = 0, longhorn7 = 0, longhorn8 = 0, longhornTotal = 0;
    let tiger6 = 0, tiger7 = 0, tiger8 = 0, tigerTotal = 0;
    let total6 = 0, total7 = 0, total8 = 0, grandTotal = 0;
    let tries = 0;
    do {
      badger6 = getRandomInt(2, 6);
      badger7 = getRandomInt(6, 12);
      badger8 = getRandomInt(6, 12);
      badgerTotal = badger6 + badger7 + badger8;

      lion6 = getRandomInt(6, 12);
      lion7 = getRandomInt(1, 5);
      lion8 = getRandomInt(6, 12);
      lionTotal = lion6 + lion7 + lion8;

      longhorn6 = getRandomInt(2, 6);
      longhorn7 = getRandomInt(4, 9);
      longhorn8 = getRandomInt(2, 6);
      longhornTotal = longhorn6 + longhorn7 + longhorn8;

      tiger6 = getRandomInt(4, 9);
      tiger7 = getRandomInt(6, 12);
      tiger8 = getRandomInt(6, 12);
      tigerTotal = tiger6 + tiger7 + tiger8;

      total6 = badger6 + lion6 + longhorn6 + tiger6;
      total7 = badger7 + lion7 + longhorn7 + tiger7;
      total8 = badger8 + lion8 + longhorn8 + tiger8;
      grandTotal = total6 + total7 + total8;
    } while (
      new Set([lionTotal, lion6, total6, badgerTotal]).size !== 4 &&
      tries++ < 50
    );

    const tableCode = `<table><thead><tr><th>Mascot</th><th>Sixth</th><th>Seventh</th><th>Eighth</th><th>Total</th></tr></thead><tbody><tr><td>Badger</td><td>${badger6}</td><td>${badger7}</td><td>${badger8}</td><td>${badgerTotal}</td></tr><tr><td>Lion</td><td>${lion6}</td><td>${lion7}</td><td>${lion8}</td><td>${lionTotal}</td></tr><tr><td>Longhorn</td><td>${longhorn6}</td><td>${longhorn7}</td><td>${longhorn8}</td><td>${longhornTotal}</td></tr><tr><td>Tiger</td><td>${tiger6}</td><td>${tiger7}</td><td>${tiger8}</td><td>${tigerTotal}</td></tr><tr><td>Total</td><td>${total6}</td><td>${total7}</td><td>${total8}</td><td>${grandTotal}</td></tr></tbody></table>`;

    const divisor = gcd(lionTotal, grandTotal);
    const simplifiedNum = lionTotal / divisor;
    const simplifiedDen = grandTotal / divisor;
    const correctText = `\\frac{${simplifiedNum}}{${simplifiedDen}}`;

    const optionsData = [
      { text: `\\frac{${lion6}}{${grandTotal}}`, isCorrect: false, reason: "counts only the sixth-grade votes for a lion instead of all votes for a lion" },
      { text: `\\frac{${total6}}{${grandTotal}}`, isCorrect: false, reason: "gives the probability of selecting a sixth grader rather than a lion voter" },
      { text: correctText, isCorrect: true },
      { text: `\\frac{${badgerTotal}}{${grandTotal}}`, isCorrect: false, reason: "gives the probability of selecting a student who voted for a badger" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const reduction = divisor > 1 ? `, or $\\frac{${simplifiedNum}}{${simplifiedDen}}$` : ``;
    const explanation = `Choice ${correctOption.letter} is correct. If one of these students is selected at random, the probability of selecting a student who voted for a lion equals the number of votes for a lion divided by the total number of votes. The table shows ${lionTotal} votes for a lion out of ${grandTotal} total votes. Therefore, the probability is $\\frac{${lionTotal}}{${grandTotal}}$${reduction}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `If one of these students is selected at random, what is the probability of selecting a student whose vote for new mascot was for a lion?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
