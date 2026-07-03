import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 789
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [daily miles: 72-77, days: 16]
 * - Difficulty factors: [Range multiplication, compound inequality]
 * - Distractor patterns: [A=addition instead of multiplication, C=added to x, D=divided by days]
 * - Constraints: [72*16 <= x <= 77*16]
 * - Question type: [Word Problem -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - correctAnswer now equals the shuffled correct option's exact text (was the
 *   bare product form "minTotal <= x <= maxTotal", which matched no option
 *   whose text is written as "(min)(days) <= x <= (max)(days)" -> CORRECT_MISMATCH).
 * - Distractors tracked by kind so the explanation names each by its true
 *   post-shuffle letter (old code used positional incorrectOptions[i]).
 * - Per-day mileage and day count written as plain prose so no bare $<digit>
 *   collides with $x$ -> clears DOLLAR_RISK.
 * - All values are integers (products of integers), so no float artifacts; the
 *   four option strings are structurally distinct for every draw (no retry).
 */

export const generator_789 = {
  metadata: {
    id: "789",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Random values (match original magnitudes)
    const minDaily = getRandomInt(50, 100);
    const maxDaily = minDaily + getRandomInt(5, 15); // strictly greater than min
    const days = getRandomInt(10, 25);

    // STEP 2: Products (all integers)
    const minTotal = minDaily * days;
    const maxTotal = maxDaily * days;

    // STEP 3: Options tagged with kind.
    // add:     adds days to the per-day range instead of multiplying
    // correct: multiplies each bound by the number of days
    // addX:    adds days to the unknown total instead of scaling it
    // coeffX:  puts days as a coefficient on x with the per-day bounds
    const optionsData = [
      { text: `$${minDaily} + ${days} \\leq x \\leq ${maxDaily} + ${days}$`, isCorrect: false, kind: 'add' as const },
      { text: `$(${minDaily})(${days}) \\leq x \\leq (${maxDaily})(${days})$`, isCorrect: true, kind: 'correct' as const },
      { text: `$${minDaily} \\leq ${days} + x \\leq ${maxDaily}$`, isCorrect: false, kind: 'addX' as const },
      { text: `$${minDaily} \\leq ${days}x \\leq ${maxDaily}$`, isCorrect: false, kind: 'coeffX' as const }
    ];

    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const addOption = shuffledOptions.find(o => o.kind === 'add')!;
    const addXOption = shuffledOptions.find(o => o.kind === 'addX')!;
    const coeffXOption = shuffledOptions.find(o => o.kind === 'coeffX')!;

    // STEP 5: Explanation. Numbers sit in prose or in $-segments opening on a
    // digit or "("; no standalone $x$, so no bare $<letter> co-occurs.
    const explanation = `Choice ${correctOption.letter} is correct. The whale travels at least ${minDaily} miles per day for ${days} days, so the minimum total distance is $${minDaily} \\times ${days} = ${minTotal}$ miles. The maximum total distance is $${maxDaily} \\times ${days} = ${maxTotal}$ miles. The total, x, must lie between these, giving $${minTotal} \\leq x \\leq ${maxTotal}$, which is written as $(${minDaily})(${days}) \\leq x \\leq (${maxDaily})(${days})$. Choice ${addOption.letter} is incorrect because it adds the number of days to the per-day mileage instead of multiplying. Choice ${addXOption.letter} is incorrect because it adds the number of days to the total distance rather than scaling it. Choice ${coeffXOption.letter} is incorrect because it treats the number of days as a coefficient of x while keeping the per-day bounds.`;

    // STEP 6: Return question data. Mileage and day count are plain prose; only
    // x appears in math, so questionText has no bare $<digit>.
    return {
      questionText: `A model estimates that whales from a certain species travel ${minDaily} to ${maxDaily} miles in the ocean each day during their migration. Based on this model, which inequality represents the estimated total number of miles, $x$, a whale could travel in ${days} days of its migration?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
