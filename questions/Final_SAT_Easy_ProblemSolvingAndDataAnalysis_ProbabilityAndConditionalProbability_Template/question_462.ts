import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 462
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table with values 11-89, total 135]
 * - Difficulty factors: [Two-way table, marginal probability for age group]
 * - Distractor patterns: [A: P(<40), B: P(east), C: P(west)]
 * - Constraints: [Age vs location two-way table]
 * - Question type: [Two-way Table → HTML Table]
 * - Figure generation: [Generate age/location distribution]
 */

export const generator_462 = {
  metadata: {
    id: "462",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    // The four answer choices are marginal totals over the same grand total, so
    // the option strings collide (and the correctAnswer match becomes ambiguous)
    // whenever any two marginal totals are equal. Re-draw until the four
    // marginals are pairwise distinct. Bounded retry (<=50) per house style.
    let youngEast = 0, youngWest = 0, oldEast = 0, oldWest = 0;
    let totalYoung = 0, totalOld = 0, totalEast = 0, totalWest = 0;
    let tries = 0;
    do {
      youngEast = getRandomInt(12, 25);
      youngWest = getRandomInt(8, 20);
      oldEast = getRandomInt(15, 30);
      oldWest = getRandomInt(70, 100);

      totalYoung = youngEast + youngWest;
      totalOld = oldEast + oldWest;
      totalEast = youngEast + oldEast;
      totalWest = youngWest + oldWest;
    } while (
      new Set([totalYoung, totalOld, totalEast, totalWest]).size !== 4 &&
      tries++ < 50
    );

    const grandTotal = totalYoung + totalOld;

    const tableCode = `<table><thead><tr><th></th><th>Live east of the river</th><th>Live west of the river</th><th>Total</th></tr></thead><tbody><tr><td>Less than 40 years old</td><td>${youngEast}</td><td>${youngWest}</td><td>${totalYoung}</td></tr><tr><td>At least 40 years old</td><td>${oldEast}</td><td>${oldWest}</td><td>${totalOld}</td></tr><tr><td>Total</td><td>${totalEast}</td><td>${totalWest}</td><td>${grandTotal}</td></tr></tbody></table>`;

    const correctText = `\\frac{${totalOld}}{${grandTotal}}`;

    const optionsData = [
      { text: `\\frac{${totalYoung}}{${grandTotal}}`, isCorrect: false, reason: "probability that the selected member is less than 40 years old" },
      { text: `\\frac{${totalEast}}{${grandTotal}}`, isCorrect: false, reason: "probability that the selected member lives east of the river" },
      { text: `\\frac{${totalWest}}{${grandTotal}}`, isCorrect: false, reason: "probability that the selected member lives west of the river" },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. If a member is selected at random, the probability is the number of members at least 40 years old divided by the total. There are ${totalOld} members at least 40 years old out of ${grandTotal} total, giving $\\frac{${totalOld}}{${grandTotal}}$. Choice ${incorrectOptions[0].letter} is incorrect; this is the ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this is the ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this is the ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The table summarizes members of a local organization by age and whether they live east or west of the river. If a member of the organization is selected at random, what is the probability that the selected member is at least $40$ years old?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
