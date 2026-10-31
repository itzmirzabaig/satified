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

    // The asked-about column is chosen at random (it was always "talks daily").
    // Wrong choices: the other column, the other column compared with this
    // one, and a single row's cell of this column (one texting group only).
    // The cell replaced 1/total, which no likely slip produces.
    const daily = getRandomInt(0, 1) === 0;
    const mine = daily ? totalYes : totalNo;
    const theirs = daily ? totalNo : totalYes;
    const rows = [
      { name: 'light', yes: lightYes, no: lightNo },
      { name: 'medium', yes: mediumYes, no: mediumNo },
      { name: 'heavy', yes: heavyYes, no: heavyNo }
    ];
    const row = rows[getRandomInt(0, 2)];
    const cell = daily ? row.yes : row.no;
    const cond = daily ? 'talks on a cell phone daily' : 'does not talk on a cell phone daily';
    const otherCond = daily ? 'does not talk on a cell phone daily' : 'talks on a cell phone daily';
    const f = (a: number, b: number) => `\\frac{${a}}{${b}}`;
    const correctText = f(mine, grandTotal);

    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      { text: f(theirs, grandTotal), isCorrect: false, reason: `$${f(theirs, grandTotal)}$ is the probability that the teen ${otherCond}` },
      { text: f(theirs, mine), isCorrect: false, reason: `$${f(theirs, mine)}$ compares the ${theirs} teens who ${daily ? 'do not talk' : 'talk'} on a cell phone daily to the ${mine} who ${daily ? 'do' : 'do not'}; the denominator must be all ${grandTotal} teens surveyed` },
      { text: f(cell, grandTotal), isCorrect: false, reason: `$${f(cell, grandTotal)}$ counts only the ${cell} ${row.name} texters who ${daily ? 'talk' : 'do not talk'} on a cell phone daily instead of all ${mine} such teens` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The Total row of the table shows that ${mine} of the ${grandTotal} teens surveyed ${daily ? 'talk' : 'do not talk'} on a cell phone daily. So the probability that a teen selected at random ${cond} is $${correctText}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `In a study of cell phone use, ${grandTotal} randomly selected US teens were asked how often they talked on a cell phone and about their texting behavior. The data are summarized in the table. If one of the ${grandTotal} teens surveyed is selected at random, what is the probability that the teen ${cond}?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
