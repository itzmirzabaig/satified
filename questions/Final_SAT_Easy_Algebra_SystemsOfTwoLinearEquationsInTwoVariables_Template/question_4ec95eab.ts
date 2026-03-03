import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_4ec95eab = {
  metadata: {
    // id: "4ec95eab",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const m = -1 * getRandomInt(2, 5);
    const x = getRandomInt(10, 20);
    const total = (4 + m) * x;

    const optionsData = [
      { text: "1", isCorrect: false, reason: "miscalculates the coefficient" },
      { text: "5", isCorrect: false, reason: "makes a calculation error" },
      { text: x.toString(), isCorrect: true },
      { text: (x * 3).toString(), isCorrect: false, reason: "multiplies incorrectly" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Substitute $y = ${m}x$ into the second equation: $4x + (${m}x) = ${total}$. This simplifies to $${4 + m}x = ${total}$, so $x = ${total} / ${4 + m} = ${x}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The solution to the given system of equations is $(x, y)$. What is the value of $x$?$$\\begin{aligned} y &= ${m}x \\\\ 4x + y &= ${total} \\end{aligned}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: x.toString(),
      explanation: explanation
    };
  }
};

/**
 * Question ID: 4fb8adf7
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 4, x-value: 6-10, result: positive]
 * - Difficulty factors: [Solve for y after substitution]
 * - Distractor patterns: [Sign errors, wrong operations]
 * - Constraints: [Integer solution]
 * - Question type: [Direct Solve→Multiple Choice Text]
 * - Figure generation: [None]
 */