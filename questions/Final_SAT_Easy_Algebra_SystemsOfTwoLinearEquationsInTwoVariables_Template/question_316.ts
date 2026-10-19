import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 316
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [price1: 80-100, price2: 200-300, total: 100-150, revenue: 20000-30000]
 * - Difficulty factors: [Setting up system for ticket sales]
 * - Distractor patterns: [Swapped totals, multiplied totals, wrong price assignment]
 * - Constraints: [Valid integer solution]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_316 = {
  metadata: {
    id: "316",
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

    // Thousands commas everywhere (the product used to print as 4102410 and
    // the revenue as 26130 in the explanation), dollar signs on the prices,
    // and reasons that name the actual mistake.
    const fmt = (n: number) => n.toLocaleString('en-US');
    const rev = fmt(revenue);
    const product = fmt(total * revenue);
    const correctAnswer = `$\\begin{aligned} x + y &= ${total} \\\\ ${price1}x + ${price2}y &= ${rev} \\end{aligned}$`;
    const optionsData = [
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: `$\\begin{aligned} x + y &= ${total} \\\\ ${price1}x + ${price2}y &= ${product} \\end{aligned}$`, isCorrect: false, reason: `${product} is the product of the number of tickets and the amount collected, $${total}(${rev})$; the amount collected from the tickets is \\$${rev}` },
      { text: `$\\begin{aligned} x + y &= ${rev} \\\\ ${price1}x + ${price2}y &= ${product} \\end{aligned}$`, isCorrect: false, reason: `it sets the number of tickets equal to the amount collected, ${rev}, instead of ${total}, and the amount collected is \\$${rev}, not ${product}` },
      { text: `$\\begin{aligned} ${price1}x &= ${price2}y \\\\ ${total}x + ${total}y &= ${rev} \\end{aligned}$`, isCorrect: false, reason: `nothing in the situation says the two groups of tickets brought in equal amounts, and the amount collected is $${price1}x + ${price2}y$, not $${total}x + ${total}y$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The airline sold ${total} tickets in all, so $x + y = ${total}$. The $x$ tickets sold for \\$${price1} each bring in $${price1}x$ dollars, and the $y$ tickets sold for \\$${price2} each bring in $${price2}y$ dollars, for a total of \\$${rev}, so $${price1}x + ${price2}y = ${rev}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A discount airline sells a certain number of tickets, $x$, for a flight for \\$${price1} each. It sells the number of remaining tickets, $y$, for \\$${price2} each. For a particular flight, the airline sold ${total} tickets and collected a total of \\$${rev} from the sale of those tickets. Which system of equations represents this relationship between $x$ and $y$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};