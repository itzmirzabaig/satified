import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 197
 *
 * ORIGINAL ANALYSIS: [Interpretation of coefficient (salad price)]
 * - Number ranges: [p1 drink price: 1-5, p2 salad price: 4-12]
 * - Difficulty factors: [Interpreting coefficients in a cost equation]
 * - Constraints: [Easy - small integer prices, salad more expensive than drink]
 * - Question type: [Multiple Choice Text]
 */

export const generator_197 = {
  metadata: {
    id: "197",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const p1 = getRandomInt(2, 5);          // drink price (at least 2, so the equation never shows "1x")
    const p2 = getRandomInt(p1 + 2, 12);    // salad price (more expensive)

    const optionsData = [
      { text: `The price, in dollars, of one salad`, isCorrect: true, reason: '' },
      { text: `The price, in dollars, of one drink`, isCorrect: false, reason: `the price of one drink is ${p1}, the coefficient of $x$` },
      { text: `The number of drinks`, isCorrect: false, reason: `the number of drinks is $x$` },
      { text: `The number of salads`, isCorrect: false, reason: `the number of salads is $y$; ${p2} is multiplied by the number of salads` }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `The equation $F = ${p1}x + ${p2}y$ gives the total cost $F$, in dollars, of buying $x$ drinks and $y$ salads at a café. What is the best interpretation of ${p2} in this context?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: shuffled.find(o => o.isCorrect)!.text,
      explanation: `Choice ${correctLetter} is correct. The term $${p2}y$ is the cost, in dollars, of $y$ salads, so each salad adds ${p2} dollars to the total cost. Therefore, ${p2} is the price, in dollars, of one salad. ${shuffled.filter(o => !o.isCorrect).map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};

