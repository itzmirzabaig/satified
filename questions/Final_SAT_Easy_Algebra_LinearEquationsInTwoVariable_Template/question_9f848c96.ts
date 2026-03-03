import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9f848c96
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentages: 2-5, 90-98, final: 5-15, total: 20-50]
 * - Difficulty factors: [Converting percentages to decimals, setting up mixture equation]
 * - Question type: [Word Problem → Multiple Choice Text]
 */

export const generator_9f848c96 = {
  metadata: {
    // id: "9f848c96",
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

    const correctEquation = `0.0${lowPercent}x + 0.${highPercent}y = (0.0${finalPercent})(${totalKg})`;

    const optionsData = [
      { text: `$0.0${lowPercent}x + 0.${highPercent}y = (0.0${finalPercent})(${totalKg})$`, isCorrect: true },
      { text: `$0.${highPercent}x + 0.0${lowPercent}y = (0.0${finalPercent})(${totalKg})$`, isCorrect: false, reason: "swaps the percentages" },
      { text: `$0.${highPercent}x + 0.0${lowPercent}y = ${totalKg}$`, isCorrect: false, reason: "swaps percentages and equates to total mass" },
      { text: `$0.0${lowPercent}x + 0.${highPercent}y = ${totalKg}$`, isCorrect: false, reason: "equates to total mass rather than salt mass" }
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
      correctAnswer: shuffledOptions.find(o => o.isCorrect)!.text,
      explanation: `Choice ${correctLetter} is correct. Salt from low-salt is $0.0${lowPercent}x$ and high-salt is $0.${highPercent}y$. Final salt is $(0.0${finalPercent})(${totalKg})$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.`
    };
  }
};

/**
 * Question ID: b23ba4c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2-6, total: 25-100]
 * - Difficulty factors: [Substitution and solving linear equation]
 */