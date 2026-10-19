import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 318
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sum: 15-25, expression multiplier: 2, added term: 3y]
 * - Difficulty factors: [Substitution of entire expression]
 * - Distractor patterns: [Wrong distribution, wrong combination]
 * - Constraints: [Integer solution]
 * - Question type: [Direct Solve→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_318 = {
  metadata: {
    id: "318",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The sum is a multiple of 3 so that forgetting the multiplier still gives
    // a whole number. The old wrong choices were y - 5, y + 45 and y + 50.
    let sum = 15, mult = 2, y = 10;
    do {
      sum = 3 * getRandomInt(5, 8);
      mult = getRandomInt(2, 3);
      y = getRandomInt(10, 20);
    } while (new Set([y, sum - y, 3 * y, y + ((mult - 1) * sum) / 3]).size < 4 || sum - y <= 0);
    const total = mult * sum + 3 * y;
    const x = sum - y;
    const forgot = (total - sum) / 3;

    const optionsData = [
      { text: x.toString(), isCorrect: false, reason: `${x} is the value of $x$, not $y$` },
      { text: y.toString(), isCorrect: true, reason: '' },
      { text: (3 * y).toString(), isCorrect: false, reason: `${3 * y} is the value of $3y$; both sides must still be divided by 3` },
      { text: forgot.toString(), isCorrect: false, reason: `it results from substituting ${sum} for $${mult}(x + y)$ instead of for $x + y$, which gives $${sum} + 3y = ${total}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Substitute $x + y = ${sum}$ into the second equation: $${mult}(${sum}) + 3y = ${total}$. This gives $${mult * sum} + 3y = ${total}$, so $3y = ${total - mult * sum}$, and dividing both sides by 3 gives $y = ${y}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `If $(x, y)$ is the solution to the given system of equations, what is the value of $y$?$$\\begin{aligned} x + y &= ${sum} \\\\ ${mult}(x + y) + 3y &= ${total} \\end{aligned}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: y.toString(),
      explanation: explanation
    };
  }
};
