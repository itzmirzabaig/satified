import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 746
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [8 items: $220, 10 items: $320, slope=50, intercept=-180]
 * - Difficulty factors: [Finding linear profit function from two points]
 * - Distractor patterns: [A = wrong slope/intercept, B = wrong calculation, C = wrong formula]
 * - Constraints: [None - straightforward modeling]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_746 = {
  metadata: {
    id: "746",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Number of items sold at the two data points.
    const x1 = getRandomInt(5, 12);
    const x2 = x1 + getRandomInt(2, 5);
    // Profit per item (the slope): 40-70.
    const profitPerItem = getRandomInt(40, 70);
    // Fixed cost (the negative y-intercept). Cap it below profitPerItem * x1 so
    // that BOTH profits are positive (>= 10), keeping the dollar amounts clean
    // and letting us render them as escaped currency. Since profitPerItem*x1 is
    // at least 40*5 = 200, the range [100, min(250, profitPerItem*x1 - 10)] is
    // always valid.
    const fixedCost = getRandomInt(100, Math.min(250, profitPerItem * x1 - 10));
    // Profits at each point (p2 > p1 >= 10 > 0).
    const p1 = profitPerItem * x1 - fixedCost;
    const p2 = profitPerItem * x2 - fixedCost;

    // STEP 2: Create options with LaTeX delimiters.
    // All four strings are structurally distinct for every draw:
    //   correct : slope x - intercept
    //   distA   : (slope+100) x - (intercept+100)  -> different slope
    //   distB   : (avg profit-per-item) x          -> no intercept term at all
    //   distC   : slope x - intercept x            -> trailing x (variable cost)
    const correctEq = `$f(x) = ${profitPerItem}x - ${fixedCost}$`;
    const distA = `$f(x) = ${profitPerItem + 100}x - ${fixedCost + 100}$`;
    const distB = `$f(x) = ${Math.floor(p1 / x1)}x$`;
    const distC = `$f(x) = ${profitPerItem}x - ${fixedCost}x$`;

    const optionsData = [
      { text: distA, isCorrect: false, reason: "uses a slope and intercept that do not fit the two given points" },
      { text: distB, isCorrect: false, reason: "assumes direct variation (profit proportional to items) and omits the fixed cost" },
      { text: distC, isCorrect: false, reason: "subtracts the fixed cost as a per-item (variable) cost instead of a constant" },
      { text: correctEq, isCorrect: true, reason: "" }
    ];

    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // STEP 4: Return question data
    return {
      questionText: `A linear function $f$ gives a company's profit, in dollars, for selling $x$ items. The company's profit is \\$${p1} when it sells ${x1} items, and its profit is \\$${p2} when it sells ${x2} items. Which equation defines $f$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEq,
      explanation: `Choice ${correctLetter} is correct. The slope is $\\frac{${p2} - ${p1}}{${x2} - ${x1}} = \\frac{${p2 - p1}}{${x2 - x1}} = ${profitPerItem}$. Substituting the point $(${x1}, ${p1})$ into $f(x) = ${profitPerItem}x + b$ and solving for the intercept gives $b = ${p1} - ${profitPerItem}(${x1}) = -${fixedCost}$. Thus $f(x) = ${profitPerItem}x - ${fixedCost}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};