import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 47624288
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table values 2-9, totals 14-80]
 * - Difficulty factors: [Reading three-way table, marginal probability]
 * - Distractor patterns: [A: 1/9 (cell value), B: 1/5 (wrong total), D: 2/3 (wrong calculation)]
 * - Constraints: [4 mascots × 3 grades, all totals must be consistent]
 * - Question type: [Three-way Table → HTML Table]
 * - Figure generation: [Generate mascot voting data]
 */

export const generator_47624288 = {
  metadata: {
    // id: "47624288",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const badger6 = getRandomInt(2, 6);
    const badger7 = getRandomInt(6, 12);
    const badger8 = getRandomInt(6, 12);
    const badgerTotal = badger6 + badger7 + badger8;

    const lion6 = getRandomInt(6, 12);
    const lion7 = getRandomInt(1, 5);
    const lion8 = getRandomInt(6, 12);
    const lionTotal = lion6 + lion7 + lion8;

    const longhorn6 = getRandomInt(2, 6);
    const longhorn7 = getRandomInt(4, 9);
    const longhorn8 = getRandomInt(2, 6);
    const longhornTotal = longhorn6 + longhorn7 + longhorn8;

    const tiger6 = getRandomInt(4, 9);
    const tiger7 = getRandomInt(6, 12);
    const tiger8 = getRandomInt(6, 12);
    const tigerTotal = tiger6 + tiger7 + tiger8;

    const total6 = badger6 + lion6 + longhorn6 + tiger6;
    const total7 = badger7 + lion7 + longhorn7 + tiger7;
    const total8 = badger8 + lion8 + longhorn8 + tiger8;
    const grandTotal = total6 + total7 + total8;

    const tableCode = `<table><thead><tr><th>Mascot</th><th>Sixth</th><th>Seventh</th><th>Eighth</th><th>Total</th></tr></thead><tbody><tr><td>Badger</td><td>${badger6}</td><td>${badger7}</td><td>${badger8}</td><td>${badgerTotal}</td></tr><tr><td>Lion</td><td>${lion6}</td><td>${lion7}</td><td>${lion8}</td><td>${lionTotal}</td></tr><tr><td>Longhorn</td><td>${longhorn6}</td><td>${longhorn7}</td><td>${longhorn8}</td><td>${longhornTotal}</td></tr><tr><td>Tiger</td><td>${tiger6}</td><td>${tiger7}</td><td>${tiger8}</td><td>${tigerTotal}</td></tr><tr><td>Total</td><td>${total6}</td><td>${total7}</td><td>${total8}</td><td>${grandTotal}</td></tr></tbody></table>`;

    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(lionTotal, grandTotal);
    const simplifiedNum = lionTotal / divisor;
    const simplifiedDen = grandTotal / divisor;
    const correctText = `\\frac{${simplifiedNum}}{${simplifiedDen}}`;

    const distractor1 = `\\frac{1}{${lion6}}`;
    const distractor2 = `\\frac{1}{5}`;
    const distractor3 = `\\frac{2}{3}`;

    const optionsData = [
      { text: distractor1, isCorrect: false },
      { text: distractor2, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractor3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. If one of these students is selected at random, the probability of selecting a student whose vote for the new mascot was for a lion is given by the number of votes for a lion divided by the total number of votes. The table indicates that the number of votes for a lion is $${lionTotal}$, and the total number of votes is $${grandTotal}$. Therefore, the probability is $\\frac{${lionTotal}}{${grandTotal}}$, or $\\frac{${simplifiedNum}}{${simplifiedDen}}$. Choice ${incorrectOptions[0].letter} is incorrect and may result from conceptual or computational errors. Choice ${incorrectOptions[1].letter} is incorrect and may result from conceptual or computational errors. Choice ${incorrectOptions[2].letter} is incorrect and may result from conceptual or computational errors.`;

    return {
      questionText: `If one of these students is selected at random, what is the probability of selecting a student whose vote for new mascot was for a lion?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 60caadfd
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [10, 33, 27, total 70]
 * - Difficulty factors: [Frequency table, basic probability but with trick distractors]
 * - Distractor patterns: [A: 10/27 (igneous/sedimentary), B: 10/33 (igneous/metamorphic), D: 10/70 - wait that's correct?]
 * - Constraints: [Wait - explanation says total is 70, but correct answer should be 10/70]
 * - Question type: [Frequency Table → HTML Table]
 * - Figure generation: [Generate rock classification data]
 */