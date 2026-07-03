import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 777
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [current cost: 4334, new cost: 2712, install: 25000]
 * - Difficulty factors: [Savings calculation, inequality setup for payback]
 * - Distractor patterns: [A=wrong direction, C=wrong operation, D=ratio error]
 * - Constraints: [25000 < (4334-2712)*t]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_777 = {
  metadata: {
    id: "777",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const currentCost = getRandomInt(3500, 5500);
    const savings = getRandomInt(1000, 2500);
    const newCost = currentCost - savings;
    const installCost = getRandomInt(20000, 30000);

    // Annual savings = current cost - new cost = savings.
    // Total savings after t years = annualSavings * t; we want this to exceed
    // the installation cost: installCost < annualSavings * t.
    const annualSavings = currentCost - newCost;

    // STEP 2: Create options (each already wrapped in $...$ so correctAnswer
    // can be the full option text — the grader matches option text, not letters).
    // Each distractor carries the reason it is wrong so the explanation can
    // describe it by identity, not by post-shuffle position.
    const optionsData = [
      { text: `$${installCost} > ${annualSavings}t$`, isCorrect: false, reason: `reverses the inequality` },
      { text: `$${installCost} < ${annualSavings}t$`, isCorrect: true, reason: `` },
      { text: `$${installCost} - ${currentCost} > ${newCost}t$`, isCorrect: false, reason: `subtracts the current cost instead of accumulating the yearly savings` },
      { text: `$${installCost} > \\frac{${currentCost}}{${newCost}}t$`, isCorrect: false, reason: `uses a ratio, which does not represent the accumulated savings` }
    ];

    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    // Distractor sentences, ordered by letter, each tied to its own option.
    const distractorSentences = shuffledOptions
      .filter(o => !o.isCorrect)
      .map(o => `Choice ${o.letter} ${o.reason}.`)
      .join(' ');

    // STEP 4: Build explanation — numbers come from the same live variables,
    // letters come from the shuffled array. Money figures are written as plain
    // numbers + "dollars" (no $) so no bare currency symbol can pair with the
    // math-mode variable expressions.
    const explanation = `Choice ${correctOption.letter} is correct. The annual savings is ${currentCost} dollars minus ${newCost} dollars, which is ${annualSavings} dollars. After $t$ years the total savings is $${annualSavings}t$ dollars. This must exceed the installation cost of ${installCost} dollars, so $${installCost} < ${annualSavings}t$. ${distractorSentences}`;

    // STEP 5: Return question data
    return {
      questionText: `The average annual energy cost for a certain home is ${currentCost} dollars. The homeowner plans to spend ${installCost} dollars to install a geothermal heating system. The homeowner estimates that the average annual energy cost will then be ${newCost} dollars. Which of the following inequalities can be solved to find $t$, the number of years after installation at which the total amount of energy cost savings will exceed the installation cost?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};