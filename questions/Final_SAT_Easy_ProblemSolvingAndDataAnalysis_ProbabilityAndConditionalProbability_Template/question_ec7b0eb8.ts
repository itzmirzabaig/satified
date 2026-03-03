import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_ec7b0eb8 = {
  metadata: {
    // id: "ec7b0eb8",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const lightYes = getRandomInt(90, 130);
    const lightNo = getRandomInt(120, 170);
    const mediumYes = getRandomInt(120, 160);
    const mediumNo = getRandomInt(140, 190);
    const heavyYes = getRandomInt(140, 190);
    const heavyNo = getRandomInt(60, 100);

    const totalLight = lightYes + lightNo;
    const totalMedium = mediumYes + mediumNo;
    const totalHeavy = heavyYes + heavyNo;
    const totalYes = lightYes + mediumYes + heavyYes;
    const totalNo = lightNo + mediumNo + heavyNo;
    const grandTotal = totalYes + totalNo;

    const tableCode = `<table><thead><tr><th>Texting behavior</th><th>Talks on cell phone daily</th><th>Does not talk on cell phone daily</th><th>Total</th></tr></thead><tbody><tr><td>Light</td><td>${lightYes}</td><td>${lightNo}</td><td>${totalLight}</td></tr><tr><td>Medium</td><td>${mediumYes}</td><td>${mediumNo}</td><td>${totalMedium}</td></tr><tr><td>Heavy</td><td>${heavyYes}</td><td>${heavyNo}</td><td>${totalHeavy}</td></tr><tr><td>Total</td><td>${totalYes}</td><td>${totalNo}</td><td>${grandTotal}</td></tr></tbody></table>`;

    const correctText = `\\frac{${totalYes}}{${grandTotal}}`;

    const optionsData = [
      { text: `\\frac{1}{${grandTotal}}`, isCorrect: false, reason: "represents the probability of selecting any one specific teen" },
      { text: correctText, isCorrect: true },
      { text: `\\frac{${totalNo}}{${totalYes}}`, isCorrect: false, reason: "results from conceptual errors" },
      { text: `\\frac{${totalNo}}{${grandTotal}}`, isCorrect: false, reason: "represents the probability of selecting a teen who doesn't talk on cell phone daily" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. If one of the teens surveyed is selected at random, the probability is the total who talk daily divided by total surveyed: $\\frac{${totalYes}}{${grandTotal}}$. Choice ${incorrectOptions[0].letter} is incorrect; this ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this ${incorrectOptions[2].reason}.`;

    return {
      questionText: `In a study of cell phone use, $${grandTotal}$ randomly selected US teens were asked how often they talked on a cell phone and about their texting behavior. The data are summarized in the table above. If one of the $${grandTotal}$ teens surveyed is selected at random, what is the probability that the teen talks on a cell phone daily?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 79201024
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [45 members, 11 saxophone]
 * - Difficulty factors: [Basic probability from text description]
 * - Distractor patterns: [A: 1/total, C: complementary, D: 1]
 * - Constraints: [Simple fraction, no reduction issues]
 * - Question type: [No figure → Text options]
 * - Figure generation: [None]
 */