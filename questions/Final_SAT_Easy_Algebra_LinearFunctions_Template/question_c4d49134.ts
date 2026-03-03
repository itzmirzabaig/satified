import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: c4d49134
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initialSpeed: 35-45, acceleration: 2-5, time: 4-7]
 * - Difficulty factors: [Linear model evaluation]
 * - Distractor patterns: [initial speed, speed after 1s, speed after 2s]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_c4d49134 = {
  metadata: {
    // id: "c4d49134",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initialSpeed = getRandomInt(35, 45);

    const acceleration = getRandomInt(2, 5);

    const time = getRandomInt(4, 7);

    const finalSpeed = initialSpeed + acceleration * time;

    const optionsData = [
      { text: initialSpeed.toString(), isCorrect: false, reason: "is the initial speed, not the speed after acceleration" },
      { text: (initialSpeed + acceleration).toString(), isCorrect: false, reason: "calculates speed after only 1 second" },
      { text: (initialSpeed + acceleration * 2).toString(), isCorrect: false, reason: "calculates speed after only 2 seconds" },
      { text: finalSpeed.toString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The equation $s = ${initialSpeed} + ${acceleration}t$ gives the speed $s$, in miles per hour, of a certain car $t$ seconds after it began to accelerate. What is the speed, in miles per hour, of the car ${time} seconds after it began to accelerate?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: finalSpeed.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${time} for $t$: $s = ${initialSpeed} + ${acceleration}(${time}) = ${initialSpeed} + ${acceleration * time} = ${finalSpeed}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 255996a6
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [bonus: 800-1200, hourlyRate: 15-25, hours: 30-40]
 * - Difficulty factors: [Solving linear equation from context]
 * - Distractor patterns: [half hours, bonus/rate, totalPay/rate]
 * - Constraints: [Ensure clean result]
 * - Question type: [Solve for x→Multiple Choice Text]
 * - Figure generation: null
 */

