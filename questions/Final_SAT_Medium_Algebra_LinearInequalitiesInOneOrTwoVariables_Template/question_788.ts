import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 788
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 2, constant: 883 (three-digit), x values: 440-442]
 * - Difficulty factors: [Table verification, inequality testing]
 * - Distractor patterns: [Tables where some points satisfy but not all]
 * - Constraints: [Must satisfy ax - y > c for ALL table entries]
 * - Question type: [Table -> Multiple Choice Text]
 * - Figure generation: [HTML Table inside each option]
 *
 * FIXED / REBUILT:
 * - correctAnswer now equals the correct option's exact text (the table HTML),
 *   like sibling question_786. The old code answered "Table D" while the option
 *   text was "Table D\n<table html>", so nothing matched -> CORRECT_MISMATCH.
 * - Removed the baked-in "Table A/B/C/D" labels: a fixed label is meaningless
 *   once options are shuffled. The choice letter now comes only from the shuffle.
 * - Rebuilt the y-value construction so EXACTLY ONE table satisfies the strict
 *   inequality for every draw. A row (x, y) satisfies ax - y > c iff y < ax - c
 *   (= y < threshold). The old distractors could all-satisfy for large a (e.g.
 *   the "increasing" table), producing two correct answers; the new four kinds
 *   (all-below / all-on / all-above / mixed) are provably single-answer and
 *   pairwise distinct every draw.
 * - Answer-first thresholds keep every y a small positive integer (no floats),
 *   and a*x1 >= 60 > threshold1 keeps the constant c strictly positive.
 * - Given inequality kept as display math opening on the coefficient (only
 *   $<digit>, no bare $<letter>) -> clears DOLLAR_RISK.
 */

export const generator_788 = {
  metadata: {
    id: "788",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Answer-first design. Pick a, the x-values, and the threshold at x1;
    // derive the constant so ax - y > c <=> y < (ax - c) = threshold.
    const a = getRandomInt(2, 5);          // coefficient of x
    const x1 = getRandomInt(30, 50);       // moderate x, keeps c positive
    const x2 = x1 + getRandomInt(1, 3);
    const x3 = x2 + getRandomInt(1, 3);
    const threshold1 = getRandomInt(15, 35); // y-boundary at x1 (positive, small)

    // c = a*x1 - threshold1. Since a*x1 >= 2*30 = 60 and threshold1 <= 35,
    // c >= 25 > 0 for every draw.
    const constant = a * x1 - threshold1;

    // Boundary (largest y still failing) at each x: y must be < threshold_i.
    const threshold2 = a * x2 - constant; // = threshold1 + a*(x2 - x1)
    const threshold3 = a * x3 - constant;

    // STEP 2: Build the four y-triples. Margins are small positive integers, so
    // every y stays a positive integer.
    // correct: every y strictly below its threshold  -> ALL satisfy
    const yCorrect = [
      threshold1 - getRandomInt(1, 5),
      threshold2 - getRandomInt(1, 5),
      threshold3 - getRandomInt(1, 5)
    ];
    // on: every y exactly on its threshold -> ax - y = c, fails the strict ">"
    const yOn = [threshold1, threshold2, threshold3];
    // above: every y strictly above its threshold -> ALL fail
    const yAbove = [
      threshold1 + getRandomInt(1, 5),
      threshold2 + getRandomInt(1, 5),
      threshold3 + getRandomInt(1, 5)
    ];
    // mixed: first and last satisfy, middle sits on the boundary -> not ALL satisfy
    const yMixed = [
      threshold1 - getRandomInt(1, 5),
      threshold2,
      threshold3 - getRandomInt(1, 5)
    ];

    // STEP 3: Table builder (identical structure for all four; only y changes).
    const buildTable = (r1: number, r2: number, r3: number) =>
      `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody>` +
      `<tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${r1}</td></tr>` +
      `<tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${r2}</td></tr>` +
      `<tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${r3}</td></tr>` +
      `</tbody></table>`;

    // STEP 4: Options. Text is the table itself; letter comes only from shuffle.
    const optionsData = [
      { text: buildTable(yCorrect[0], yCorrect[1], yCorrect[2]), isCorrect: true,  kind: 'correct' as const, rows: yCorrect },
      { text: buildTable(yOn[0], yOn[1], yOn[2]),               isCorrect: false, kind: 'on'      as const, rows: yOn },
      { text: buildTable(yAbove[0], yAbove[1], yAbove[2]),      isCorrect: false, kind: 'above'   as const, rows: yAbove },
      { text: buildTable(yMixed[0], yMixed[1], yMixed[2]),      isCorrect: false, kind: 'mixed'   as const, rows: yMixed }
    ];

    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const onOption = shuffledOptions.find(o => o.kind === 'on')!;
    const aboveOption = shuffledOptions.find(o => o.kind === 'above')!;
    const mixedOption = shuffledOptions.find(o => o.kind === 'mixed')!;

    // STEP 6: Explanation. All numbers come from the same live variables. Math
    // segments open on a digit; the variables x and y stay in prose, so no field
    // carries both $<digit> and $<letter>.
    const explanation = `Choice ${correctOption.letter} is correct. A pair (x, y) is a solution only when ax - y > c, that is, when y is strictly less than $${a}x - ${constant}$. Evaluating that boundary gives ${threshold1} at x = ${x1}, ${threshold2} at x = ${x2}, and ${threshold3} at x = ${x3}. In Choice ${correctOption.letter} every y-value is strictly below its boundary ($${correctOption.rows[0]} < ${threshold1}$, $${correctOption.rows[1]} < ${threshold2}$, $${correctOption.rows[2]} < ${threshold3}$), so all three pairs satisfy the inequality. Choice ${onOption.letter} fails because each y equals its boundary value exactly, and the inequality is strict. Choice ${aboveOption.letter} fails because every y is greater than its boundary value. Choice ${mixedOption.letter} fails because at x = ${x2} the value y = ${mixedOption.rows[1]} equals the boundary rather than falling below it.`;

    // STEP 7: Return question data. The given inequality is display math opening
    // on the coefficient; x and y in the prose are plain letters (no $), so the
    // field has no bare $<letter> to pair with the $<digit>.
    return {
      questionText: `$$${a}x - y > ${constant}$$ For which of the following tables are all the values of x and their corresponding values of y solutions to the given inequality?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
