import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 7
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 3, constant: 5, subtract: 6]
 * - Difficulty factors: [Distribution, then subtraction]
 * - Distractor patterns: [forgets to distribute a to b; multiplies a and b and attaches x; adds c instead of subtracting]
 * - Constraints: [Order of operations]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_7 = {
  metadata: {
    id: "7",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(2, 5);
    const b = getRandomInt(3, 8);
    // Guard: keep a*b - c and b - c nonzero so no option reads "+ 0".
    let c = getRandomInt(4, 10);
    let tries = 0;
    while ((c === a * b || c === b) && tries++ < 50) c = getRandomInt(4, 10);
    if (c === a * b || c === b) {
      for (let k = 4; k <= 10; k++) {
        if (k !== a * b && k !== b) { c = k; break; }
      }
    }

    const distributed = a * b;
    const result = distributed - c;
    const resSign = result >= 0 ? '+' : '-';
    const resAbs = Math.abs(result);

    const fmt = (coeff: number, constant: number) =>
      `$${coeff}x ${constant >= 0 ? '+' : '-'} ${Math.abs(constant)}$`;

    const correctText = fmt(a, result);

    // Distinctness across all draws: with coefficient a on options 1, 2 and 4,
    // constants a*b - c, b - c and a*b + c are pairwise distinct (equality
    // would force a = 1, c = 0, or b(a-1) = -2c — all impossible in range),
    // and option 3's coefficient a*b >= 6 exceeds a <= 5, so it never matches.
    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      { text: fmt(a, b - c), isCorrect: false, reason: `does not distribute the $${a}$ to the $${b}$, giving $${a}x + ${b} - ${c}$` },
      { text: fmt(distributed, -c), isCorrect: false, reason: `multiplies $${a}$ by $${b}$ and attaches the result to x, giving $${distributed}x - ${c}$` },
      { text: fmt(a, distributed + c), isCorrect: false, reason: `adds $${c}$ instead of subtracting it, giving $${a}x + ${distributed} + ${c}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectSentences = shuffledOptions
      .filter(opt => !opt.isCorrect)
      .map(opt => `Choice ${opt.letter} is incorrect; it ${opt.reason}.`)
      .join(' ');

    return {
      questionText: `Which of the following is equivalent to $${a}(x + ${b}) - ${c}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Distribute the $${a}$: $${a}(x + ${b}) = ${a}x + ${distributed}$. Then subtract $${c}$: $${a}x + ${distributed} - ${c} = ${a}x ${resSign} ${resAbs}$. ${incorrectSentences}`
    };
  }
};
