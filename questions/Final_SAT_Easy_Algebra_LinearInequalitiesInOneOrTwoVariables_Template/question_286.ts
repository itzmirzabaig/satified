import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 286
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min: 31, max: 67]
 * - Difficulty factors: [Temperature range compound inequality]
 * - Distractor patterns: [A=sum of bounds, B=only max bound, C=correct compound, D=only min bound reversed]
 * - Constraints: [Must be inclusive range]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_286 = {
  metadata: {
    id: "286",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const minTemp = getRandomInt(20, 50);
    const maxTemp = minTemp + getRandomInt(20, 40);

    // The explanation used to end in raw "\le" outside math mode, and the
    // wrong choices had no explanations.
    const optionsData = [
      { text: `$t \\ge ${minTemp + maxTemp}$`, isCorrect: false, reason: `${minTemp + maxTemp} is the sum of the lowest and highest temperatures; every recorded temperature was at most ${maxTemp}°F, so none was ${minTemp + maxTemp}°F or more` },
      { text: `$t \\ge ${maxTemp}$`, isCorrect: false, reason: `${maxTemp}°F was the highest recorded temperature, so the temperatures were at most ${maxTemp}°F, not at least ${maxTemp}°F` },
      { text: `$${minTemp} \\le t \\le ${maxTemp}$`, isCorrect: true, reason: '' },
      { text: `$t \\le ${minTemp}$`, isCorrect: false, reason: `${minTemp}°F was the lowest recorded temperature, so the temperatures were at least ${minTemp}°F, not at most ${minTemp}°F` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Since the lowest recorded temperature was ${minTemp}°F, every recorded temperature $t$ was at least ${minTemp}°F, so $t \\ge ${minTemp}$. Since the highest recorded temperature was ${maxTemp}°F, every recorded temperature was at most ${maxTemp}°F, so $t \\le ${maxTemp}$. Together, these give $${minTemp} \\le t \\le ${maxTemp}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `For a 3-week period in a town in Illinois, the lowest recorded temperature was ${minTemp} degrees Fahrenheit (°F) and the highest recorded temperature was ${maxTemp}°F. Which inequality is true for any recorded temperature $t$, in °F, in this town for this 3-week period?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
