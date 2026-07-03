import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient a: 13-25, constant b: 5-12]
 * - Difficulty factors: [Distributing multiplication over subtraction]
 * - Distractor patterns: [adds a+b, forgets to distribute to second term (b), subtracts a-b]
 * - Constraints: [a > b keeps the a-b distractor a positive integer (no "-0"
 *   or "--" renders); a !== 2b keeps the b and a-b distractors distinct]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1 = {
  metadata: {
    id: "1",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const b = getRandomInt(5, 12);
    // a >= 13 > b guarantees a - b >= 1, so the a-b distractor never renders
    // as "-0" or a double minus sign.
    let a = getRandomInt(13, 25);
    // If a = 2b, the distractors b and a - b would be identical. In that case
    // a is even and >= 14, so a - 1 stays in [13, 25], is odd, and can never
    // equal 2b again.
    if (a === 2 * b) a -= 1;

    const product = a * b;
    const correctText = `$${a}x^2-${product}$`;

    const optionsData = [
      {
        text: correctText,
        isCorrect: true,
        reason: ''
      },
      {
        text: `$${a}x^2-${a + b}$`,
        isCorrect: false,
        reason: `adding $ ${a} + ${b} = ${a + b}$ instead of multiplying`
      },
      {
        text: `$${a}x^2-${b}$`,
        isCorrect: false,
        reason: `multiplying only the $x^2$ term by $ ${a}$ and leaving $ ${b}$ undistributed`
      },
      {
        text: `$${a}x^2-${a - b}$`,
        isCorrect: false,
        reason: `subtracting $ ${a} - ${b} = ${a - b}$ instead of multiplying`
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const distractorNotes = shuffledOptions
      .filter(opt => !opt.isCorrect)
      .map(opt => `Choice ${opt.letter} is incorrect; it comes from ${opt.reason}.`)
      .join(' ');

    return {
      questionText: `Which expression is equivalent to $ ${a}\\left(x^2-${b}\\right)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Distribute $ ${a}$ to both terms inside the parentheses: $ ${a}\\left(x^2-${b}\\right) = ${a} \\cdot x^2 - ${a} \\cdot ${b} = ${a}x^2-${product}$. ${distractorNotes}`
    };
  }
};
