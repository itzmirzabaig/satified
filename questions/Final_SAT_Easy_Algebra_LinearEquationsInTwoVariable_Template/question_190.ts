import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 190
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentages: 2-5, 90-98, final: 5-15, total: 20-50]
 * - Difficulty factors: [Converting percentages to decimals, setting up mixture equation]
 * - Question type: [Word Problem → Multiple Choice Text]
 */

export const generator_190 = {
  metadata: {
    id: "190",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const lowPercent = getRandomInt(2, 5);
    const highPercent = getRandomInt(90, 98);
    const finalPercent = getRandomInt(5, 15);
    const totalKg = getRandomInt(20, 50);

    // Convert each percentage to its decimal form as a real number so the
    // representation is correct regardless of digit count. (String templates
    // like `0.0${p}` break for two-digit percentages, e.g. 11% -> "0.011".)
    const toDecimal = (percent: number): string => {
      const val = Math.round(percent) / 100; // exact to 2 decimals for integer percents
      return val.toFixed(2);
    };
    const lowDec = toDecimal(lowPercent);   // e.g. "0.05"
    const highDec = toDecimal(highPercent); // e.g. "0.96"
    const finalDec = toDecimal(finalPercent); // e.g. "0.11"

    const correctText = `$${lowDec}x + ${highDec}y = (${finalDec})(${totalKg})$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${highDec}x + ${lowDec}y = (${finalDec})(${totalKg})$`, isCorrect: false, reason: "swaps the two salt concentrations between $x$ and $y$" },
      { text: `$${highDec}x + ${lowDec}y = ${totalKg}$`, isCorrect: false, reason: "swaps the concentrations and sets the salt mass equal to the total mixture mass" },
      { text: `$${lowDec}x + ${highDec}y = ${totalKg}$`, isCorrect: false, reason: "sets the total salt mass equal to the total mixture mass instead of the salt mass of the final mixture" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A chemist mixes $x$ kilograms of a low-salt mixture (${lowPercent}% salt) with $y$ kilograms of a high-salt mixture (${highPercent}% salt) to create ${totalKg} kilograms of a mixture that is ${finalPercent}% salt by weight. Which equation represents this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The salt from the low-salt mixture is $${lowDec}x$ and the salt from the high-salt mixture is $${highDec}y$; their sum equals the salt in the final mixture, $(${finalDec})(${totalKg})$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.`
    };
  }
};
