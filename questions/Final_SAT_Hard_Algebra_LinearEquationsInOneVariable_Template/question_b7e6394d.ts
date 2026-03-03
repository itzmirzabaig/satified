import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: b7e6394d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [100 (miles), 25 (mpg), $5 (savings), $4 (cost)]
 * - Difficulty factors: [Setting up equation for savings, cost per mile calculation]
 * - Distractor patterns: [A, B: use reciprocal 25/4 (miles per dollar), C: uses 95 = 100-5 confusing miles with dollars]
 * - Constraints: [m must result in $5 savings]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_b7e6394d = {
  metadata: {
    // id: "b7e6394d",
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
    
    // STEP 2: Calculate correct equation
    const costPerMileNum = gasCost;
    const costPerMileDenom = mpg;
    
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(costPerMileNum, costPerMileDenom);
    const simplifiedNum = costPerMileNum / divisor;
    const simplifiedDenom = costPerMileDenom / divisor;
    
    // Fixed: Use \\frac instead of \\\\frac
    const costPerMile = simplifiedDenom === 1 ? `${simplifiedNum}` : `\\frac{${simplifiedNum}}{${simplifiedDenom}}`;
    const correctEquation = `\\frac{${simplifiedNum}}{${simplifiedDenom}}m = ${savingsGoal}`;
    
    // STEP 3: Create distractors
    const distractorA = `\\frac{${simplifiedDenom}}{${simplifiedNum}}m = ${weeklyMiles - savingsGoal}`;
    const distractorB = `\\frac{${simplifiedDenom}}{${simplifiedNum}}m = ${savingsGoal}`;
    const distractorC = `\\frac{${simplifiedNum}}{${simplifiedDenom}}m = ${weeklyMiles - savingsGoal}`;
    
    // Fixed: Template literals for reasons with ${} variables
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false, reason: `this uses the reciprocal of the cost per mile ratio (miles per dollar) and confuses the total miles with the dollar amount` },
      { text: `$${distractorB}$`, isCorrect: false, reason: `this uses the reciprocal of the cost per mile ratio (miles per dollar instead of dollars per mile)` },
      { text: `$${distractorC}$`, isCorrect: false, reason: `this correctly calculates cost per mile but equates it to ${weeklyMiles - savingsGoal}, which confuses the total miles (${weeklyMiles}) with the dollar savings (${savingsGoal})` },
      { text: `$${correctEquation}$`, isCorrect: true, reason: null }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // Fixed: Changed \\\\frac to \\frac, \\\\times to \\times, removed \\\\text
    const explanation = `Let $m$ be the number of fewer miles Alan should drive.

First, we need to find out how many fewer gallons of gasoline he needs to use to save ${savingsGoal}.
Cost of gasoline = $${gasCost} per gallon.
Saving required = $${savingsGoal}.

Let's look at the cost per mile.
The car travels ${mpg} miles on 1 gallon of gas.
The cost of 1 gallon is $${gasCost}.
So, it costs $${gasCost} to travel ${mpg} miles.
The cost per mile is $\\frac{${gasCost}}{${mpg}}$ or $${costPerMile}$ dollars per mile.

Alan wants to save ${savingsGoal}. The amount of money saved is the cost per mile multiplied by the number of fewer miles driven ($m$).
So, Savings = (Cost per mile) $\\times$ (Fewer miles)
$${savingsGoal} = ${costPerMile} \\times m$
$${correctEquation}$

Choice ${correctLetter} is correct; this equation represents: (Cost per mile) $\\times$ (Number of miles reduced) = Total savings desired.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.

Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.

Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      // Fixed: Removed \\\\text, use plain text for units
      questionText: `Alan drives an average of ${weeklyMiles} miles each week. His car can travel an average of ${mpg} miles per gallon of gasoline. Alan would like to reduce his weekly expenditure on gasoline by ${savingsGoal}. Assuming gasoline costs ${gasCost} per gallon, which equation can Alan use to determine how many fewer average miles, $m$, he should drive each week?`,
      figureCode: null,
      // Fixed: Return string array
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 25e1cfed
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [10, 15, 9, 15, 6, 10 (small integers)]
 * - Difficulty factors: [Identifying infinitely many solutions by simplification]
 * - Distractor patterns: [A: exactly one (if coefficients differ), B: exactly two (quadratic confusion), D: zero (if same coeff but different constants)]
 * - Constraints: [Equation must simplify to identity]
 * - Question type: [Equation→Multiple Choice Text]
 * - Figure generation: [None]
 */