import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_1b8e412e = {
  metadata: {
    // id: "1b8e412e",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const neg1 = getRandomInt(-20, -5);
    const neg2 = getRandomInt(-20, -5);
    const pos1 = getRandomInt(10, 40);

    const positiveCount = 1;
    const totalCount = 3;

    const tableCode = `<table><thead><tr><th>Data Set Values</th></tr></thead><tbody><tr><td>${neg1}</td></tr><tr><td>${neg2}</td></tr><tr><td>${pos1}</td></tr></tbody></table>`;

    const correctText = `\\frac{${positiveCount}}{${totalCount}}`;

    const optionsData = [
      { text: "0", isCorrect: false, reason: "probability of selecting from a data set with no positive numbers" },
      { text: correctText, isCorrect: true },
      { text: `\\frac{2}{3}`, isCorrect: false, reason: "probability of selecting a negative number from this data set" },
      { text: "1", isCorrect: false, reason: "probability of selecting from a data set containing only positive numbers" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. There is ${positiveCount} positive number out of ${totalCount} total numbers, giving probability $\\frac{${positiveCount}}{${totalCount}}$. Choice ${incorrectOptions[0].letter} is incorrect; this is the ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this is the ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this is the ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A data set of three numbers is shown. If a number from this data set is selected at random, what is the probability of selecting a positive number?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: b8150b17
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [29 defective out of 100]
 * - Difficulty factors: [Proportion to probability conversion]
 * - Distractor patterns: [A: 1/2900, B: 1/29, D: 29/10]
 * - Constraints: [Maintain 29/100 ratio, reduce if needed]
 * - Question type: [No figure → Text options]
 * - Figure generation: [None]
 */