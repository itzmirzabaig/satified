import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 294
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [speed values: double-digit around 150-170, range width: 20]
 * - Difficulty factors: [Real-world context, compound inequality construction]
 * - Distractor patterns: [A=range width, B=lower bound only, C=upper bound only, D=correct compound]
 * - Constraints: [Speed must be inclusive range]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_294 = {
  metadata: {
    id: "294",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const baseSpeed = getRandomInt(100, 250);
    const rangeWidth = getRandomInt(15, 40);
    const maxSpeed = baseSpeed + rangeWidth;

    const optionsData = [
      { text: `$s \\leq ${rangeWidth}$`, isCorrect: false, reason: `${rangeWidth} is the difference between the highest and lowest speeds, $${maxSpeed} - ${baseSpeed}$, not a bound on the speed; the speed was always at least ${baseSpeed} miles per hour` },
      { text: `$s \\leq ${baseSpeed}$`, isCorrect: false, reason: `${baseSpeed} miles per hour was the lowest speed, so the speed was at least ${baseSpeed}, not at most ${baseSpeed}` },
      { text: `$s \\leq ${maxSpeed}$`, isCorrect: false, reason: `this inequality includes speeds below ${baseSpeed} miles per hour, the lowest speed during this portion of the flight` },
      { text: `$${baseSpeed} \\leq s \\leq ${maxSpeed}$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The cruising speed $s$ varied between ${baseSpeed} and ${maxSpeed} miles per hour, meaning $s$ is at least ${baseSpeed} and at most ${maxSpeed}: $${baseSpeed} \\leq s \\leq ${maxSpeed}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `During a portion of a flight, a small airplane's cruising speed varied between $${baseSpeed}$ miles per hour and $${maxSpeed}$ miles per hour. Which inequality best represents this situation, where $s$ is the cruising speed, in miles per hour, during this portion of the flight?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
