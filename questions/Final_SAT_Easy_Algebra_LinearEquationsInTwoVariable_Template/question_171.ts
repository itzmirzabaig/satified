import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 171
 *
 * ORIGINAL ANALYSIS: [Birch and maple tree substitution]
 * - Number ranges: [total: 150-400, x: 100-300]
 * - Difficulty factors: [Simple substitution in linear equation]
 * - Constraints: [x must be less than total]
 *
 * FIX NOTES:
 * The stem was shorthand ("x+y=221 relates maple (x) and birch (y) trees. If
 * x=147, what is y?") and two distractors were y - 10 and y + 15, labeled
 * "calculation error". The stem is a full question, the distractors are the
 * total and adding instead of subtracting, and each choice is explained.
 */

export const generator_171 = {
  metadata: {
    id: "171",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize total (150-400) and x (100 to total-20); redraw if x = y so the
    // maple count never equals the answer. The other choices are always
    // distinct: y < total < total + x, and x < total.
    let total = 0, x = 0, y = 0;
    do {
      total = getRandomInt(150, 400);
      x = getRandomInt(100, total - 20);
      y = total - x;
    } while (x === y);

    const optionsData = [
      { text: y.toString(), isCorrect: true, reason: '' },
      { text: x.toString(), isCorrect: false, reason: `it is the number of maple trees, not the number of birch trees` },
      { text: total.toString(), isCorrect: false, reason: `it is the total number of trees in the park` },
      { text: (total + x).toString(), isCorrect: false, reason: `it results from adding ${x} to ${total} instead of subtracting ${x} from ${total}` }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `A park has only maple trees and birch trees. The equation $x + y = ${total}$ represents this situation, where $x$ is the number of maple trees and $y$ is the number of birch trees. If there are ${x} maple trees in the park, how many birch trees are in the park?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: y.toString(),
      explanation: `Choice ${correctLetter} is correct. Substituting ${x} for $x$ in the given equation yields $${x} + y = ${total}$. Subtracting ${x} from both sides yields $y = ${y}$. ${shuffled.filter(o => !o.isCorrect).map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
