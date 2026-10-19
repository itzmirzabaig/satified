import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 314
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 4, x-value: 6-10, result: positive]
 * - Difficulty factors: [Solve for y after substitution]
 * - Distractor patterns: [Sign errors, wrong operations]
 * - Constraints: [Integer solution]
 * - Question type: [Direct Solve→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_314 = {
  metadata: {
    id: "314",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const x = getRandomInt(6, 12);
    const coef = getRandomInt(3, 6);
    const y = getRandomInt(5, 12);
    const total = coef * x - 3 * y;

    const optionsData = [
      { text: `$(${x}, ${y})$`, isCorrect: true, reason: '' },
      { text: `$(${x}, ${-3 * y})$`, isCorrect: false, reason: `$${-3 * y}$ is the value of $-3y$, not $y$; both sides must still be divided by $-3$` },
      { text: `$(${x}, ${-y})$`, isCorrect: false, reason: `dividing $${-3 * y}$ by $-3$ gives ${y}, not $${-y}$` },
      { text: `$(${x}, ${3 * y})$`, isCorrect: false, reason: `${3 * y} is the value of $3y$, not $y$; it must still be divided by 3` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Substitute $x = ${x}$ into the first equation: $${coef}(${x}) - 3y = ${total}$. This gives $${coef * x} - 3y = ${total}$, and subtracting ${coef * x} from both sides gives $-3y = ${-3 * y}$. Dividing both sides by $-3$ gives $y = ${y}$. The solution is $(${x}, ${y})$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `What is the solution $(x, y)$ to the given system of equations?$$\\begin{aligned} ${coef}x - 3y &= ${total} \\\\ x &= ${x} \\end{aligned}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$(${x}, ${y})$`,
      explanation: explanation
    };
  }
};
