import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 106
*
* ORIGINAL ANALYSIS:
* - Number ranges: [monthly: 15-25, enrollment: 1-2x monthly (15-50), months: 4-12]
* - Difficulty factors: [Word problem, two-step equation]
* - Distractor patterns: [arithmetic slip (low), forgot to subtract fee, added fee instead]
* - Constraints: [Clean integer result; enrollment a multiple of monthly so error paths are integers]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_106 = {
  metadata: {
    id: "106",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const monthly = getRandomInt(15, 25);
    // Enrollment fee is an exact multiple of the monthly fee so every
    // misconception distractor below is an exact integer for every draw.
    const feeMultiple = getRandomInt(1, 2);
    const enrollment = monthly * feeMultiple; // 15-50
    const months = getRandomInt(4, 12);
    const total = enrollment + monthly * months;

    // Options are months - 2 < months < months + feeMultiple < months + 2 * feeMultiple,
    // strictly increasing, so no two options can ever collide.
    const distractorNoFee = months + feeMultiple;        // total / monthly (forgot to subtract the fee)
    const distractorAddedFee = months + 2 * feeMultiple; // (total + enrollment) / monthly (added the fee)
    const distractorLow = months - 2;                    // arithmetic slip; months >= 4 keeps it positive

    const optionsData = [
      { text: distractorLow.toString(), isCorrect: false, reason: `may result from an arithmetic error when solving the equation` },
      { text: distractorNoFee.toString(), isCorrect: false, reason: `results from dividing the total \\$${total} by the \\$${monthly} monthly fee without first subtracting the \\$${enrollment} enrollment fee` },
      { text: months.toString(), isCorrect: true },
      { text: distractorAddedFee.toString(), isCorrect: false, reason: `results from adding the \\$${enrollment} enrollment fee to the total instead of subtracting it before dividing` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A gym charges a one-time enrollment fee of \\$${enrollment} plus a membership fee of \\$${monthly} per month. After how many months will a member have paid the gym a total of \\$${total}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: months.toString(),
      explanation: `Choice ${correctLetter} is correct. If \\( x \\) is the number of months, the total amount paid, in dollars, is given by \\( ${enrollment} + ${monthly}x = ${total} \\). Subtracting ${enrollment} from both sides yields \\( ${monthly}x = ${total - enrollment} \\), and dividing both sides by ${monthly} yields \\( x = ${months} \\). Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
