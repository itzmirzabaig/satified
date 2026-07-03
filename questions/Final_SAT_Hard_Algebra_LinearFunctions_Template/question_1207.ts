import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1207
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fixed cost: 220 (triple-digit), hourly rate derived: 60 (double-digit), hours: 5 (single-digit)]
 * - Difficulty factors: [Multi-step word problem, requires setting up linear equation from context, solving for unknown rate]
 * - Distractor patterns: [B: forgot to subtract base hours, C: wrong rate calculation, D: added instead of proper structure]
 * - Constraints: [x >= 2, positive constants, derived rate must be positive integer]
 * - Question type: [Word problem → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1207 = {
  metadata: {
    id: "1207",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES).
    // Base fixed cost for the first period (~220 in the original): 200-350.
    const baseCost = getRandomInt(20, 35) * 10;
    // First period covered by the fixed cost: 2-4 hours.
    const firstPeriodHours = getRandomInt(2, 4);
    // Additional hours beyond the first period: 1-4. Building totalHours from
    // this guarantees additionalHours >= 1 (no degenerate/zero-division draws).
    const additionalHours = getRandomInt(1, 4);
    const totalHours = firstPeriodHours + additionalHours; // 3-8

    // Hourly fee for each additional hour: a clean integer, 40-80.
    // Resample (bounded) so the true rate never equals the "average rate"
    // distractor (totalCost/totalHours) and the constant term is nonzero and
    // never equals baseCost. This keeps all four options distinct for any draw.
    let hourlyRate = getRandomInt(40, 80);
    let totalCost = baseCost + hourlyRate * additionalHours;
    let avgRate = Math.round(totalCost / totalHours);
    let intercept = baseCost - hourlyRate * firstPeriodHours;
    let tries = 0;
    while (
      (avgRate === hourlyRate || intercept === 0 || intercept === baseCost) &&
      tries++ < 50
    ) {
      hourlyRate = getRandomInt(40, 80);
      totalCost = baseCost + hourlyRate * additionalHours;
      avgRate = Math.round(totalCost / totalHours);
      intercept = baseCost - hourlyRate * firstPeriodHours;
    }

    // STEP 2: Derived form.
    // f(x) = baseCost + hourlyRate*(x - firstPeriodHours)
    //      = hourlyRate*x + (baseCost - hourlyRate*firstPeriodHours)
    const slope = hourlyRate; // = hourlyRate

    // Signed-term formatter: " + k" or " - |k|" so the intercept never renders
    // as "+ -76". Used in both the options and the explanation.
    const signed = (n: number) => (n < 0 ? `- ${Math.abs(n)}` : `+ ${n}`);

    // STEP 3: Distractors (SAT-style), all guaranteed distinct from the answer
    // and from each other by the guard above.
    //  - distB: forgets to subtract the fixed-period cost (keeps + baseCost).
    //  - distC: uses the average rate with no fixed-fee structure.
    //  - distD: keeps the fixed fee but uses the (wrong) average rate.
    const correctText = `$f(x) = ${slope}x ${signed(intercept)}$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$f(x) = ${slope}x + ${baseCost}$`, isCorrect: false, reason: "fails to subtract the cost already covered by the fixed first-period fee when applying the hourly rate" },
      { text: `$f(x) = ${avgRate}x$`, isCorrect: false, reason: "assumes a single constant rate from the start with no fixed fee, using total cost divided by total hours" },
      { text: `$f(x) = ${avgRate}x + ${baseCost}$`, isCorrect: false, reason: "keeps the fixed fee but uses an incorrect slope found by dividing total cost by total hours" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 4: Return question data. Equations in the explanation are written so
    // no math span begins with "$<digit>" (avoids the currency/math ambiguity),
    // and all currency is escaped as \$.
    return {
      questionText: `A window repair specialist charges \\$${baseCost} for the first ${firstPeriodHours} hours of repair plus a fixed hourly fee for each additional hour. The total cost for ${totalHours} hours of repair is \\$${totalCost}. Which function $f$ gives the total cost, in dollars, for $x$ hours of repair, where $x \\ge ${firstPeriodHours}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Let $h$ be the hourly fee for each hour beyond the first ${firstPeriodHours} hours. The first ${firstPeriodHours} hours cost a fixed \\$${baseCost}, so for $x \\ge ${firstPeriodHours}$ hours the total cost is $f(x) = ${baseCost} + h(x - ${firstPeriodHours})$. The total for ${totalHours} hours is \\$${totalCost}, so $h(${totalHours} - ${firstPeriodHours}) = ${totalCost} - ${baseCost}$, which gives $h \\cdot ${additionalHours} = ${totalCost - baseCost}$ and $h = ${hourlyRate}$. Substituting back, $f(x) = ${baseCost} + ${hourlyRate}(x - ${firstPeriodHours}) = ${slope}x ${signed(intercept)}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
