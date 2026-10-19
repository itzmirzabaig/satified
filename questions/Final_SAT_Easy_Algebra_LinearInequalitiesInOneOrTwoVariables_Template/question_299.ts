import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 299
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min temp: 55.0, current: 51.3]
 * - Difficulty factors: [Decimal subtraction, "at least" interpretation]
 * - Distractor patterns: [A=wrong base temp, B=correct difference, C=wrong base, D=wrong base]
 * - Constraints: [Result is 55.0 - 51.3 = 3.7]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_299 = {
  metadata: {
    id: "299",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Work in tenths of a degree to avoid float drift. The old wrong choices
    // were the answer shifted by 2.4, 1.3 and 2.6 degrees, which no one gets
    // from a real mistake.
    const minT = getRandomInt(500, 609);
    const currentT = minT - getRandomInt(20, 69);
    const t = (v: number) => (v / 10).toFixed(1);
    const minTemp = t(minT), currentTemp = t(currentT), neededIncrease = t(minT - currentT);
    const sum = t(minT + currentT);

    // Always distinct: the increase is at most 6.9, less than both temperatures,
    // and the sum is larger than both.
    const optionsData = [
      { text: currentTemp, isCorrect: false, reason: `${currentTemp}°F is the butterfly's current body temperature, not the increase needed` },
      { text: neededIncrease, isCorrect: true, reason: '' },
      { text: minTemp, isCorrect: false, reason: `${minTemp}°F is the lowest body temperature at which the butterfly can fly, not the increase needed` },
      { text: sum, isCorrect: false, reason: `it results from adding ${currentTemp} to ${minTemp} instead of subtracting it` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. If the butterfly's body temperature increases by $x$ degrees, its temperature will be $${currentTemp} + x$ degrees. To fly, $${currentTemp} + x \\ge ${minTemp}$. Subtracting ${currentTemp} from both sides of this inequality yields $x \\ge ${neededIncrease}$. Therefore, the minimum increase needed is ${neededIncrease}°F. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `Monarch butterflies can fly only with a body temperature of at least ${minTemp} degrees Fahrenheit (°F). If a monarch butterfly's body temperature is ${currentTemp}°F, what is the minimum increase needed in its body temperature, in °F, so that it can fly?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
