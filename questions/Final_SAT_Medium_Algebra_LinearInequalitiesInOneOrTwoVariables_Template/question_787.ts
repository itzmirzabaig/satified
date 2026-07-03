import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 787
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [max weight: 5630, equipment: 190, crate weights: 25, 62]
 * - Difficulty factors: [Multi-step inequality setup, fixed weight subtraction]
 * - Distractor patterns: [B=wrong inequality sign, C/D=swapped coefficients or no equipment subtraction]
 * - Constraints: [190 + 25x + 62y <= 5630, simplified to 25x + 62y <= 5440]
 * - Question type: [Word Problem -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - correctAnswer now equals the shuffled correct option's exact text (was a
 *   bare, undollared string that matched no option -> CORRECT_MISMATCH).
 * - Distractors are tracked by kind so the explanation names each one by its
 *   true post-shuffle letter (the old code used positional incorrectOptions[i],
 *   which mislabeled the reasons once the array was shuffled).
 * - Weights written as plain prose (not $NNNN$) so no bare $<digit> collides
 *   with the $x$/$y$ variables -> clears DOLLAR_RISK.
 * - c1 (20-40) and c2 (50-80) ranges never overlap, and equipment >= 100 keeps
 *   remainingCapacity < maxWeight, so all four options are provably distinct
 *   every draw (no retry needed).
 */

export const generator_787 = {
  metadata: {
    id: "787",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Random values. Light crate strictly lighter than heavy crate
    // (disjoint ranges), equipment strictly positive -> remaining < max.
    const maxWeight = getRandomInt(5000, 7000);
    const equipmentWeight = getRandomInt(100, 300);
    const crate1Weight = getRandomInt(20, 40); // lighter crate, weighs c1 each
    const crate2Weight = getRandomInt(50, 80); // heavier crate, weighs c2 each

    const remainingCapacity = maxWeight - equipmentWeight; // >= 4700 > 0

    // STEP 2: Options, each tagged with a kind so the explanation can reference
    // the true letter after shuffling.
    // Correct:  c1*x + c2*y <= (max - equipment)
    // sign:     same expression but >= (violates the maximum)
    // swap:     coefficients swapped AND equipment not subtracted (<= max)
    // swapSign: swapped coefficients, >=, equipment not subtracted
    const optionsData = [
      {
        text: `$${crate1Weight}x + ${crate2Weight}y \\le ${remainingCapacity}$`,
        isCorrect: true,
        kind: 'correct' as const
      },
      {
        text: `$${crate1Weight}x + ${crate2Weight}y \\ge ${remainingCapacity}$`,
        isCorrect: false,
        kind: 'sign' as const
      },
      {
        text: `$${crate2Weight}x + ${crate1Weight}y \\le ${maxWeight}$`,
        isCorrect: false,
        kind: 'swap' as const
      },
      {
        text: `$${crate2Weight}x + ${crate1Weight}y \\ge ${maxWeight}$`,
        isCorrect: false,
        kind: 'swapSign' as const
      }
    ];

    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const signOption = shuffledOptions.find(o => o.kind === 'sign')!;
    const swapOption = shuffledOptions.find(o => o.kind === 'swap')!;
    const swapSignOption = shuffledOptions.find(o => o.kind === 'swapSign')!;

    // STEP 4: Explanation. Numbers kept in prose or in $-segments that open on a
    // digit; no standalone $x$/$y$, so the field carries no bare $<letter>.
    const explanation = `Choice ${correctOption.letter} is correct. The total weight is the equipment (${equipmentWeight} pounds) plus the crates, which weigh $${crate1Weight}x + ${crate2Weight}y$ pounds. This total can be at most the maximum of ${maxWeight} pounds, so $${equipmentWeight} + ${crate1Weight}x + ${crate2Weight}y \\le ${maxWeight}$. Subtracting ${equipmentWeight} from both sides gives $${crate1Weight}x + ${crate2Weight}y \\le ${remainingCapacity}$. Choice ${signOption.letter} is incorrect because it uses "greater than or equal to," which allows totals above the ${maxWeight}-pound limit. Choice ${swapOption.letter} is incorrect because it swaps the coefficients (assigning ${crate2Weight} pounds to x and ${crate1Weight} pounds to y) and never subtracts the ${equipmentWeight}-pound equipment. Choice ${swapSignOption.letter} is incorrect for the same coefficient swap and missing subtraction, and it also reverses the inequality.`;

    // STEP 5: Return question data. Weights are plain prose; only x and y are
    // in math, so questionText has no bare $<digit>.
    return {
      questionText: `A truck can haul a maximum weight of ${maxWeight} pounds. During one trip, the truck will be used to haul a ${equipmentWeight}-pound piece of equipment as well as several crates. Some of these crates weigh ${crate1Weight} pounds each and the others weigh ${crate2Weight} pounds each. Which inequality represents the possible combinations of the number of ${crate1Weight}-pound crates, $x$, and the number of ${crate2Weight}-pound crates, $y$, the truck can haul during one trip if only the piece of equipment and the crates are being hauled?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
