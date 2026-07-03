import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 458
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [red: 8, blue: 10, green: 22, total: 40]
 * - Difficulty factors: [Reading table data, basic probability from table]
 * - Distractor patterns: [A: P(not blue), B: P(green), C: P(not green)]
 * - Constraints: [Total must equal sum of categories, maintain reasonable proportions]
 * - Question type: [Table in question → HTML Table]
 * - Figure generation: [Generate table data first, then build HTML table]
 */

export const generator_458 = {
  metadata: {
    id: "458",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Redraw until the four option NUMERATORS (all over the same denominator
    // totalCount) are pairwise distinct, so no two options can ever collide
    // (exactly or numerically). Numerators: blue (correct), red+green (not
    // blue), green, red+blue (not green). Bounded retry — distinct numerators
    // are the common case, so this almost never loops.
    let redCount = getRandomInt(5, 15);
    let blueCount = getRandomInt(8, 18);
    let greenCount = getRandomInt(15, 30);
    let tries = 0;
    while (tries++ < 50) {
      const nums = [blueCount, redCount + greenCount, greenCount, redCount + blueCount];
      if (new Set(nums).size === 4) break;
      redCount = getRandomInt(5, 15);
      blueCount = getRandomInt(8, 18);
      greenCount = getRandomInt(15, 30);
    }
    const totalCount = redCount + blueCount + greenCount;

    const tableCode = `<table><thead><tr><th>Color</th><th>Number</th></tr></thead><tbody><tr><td>Red</td><td>${redCount}</td></tr><tr><td>Blue</td><td>${blueCount}</td></tr><tr><td>Green</td><td>${greenCount}</td></tr><tr><td>Total</td><td>${totalCount}</td></tr></tbody></table>`;

    const correctNumerator = blueCount;
    const correctDenominator = totalCount;
    const correctText = `\\frac{${correctNumerator}}{${correctDenominator}}`;

    const optionsData = [
      { text: `\\frac{${correctNumerator}}{${correctDenominator}}`, isCorrect: true },
      { text: `\\frac{${redCount + greenCount}}{${totalCount}}`, isCorrect: false, reason: "represents the probability that the marble chosen won't be blue" },
      { text: `\\frac{${greenCount}}{${totalCount}}`, isCorrect: false, reason: "represents the probability that the marble chosen will be green" },
      { text: `\\frac{${redCount + blueCount}}{${totalCount}}`, isCorrect: false, reason: "represents the probability that the marble chosen won't be green" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. If a marble is chosen at random from the bag, the probability of choosing a marble of a certain color is the number of marbles of that color divided by the total number of marbles in the bag. Since there are ${blueCount} blue marbles in the bag, and there are ${totalCount} total marbles in the bag, the probability that the marble chosen will be blue is $\\frac{${blueCount}}{${totalCount}}$. Choice ${incorrectOptions[0].letter} is incorrect; this ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The table shows the number of different colors of marbles in a bag. If a marble is chosen at random from the bag, what is the probability that the marble will be blue?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
