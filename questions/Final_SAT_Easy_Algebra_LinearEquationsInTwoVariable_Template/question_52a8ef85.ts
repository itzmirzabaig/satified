import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 52a8ef85
 *
 * ORIGINAL ANALYSIS: [Sweaters and shirts substitution]
 * - Number ranges: [c1: 25-60, c2: 15-35, total: 120-200, x: 1-3]
 * - Difficulty factors: [Substitution in cost equation]
 * - Constraints: [Result should be integer]
 */

export const generator_52a8ef85 = {
  metadata: {
    // id: "52a8ef85",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize costs
    const c1 = getRandomInt(25, 60);
    const c2 = getRandomInt(15, 35);
    // Randomize number of sweaters (1-3)
    const x = getRandomInt(1, 3);
    // Calculate total to ensure integer result for y
    const y = getRandomInt(2, 6);
    const total = c1 * x + c2 * y;

    const optionsData = [
      { text: y.toString(), isCorrect: true },
      { text: (y - 1).toString(), isCorrect: false, reason: "subtraction error" },
      { text: (y + 1).toString(), isCorrect: false, reason: "addition error" },
      { text: x.toString(), isCorrect: false, reason: "uses sweater count" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `$${c1}x + ${c2}y = ${total}$ represents sweaters ($x$) and shirts ($y$). If Yesenia bought ${x} sweaters, how many shirts did she buy?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: y.toString(),
      explanation: `Choice ${correctLetter} is correct. Substitute $x=${x}$: $${c1}(${x}) + ${c2}y = ${total} \rightarrow ${c1*x} + ${c2}y = ${total} \rightarrow ${c2}y = ${total - c1*x} \rightarrow y = ${y}$.`
    };
  }
};

/**
 * Question ID: ba79f10f
 *
 * ORIGINAL ANALYSIS: [Equation from table points]
 */
