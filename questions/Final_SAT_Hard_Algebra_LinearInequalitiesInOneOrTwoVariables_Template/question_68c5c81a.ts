import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 68c5c81a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [budget: 115, price coefficients implied: small unknown, large: 14]
 * - Difficulty factors: [Interpreting linear term in context, budget constraint]
 * - Distractor patterns: [A: price per large, B: price per small, D: total for smalls]
 * - Constraints: [14y = total cost for y large pizzas]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_68c5c81a = {
  metadata: {
    // id: "68c5c81a",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: budget 115, large price 14, small price unknown
    // Generate: budget 100-130, large price 12-18
    
    const budget = getRandomInt(10, 13) * 10 + getRandomInt(0, 9); // 100-139
    const largePrice = getRandomInt(12, 18);
    const smallPrice = getRandomInt(10, largePrice - 1); // slightly less than large
    
    // STEP 2: Create options
    const optionsData = [
      { text: `The amount, in dollars, Anthony will spend on each large cheese pizza`, isCorrect: false, reason: "describes just the coefficient $${largePrice}$, not the term $${largePrice}y$" },
      { text: `The amount, in dollars, Anthony will spend on each small cheese pizza`, isCorrect: false, reason: `describes the coefficient of the $x$ term (approximately $${smallPrice}$), not $${largePrice}y$` },
      { text: `The total amount, in dollars, Anthony will spend on large cheese pizzas`, isCorrect: true },
      { text: `The total amount, in dollars, Anthony will spend on small cheese pizzas`, isCorrect: false, reason: "describes the $x$ term (small pizzas total), not the $y$ term" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `Anthony will spend at most $\\\$${budget}$ to purchase $x$ small cheese pizzas and $y$ large cheese pizzas for a team dinner. The given inequality represents this situation. Which of the following is the best interpretation of $${largePrice}y$ in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: shuffledOptions.find(o => o.isCorrect).text,
      explanation: `Choice ${correctLetter} is correct. In a budget constraint $${smallPrice}x + ${largePrice}y \\\\leq ${budget}$, the term $${largePrice}y$ represents the price per large pizza ($${largePrice}$) multiplied by the number of large pizzas ($y$), which equals the total amount spent on large pizzas. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: b8e73b5b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [first hours: 10, first rate: 8, second rate: 10, savings: 90%, target: 270]
 * - Difficulty factors: [Multi-step, percentage savings, piecewise earnings]
 * - Distractor patterns: [A: 38 (way too high), B: 33 (high), D: 16 (too low)]
 * - Constraints: [0.90*(10*8 + x*10) ≥ 270]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */