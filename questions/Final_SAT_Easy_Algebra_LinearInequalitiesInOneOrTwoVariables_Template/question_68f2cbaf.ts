import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 68f2cbaf
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [distance: 24, speed: 4]
 * - Difficulty factors: [Distance-rate-time formula, division]
 * - Distractor patterns: [A=speed value, B=correct time, C=distance-speed, D=distance value]
 * - Constraints: [Time must be distance/speed]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_68f2cbaf = {
  metadata: {
    // id: "68f2cbaf",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const speed = getRandomInt(3, 8);
    const time = getRandomInt(4, 10);
    const distance = speed * time;
    const distractor1 = speed;
    const distractor2 = distance - speed;
    const distractor3 = distance;

    const optionsData = [
      { text: `${distractor1}`, isCorrect: false },
      { text: `${time}`, isCorrect: true },
      { text: `${distractor2}`, isCorrect: false },
      { text: `${distractor3}`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const explanation = `Choice ${correctLetter} is correct. Using the formula $Time = \\frac{Distance}{Rate}$, Ty needs to walk $\\frac{${distance}}{${speed}} = ${time}$ hours to reach his goal of ${distance} kilometers.`;

    return {
      questionText: `Ty set a goal to walk at least ${distance} kilometers every day to prepare for a multiday hike. On a certain day, Ty plans to walk at an average speed of ${speed} kilometers per hour. What is the minimum number of hours Ty must walk on that day to fulfill the daily goal?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: df32b09c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scores: 85, 78, 98, target mean: 90]
 * - Difficulty factors: [Mean formula setup, inequality construction]
 * - Distractor patterns: [A=incorrect rearrangement, B=4G error, C=correct mean formula, D=wrong average base]
 * - Constraints: [Must use sum/4 >= target format]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */