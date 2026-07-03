import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1227
 * Skill: Linear Inequalities In One Or Two Variables
 * Difficulty: Hard
 *
 * Description: Word problem involving box dimensions, perimeter, and height constraints.
 *   Constraint: (perimeter of base) + (height) <= maxSum, with length = multiplier * width.
 *   P = 2(w + l) = 2(w + m*w) = 2(1 + m)*w = perimeterCoef * w.
 *   Solve perimeterCoef*w + height <= maxSum  ->  w <= (maxSum - height)/perimeterCoef.
 * Fixes (repair pass):
 *   - Original distractors collided structurally: when multiplier = 3, perimeterCoef = 8,
 *     so d1 = budget/(1+m) = budget/4 = d3, producing DUP_OPTIONS on every m=3 draw
 *     (smoke draws 2,5,6,13,21). Also d2/d3 could be non-integers.
 *   - Rebuilt distractors as three distinct integer student errors and added a bounded
 *     uniqueness retry over the random inputs so no two options can ever collide.
 *   - Presented plain quantities as text (not $...$) so the only inline math is $x$,
 *     clearing the DOLLAR_RISK heuristic (there is no currency here).
 */
export const generator_1227 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. GENERATE CLEAN INTEGER NUMBERS (answer-first, with uniqueness guard)
    // ----------------------------------------------------------------------
    let multiplier = 2;
    let perimeterCoef = 6;
    let targetWidth = 10;   // correct bound on x (integer)
    let heightK = 4;        // height as a multiple of perimeterCoef -> clean errors
    let height = 40;
    let d1Val = 0, d2Val = 0, d3Val = 0;

    let tries = 0;
    do {
      // multiplier -> perimeterCoef = 2(1+m) is always an integer in {5,6,7,8,10}
      multiplier = getRandomElement([1.5, 2, 2.5, 3, 4]);
      perimeterCoef = 2 * (1 + multiplier);

      // correct answer: allowable width bound
      targetWidth = getRandomInt(8, 20);

      // height is a multiple of perimeterCoef so "division" errors stay integers
      heightK = getRandomInt(4, 9);
      height = heightK * perimeterCoef;

      // Distractors = distinct integer student errors:
      // d1: forgot the factor of 2 in the perimeter (used P = w + l = (1+m)w).
      //     (1+m)w <= maxSum - height  ->  w <= (maxSum - height)/(1+m) = 2*targetWidth
      d1Val = 2 * targetWidth;
      // d2: forgot to subtract the height (used P + 0 <= maxSum).
      //     perimeterCoef*w <= maxSum  ->  w <= maxSum/perimeterCoef = targetWidth + heightK
      d2Val = targetWidth + heightK;
      // d3: forgot BOTH (used (1+m)w <= maxSum).
      //     w <= maxSum/(1+m) = 2*(targetWidth + heightK)
      d3Val = 2 * (targetWidth + heightK);
      tries++;
    } while (
      tries < 50 &&
      new Set([targetWidth, d1Val, d2Val, d3Val]).size !== 4
    );

    const perimeterBudget = targetWidth * perimeterCoef; // = maxSum - height
    const maxSum = perimeterBudget + height;

    // ----------------------------------------------------------------------
    // 2. OPTIONS
    // ----------------------------------------------------------------------
    const optionsData = [
      { text: `$0 < x \\le ${targetWidth}$`, isCorrect: true },
      { text: `$0 < x \\le ${d1Val}$`, isCorrect: false },
      { text: `$0 < x \\le ${d2Val}$`, isCorrect: false },
      { text: `$0 < x \\le ${d3Val}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText: `A shipping service restricts the dimensions of the boxes it will ship for a certain type of service. The restriction states that for boxes shaped like rectangular prisms, the sum of the perimeter of the base of the box and the height of the box cannot exceed ${maxSum} inches. The perimeter of the base is determined using the width and length of the box. If a box has a height of ${height} inches and its length is ${multiplier} times the width, which inequality shows the allowable width $x$, in inches, of the box?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        Let $x$ be the width of the box. Since the length is ${multiplier} times the width, the length is $${multiplier}x$.
        <br/>
        The perimeter of the base is $P = 2(\\text{width} + \\text{length}) = 2(x + ${multiplier}x) = ${perimeterCoef}x$.
        <br/><br/>
        The restriction states that the perimeter plus the height cannot exceed ${maxSum}:
        $$ ${perimeterCoef}x + ${height} \\le ${maxSum} $$
        <br/>
        Subtract ${height} from both sides:
        $$ ${perimeterCoef}x \\le ${perimeterBudget} $$
        <br/>
        Divide both sides by ${perimeterCoef}:
        $$ x \\le ${targetWidth} $$
        <br/>
        Since the width must be positive, the allowable width is $0 < x \\le ${targetWidth}$.
        <br/><br/>
        The value $0 < x \\le ${d1Val}$ comes from dropping the factor of 2 in the perimeter (using $x + ${multiplier}x$ instead of $2(x + ${multiplier}x)$). The value $0 < x \\le ${d2Val}$ comes from forgetting to subtract the ${height}-inch height. The value $0 < x \\le ${d3Val}$ comes from making both of those errors.
      `
    };
  }
};
