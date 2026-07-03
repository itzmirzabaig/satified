import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 476
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table with values 74-166, total 799]
 * - Difficulty factors: [Two-way table, marginal probability from row total]
 * - Distractor patterns: [A: 1/total, C: wrong conditional, D: complementary]
 * - Constraints: [Texting behavior vs phone usage]
 * - Question type: [Two-way Table → HTML Table]
 * - Figure generation: [Generate survey data]
 */

export const generator_476 = {
  metadata: {
    id: "476",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    let lightYes = 0, lightNo = 0, mediumYes = 0, mediumNo = 0, heavyYes = 0, heavyNo = 0;
    let totalYes = 0, totalNo = 0;

    // Redraw until the "yes" and "no" column totals differ. If they were equal,
    // the correct answer (totalYes/grandTotal) and distractor D
    // (totalNo/grandTotal) would render as the same fraction. The other option
    // values are structurally distinct (see optionsData below), so this single
    // guard makes all four options unique for every draw.
    let tries = 0;
    do {
      lightYes = getRandomInt(90, 130);
      lightNo = getRandomInt(120, 170);
      mediumYes = getRandomInt(120, 160);
      mediumNo = getRandomInt(140, 190);
      heavyYes = getRandomInt(140, 190);
      heavyNo = getRandomInt(60, 100);
      totalYes = lightYes + mediumYes + heavyYes;
      totalNo = lightNo + mediumNo + heavyNo;
    } while (totalYes === totalNo && tries++ < 50);

    const totalLight = lightYes + lightNo;
    const totalMedium = mediumYes + mediumNo;
    const totalHeavy = heavyYes + heavyNo;
    const grandTotal = totalYes + totalNo;

    const tableCode = `<table><thead><tr><th>Texting behavior</th><th>Talks on cell phone daily</th><th>Does not talk on cell phone daily</th><th>Total</th></tr></thead><tbody><tr><td>Light</td><td>${lightYes}</td><td>${lightNo}</td><td>${totalLight}</td></tr><tr><td>Medium</td><td>${mediumYes}</td><td>${mediumNo}</td><td>${totalMedium}</td></tr><tr><td>Heavy</td><td>${heavyYes}</td><td>${heavyNo}</td><td>${totalHeavy}</td></tr><tr><td>Total</td><td>${totalYes}</td><td>${totalNo}</td><td>${grandTotal}</td></tr></tbody></table>`;

    const correctText = `\\frac{${totalYes}}{${grandTotal}}`;

    const optionsData = [
      { text: `\\frac{1}{${grandTotal}}`, isCorrect: false, reason: "represents the probability of selecting any one specific teen" },
      { text: correctText, isCorrect: true },
      { text: `\\frac{${totalNo}}{${totalYes}}`, isCorrect: false, reason: "gives the ratio of those who do not talk daily to those who do, instead of a probability out of the whole group" },
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
