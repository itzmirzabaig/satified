import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1224
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [budget ~100-139, large price 12-18, small price 10..large-1]
 * - Difficulty factors: [Interpreting a linear term in context, budget constraint]
 * - Distractor patterns: [each large price, each small price, total for smalls]
 * - Constraints: [large-price * y = total cost for y large pizzas]
 * - Question type: [Text -> Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1224 = {
  metadata: {
    id: "1224",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // budget 100-139, large price 12-18, small price strictly less than large.
    const budget = getRandomInt(100, 139);
    const largePrice = getRandomInt(12, 18);
    const smallPrice = getRandomInt(10, largePrice - 1); // strictly less than large price

    // STEP 2: Create options. Reasons are built with LIVE values (backtick templates).
    const optionsData = [
      {
        text: `The amount, in dollars, the team captain will spend on each large cheese pizza`,
        isCorrect: false,
        reason: `describes only the coefficient $${largePrice}$, not the whole term $${largePrice}y$`
      },
      {
        text: `The amount, in dollars, the team captain will spend on each small cheese pizza`,
        isCorrect: false,
        reason: `describes the coefficient $${smallPrice}$ of the $x$ term, not $${largePrice}y$`
      },
      {
        text: `The total amount, in dollars, the team captain will spend on large cheese pizzas`,
        isCorrect: true
      },
      {
        text: `The total amount, in dollars, the team captain will spend on small cheese pizzas`,
        isCorrect: false,
        reason: `describes the $${smallPrice}x$ term (total for small pizzas), not the $${largePrice}y$ term`
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `A team captain will spend at most \\$${budget} to purchase $x$ small cheese pizzas and $y$ large cheese pizzas for a team dinner. The inequality $${smallPrice}x + ${largePrice}y \\leq ${budget}$ represents this situation. Which of the following is the best interpretation of $${largePrice}y$ in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. In the budget constraint $${smallPrice}x + ${largePrice}y \\leq ${budget}$, the term $${largePrice}y$ is the price per large pizza ($\\$${largePrice}$) multiplied by the number of large pizzas ($y$), so it represents the total amount spent on large pizzas. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
