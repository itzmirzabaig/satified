import { getRandomInt, round, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 734
 *
 * Evaluate a linear model y = m x + b at a given x and round.
 * Intent: substitute x into y = m x + b (m to 2 dp, b to 1 dp) and pick the
 * closest whole number.
 *
 * The displayed intermediate values and the rounded answer are all derived from
 * round(y, 2) so the arithmetic shown is internally consistent (no case where
 * the reader sees "= 52.5" but the answer rounds to 52). The stated domain is
 * built to always contain the queried x. Distractors use distinct positive
 * offsets, so they never collide with the answer or each other.
 */
export const generator_734 = {
  metadata: {
    id: "734",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Random values.
    const m = round(getRandomInt(50, 90) / 100, 2);   // slope 0.50–0.90 (2 dp)
    const b = round(getRandomInt(10, 40) / 10, 1);    // intercept 1.0–4.0 (1 dp)
    const x = getRandomInt(40, 80);                   // queried worker-ant count

    // Domain that always contains x.
    const lo = getRandomInt(20, 40);                  // <= 40 <= x
    const hi = getRandomInt(100, 150);                // >= 100 > x

    // STEP 2: Compute (values shown are rounded to 2 dp; answer rounds from that).
    const mxVal = round(m * x, 2);
    const yVal = round(mxVal + b, 2);
    const roundedY = Math.round(yVal);

    // Trim trailing ".0"/".00" for clean display of the intermediate products.
    const fmt = (v: number): string => {
      const s = v.toFixed(2);
      return s.replace(/\.?0+$/, '');
    };
    const mxStr = fmt(mxVal);
    const yStr = fmt(yVal);

    // STEP 3: Options — distinct positive offsets guarantee no collisions.
    const optionsData = [
      { text: roundedY.toString(), isCorrect: true },
      { text: (roundedY + 20).toString(), isCorrect: false, reason: "results from using the wrong slope value" },
      { text: (roundedY + 40).toString(), isCorrect: false, reason: "results from adding rather than substituting the intercept" },
      { text: (roundedY + 150).toString(), isCorrect: false, reason: "results from a place-value error in the slope" }
    ];

    // STEP 4: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // STEP 5: Return question data.
    return {
      questionText: `A team of biologists collected data on ant colonies. For any colony with $x$ worker ants, the equation $y = ${m}x + ${b}$, where $x \\ge ${lo}$ and $x \\le ${hi}$, gives the predicted number of larvae, $y$, in the colony. If a colony has ${x} worker ants, which of the following is closest to the predicted number of larvae in the colony?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: roundedY.toString(),
      explanation: `Choice ${correctLetter} is correct. Substitute ${x} for $x$: $y = ${m}(${x}) + ${b} = ${mxStr} + ${b} = ${yStr}$, which is closest to ${roundedY}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
