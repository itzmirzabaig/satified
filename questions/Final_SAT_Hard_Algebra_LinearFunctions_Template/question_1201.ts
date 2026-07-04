import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1201
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [prices: double-digit, demands: 5-digit]
 * - Difficulty factors: [Linear modeling from two points, interpolation, real-world context]
 * - Distractor patterns: [B: sign/arithmetic error, C: interpolation error, D: midpoint error]
 * - Constraints: [Negative slope (demand decreases as price increases), linear relationship]
 * - Question type: [Word problem -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXES:
 * - DISTRACTOR_COLLISION: the old distractors B and C were drawn from adjacent
 *   inclusive ranges that shared the endpoint 500 (getRandomInt(100,500) and
 *   getRandomInt(500,1000)), so both could equal targetDemand + 500 and render
 *   as the same option. Distractors are now built as fixed, provably-distinct
 *   offsets from the correct answer, and a bounded guard re-derives the draw in
 *   the (impossible-by-construction) event any two options still coincide.
 * - Currency is written with an escaped \\$ so the price reads as dollars and is
 *   not swallowed by MathJax (removes the DOLLAR_RISK soft warnings).
 * - Slope magnitude is bounded so demand2 stays positive for every draw, keeping
 *   the real-world context sensible.
 */

export const generator_1201 = {
  metadata: {
    id: "1201",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    let questionText = '';
    let correctText = '';
    let explanation = '';
    let options: string[] = [];

    let tries = 0;
    while (tries++ < 50) {
      // STEP 1: Random price points (double-digit) with a clean gap.
      const price1 = getRandomInt(20, 45);
      const price2 = price1 + getRandomInt(15, 35); // gap of 15..35
      const priceDiff = price2 - price1;

      // STEP 2: Random starting demand (5-digit) and an integer negative slope.
      // slope = -slopePerDollar (an exact integer), so every derived demand is
      // an integer. Bound the total drop so demand2 stays comfortably positive.
      const demand1 = getRandomInt(15, 25) * 1000;
      const maxDrop = Math.floor((demand1 - 4000) / priceDiff); // keep demand2 >= 4000
      const slopePerDollar = getRandomInt(100, Math.min(400, maxDrop));
      const slope = -slopePerDollar;              // integer, negative
      const demand2 = demand1 + slope * priceDiff; // integer, < demand1

      // Target price strictly between the two given prices (closer to price2).
      const targetPrice = Math.round(price1 + priceDiff * getRandomInt(6, 8) / 10);

      // STEP 3: Model and correct answer (all integers).
      const yIntercept = demand1 - slope * price1;
      const targetDemand = slope * targetPrice + yIntercept;

      // STEP 4: Distractors as fixed, distinct offsets / a classic wrong method.
      const distractorB = targetDemand - slopePerDollar * (targetPrice - price1); // sign error: uses +slope from price1
      const distractorC = targetDemand + getRandomInt(3, 9) * 100;                 // interpolation error
      const distractorD = Math.round((demand1 + demand2) / 2);                     // midpoint-of-demands error

      // STEP 5: Reject any draw whose four options are not all distinct.
      const values = [targetDemand, distractorB, distractorC, distractorD];
      const allPositive = values.every(v => v > 0);
      const allDistinct = new Set(values).size === 4;
      if (!allPositive || !allDistinct) continue;

      const optionsData = [
        { text: targetDemand.toLocaleString(), isCorrect: true },
        { text: distractorB.toLocaleString(), isCorrect: false, reason: "results from applying the slope with the wrong sign (adding instead of subtracting units as the price rises)" },
        { text: distractorC.toLocaleString(), isCorrect: false, reason: "could come from an interpolation or rounding error in the final step" },
        { text: distractorD.toLocaleString(), isCorrect: false, reason: "would be the demand only if the target price were exactly halfway between the two given prices, giving the midpoint of the two demands" }
      ];

      const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
        ...opt,
        letter: String.fromCharCode(65 + index)
      }));

      const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
      const correctLetter = correctOption.letter;
      const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

      correctText = correctOption.text;
      options = shuffledOptions.map(o => o.text);

      questionText = `An economist modeled the demand $Q$ for a certain product as a linear function of the selling price $P$ (in dollars). The demand was ${demand1.toLocaleString()} units when the selling price was \\$${price1} per unit, and the demand was ${demand2.toLocaleString()} units when the selling price was \\$${price2} per unit. Based on the model, what is the demand, in units, when the selling price is \\$${targetPrice} per unit?`;

      const bSign = yIntercept < 0 ? '-' : '+';
      const bAbs = Math.abs(yIntercept);
      explanation = `Choice ${correctLetter} is correct. Since $Q$ is a linear function of $P$, write $Q = mP + b$. The slope is $m = \\frac{${demand2} - ${demand1}}{${price2} - ${price1}} = \\frac{${demand2 - demand1}}{${priceDiff}} = ${slope}$. Using the point $(${price1}, ${demand1})$: $${demand1} = ${slope}(${price1}) + b$, so $b = ${demand1} - (${slope * price1}) = ${yIntercept}$. The model is $Q = ${slope}P ${bSign} ${bAbs}$. For $P = ${targetPrice}$: $Q = ${slope}(${targetPrice}) + ${yIntercept} = ${slope * targetPrice} + ${yIntercept} = ${targetDemand}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
      break;
    }

    return {
      questionText,
      figureCode: null,
      options,
      correctAnswer: correctText,
      explanation
    };
  }
};
