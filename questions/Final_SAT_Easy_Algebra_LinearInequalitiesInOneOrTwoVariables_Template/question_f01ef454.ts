import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f01ef454
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min volume: 12.7, max volume: 15.7, density: 165]
 * - Difficulty factors: [Range multiplication, weight calculation]
 * - Distractor patterns: [A=subtraction, B=addition, C=correct multiplication, D=division]
 * - Constraints: [Must multiply density by volume range]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_f01ef454 = {
  metadata: {
    // id: "f01ef454",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const minVolume = (getRandomInt(10, 20) + getRandomInt(0, 9) / 10).toFixed(1);
    const maxVolume = (parseFloat(minVolume) + getRandomInt(2, 5)).toFixed(1);
    const density = getRandomInt(100, 200);
    const minWeight = (density * parseFloat(minVolume)).toFixed(0);
    const maxWeight = (density * parseFloat(maxVolume)).toFixed(0);

    const optionsData = [
      { text: `$${density} - ${maxVolume} < x < ${density} - ${minVolume}$`, isCorrect: false },
      { text: `$${density} + ${minVolume} < x < ${density} + ${maxVolume}$`, isCorrect: false },
      { text: `$${density}(${minVolume}) < x < ${density}(${maxVolume})$`, isCorrect: true },
      { text: `$\\frac{${density}}{${maxVolume}} < x < \\frac{${density}}{${minVolume}}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const explanation = `Choice ${correctLetter} is correct. Weight = density × volume. With volume between ${minVolume} and ${maxVolume} and density ${density} lb/ft³, the weight $x$ satisfies $${density}(${minVolume}) < x < ${density}(${maxVolume})$, or $${minWeight} < x < ${maxWeight}$.`;

    return {
      questionText: `A geologist estimates that the volume of a slab of granite is greater than ${minVolume} cubic feet but less than ${maxVolume} cubic feet. The geologist also estimates that the slab of granite weighs ${density} pounds per cubic foot of volume. Which inequality represents this situation, where $x$ represents the estimated total weight, in pounds, of the slab of granite?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 208626df
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [perimeter limit: 27, test length: 8, test width: 3]
 * - Difficulty factors: [Interpretation of ordered pair in context, perimeter formula]
 * - Distractor patterns: [A=swapped dimensions, B=correct interpretation, C=swapped with wrong sign, D=calculation error]
 * - Constraints: [Must verify 2(8)+2(3) <= 27]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */