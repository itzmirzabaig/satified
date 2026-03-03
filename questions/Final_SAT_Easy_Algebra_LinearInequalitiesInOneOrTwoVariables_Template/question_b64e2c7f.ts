import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: b64e2c7f
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min temp: 55.0, current: 51.3]
 * - Difficulty factors: [Decimal subtraction, "at least" interpretation]
 * - Distractor patterns: [A=wrong base temp, B=correct difference, C=wrong base, D=wrong base]
 * - Constraints: [Result is 55.0 - 51.3 = 3.7]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_b64e2c7f = {
  metadata: {
    // id: "b64e2c7f",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const minTemp = (getRandomInt(50, 60) + getRandomInt(0, 9) / 10).toFixed(1);
    const currentTemp = (parseFloat(minTemp) - getRandomInt(2, 6) - getRandomInt(0, 9) / 10).toFixed(1);
    const neededIncrease = (parseFloat(minTemp) - parseFloat(currentTemp)).toFixed(1);
    const distractor1 = (parseFloat(minTemp) - (parseFloat(currentTemp) + 2.4)).toFixed(1);
    const distractor2 = (parseFloat(minTemp) - (parseFloat(currentTemp) - 1.3)).toFixed(1);
    const distractor3 = (parseFloat(minTemp) - (parseFloat(currentTemp) - 2.6)).toFixed(1);

    const optionsData = [
      { text: `${distractor1}`, isCorrect: false },
      { text: `${neededIncrease}`, isCorrect: true },
      { text: `${distractor2}`, isCorrect: false },
      { text: `${distractor3}`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const explanation = `Choice ${correctLetter} is correct. The butterfly needs at least ${minTemp}°F and currently has ${currentTemp}°F. The minimum increase is ${minTemp} - ${currentTemp} = ${neededIncrease}°F.`;

    return {
      questionText: `Monarch butterflies can fly only with a body temperature of at least ${minTemp} degrees Fahrenheit (°F). If a monarch butterfly's body temperature is ${currentTemp}°F, what is the minimum increase needed in its body temperature, in °F, so that it can fly?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 7d6928bd
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [max places: 14]
 * - Difficulty factors: [Simple sum constraint, "at most" interpretation]
 * - Distractor patterns: [A=correct f+h<=14, B=wrong sign >=, C=subtraction, D=subtraction with wrong sign]
 * - Constraints: [Must be sum of offices and homes]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */