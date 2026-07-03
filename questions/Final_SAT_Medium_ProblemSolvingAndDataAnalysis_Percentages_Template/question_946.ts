import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 946
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [original: $75.74, new: $79.86, increase: $4.12, percent: 5.4%]
 * - Difficulty factors: [Percent increase with decimals, rounding to nearest tenth]
 * - Distractor patterns: [A: dollar amount read as percent, B: divides by new bill, C: rounding error]
 * - Constraints: [(new - old) / old * 100, round to 1 decimal]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_946 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values and derive the answer from the DISPLAYED
    // (2-decimal) dollar amounts so the student's computation matches exactly.
    // Wrap in a bounded retry so the four option values are always distinct.
    let roundedOriginal = 0;
    let roundedNewBill = 0;
    let actualIncrease = 0;
    let roundedPercent = 0;
    let distractorDollar = 0;
    let distractorDivNew = 0;
    let distractorRound = 0;

    let tries = 0;
    let ok = false;
    while (!ok && tries++ < 50) {
      const originalBill = getRandomInt(50, 100) + getRandomInt(0, 99) / 100;
      const percentIncrease = getRandomInt(4, 8) + getRandomInt(0, 9) / 10;

      const newBill = originalBill * (1 + percentIncrease / 100);

      roundedOriginal = Math.round(originalBill * 100) / 100;
      roundedNewBill = Math.round(newBill * 100) / 100;

      // Answer computed from the displayed rounded amounts.
      actualIncrease = Math.round((roundedNewBill - roundedOriginal) * 100) / 100;
      const calculatedPercent = (actualIncrease / roundedOriginal) * 100;
      roundedPercent = Math.round(calculatedPercent * 10) / 10;

      // Motivated distractors (each rounded to a tenth).
      distractorDollar = Math.round(actualIncrease * 10) / 10;                      // dollars read as percent
      distractorDivNew = Math.round((actualIncrease / roundedNewBill) * 1000) / 10; // divides by new bill instead of original
      distractorRound = Math.round((roundedPercent + 0.5) * 10) / 10;               // over-rounds by half a tenth-group

      // All four visible numbers must be distinct.
      const vals = [roundedPercent, distractorDollar, distractorDivNew, distractorRound];
      const set = new Set(vals.map(v => v.toFixed(1)));
      // Also require a non-trivial increase so the question reads sensibly.
      ok = set.size === 4 && actualIncrease > 0 && roundedPercent > 0;
    }

    // STEP 2: Correct answer text (percent sign escaped for MathJax).
    const correctText = `${roundedPercent.toFixed(1)}\\%`;

    // STEP 3: Assemble options with reasons.
    const optionsData = [
      { text: `${distractorDollar.toFixed(1)}\\%`, isCorrect: false, reason: "uses the dollar amount of the increase as if it were the percent" },
      { text: `${distractorDivNew.toFixed(1)}\\%`, isCorrect: false, reason: "divides the increase by the new bill instead of the original bill" },
      { text: `${distractorRound.toFixed(1)}\\%`, isCorrect: false, reason: "rounds the percent to the wrong tenth" },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 4: Return question data. Currency escaped as \$ everywhere.
    return {
      questionText: `A customer's monthly water bill was \\$${roundedOriginal.toFixed(2)}. Due to a rate increase, the monthly bill is now \\$${roundedNewBill.toFixed(2)}. To the nearest tenth of a percent, by what percent did the amount of the customer's water bill increase?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The percent increase equals $\\frac{${roundedNewBill.toFixed(2)} - ${roundedOriginal.toFixed(2)}}{${roundedOriginal.toFixed(2)}} \\times 100 = \\frac{${actualIncrease.toFixed(2)}}{${roundedOriginal.toFixed(2)}} \\times 100 \\approx ${roundedPercent.toFixed(1)}\\%$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
