import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_60caadfd = {
  metadata: {
    // id: "60caadfd",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const igneousCount = getRandomInt(8, 15);
    const metamorphicCount = getRandomInt(25, 40);
    const sedimentaryCount = getRandomInt(20, 35);
    const totalRocks = igneousCount + metamorphicCount + sedimentaryCount;

    const tableCode = `<table><thead><tr><th>Classification</th><th>Frequency</th></tr></thead><tbody><tr><td>igneous</td><td>${igneousCount}</td></tr><tr><td>metamorphic</td><td>${metamorphicCount}</td></tr><tr><td>sedimentary</td><td>${sedimentaryCount}</td></tr></tbody></table>`;

    const correctText = `\\frac{${igneousCount}}{${totalRocks}}`;

    const optionsData = [
      { text: `\\frac{${igneousCount}}{${sedimentaryCount}}`, isCorrect: false, reason: "divided by the number of sedimentary rocks instead of the total" },
      { text: `\\frac{${igneousCount}}{${metamorphicCount}}`, isCorrect: false, reason: "divided by the number of metamorphic rocks instead of the total" },
      { text: `\\frac{${igneousCount}}{${totalRocks}}`, isCorrect: true },
      { text: `\\frac{${igneousCount}}{${metamorphicCount + sedimentaryCount}}`, isCorrect: false, reason: "divided by the number of non-igneous rocks instead of the total" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. If one of the rocks in the collection is selected at random, the probability of selecting a rock that is igneous is equal to the number of igneous rocks in the collection divided by the total number of rocks in the collection. According to the table, there are ${igneousCount} igneous rocks in the collection, and the total number of rocks is ${totalRocks}. Therefore, the probability is $\\frac{${igneousCount}}{${totalRocks}}$. Choice ${incorrectOptions[0].letter} is incorrect; this is the number of igneous rocks divided by the number of sedimentary rocks, not the total. Choice ${incorrectOptions[1].letter} is incorrect; this is the number of igneous rocks divided by the number of metamorphic rocks, not the total. Choice ${incorrectOptions[2].letter} is incorrect; this is the number of igneous rocks divided by the number of non-igneous rocks, not the total.`;

    return {
      questionText: `If one of these rocks is selected at random, what is the probability of selecting a rock that is igneous?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: e5b5fbdd
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [8 planets, 4 rocky]
 * - Difficulty factors: [Simple probability, but distractors test understanding]
 * - Distractor patterns: [A: 1/8 (1 rocky), B: 1/4 (2 rocky), D: 2 (flipped fraction)]
 * - Constraints: [Simple fraction reduction]
 * - Question type: [No figure → Text options]
 * - Figure generation: [None]
 */