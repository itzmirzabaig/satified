import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 563407e5
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min: 50, max: 60, trays: 4]
 * - Difficulty factors: [Range multiplication, bounds checking]
 * - Distractor patterns: [A=below minimum, B=within range, C=just above max, D=way above max]
 * - Constraints: [Total must be between 200 and 240]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_563407e5 = {
  metadata: {
    // id: "563407e5",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const minPerTray = getRandomInt(40, 80);
    const maxPerTray = minPerTray + getRandomInt(8, 20);
    const numTrays = getRandomInt(3, 6);
    const minTotal = minPerTray * numTrays;
    const maxTotal = maxPerTray * numTrays;
    const correctValue = minTotal + getRandomInt(5, maxTotal - minTotal - 5);
    const tooLow = minTotal - getRandomInt(10, 30);
    const tooHigh1 = maxTotal + getRandomInt(5, 15);
    const tooHigh2 = maxTotal + getRandomInt(20, 50);

    const optionsData = [
      { text: `${tooLow}`, isCorrect: false },
      { text: `${correctValue}`, isCorrect: true },
      { text: `${tooHigh1}`, isCorrect: false },
      { text: `${tooHigh2}`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const explanation = `Choice ${correctLetter} is correct. Each tray contains at least ${minPerTray} and at most ${maxPerTray} cookies. For ${numTrays} trays, the minimum is ${minTotal} and maximum is ${maxTotal}. Only ${correctValue} falls within this range.`;

    return {
      questionText: `A bakery sells trays of cookies. Each tray contains at least $${minPerTray}$ cookies but no more than $${maxPerTray}$. Which of the following could be the total number of cookies on $${numTrays}$ trays of cookies?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 4a090a46
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [required: 100, current: 86]
 * - Difficulty factors: [Simple subtraction, "at least" interpretation]
 * - Distractor patterns: [A=correct difference, B=subtraction error, C=current hours, D=sum of both]
 * - Constraints: [Result must be positive integer]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */