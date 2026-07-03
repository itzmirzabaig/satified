import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 467
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [igneous, metamorphic, sedimentary; total = sum]
 * - Difficulty factors: [Frequency table, basic probability with trick distractors]
 * - Distractor patterns: [ig/sed, ig/met, ig/(met+sed) instead of ig/total]
 * - Constraints: [Frequency table, calculate P(igneous) = igneous/total]
 * - Question type: [Frequency Table -> HTML Table]
 * - Figure generation: [Rock classification frequency table]
 */

export const generator_467 = {
  metadata: {
    id: "467",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    // The four options all have numerator `igneous` over four different
    // denominators: total, sedimentary, metamorphic, metamorphic+sedimentary.
    // Two options are numerically equal exactly when their denominators are
    // equal. total and met+sed are always > the single-category counts, so the
    // only possible collision is metamorphic === sedimentary. Redraw (bounded)
    // until all four denominators are pairwise distinct.
    let igneousCount = 0, metamorphicCount = 0, sedimentaryCount = 0, totalRocks = 0;
    let tries = 0;
    do {
      igneousCount = getRandomInt(8, 15);
      metamorphicCount = getRandomInt(25, 40);
      sedimentaryCount = getRandomInt(20, 35);
      totalRocks = igneousCount + metamorphicCount + sedimentaryCount;
      tries++;
    } while (
      tries < 50 &&
      (sedimentaryCount === metamorphicCount ||
        sedimentaryCount === metamorphicCount + sedimentaryCount ||
        metamorphicCount === metamorphicCount + sedimentaryCount ||
        totalRocks === sedimentaryCount ||
        totalRocks === metamorphicCount ||
        totalRocks === metamorphicCount + sedimentaryCount)
    );

    const tableCode = `<table><thead><tr><th>Classification</th><th>Frequency</th></tr></thead><tbody><tr><td>igneous</td><td>${igneousCount}</td></tr><tr><td>metamorphic</td><td>${metamorphicCount}</td></tr><tr><td>sedimentary</td><td>${sedimentaryCount}</td></tr></tbody></table>`;

    const correctText = `\\frac{${igneousCount}}{${totalRocks}}`;

    const optionsData = [
      { text: `\\frac{${igneousCount}}{${sedimentaryCount}}`, isCorrect: false, reason: "the number of igneous rocks divided by the number of sedimentary rocks, not the total" },
      { text: `\\frac{${igneousCount}}{${metamorphicCount}}`, isCorrect: false, reason: "the number of igneous rocks divided by the number of metamorphic rocks, not the total" },
      { text: `\\frac{${igneousCount}}{${totalRocks}}`, isCorrect: true },
      { text: `\\frac{${igneousCount}}{${metamorphicCount + sedimentaryCount}}`, isCorrect: false, reason: "the number of igneous rocks divided by the number of rocks that are not igneous, not the total" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The probability of selecting an igneous rock is the number of igneous rocks divided by the total number of rocks. From the table there are ${igneousCount} igneous rocks and ${totalRocks} rocks in all, so the probability is $\\frac{${igneousCount}}{${totalRocks}}$. Choice ${incorrectOptions[0].letter} is incorrect; it is ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it is ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it is ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The table shows the classification of every rock in a collection. If one of these rocks is selected at random, what is the probability of selecting a rock that is igneous?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
