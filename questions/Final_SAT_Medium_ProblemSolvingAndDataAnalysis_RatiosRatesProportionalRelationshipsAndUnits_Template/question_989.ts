import { getRandomInt, round } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 989
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [14 teaspoons, 3 tsp = 1 tbsp]
 * - Difficulty factors: [Simple division, fraction result]
 * - Distractor patterns: [None - fill in blank, accept fraction/decimal]
 * - Constraints: [Accept 14/3, 4.666, 4.667]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 *
 * REPAIR NOTES:
 * - FILLIN_FORMAT: correctAnswer was LaTeX ("\\frac{28}{3}"). The grader wants a
 *   plain "a/b" string, so we emit the reduced fraction as `${num}/${den}`.
 * - Intent is a fraction result, so we force teaspoons NOT divisible by tspPerTbsp
 *   (bounded retry <=50) — every draw yields a genuine non-integer, and we reduce
 *   to lowest terms with gcd so the a/b answer is canonical (e.g. 14/3, 9/2).
 * - DOLLAR_RISK: the old explanation opened a math span with a backslash command
 *   ($\frac...$) while another span was $<digit>$, tripping the currency heuristic.
 *   Every math span here now starts with a digit or "(" — no span begins with
 *   "$" + letter/backslash — so the two heuristic halves never co-occur. All math
 *   delimiters are genuine (no currency in this item), so no \$ escaping is needed.
 * - Decimal alternatives are rounded to 3 places (no float artifact) and clearly
 *   labeled approximate, since the reduced fraction can be non-terminating.
 */

export const generator_989 = {
  metadata: {
    id: "989",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 14 tsp, 3 tsp = 1 tbsp, answer = 14/3.
    const tspPerTbsp = getRandomInt(2, 5);
    // Force a non-integer result (fraction intent): teaspoons not divisible by
    // tspPerTbsp. Bounded retry so an unlucky range can never hang the render.
    let teaspoons = getRandomInt(5, 40);
    let tries = 0;
    while (teaspoons % tspPerTbsp === 0 && tries++ < 50) {
      teaspoons = getRandomInt(5, 40);
    }
    // Guaranteed-safe fallback if 50 draws all landed on a multiple.
    if (teaspoons % tspPerTbsp === 0) teaspoons += 1;

    // STEP 2: Reduce teaspoons/tspPerTbsp to lowest terms for the a/b answer.
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const g = gcd(teaspoons, tspPerTbsp);
    const num = teaspoons / g;
    const den = tspPerTbsp / g; // > 1 because teaspoons is not divisible by tspPerTbsp
    const answerFraction = `${num}/${den}`;        // plain a/b for the grader
    const decimalApprox = round(teaspoons / tspPerTbsp, 3); // e.g. 4.667 (rounded)

    return {
      questionText: `How many tablespoons are equivalent to $${teaspoons}$ teaspoons? ($${tspPerTbsp}$ teaspoons = 1 tablespoon)`,
      figureCode: null,
      options: null,
      correctAnswer: answerFraction,
      explanation: `The correct answer is $${num}/${den}$. It's given that $${tspPerTbsp}$ teaspoons is equivalent to 1 tablespoon. Therefore, $${teaspoons}$ teaspoons is equivalent to $(${teaspoons}\\text{ teaspoons})\\left(\\dfrac{1\\text{ tablespoon}}{${tspPerTbsp}\\text{ teaspoons}}\\right)$, which equals $${num}/${den}$ tablespoons. This can be entered as the fraction ${num}/${den} or as its approximate decimal ${decimalApprox}.`
    };
  }
};
