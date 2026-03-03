import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: b9839f9e
 *
 * ORIGINAL ANALYSIS: [Interpretation of coefficient (salad price)]
 * - Number ranges: [p1 drink price: 1-5, p2 salad price: 4-12]
 * - Difficulty factors: [Interpreting coefficients in a cost equation]
 * - Constraints: [Easy - small integer prices, salad more expensive than drink]
 * - Question type: [Multiple Choice Text]
 */

export const generator_b9839f9e = {
  metadata: {
    // id: "b9839f9e",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const p1 = getRandomInt(1, 5);          // drink price
    const p2 = getRandomInt(p1 + 2, 12);    // salad price (more expensive)

    const optionsData = [
      { text: `The price, in dollars, of one salad`, isCorrect: true },
      { text: `The price, in dollars, of one drink`, isCorrect: false, reason: "describes coefficient of x" },
      { text: `The number of drinks`, isCorrect: false, reason: "confuses rate with variable" },
      { text: `The number of salads`, isCorrect: false, reason: "confuses rate with variable" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `$F = ${p1}x + ${p2}y$ is the total cost for $x$ drinks and $y$ salads. What does ${p2} represent?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: shuffled.find(o => o.isCorrect)!.text,
      explanation: `Choice ${correctLetter} is correct. ${p2} multiplies $y$ (salads), so it represents the price per salad in dollars.`
    };
  }
};

