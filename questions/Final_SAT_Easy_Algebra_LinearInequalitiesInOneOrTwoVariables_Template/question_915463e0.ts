import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 915463e0
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min temp: 97.8, max temp: 99.0]
 * - Difficulty factors: [Decimal range, inclusive bounds, real-world context]
 * - Distractor patterns: [A=below range, B=just below min, C=within range, D=above max]
 * - Constraints: [Must test decimal values against inclusive range]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_915463e0 = {
  metadata: {
    // id: "915463e0",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const minTemp = (getRandomInt(96, 98) + getRandomInt(0, 9) / 10).toFixed(1);
    const maxTemp = (parseFloat(minTemp) + getRandomInt(1, 3) + getRandomInt(0, 9) / 10).toFixed(1);
    const tooLow1 = (parseFloat(minTemp) - getRandomInt(1, 2) - 0.2).toFixed(1);
    const tooLow2 = (parseFloat(minTemp) - 0.2).toFixed(1);
    const correctTemp = (parseFloat(minTemp) + 0.1).toFixed(1);
    const tooHigh = (parseFloat(maxTemp) + 0.7).toFixed(1);

    const optionsData = [
      { text: `$${tooLow1}^{\\circ}\\text{F}$`, isCorrect: false },
      { text: `$${tooLow2}^{\\circ}\\text{F}$`, isCorrect: false },
      { text: `$${correctTemp}^{\\circ}\\text{F}$`, isCorrect: true },
      { text: `$${tooHigh}^{\\circ}\\text{F}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const explanation = `Choice ${correctLetter} is correct. Normal body temperature is between $${minTemp}^{\\circ}\\text{F}$ and $${maxTemp}^{\\circ}\\text{F}$. Only $${correctTemp}^{\\circ}\\text{F}$ falls within this range.`;

    return {
      questionText: `Normal body temperature for an adult is between $${minTemp}^{\\circ}\\text{F}$ and $${maxTemp}^{\\circ}\\text{F}$, inclusive. If Kevin, an adult male, has a body temperature that is considered to be normal, which of the following could be his body temperature?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 89541f9b
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 5, -3, constant: 4]
 * - Difficulty factors: [Linear inequality testing, multiple point verification]
 * - Distractor patterns: [I only, II only, I and II only, I and III only]
 * - Constraints: [Must test each ordered pair]
 * - Question type: [Multiple Choice Text with roman numerals]
 * - Figure generation: [None]
 */