import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_4a090a46 = {
  metadata: {
    // id: "4a090a46",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const required = getRandomInt(80, 150);
    const current = getRandomInt(40, required - 10);
    const needed = required - current;
    const distractor1 = Math.abs(needed - getRandomInt(5, 15));
    const distractor2 = current;
    const distractor3 = required + current;

    const optionsData = [
      { text: `${needed}`, isCorrect: true },
      { text: `${distractor1}`, isCorrect: false },
      { text: `${distractor2}`, isCorrect: false },
      { text: `${distractor3}`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const explanation = `Choice ${correctLetter} is correct. Julissa needs at least ${required} hours and has ${current} hours. The minimum additional hours needed is ${required} - ${current} = ${needed}.`;

    return {
      questionText: `Julissa needs at least ${required} hours of flight time to get her private pilot certification. If Julissa already has ${current} hours of flight time, what is the minimum number of additional hours of flight time Julissa needs to get her private pilot certification?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

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