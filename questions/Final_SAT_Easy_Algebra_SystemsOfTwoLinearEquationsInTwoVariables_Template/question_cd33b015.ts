import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: cd33b015
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sum: 15-25, expression multiplier: 2, added term: 3y]
 * - Difficulty factors: [Substitution of entire expression]
 * - Distractor patterns: [Wrong distribution, wrong combination]
 * - Constraints: [Integer solution]
 * - Question type: [Direct Solve→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_cd33b015 = {
  metadata: {
    // id: "cd33b015",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const sum = getRandomInt(15, 25);
    const mult = getRandomInt(2, 3);
    const y = getRandomInt(10, 20);
    const total = mult * sum + 3 * y;

    const optionsData = [
      { text: (y - 5).toString(), isCorrect: false, reason: "subtracts incorrectly from the result" },
      { text: y.toString(), isCorrect: true },
      { text: (y + 45).toString(), isCorrect: false, reason: "adds incorrectly to the result" },
      { text: (y + 50).toString(), isCorrect: false, reason: "adds incorrectly to the result" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Substitute $x + y = ${sum}$ into the second equation: $${mult}(${sum}) + 3y = ${total}$. This gives $${mult * sum} + 3y = ${total}$, so $3y = ${total - mult * sum}$, and $y = ${y}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `If $(x, y)$ is the solution to the given system of equations, what is the value of $y$?$$\\begin{aligned} x + y &= ${sum} \\\\ ${mult}(x + y) + 3y &= ${total} \\end{aligned}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: y.toString(),
      explanation: explanation
    };
  }
};

/**
 * Question ID: 4ec95eab
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -2 to -5, x-result: 10-20]
 * - Difficulty factors: [Substitution with negative coefficient]
 * - Distractor patterns: [1, 5, 45 - various miscalculations]
 * - Constraints: [Integer solution]
 * - Question type: [Direct Solve→Multiple Choice Text]
 * - Figure generation: [None]
 */