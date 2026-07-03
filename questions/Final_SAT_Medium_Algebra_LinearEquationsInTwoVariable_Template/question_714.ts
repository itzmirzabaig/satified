import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 714
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4, 6, total: 36]
 * - Difficulty factors: [Interpreting term in context]
 * - Distractor patterns: [Confusing variable with term value]
 * - Constraints: [Clear interpretation of largeCap*y]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_714 = {
  metadata: {
    id: "714",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters. smallCap and largeCap are the cup capacities
    // of a small and a large container; largeCap is strictly greater so the
    // narrative ("large" holds more) stays consistent. total is the total cups.
    const smallCap = getRandomInt(3, 8);
    const largeCap = getRandomInt(smallCap + 2, 15);
    const total = getRandomInt(30, 60);

    // STEP 2: Create options. The correct interpretation of largeCap*y is the
    // total cups of jam held by the large containers (capacity times count).
    const optionsData = [
      { text: `The number of large containers that were filled`, isCorrect: false },
      { text: `The number of small containers that were filled`, isCorrect: false },
      { text: `The total number of cups of jam in the large containers`, isCorrect: true },
      { text: `The total number of cups of jam in the small containers`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText: `A baker made ${total} cups of jam and used all of it to fill $x$ small containers and $y$ large containers. The equation $${smallCap}x + ${largeCap}y = ${total}$ represents this situation. Which is the best interpretation of $${largeCap}y$ in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. In the equation $${smallCap}x + ${largeCap}y = ${total}$, the variable $y$ is the number of large containers. The two terms on the left add up to the total cups of jam, so each term must be an amount of jam measured in cups. Since $${largeCap}$ is the number of cups a single large container holds, the product $${largeCap}y$ gives the total number of cups of jam contained in all of the large containers.`
    };
  }
};
