import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 8c5e6702
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fixed cost: 220 (triple-digit), hourly rate derived: 60 (double-digit), hours: 5 (single-digit)]
 * - Difficulty factors: [Multi-step word problem, requires setting up linear equation from context, solving for unknown rate]
 * - Distractor patterns: [B: forgot to subtract base hours, C: wrong rate calculation, D: added instead of proper structure]
 * - Constraints: [x >= 2, positive constants, derived rate must be positive integer]
 * - Question type: [Word problem → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_8c5e6702 = {
  metadata: {
    // id: "8c5e6702",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Base cost for first period (200-300 range, similar to 220)
    const baseCost = getRandomInt(20, 35) * 10; // 200-350
    const totalHours = getRandomInt(4, 8); // 4-8 hours (original was 5)
    const firstPeriodHours = getRandomInt(2, 4); // First 2-4 hours at base cost
    const additionalHours = totalHours - firstPeriodHours;
    
    // Ensure hourly rate is a nice integer
    const hourlyRate = getRandomInt(40, 80); // 40-80 per hour
    const totalCost = baseCost + hourlyRate * additionalHours;
    
    // STEP 2: Calculate derived values
    // f(x) = baseCost + hourlyRate * (x - firstPeriodHours)
    // Simplified: f(x) = hourlyRate * x + (baseCost - hourlyRate * firstPeriodHours)
    const slope = hourlyRate;
    const intercept = baseCost - hourlyRate * firstPeriodHours;
    
    // STEP 3: Create distractors following SAT patterns
    const distractorBIntercept = baseCost; // Forgot to subtract
    const distractorCSlope = Math.round(totalCost / totalHours); // Wrong rate (average)
    const distractorDSlope = Math.round(totalCost / totalHours);
    const distractorDIntercept = baseCost;
    
    const correctText = `$f(x) = ${slope}x + ${intercept}$`;
    
    const optionsData = [
      { text: `$f(x) = ${slope}x + ${intercept}$`, isCorrect: true }, // A
      { text: `$f(x) = ${slope}x + ${distractorBIntercept}$`, isCorrect: false, reason: "fails to subtract the cost already covered by the first hours when applying the hourly rate" },
      { text: `$f(x) = ${distractorCSlope}x$`, isCorrect: false, reason: "suggests a constant hourly rate from the beginning with no initial fixed fee structure, incorrectly using total cost divided by total hours" },
      { text: `$f(x) = ${distractorDSlope}x + ${distractorDIntercept}$`, isCorrect: false, reason: "adds the initial fee but uses an incorrect slope derived from total cost divided by total hours" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Return question data
    return {
      // Fixed: Escape currency dollar signs with \$
      questionText: `A window repair specialist charges \\$${baseCost} for the first ${firstPeriodHours} hours of repair plus an hourly fee for each additional hour. The total cost for ${totalHours} hours of repair is \\$${totalCost}. Which function $f$ gives the total cost, in dollars, for $x$ hours of repair, where $x \\ge ${firstPeriodHours}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Let $h$ be the hourly fee for each hour after the first ${firstPeriodHours} hours. The cost for the first ${firstPeriodHours} hours is fixed at \\$${baseCost}. For $x$ hours where $x \\ge ${firstPeriodHours}$, the cost consists of the initial \\$${baseCost} plus an hourly fee for the remaining $(x - ${firstPeriodHours})$ hours. So, $f(x) = ${baseCost} + h(x - ${firstPeriodHours})$. Given that the total cost for ${totalHours} hours is \\$${totalCost}, we substitute: $${totalCost} = ${baseCost} + h(${totalHours} - ${firstPeriodHours})$, so $${totalCost - baseCost} = ${additionalHours}h$, giving $h = ${hourlyRate}$. Substituting back: $f(x) = ${baseCost} + ${hourlyRate}(x - ${firstPeriodHours}) = ${baseCost} + ${slope}x - ${hourlyRate * firstPeriodHours} = ${slope}x + ${intercept}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 2b15d65f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [prices: 40, 60 (double-digit), demands: 15000, 20000 (5-digit)]
 * - Difficulty factors: [Linear modeling from two points, interpolation, real-world context]
 * - Distractor patterns: [B: arithmetic error, C: estimation error, D: midpoint error]
 * - Constraints: [Negative slope (demand decreases as price increases), linear relationship]
 * - Question type: [Word problem → Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/linear-functions/2b15d65f.ts