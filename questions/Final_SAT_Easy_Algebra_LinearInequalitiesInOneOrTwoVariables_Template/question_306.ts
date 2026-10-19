import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 306
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min volume: 12.7, max volume: 15.7, density: 165]
 * - Difficulty factors: [Range multiplication, weight calculation]
 * - Distractor patterns: [A=subtraction, B=addition, C=correct multiplication, D=division]
 * - Constraints: [Must multiply density by volume range]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_306 = {
  metadata: {
    id: "306",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const minVolume = (getRandomInt(10, 20) + getRandomInt(1, 9) / 10).toFixed(1); // never "12.0"
    const maxVolume = (parseFloat(minVolume) + getRandomInt(2, 5)).toFixed(1);
    const density = getRandomInt(100, 200);
    // The weights used to be rounded to whole pounds (169 x 15.3 = 2,585.7
    // was shown as 2586). Compute in tenths so the products are exact, and
    // add thousands commas.
    const fmtTenths = (tenths: number) => (tenths / 10).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
    const minWeight = fmtTenths(density * Math.round(parseFloat(minVolume) * 10));
    const maxWeight = fmtTenths(density * Math.round(parseFloat(maxVolume) * 10));

    // The wrong choices used to have no explanations.
    const optionsData = [
      { text: `$${density} - ${maxVolume} < x < ${density} - ${minVolume}$`, isCorrect: false, reason: `it subtracts the volumes from ${density}; the weight is ${density} pounds for each cubic foot, so the volume must be multiplied by ${density}` },
      { text: `$${density} + ${minVolume} < x < ${density} + ${maxVolume}$`, isCorrect: false, reason: `it adds the volumes to ${density}; the weight is ${density} pounds for each cubic foot, so the volume must be multiplied by ${density}` },
      { text: `$${density}(${minVolume}) < x < ${density}(${maxVolume})$`, isCorrect: true, reason: '' },
      { text: `$\\frac{${density}}{${maxVolume}} < x < \\frac{${density}}{${minVolume}}$`, isCorrect: false, reason: `it divides ${density} by the volumes; the weight is the number of cubic feet times ${density} pounds per cubic foot` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The slab weighs ${density} pounds for each cubic foot of volume, so a slab with a volume of $v$ cubic feet weighs $${density}v$ pounds. Since $${minVolume} < v < ${maxVolume}$, multiplying each part of this inequality by ${density} gives $${density}(${minVolume}) < x < ${density}(${maxVolume})$, or $${minWeight} < x < ${maxWeight}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A geologist estimates that the volume of a slab of granite is greater than ${minVolume} cubic feet but less than ${maxVolume} cubic feet. The geologist also estimates that the slab of granite weighs ${density} pounds per cubic foot of volume. Which inequality represents this situation, where $x$ represents the estimated total weight, in pounds, of the slab of granite?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
