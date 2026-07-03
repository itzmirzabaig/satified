import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1426
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: State counts in a 2x2 table (income tax x sales tax)
 * - Difficulty factors: Conditional probability with a "given" condition
 *   (restrict to states WITH sales tax), percentage conversion, round to tenths
 * - Distractor patterns:
 *     A: wrong denominator — divides by ALL states instead of only states with sales tax
 *     B: reversed/wrong base — divides by the "no income tax" row total
 *     C: uses only the "both taxes" cell as the denominator
 * - Constraints: the four displayed percentages must be pairwise distinct at the
 *   tenth-of-a-percent precision shown to the student (bounded retry redraws if not)
 * - Question type: HTML table -> multiple choice text (percent to nearest tenth)
 * - Figure generation: HTML table with the tax distribution; cell values match the math
 */

export const generator_1426 = {
  metadata: {
    id: "1426",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Percentages are displayed to the nearest tenth of a percent.
    const fmt = (pct: number): string => `${(Math.round(pct * 10) / 10).toFixed(1)}%`;
    const roundTenth = (pct: number): number => Math.round(pct * 10) / 10;

    // 2x2 table: rows = income tax Yes/No, cols = sales tax Yes/No.
    //   salesIncome    = has sales tax AND income tax
    //   noSalesIncome  = no sales tax  AND income tax
    //   salesNoIncome  = has sales tax AND no income tax
    //   noSalesNoIncome= no sales tax  AND no income tax
    let salesIncome = 0, salesNoIncome = 0, noSalesIncome = 0, noSalesNoIncome = 0;
    let totalWithSales = 0, totalStates = 0;
    let correctPct = 0, dA = 0, dB = 0, dC = 0;

    // Bounded retry: redraw until the four displayed percentages are pairwise
    // distinct at tenth precision (so no two options can collide for this draw).
    let tries = 0;
    do {
      salesIncome = getRandomInt(35, 45);   // states with both (39 in original)
      salesNoIncome = getRandomInt(4, 9);   // sales tax, no income tax (6 in original)
      noSalesIncome = getRandomInt(2, 6);   // income tax, no sales tax (4 in original)
      noSalesNoIncome = getRandomInt(1, 3); // neither (1 in original)

      totalWithSales = salesIncome + salesNoIncome;
      totalStates = salesIncome + salesNoIncome + noSalesIncome + noSalesNoIncome;

      // Correct: P(no income tax | has sales tax).
      correctPct = (salesNoIncome / totalWithSales) * 100;
      // A: divides by ALL states (wrong, larger denominator -> too small).
      dA = (salesNoIncome / totalStates) * 100;
      // B: divides by the "no income tax" row total (reversed conditioning).
      dB = (salesNoIncome / (salesNoIncome + noSalesNoIncome)) * 100;
      // C: uses only the "both taxes" cell as the denominator.
      dC = (salesNoIncome / salesIncome) * 100;

      tries++;
    } while (
      tries < 50 &&
      new Set([
        roundTenth(correctPct),
        roundTenth(dA),
        roundTenth(dB),
        roundTenth(dC),
      ]).size !== 4
    );

    const correctAnswerText = fmt(correctPct);

    // STEP: Build the data table (values match the math for every draw).
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; text-align: center; font-family: serif;">
  <thead>
    <tr style="border-bottom: 2px solid #000;">
      <th style="padding: 8px; border-right: 1px solid #ccc;">Tax Type</th>
      <th style="padding: 8px; border-right: 1px solid #ccc;">State sales tax</th>
      <th style="padding: 8px;">No state sales tax</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #ccc;">
      <td style="padding: 8px; border-right: 1px solid #ccc; font-weight: bold;">State income tax</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${salesIncome}</td>
      <td style="padding: 8px;">${noSalesIncome}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-right: 1px solid #ccc; font-weight: bold;">No state income tax</td>
      <td style="padding: 8px; border-right: 1px solid #ccc;">${salesNoIncome}</td>
      <td style="padding: 8px;">${noSalesNoIncome}</td>
    </tr>
  </tbody>
</table>`;

    const optionsData = [
      {
        text: correctAnswerText,
        isCorrect: true,
      },
      {
        text: fmt(dA),
        isCorrect: false,
        reason: `results from dividing by all ${totalStates} states instead of only the ${totalWithSales} states that have a sales tax`,
      },
      {
        text: fmt(dB),
        isCorrect: false,
        reason: `divides by the ${salesNoIncome + noSalesNoIncome} states with no income tax, which is the wrong condition`,
      },
      {
        text: fmt(dC),
        isCorrect: false,
        reason: `uses only the ${salesIncome} states with both taxes as the denominator instead of all ${totalWithSales} states with a sales tax`,
      },
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index),
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The table shows the number of U.S. states cross-classified by whether they levy a state income tax and a state sales tax. To the nearest tenth of a percent, what percent of the states that have a state sales tax do not have a state income tax?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswerText,
      explanation: `Choice ${correctLetter} is correct. Restrict to the states that have a sales tax: there are ${salesIncome} with an income tax and ${salesNoIncome} without, for a total of ${totalWithSales}. Of those, ${salesNoIncome} have no income tax, so the requested percent is $\\frac{${salesNoIncome}}{${totalWithSales}} \\times 100 \\approx ${roundTenth(correctPct).toFixed(1)}$ percent, which rounds to ${correctAnswerText}.\n\nChoice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.\nChoice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.\nChoice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`,
    };
  }
};
