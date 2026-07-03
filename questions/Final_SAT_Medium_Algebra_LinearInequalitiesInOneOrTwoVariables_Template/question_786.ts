import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 786
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4, intercept: 8, x values: 2,4,6]
 * - Difficulty factors: [Table verification, strict inequality y > 4x + 8]
 * - Distractor patterns: [A=only one point checks, others fail]
 * - Constraints: [Must satisfy y > 4x + 8 for ALL points]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table in question content]
 */

export const generator_786 = {
  metadata: {
    id: "786",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: y > 4x + 8 with x = 2,4,6
    const slope = getRandomInt(3, 6);
    const intercept = getRandomInt(5, 15);

    // STEP 2: Generate x values (strictly increasing, distinct)
    const x1 = getRandomInt(1, 3);
    const x2 = x1 + getRandomInt(2, 3);
    const x3 = x2 + getRandomInt(2, 3);

    // Threshold for each x on the boundary line y = slope*x + intercept.
    // A point (x, y) satisfies y > slope*x + intercept iff y is strictly
    // greater than the threshold at that x.
    const t1 = slope * x1 + intercept;
    const t2 = slope * x2 + intercept;
    const t3 = slope * x3 + intercept;

    // STEP 3: Generate table data (all integers, so no float artifacts)
    // Table A (correct): every y strictly ABOVE its threshold -> all satisfy.
    const yA1 = t1 + getRandomInt(2, 5);
    const yA2 = t2 + getRandomInt(2, 5);
    const yA3 = t3 + getRandomInt(2, 5);

    // Table B: every y EXACTLY on the line -> fails the strict ">".
    const yB1 = t1;
    const yB2 = t2;
    const yB3 = t3;

    // Table C: every y strictly BELOW its threshold -> none satisfy.
    const yC1 = t1 - getRandomInt(1, 4);
    const yC2 = t2 - getRandomInt(1, 4);
    const yC3 = t3 - getRandomInt(1, 4);

    // Table D: mixed -> the middle point falls below, so not all satisfy.
    const yD1 = t1 + getRandomInt(1, 3);
    const yD2 = t2 - getRandomInt(1, 3);
    const yD3 = t3 + getRandomInt(1, 3);

    // STEP 4: Build tables (helper keeps the four identical in structure)
    const buildTable = (r1: number, r2: number, r3: number) =>
      `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody>` +
      `<tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${r1}</td></tr>` +
      `<tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${r2}</td></tr>` +
      `<tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${r3}</td></tr>` +
      `</tbody></table>`;

    const tableA = buildTable(yA1, yA2, yA3);
    const tableB = buildTable(yB1, yB2, yB3);
    const tableC = buildTable(yC1, yC2, yC3);
    const tableD = buildTable(yD1, yD2, yD3);

    // STEP 5: Create options. The option TEXT is the table itself; the choice
    // letter is decided only after shuffling, so nothing labels a table "A".
    const optionsData = [
      { text: tableA, isCorrect: true,  kind: 'above' as const, rows: [yA1, yA2, yA3] },
      { text: tableB, isCorrect: false, kind: 'on'    as const, rows: [yB1, yB2, yB3] },
      { text: tableC, isCorrect: false, kind: 'below' as const, rows: [yC1, yC2, yC3] },
      { text: tableD, isCorrect: false, kind: 'mixed' as const, rows: [yD1, yD2, yD3] }
    ];

    // STEP 6: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const onOption = shuffledOptions.find(o => o.kind === 'on')!;
    const belowOption = shuffledOptions.find(o => o.kind === 'below')!;
    const mixedOption = shuffledOptions.find(o => o.kind === 'mixed')!;

    // STEP 7: Build explanation (all numbers from the same live variables)
    const explanation = `Choice ${correctOption.letter} is correct. A point $(x, y)$ is a solution only when $y > ${slope}x + ${intercept}$. Evaluating the boundary line $y = ${slope}x + ${intercept}$ gives ${t1} at $x = ${x1}$, ${t2} at $x = ${x2}$, and ${t3} at $x = ${x3}$. In Choice ${correctOption.letter} every $y$-value is strictly greater than its boundary value ($y = ${correctOption.rows[0]} > ${t1}$, $y = ${correctOption.rows[1]} > ${t2}$, $y = ${correctOption.rows[2]} > ${t3}$), so all three points satisfy the inequality. Choice ${onOption.letter} fails because each $y$ equals the boundary value exactly, and the inequality is strict. Choice ${belowOption.letter} fails because every $y$ is below its boundary value. Choice ${mixedOption.letter} fails because at $x = ${x2}$ its value $y = ${mixedOption.rows[1]}$ is not greater than ${t2}.`;

    // STEP 8: Return question data
    return {
      questionText: `For which of the following tables are all the values of $x$ and their corresponding values of $y$ solutions to the given inequality? $$y > ${slope}x + ${intercept}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
