import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 291
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [distance: 24, speed: 4]
 * - Difficulty factors: [Distance-rate-time formula, division]
 * - Distractor patterns: [A=speed value, B=distance-speed, C=distance value, D=correct time]
 * - Constraints: [Time must be distance/speed]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - Removed personal name ("Ty"); now a generic "hiker" with consistent "they".
 * - Guaranteed distance is an exact multiple of speed, so time = distance/speed
 *   is always a whole number (no float artifacts).
 * - Guarded the only possible collision (speed == time) so the four options are
 *   always distinct -> fixes DUP_OPTIONS and the resulting LETTER_MISMATCH.
 * - Explanation reads the correct letter from the shuffled array and explains
 *   each distractor from the same live variables.
 */

export const generator_291 = {
  metadata: {
    id: "291",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const speed = getRandomInt(3, 8);
    // time must differ from speed so the "speed" distractor cannot equal the
    // correct answer (the only collision possible in these ranges).
    let time = getRandomInt(4, 10);
    let guard = 0;
    while (time === speed && guard++ < 50) {
      time = getRandomInt(4, 10);
    }
    if (time === speed) time = speed === 10 ? 4 : speed + 1; // bounded fallback

    const distance = speed * time; // exact multiple -> integer hours

    const distractorSpeed = speed;            // confuses rate with time
    const distractorSub = distance - speed;   // subtracts instead of divides
    const distractorDistance = distance;      // reports the distance itself

    const optionsData = [
      { text: `${time}`, isCorrect: true },
      { text: `${distractorSpeed}`, isCorrect: false },
      { text: `${distractorSub}`, isCorrect: false },
      { text: `${distractorDistance}`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const explanation = `Choice ${correctLetter} is correct. The time needed is the distance divided by the average speed: $\\text{time} = \\frac{\\text{distance}}{\\text{speed}} = \\frac{${distance}}{${speed}} = ${time}$ hours. The value $${distractorSpeed}$ is the average speed in kilometers per hour, not the time. The value $${distractorSub}$ comes from subtracting the speed from the distance instead of dividing. The value $${distractorDistance}$ is the total distance in kilometers, not a number of hours.`;

    return {
      questionText: `A hiker set a goal to walk at least ${distance} kilometers in one day while preparing for a multiday trek. On that day, the hiker walks at an average speed of ${speed} kilometers per hour. What is the minimum number of hours the hiker must walk that day to meet the goal?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
