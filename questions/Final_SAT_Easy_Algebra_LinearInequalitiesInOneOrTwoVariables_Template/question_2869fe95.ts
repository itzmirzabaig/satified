import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2869fe95
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min: 31, max: 67]
 * - Difficulty factors: [Temperature range compound inequality]
 * - Distractor patterns: [A=sum of bounds, B=only max bound, C=correct compound, D=only min bound reversed]
 * - Constraints: [Must be inclusive range]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_2869fe95 = {
  metadata: {
    // id: "2869fe95",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const minTemp = getRandomInt(20, 50);
    const maxTemp = minTemp + getRandomInt(20, 40);

    const optionsData = [
      { text: `$t \\ge ${minTemp + maxTemp}$`, isCorrect: false },
      { text: `$t \\ge ${maxTemp}$`, isCorrect: false },
      { text: `$${minTemp} \\le t \\le ${maxTemp}$`, isCorrect: true },
      { text: `$t \\le ${minTemp}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const explanation = `Choice ${correctLetter} is correct. The temperature $t$ was at least ${minTemp}°F and at most ${maxTemp}°F, so ${minTemp} \\le t \\le ${maxTemp}.`;

    return {
      questionText: `For a 3-week period in a town in Illinois, the lowest recorded temperature was ${minTemp} degrees Fahrenheit (°F) and the highest recorded temperature was ${maxTemp}°F. Which inequality is true for any recorded temperature $t$, in °F, in this town for this 3-week period?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: e744499e
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min items: 20, max cost: $80, workbook: $3, flashcards: $4]
 * - Difficulty factors: [System of inequalities, two constraints]
 * - Distractor patterns: [A=correct with >=20 and <=80, B=wrong cost sign, C=swapped constraints, D=both reversed]
 * - Constraints: [Must have quantity >= and cost <=]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */