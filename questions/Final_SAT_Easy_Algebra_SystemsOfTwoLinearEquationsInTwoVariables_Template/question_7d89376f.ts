import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 7d89376f
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [price1: 80-100, price2: 200-300, total: 100-150, revenue: 20000-30000]
 * - Difficulty factors: [Setting up system for ticket sales]
 * - Distractor patterns: [Swapped totals, multiplied totals, wrong price assignment]
 * - Constraints: [Valid integer solution]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_7d89376f = {
  metadata: {
    // id: "7d89376f",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const price1 = getRandomInt(80, 100);
    const price2 = getRandomInt(200, 300);
    const num1 = getRandomInt(60, 100);
    const num2 = getRandomInt(40, 80);
    const total = num1 + num2;
    const revenue = price1 * num1 + price2 * num2;

    const correctAnswer = `x + y = ${total}\n${price1}x + ${price2}y = ${revenue.toLocaleString()}`;
    const optionsData = [
      { text: correctAnswer, isCorrect: true },
      { text: `x + y = ${total}\n${price1}x + ${price2}y = ${total * revenue}`, isCorrect: false, reason: "multiplies the totals incorrectly" },
      { text: `x + y = ${revenue.toLocaleString()}\n${price1}x + ${price2}y = ${total * revenue}`, isCorrect: false, reason: "swaps the total tickets with total revenue" },
      { text: `${price1}x = ${price2}y\n${total}x + ${total}y = ${revenue.toLocaleString()}`, isCorrect: false, reason: "sets up incorrect equations" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The total number of tickets is $x + y = ${total}$. The revenue from $x$ tickets at $${price1}$ and $y$ tickets at $${price2}$ is $${price1}x + ${price2}y = ${revenue}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A discount airline sells a certain number of tickets, $x$, for a flight for $${price1}$ each. It sells the number of remaining tickets, $y$, for $${price2}$ each. For a particular flight, the airline sold ${total} tickets and collected a total of $${revenue.toLocaleString()}$ from the sale of those tickets. Which system of equations represents this relationship between $x$ and $y$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 17f176ec
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [price1: 10-12, price2: 8-9, total: 200-250, revenue: 2000-2500]
 * - Difficulty factors: [Setting up system for ticket sales]
 * - Distractor patterns: [Swapped totals, swapped prices, wrong variable assignment]
 * - Constraints: [Valid integer solution]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */