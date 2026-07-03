import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1167
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [100 (miles), 25 (mpg), $5 (savings), $4 (cost)]
 * - Difficulty factors: [Setting up equation for savings, cost per mile calculation]
 * - Distractor patterns: [A, B: use reciprocal 25/4 (miles per dollar), C: uses 95 = 100-5 confusing miles with dollars]
 * - Constraints: [m must result in $5 savings]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1167 = {
  metadata: {
    id: "1167",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const weeklyMiles = getRandomInt(80, 120) * 5;
    const mpg = getRandomInt(20, 35);
    const gasCost = getRandomInt(3, 6);
    const savingsGoal = getRandomInt(3, 8) * 5;

    // STEP 2: Calculate correct equation (cost per mile = gasCost / mpg dollars per mile)
    const costPerMileNum = gasCost;
    const costPerMileDenom = mpg;

    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(costPerMileNum, costPerMileDenom);
    const simplifiedNum = costPerMileNum / divisor;
    const simplifiedDenom = costPerMileDenom / divisor;

    // costPerMile is the simplified fraction (or an integer if denom reduces to 1)
    const costPerMile = simplifiedDenom === 1 ? `${simplifiedNum}` : `\\frac{${simplifiedNum}}{${simplifiedDenom}}`;
    const correctEquation = `\\frac{${simplifiedNum}}{${simplifiedDenom}}m = ${savingsGoal}`;

    // STEP 3: Create distractors
    // A & B: reciprocal fraction (miles per dollar) — A also confuses total miles with dollars on the RHS
    // C: correct fraction but confuses total miles (weeklyMiles - savingsGoal) with the dollar savings
    const distractorA = `\\frac{${simplifiedDenom}}{${simplifiedNum}}m = ${weeklyMiles - savingsGoal}`;
    const distractorB = `\\frac{${simplifiedDenom}}{${simplifiedNum}}m = ${savingsGoal}`;
    const distractorC = `\\frac{${simplifiedNum}}{${simplifiedDenom}}m = ${weeklyMiles - savingsGoal}`;

    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false, reason: `this uses the reciprocal of the cost-per-mile ratio (miles per dollar) and confuses the total miles with the dollar amount` },
      { text: `$${distractorB}$`, isCorrect: false, reason: `this uses the reciprocal of the cost-per-mile ratio (miles per dollar instead of dollars per mile)` },
      { text: `$${distractorC}$`, isCorrect: false, reason: `this correctly finds the cost per mile but sets it equal to ${weeklyMiles - savingsGoal}, which confuses the total miles (${weeklyMiles}) with the dollar savings (\\$${savingsGoal})` },
      { text: `$${correctEquation}$`, isCorrect: true, reason: null }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Let $m$ be the number of fewer miles the commuter should drive each week.

The commuter wants to save \\$${savingsGoal} per week by driving fewer miles, so first find the cost of driving each mile.
The car travels ${mpg} miles on 1 gallon of gas, and 1 gallon costs \\$${gasCost}.
So it costs \\$${gasCost} to travel ${mpg} miles, which means the cost per mile is $\\frac{${gasCost}}{${mpg}}$ or $${costPerMile}$ dollars per mile.

The money saved equals the cost per mile multiplied by the number of fewer miles driven ($m$):
$$\\text{Savings} = (\\text{cost per mile}) \\times (\\text{fewer miles})$$
$${costPerMile} \\times m = ${savingsGoal}$, which gives $${correctEquation}$.

Choice ${correctLetter} is correct; this equation sets (cost per mile) $\\times$ (number of miles reduced) equal to the total savings desired, \\$${savingsGoal}.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.

Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.

Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A commuter drives an average of ${weeklyMiles} miles each week. Their car can travel an average of ${mpg} miles per gallon of gasoline. The commuter would like to reduce their weekly spending on gasoline by \\$${savingsGoal}. Assuming gasoline costs \\$${gasCost} per gallon, which equation can the commuter use to determine how many fewer average miles, $m$, they should drive each week?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${correctEquation}$`,
      explanation: explanation
    };
  }
};
