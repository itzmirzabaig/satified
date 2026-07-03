import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 779
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min rate: 0.6, max rate: 1.8 (single decimal)]
 * - Difficulty factors: [Range interpretation, compound inequality construction]
 * - Distractor patterns: [A=summed values, B=only max, C=wrong range direction]
 * - Constraints: [Must be compound inequality 0.6 ≤ s ≤ 1.8]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_779 = {
  metadata: {
    id: "779",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES).
    // Work in integer tenths so every displayed decimal and every sum is exact
    // (0.7 + 1.9 in float gives 2.5999...; 7 + 19 = 26 -> 26/10 = 2.6 exactly).
    const minTenths = getRandomInt(1, 8);              // 0.1 .. 0.8
    const maxTenths = minTenths + getRandomInt(10, 30); // gap of 1.0 .. 3.0
    const sumTenths = minTenths + maxTenths;           // exact integer sum

    // Format an integer number of tenths as a clean 1-decimal string with no
    // float artifact and no trailing ".0" (e.g. 26 -> "2.6", 30 -> "3").
    const fmt = (tenths: number): string => {
      const whole = Math.trunc(tenths / 10);
      const frac = tenths % 10;
      return frac === 0 ? `${whole}` : `${whole}.${frac}`;
    };

    const minVal = fmt(minTenths); // e.g. "0.6"
    const maxVal = fmt(maxTenths); // e.g. "1.8"
    const sumVal = fmt(sumTenths); // e.g. "2.4"

    const context = getRandomElement([
      "snowstorm", "rainstorm", "windstorm", "hailstorm"
    ]);
    const phenomenon = context === 'snowstorm' ? 'snowfall'
      : context === 'rainstorm' ? 'rainfall'
      : context === 'windstorm' ? 'wind speed'
      : 'hail accumulation';

    const measurement = getRandomElement([
      "inches per hour", "centimeters per hour", "millimeters per hour"
    ]);

    // STEP 2: Build options. The correct answer is the compound inequality
    // minVal <= s <= maxVal. Distractors follow common SAT error patterns:
    //  A: s >= (min + max)   — sums the two endpoints
    //  B: s >= max           — uses only the maximum
    //  C: 0 <= s <= min      — collapses the range to the wrong endpoint
    // minVal >= 0.1 > 0 and maxVal > minVal, so all four strings are distinct.
    // Each distractor carries the reason it is wrong so the explanation can
    // describe it by identity, not by post-shuffle position.
    const correctText = `$${minVal} \\leq s \\leq ${maxVal}$`;
    const optionsData = [
      { text: `$s \\geq ${sumVal}$`, isCorrect: false, reason: `adds the minimum and maximum instead of using them as bounds` },
      { text: `$s \\geq ${maxVal}$`, isCorrect: false, reason: `uses only the maximum value` },
      { text: `$0 \\leq s \\leq ${minVal}$`, isCorrect: false, reason: `uses the minimum as an upper bound instead of a lower bound` },
      { text: correctText, isCorrect: true, reason: `` }
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
      .map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`)
      .join(' ');

    // STEP 4: Build explanation. All math (including the combined inequality) is
    // inside $...$; letters come from the shuffled array.
    const explanation = `Choice ${correctOption.letter} is correct. The minimum recorded rate was ${minVal} ${measurement}, so $s \\geq ${minVal}$. The maximum recorded rate was ${maxVal} ${measurement}, so $s \\leq ${maxVal}$. Combining these gives $${minVal} \\leq s \\leq ${maxVal}$. ${distractorSentences}`;

    // STEP 5: Return question data
    return {
      questionText: `For a ${context} in a certain town, the minimum rate of ${phenomenon} recorded was ${minVal} ${measurement}, and the maximum rate recorded was ${maxVal} ${measurement}. Which inequality is true for all values of $s$, where $s$ represents the rate of ${phenomenon}, in ${measurement}, recorded for this ${context}?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
