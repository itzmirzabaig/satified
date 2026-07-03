import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 769
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [threshold: 100, ranges given in options]
 * - Difficulty factors: [Range interpretation, "more than" threshold]
 * - Distractor patterns: [B/C/D = ranges entirely below threshold]
 * - Constraints: [Correct range must be entirely > threshold; wrongs entirely < threshold]
 * - Question type: [Conceptual -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - correctAnswer now EXACTLY equals the correct option's text.
 * - Added a bounded-retry uniqueness guard: the old wrong2/wrong3 ranges could
 *   overlap and produce identical option strings (DUP_OPTIONS). Now every
 *   option string is guaranteed distinct.
 * - Threshold is stated in prose (no bare "$100$" beside "$h$"), so no
 *   "$<digit>" pairs with a math "$" (clears DOLLAR_RISK).
 * - Explanation numbers/letters computed from the same live variables and the
 *   shuffled array.
 */

export const generator_769 = {
  metadata: {
    id: "769",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Threshold for "tall" and the unit.
    const threshold = getRandomInt(80, 150);
    const unit = getRandomInt(0, 1) === 0 ? 'centimeters' : 'inches';

    // STEP 2: Correct range — entirely ABOVE the threshold.
    const correctMin = threshold + getRandomInt(5, 15);
    const correctMax = correctMin + getRandomInt(30, 60);

    // STEP 3: Three wrong ranges — entirely BELOW the threshold. Build them with
    // a bounded-retry uniqueness guard so no two option strings ever coincide
    // (the raw ranges for wrong2/wrong3 can overlap).
    const asText = (mn: number, mx: number) => `$${mn} < h < ${mx}$`;
    const used = new Set<string>([asText(correctMin, correctMax)]);
    const wrongs: Array<{ mn: number; mx: number }> = [];

    const makeWrong = (loSub: [number, number], hiSub: [number, number]) => {
      // mn = threshold - (large offset), mx = threshold - (small offset); both < threshold.
      let tries = 0;
      while (tries++ < 50) {
        const mn = threshold - getRandomInt(loSub[0], loSub[1]);
        const mx = threshold - getRandomInt(hiSub[0], hiSub[1]);
        if (mn >= mx) continue;              // keep a valid, non-empty range
        if (mx >= threshold) continue;       // must stay strictly below threshold
        const t = asText(mn, mx);
        if (used.has(t)) continue;           // guarantee distinct option strings
        used.add(t);
        return { mn, mx };
      }
      // Deterministic fallback: nudge downward until unique (still < threshold).
      let mn = threshold - loSub[1] - wrongs.length * 2;
      let mx = threshold - hiSub[0] - wrongs.length;
      while (used.has(asText(mn, mx)) || mn >= mx) { mn -= 1; }
      used.add(asText(mn, mx));
      return { mn, mx };
    };

    wrongs.push(makeWrong([20, 30], [5, 10]));   // just below
    wrongs.push(makeWrong([40, 60], [15, 25]));  // clearly below
    wrongs.push(makeWrong([60, 90], [20, 40]));  // well below

    // STEP 4: Options.
    const optionsData = [
      { text: asText(correctMin, correctMax), isCorrect: true },
      { text: asText(wrongs[0].mn, wrongs[0].mx), isCorrect: false },
      { text: asText(wrongs[1].mn, wrongs[1].mx), isCorrect: false },
      { text: asText(wrongs[2].mn, wrongs[2].mx), isCorrect: false }
    ];

    // STEP 5: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 6: Explanation — letters from the shuffled array, numbers from live vars.
    const explanation =
      `Choice ${correctOption.letter} is correct. A species is classified as tall when its typical fully grown height is more than ${threshold} ${unit}. ` +
      `For the correct range, every height $h$ is between ${correctMin} and ${correctMax} ${unit}, and both of those values exceed ${threshold}, so the entire range describes a tall species. ` +
      `Choice ${incorrectOptions[0].letter} is incorrect because every height in that range is less than ${threshold} ${unit}. ` +
      `Choice ${incorrectOptions[1].letter} is incorrect because that range is also entirely below ${threshold} ${unit}. ` +
      `Choice ${incorrectOptions[2].letter} is incorrect because that range is well below ${threshold} ${unit}.`;

    // STEP 7: Return.
    return {
      questionText: `A botanist classifies a species of plant as tall if its typical height when fully grown is more than ${threshold} ${unit}. Each of the following inequalities represents the possible heights $h$, in ${unit}, for a specific plant species when fully grown. Which inequality represents the possible heights $h$, in ${unit}, for a tall plant species?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
