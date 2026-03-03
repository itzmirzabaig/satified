import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: a478f9f5
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [119, 3, 35, total 157]
 * - Difficulty factors: [Frequency table, probability of rare category]
 * - Distractor patterns: [B: P(color Z), C: P(color X), D: P(not color Y)]
 * - Constraints: [One category much larger than others]
 * - Question type: [Frequency Table → HTML Table]
 * - Figure generation: [Generate gemstone color distribution]
 */

export const generator_a478f9f5 = {
  metadata: {
    // id: "a478f9f5",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const colorX = getRandomInt(100, 140);
    const colorY = getRandomInt(2, 6);
    const colorZ = getRandomInt(25, 45);
    const totalGems = colorX + colorY + colorZ;

    const tableCode = `<table><thead><tr><th>Classification</th><th>Frequency</th></tr></thead><tbody><tr><td>color X</td><td>${colorX}</td></tr><tr><td>color Y</td><td>${colorY}</td></tr><tr><td>color Z</td><td>${colorZ}</td></tr></tbody></table>`;

    const correctText = `\\frac{${colorY}}{${totalGems}}`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `\\frac{${colorZ}}{${totalGems}}`, isCorrect: false, reason: "probability of selecting color Z" },
      { text: `\\frac{${colorX}}{${totalGems}}`, isCorrect: false, reason: "probability of selecting color X" },
      { text: `\\frac{${colorX + colorZ}}{${totalGems}}`, isCorrect: false, reason: "probability of selecting a gemstone that's not color Y" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The probability of selecting color Y is the number of color Y gemstones divided by the total: $\\frac{${colorY}}{${totalGems}}$. Choice ${incorrectOptions[0].letter} is incorrect; this is the ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this is the ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this is the ${incorrectOptions[2].reason}.`;

    return {
      questionText: `Each of gemstones can be classified as one of three classifications, as shown in the frequency table. If one of the gemstones is selected at random, what is the probability of selecting a gemstone of color Y?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

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