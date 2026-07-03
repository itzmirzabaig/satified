import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 474
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table values 15-85, total 135]
 * - Difficulty factors: [Two-way table with visits, marginal probability]
 * - Distractor patterns: [A: P(<40), B: P(1 visit), C: P(2+ visits)]
 * - Constraints: [Age vs visits two-way table]
 * - Question type: [Two-way Table → HTML Table]
 * - Figure generation: [Generate age/visit distribution]
 */

export const generator_474 = {
  metadata: {
    id: "474",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    // All four options share the denominator grandTotal, so two options collide
    // exactly when their numerators (the four marginal totals) are equal. That
    // can happen: totalYoung === total1Visit (⟺ young2Plus === old1Visit) and
    // total2Plus === totalOld (same condition), among others. Redraw the four
    // cells until the four marginal totals are pairwise distinct (bounded).
    let young1Visit = 0, young2Plus = 0, old1Visit = 0, old2Plus = 0;
    let totalYoung = 0, totalOld = 0, total1Visit = 0, total2Plus = 0, grandTotal = 0;
    for (let tries = 0; tries < 50; tries++) {
      young1Visit = getRandomInt(10, 25);
      young2Plus = getRandomInt(10, 25);
      old1Visit = getRandomInt(15, 30);
      old2Plus = getRandomInt(70, 100);

      totalYoung = young1Visit + young2Plus;
      totalOld = old1Visit + old2Plus;
      total1Visit = young1Visit + old1Visit;
      total2Plus = young2Plus + old2Plus;
      grandTotal = totalYoung + totalOld;

      const nums = [totalYoung, total1Visit, total2Plus, totalOld];
      let distinct = true;
      for (let i = 0; i < nums.length && distinct; i++) {
        for (let j = i + 1; j < nums.length; j++) {
          if (nums[i] === nums[j]) { distinct = false; break; }
        }
      }
      if (distinct) break;
    }

    const tableCode = `<table><thead><tr><th></th><th>1 visit</th><th>2 or more visits</th><th>Total</th></tr></thead><tbody><tr><td>Less than 40 years old</td><td>${young1Visit}</td><td>${young2Plus}</td><td>${totalYoung}</td></tr><tr><td>At least 40 years old</td><td>${old1Visit}</td><td>${old2Plus}</td><td>${totalOld}</td></tr><tr><td>Total</td><td>${total1Visit}</td><td>${total2Plus}</td><td>${grandTotal}</td></tr></tbody></table>`;

    const correctText = `\\frac{${totalOld}}{${grandTotal}}`;

    const optionsData = [
      { text: `\\frac{${totalYoung}}{${grandTotal}}`, isCorrect: false, reason: "probability that the selected customer is less than 40 years old" },
      { text: `\\frac{${total1Visit}}{${grandTotal}}`, isCorrect: false, reason: "probability that the selected customer visited the dealership 1 time" },
      { text: `\\frac{${total2Plus}}{${grandTotal}}`, isCorrect: false, reason: "probability that the selected customer visited 2 or more times" },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Based on the table, there are ${totalOld} customers at least 40 years old out of ${grandTotal} total. The probability is $\\frac{${totalOld}}{${grandTotal}}$. Choice ${incorrectOptions[0].letter} is incorrect; this is the ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this is the ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this is the ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The table summarizes customers who visited a car dealership in the last month by age and number of visits they made to the dealership. If a customer from the last month is selected at random, what is the probability that the selected customer is at least $40$ years old?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
