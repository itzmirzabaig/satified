import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 842cec4d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [speed values: double-digit around 150-170, range width: 20]
 * - Difficulty factors: [Real-world context, compound inequality construction]
 * - Distractor patterns: [A=range width, B=lower bound only, C=upper bound only, D=correct compound]
 * - Constraints: [Speed must be inclusive range]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_842cec4d = {
  metadata: {
    // id: "842cec4d",
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
      { text: `$s \\leq ${rangeWidth}$`, isCorrect: false, reason: "uses the range width instead of the actual bounds" },
      { text: `$s \\leq ${baseSpeed}$`, isCorrect: false, reason: "only includes the lower bound, missing the upper constraint" },
      { text: `$s \\leq ${maxSpeed}$`, isCorrect: false, reason: "only includes the upper bound, missing the lower constraint" },
      { text: `$${baseSpeed} \\leq s \\leq ${maxSpeed}$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The cruising speed $s$ varied between ${baseSpeed} and ${maxSpeed} miles per hour, meaning $s$ is at least ${baseSpeed} and at most ${maxSpeed}: $${baseSpeed} \\leq s \\leq ${maxSpeed}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `During a portion of a flight, a small airplane's cruising speed varied between $${baseSpeed}$ miles per hour and $${maxSpeed}$ miles per hour. Which inequality best represents this situation, where $s$ is the cruising speed, in miles per hour, during this portion of the flight?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 2c121b25
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentages: 30% and 70%, threshold: 400]
 * - Difficulty factors: [Percentage to decimal conversion, linear combination]
 * - Distractor patterns: [B=swapped percentages with wrong sign, C=fraction misunderstanding, D=percentage scaling error]
 * - Constraints: [Must use decimal form 0.3 and 0.7, not 30 and 70]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */