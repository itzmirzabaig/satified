import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b23ba4c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2-6, total: 25-100]
 * - Difficulty factors: [Substitution and solving linear equation]
 */

export const generator_b23ba4c = {
  metadata: {
    // id: "b23ba4c",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(2, 5);
    const b = getRandomInt(2, 6);
    const aVal = getRandomInt(2, 5);
    const c = a * aVal + b * getRandomInt(2, 6);
    const correctB = (c - a * aVal) / b;

    const optionsData = [
      { text: correctB.toString(), isCorrect: true },
      { text: (correctB - 1).toString(), isCorrect: false, reason: "results from subtraction error" },
      { text: (correctB + 1).toString(), isCorrect: false, reason: "results from addition error" },
      { text: (c / b).toString(), isCorrect: false, reason: "ignores the term with a" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A shipping company charged ${c} to ship small boxes and large boxes. The equation ${a}a + ${b}b = ${c} represents this. If ${aVal} small boxes were shipped, how many large boxes were shipped?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctB.toString(),
      explanation: `Choice ${correctLetter} is correct. Substituting $a = ${aVal}$ gives $${a * aVal} + ${b}b = ${c}$, so $${b}b = ${c - a * aVal}$ and $b = ${correctB}$.`
    };
  }
};

/**
 * Question ID: 24854644
 *
 * ORIGINAL ANALYSIS: [Parallel lines, slope/intercept from point]
 */