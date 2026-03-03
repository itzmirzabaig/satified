import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b52e5b6f
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 100-300, vitamin D: 30-270]
 * - Difficulty factors: [Basic subtraction in context]
 * - Question type: [Word Problem → Multiple Choice Text]
 */

export const generator_b52e5b6f = {
  metadata: {
    // id: "b52e5b6f",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const totalMass = getRandomInt(100, 300);
    const massVitaminD = getRandomInt(30, totalMass - 30);
    const massCalcium = totalMass - massVitaminD;

    const optionsData = [
      { text: massCalcium.toString(), isCorrect: true },
      { text: (totalMass + massVitaminD).toString(), isCorrect: false, reason: "incorrectly adds the masses instead of subtracting" },
      { text: totalMass.toString(), isCorrect: false, reason: "identifies the total mass rather than the calcium mass" },
      { text: massVitaminD.toString(), isCorrect: false, reason: "identifies the vitamin D mass rather than the calcium mass" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A mixture consisting of only vitamin D and calcium has a total mass of $${totalMass}$ grams. The mass of vitamin D in the mixture is $${massVitaminD}$ grams. What is the mass, in grams, of calcium in the mixture?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: massCalcium.toString(),
      explanation: `Choice ${correctLetter} is correct. Since the mixture consists only of vitamin D and calcium, the mass of calcium equals the total mass minus the mass of vitamin D: $${totalMass} - ${massVitaminD} = ${massCalcium}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 83f2c3bf
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 1-3, intercept: 1-6]
 * - Difficulty factors: [Verifying table values against equation]
 * - Question type: [Table Matching → Multiple Choice with Tables]
 */