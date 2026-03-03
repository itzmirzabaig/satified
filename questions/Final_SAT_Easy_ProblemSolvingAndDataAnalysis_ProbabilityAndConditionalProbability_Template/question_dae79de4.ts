import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: dae79de4
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table values 15-85, total 135]
 * - Difficulty factors: [Two-way table with visits, marginal probability]
 * - Distractor patterns: [A: P(<40), B: P(1 visit), C: P(2+ visits)]
 * - Constraints: [Age vs visits two-way table]
 * - Question type: [Two-way Table → HTML Table]
 * - Figure generation: [Generate age/visit distribution]
 */

export const generator_dae79de4 = {
  metadata: {
    // id: "dae79de4",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const young1Visit = getRandomInt(10, 25);
    const young2Plus = getRandomInt(10, 25);
    const old1Visit = getRandomInt(15, 30);
    const old2Plus = getRandomInt(70, 100);

    const totalYoung = young1Visit + young2Plus;
    const totalOld = old1Visit + old2Plus;
    const total1Visit = young1Visit + old1Visit;
    const total2Plus = young2Plus + old2Plus;
    const grandTotal = totalYoung + totalOld;

    const tableCode = `<table><thead><tr><th></th><th>1 visit</th><th>2 or more visits</th><th>Total</th></tr></thead><tbody><tr><td>Less than 40 years old</td><td>${young1Visit}</td><td>${young2Plus}</td><td>${totalYoung}</td></tr><tr><td>At least 40 years old</td><td>${old1Visit}</td><td>${old2Plus}</td><td>${totalOld}</td></tr><tr><td>Total</td><td>${total1Visit}</td><td>${total2Plus}</td><td>${grandTotal}</td></tr></tbody></table>`;

    const correctText = `\\frac{${totalOld}}{${grandTotal}}`;

    const optionsData = [
      { text: `\\frac{${totalYoung}}{${grandTotal}}`, isCorrect: false, reason: "probability that the selected customer is less than 40 years old" },
      { text: `\\frac{${total1Visit}}{${grandTotal}}`, isCorrect: false, reason: "probability that the selected customer visited the dealership 1 time" },
      { text: `\\frac{${total2Plus}}{${grandTotal}}`, isCorrect: false, reason: "probability that the selected customer visited 2 or more times" },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Based on the table, there are ${totalOld} customers at least 40 years old out of ${grandTotal} total. The probability is $\\frac{${totalOld}}{${grandTotal}}$. Choice ${incorrectOptions[0].letter} is incorrect; this is the ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this is the ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this is the ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The table summarizes customers who visited a car dealership in the last month by age and number of visits they made to the dealership. If a customer from the last month is selected at random, what is the probability that the selected customer is at least $40$ years old?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 1b8e412e
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [-11, -9, 26 - small integers]
 * - Difficulty factors: [Data set table, counting positive numbers]
 * - Distractor patterns: [A: 0 (none), C: 2/3 (negatives), D: 1 (all)]
 * - Constraints: [Mix of negative and positive, only 1 positive]
 * - Question type: [Data Table → HTML Table]
 * - Figure generation: [Generate data set with 1 positive, 2 negative]
 */