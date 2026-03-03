import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2905ded0
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table with values 11-89, total 135]
 * - Difficulty factors: [Two-way table, marginal probability for age group]
 * - Distractor patterns: [A: P(<40), B: P(east), C: P(west)]
 * - Constraints: [Age vs location two-way table]
 * - Question type: [Two-way Table → HTML Table]
 * - Figure generation: [Generate age/location distribution]
 */

export const generator_2905ded0 = {
  metadata: {
    // id: "2905ded0",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const youngEast = getRandomInt(12, 25);
    const youngWest = getRandomInt(8, 20);
    const oldEast = getRandomInt(15, 30);
    const oldWest = getRandomInt(70, 100);

    const totalYoung = youngEast + youngWest;
    const totalOld = oldEast + oldWest;
    const totalEast = youngEast + oldEast;
    const totalWest = youngWest + oldWest;
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

/**
 * Question ID: ec7b0eb8
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table with values 74-166, total 799]
 * - Difficulty factors: [Two-way table, marginal probability from row total]
 * - Distractor patterns: [A: 1/total, C: wrong conditional, D: complementary]
 * - Constraints: [Texting behavior vs phone usage]
 * - Question type: [Two-way Table → HTML Table]
 * - Figure generation: [Generate survey data]
 */