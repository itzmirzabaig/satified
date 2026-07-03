import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 473
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [two-way table with values 15-90, total 135]
 * - Difficulty factors: [Two-way table reading, conditional probability concept]
 * - Distractor patterns: [A: P(no beverage | no gas), B: P(no gas | no beverage), C: P(beverage | no gas)]
 * - Constraints: [Row/column totals must be consistent, maintain realistic proportions]
 * - Question type: [Two-way Table → HTML Table]
 * - Figure generation: [Generate consistent two-way table data]
 */

export const generator_473 = {
  metadata: {
    id: "473",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Draw the four table cells, then keep only draws whose four answer-choice
    // VALUES are pairwise distinct. Collisions are possible because, e.g.,
    // A = e/(c+e) equals B = e/(b+e) whenever gasAndNoBev === noGasAndBev, and
    // a few rarer arithmetic coincidences (e^2 = b*c, etc.). A bounded redraw
    // converges in a handful of tries and guarantees no duplicate options.
    let gasAndBev = 0, gasAndNoBev = 0, noGasAndBev = 0, noGasAndNoBev = 0;
    let totalGas = 0, totalNoGas = 0, totalBev = 0, totalNoBev = 0, totalCustomers = 0;
    for (let tries = 0; tries < 50; tries++) {
      gasAndBev = getRandomInt(40, 80);
      gasAndNoBev = getRandomInt(15, 40);
      noGasAndBev = getRandomInt(25, 50);
      noGasAndNoBev = getRandomInt(10, 25);

      totalGas = gasAndBev + gasAndNoBev;
      totalNoGas = noGasAndBev + noGasAndNoBev;
      totalBev = gasAndBev + noGasAndBev;
      totalNoBev = gasAndNoBev + noGasAndNoBev;
      totalCustomers = totalGas + totalNoGas;

      const vals = [
        noGasAndNoBev / totalNoGas,      // A: P(no beverage | no gas)
        noGasAndNoBev / totalNoBev,      // B: P(no gas | no beverage)
        noGasAndBev / totalNoGas,        // C: P(beverage | no gas)
        totalNoGas / totalCustomers,     // D: correct — P(no gas)
      ];
      let distinct = true;
      for (let i = 0; i < vals.length && distinct; i++) {
        for (let j = i + 1; j < vals.length; j++) {
          if (Math.abs(vals[i] - vals[j]) < 1e-9) { distinct = false; break; }
        }
      }
      if (distinct) break;
    }

    const tableCode = `<table><thead><tr><th></th><th>Beverage purchased</th><th>Beverage not purchased</th><th>Total</th></tr></thead><tbody><tr><td>Gasoline purchased</td><td>${gasAndBev}</td><td>${gasAndNoBev}</td><td>${totalGas}</td></tr><tr><td>Gasoline not purchased</td><td>${noGasAndBev}</td><td>${noGasAndNoBev}</td><td>${totalNoGas}</td></tr><tr><td>Total</td><td>${totalBev}</td><td>${totalNoBev}</td><td>${totalCustomers}</td></tr></tbody></table>`;

    const correctNumerator = totalNoGas;
    const correctDenominator = totalCustomers;
    const correctText = `\\frac{${correctNumerator}}{${correctDenominator}}`;

    const optionsData = [
      { text: `\\frac{${noGasAndNoBev}}{${totalNoGas}}`, isCorrect: false, reason: "finding the probability that a customer did not purchase a beverage, given that the customer did not purchase gasoline" },
      { text: `\\frac{${noGasAndNoBev}}{${totalNoBev}}`, isCorrect: false, reason: "finding the probability that a customer did not purchase gasoline, given that the customer did not purchase a beverage" },
      { text: `\\frac{${noGasAndBev}}{${totalNoGas}}`, isCorrect: false, reason: "finding the probability that a customer did purchase a beverage, given that the customer did not purchase gasoline" },
      { text: `\\frac{${correctNumerator}}{${correctDenominator}}`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The total number of gas station customers on Tuesday was ${totalCustomers}. The table shows that the number of customers who did not purchase gasoline was ${totalNoGas}. Finding the ratio of the number of customers who did not purchase gasoline to the total number of customers gives the probability that a customer selected at random on that day did not purchase gasoline, which is $\\frac{${totalNoGas}}{${totalCustomers}}$. Choice ${incorrectOptions[0].letter} is incorrect and may result from ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect and may result from ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect and may result from ${incorrectOptions[2].reason}.`;

    return {
      questionText: `On Tuesday, a local gas station had $${totalCustomers}$ customers. The table above summarizes whether or not the customers on Tuesday purchased gasoline, a beverage, both, or neither. Based on the data in the table, what is the probability that a gas station customer selected at random on that day did not purchase gasoline?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
