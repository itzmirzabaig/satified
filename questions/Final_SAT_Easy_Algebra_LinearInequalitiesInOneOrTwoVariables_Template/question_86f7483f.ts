import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 86f7483f
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min: 1510, max: 4130]
 * - Difficulty factors: [Large number compound inequality, real-world context]
 * - Distractor patterns: [A=only min bound reversed, B=correct compound, C=only max bound reversed, D=irrelevant sum]
 * - Constraints: [Must be inclusive range]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_86f7483f = {
  metadata: {
    // id: "86f7483f",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const minDist = getRandomInt(1000, 3000);
    const maxDist = minDist + getRandomInt(1000, 3000);

    const optionsData = [
      { text: `$d \\le ${minDist}$`, isCorrect: false },
      { text: `$${minDist} \\le d \\le ${maxDist}$`, isCorrect: true },
      { text: `$d \\ge ${maxDist}$`, isCorrect: false },
      { text: `$${maxDist} \\le d \\le ${minDist + maxDist}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const explanation = `Choice ${correctLetter} is correct. The dragonfly traveled at least ${minDist} miles ($d \\ge ${minDist}$) and at most ${maxDist} miles ($d \\le ${maxDist}$), so ${minDist} \\le d \\le ${maxDist}$.`;

    return {
      questionText: `During spring migration, a dragonfly traveled a minimum of $${minDist}$ miles and a maximum of $${maxDist}$ miles between stopover locations. Which inequality represents this situation, where $d$ is a possible distance, in miles, this dragonfly traveled between stopover locations during spring migration?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 72a5fd28
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [package size: 12, needed: 50]
 * - Difficulty factors: [Ceiling function, discrete whole number constraint]
 * - Distractor patterns: [Fill-in-the-blank, exact calculation vs rounded up]
 * - Constraints: [Must round up to next whole number]
 * - Question type: [Word Problem→Fill in the blank]
 * - Figure generation: [None]
 */