import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 288
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [required: 80-150, current: 40 to required - 10]
 * - Difficulty factors: [Simple subtraction, "at least" interpretation]
 * - Distractor patterns: [added instead of subtracted, hours already logged, total requirement]
 * - Constraints: [Result must be positive integer]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_288 = {
  metadata: {
    id: "288",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const required = getRandomInt(80, 150);
    let current = getRandomInt(40, required - 10);
    let needed = required - current;
    // Guard: the "already logged" distractor is `current`; it must differ from
    // the correct difference `needed` (they coincide only when required = 2*current).
    let tries = 0;
    while (needed === current && tries++ < 50) {
      current = getRandomInt(40, required - 10);
      needed = required - current;
    }
    if (needed === current) {
      current = current + 1; // required - current now differs from current
      needed = required - current;
    }

    // Every wrong choice is a real slip. The old fourth choice was the answer
    // moved by 2 to 6 hours ("a subtraction slip"). The values are distinct:
    // needed and current differ (guarded above), and both are less than
    // required, which is less than required + current.
    const optionsData = [
      { text: `${needed}`, isCorrect: true, reason: '' },
      { text: `${required + current}`, isCorrect: false, reason: `it results from adding the ${current} hours already logged to ${required} instead of subtracting them` },
      { text: `${current}`, isCorrect: false, reason: `${current} is the number of hours the student has already logged, not the number of additional hours needed` },
      { text: `${required}`, isCorrect: false, reason: `${required} is the total number of hours required; it does not account for the ${current} hours already logged` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. If $h$ is the number of additional hours of flight time, the student will have logged a total of $${current} + h$ hours. The student needs at least ${required} hours, so $${current} + h \\ge ${required}$. Subtracting ${current} from both sides of this inequality yields $h \\ge ${needed}$. Therefore, the minimum number of additional hours is ${needed}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A student pilot needs at least ${required} hours of flight time to earn a private pilot certificate. If the student has already logged ${current} hours of flight time, what is the minimum number of additional hours of flight time the student needs to earn the certificate?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
