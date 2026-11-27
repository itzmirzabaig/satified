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
    // Before: when the cost per mile reduced to 1 over something, the reciprocal
    // showed as a fraction over 1 (like 5/1); it is written as a whole number now.
    const milesPerDollar = simplifiedNum === 1 ? `${simplifiedDenom}` : `\\frac{${simplifiedDenom}}{${simplifiedNum}}`;
    const milesMinusSavings = weeklyMiles - savingsGoal;
    const distractorA = `${milesPerDollar}m = ${milesMinusSavings}`;
    const distractorB = `${milesPerDollar}m = ${savingsGoal}`;
    const distractorC = `${costPerMile}m = ${milesMinusSavings}`;

    // Before: reasons used "cost-per-mile" and did not name the values.
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false, reason: `$${milesPerDollar}$ is the number of miles the car travels per dollar, not the cost per mile, and ${milesMinusSavings} is the weekly miles minus the savings goal, which mixes miles with dollars` },
      { text: `$${distractorB}$`, isCorrect: false, reason: `$${milesPerDollar}$ is the number of miles the car travels per dollar, not the cost in dollars of each mile` },
      { text: `$${distractorC}$`, isCorrect: false, reason: `${milesMinusSavings} is the weekly miles minus the savings goal, which mixes miles with dollars; the savings should equal ${savingsGoal} dollars` },
      { text: `$${correctEquation}$`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Before: the choice lines used "is incorrect;" instead of the standard format.
    const costSteps = divisor > 1 ? `$\\frac{${gasCost}}{${mpg}} = ${costPerMile}$` : `$${costPerMile}$`;
    const explanation = `Choice ${correctLetter} is correct. The car travels ${mpg} miles on 1 gallon of gasoline, and 1 gallon costs \\$${gasCost}, so driving 1 mile costs ${costSteps} dollars. Driving $m$ fewer miles each week saves $${costPerMile}m$ dollars. The commuter wants to save \\$${savingsGoal} each week, so the equation is $${correctEquation}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A commuter drives an average of ${weeklyMiles} miles each week. Their car can travel an average of ${mpg} miles per gallon of gasoline. The commuter would like to reduce their weekly spending on gasoline by \\$${savingsGoal}. Assuming gasoline costs \\$${gasCost} per gallon, which equation can the commuter use to determine how many fewer average miles, $m$, they should drive each week?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${correctEquation}$`,
      explanation: explanation
    };
  }
};
