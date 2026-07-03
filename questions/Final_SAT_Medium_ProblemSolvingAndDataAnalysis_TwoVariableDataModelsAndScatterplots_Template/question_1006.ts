import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1006
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 1-4, y varies by table]
 * - Difficulty factors: [Identifying nonlinear relationship in tables]
 * - Distractor patterns: [Three linear tables (constant difference), one exponential (doubling)]
 * - Constraints: [Exactly one table is nonlinear (exponential doubling)]
 * - Question type: [Table Options -> Multiple Choice Text]
 * - Figure generation: [null - tables live inside the options]
 *
 * FIXED:
 * - correctAnswer now uses the numeric index of the correct (shuffled) option,
 *   so it resolves unambiguously even though each option's text embeds an HTML
 *   table (previously "Table D" matched no option text -> CORRECT_MISMATCH).
 * - Table captions (A-D) are reassigned by shuffled position so the caption a
 *   student sees always matches its choice letter; the correct letter/caption
 *   are read from the shuffled array, never hardcoded.
 */

export const generator_1006 = {
  metadata: {
    id: "1006",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Helper: render a 4-column (x = 1..4) y-row table with a caption.
    const buildTable = (caption: string, ys: number[]): string => {
      const cell = 'border: 1px solid currentColor; padding: 8px;';
      const head = [1, 2, 3, 4]
        .map(x => `<th style="${cell}">${x}</th>`)
        .join('');
      const body = ys.map(y => `<td style="${cell}">${y}</td>`).join('');
      return (
        `<table style="border-collapse: collapse; margin: 8px 0;">` +
        `<thead><tr><th style="${cell}">x</th>${head}</tr></thead>` +
        `<tbody><tr><td style="${cell}">y</td>${body}</tr></tbody>` +
        `</table>`
      );
    };

    // Three linear tables: constant first difference (>= 3 so the pattern reads
    // clearly and can never coincide with a doubling pattern).
    const startA = getRandomInt(6, 10);
    const diffA = getRandomInt(3, 5);
    const ysA = [0, 1, 2, 3].map(k => startA + k * diffA);

    const startB = getRandomInt(3, 6);
    const diffB = getRandomInt(3, 5);
    const ysB = [0, 1, 2, 3].map(k => startB + k * diffB);

    const startC = getRandomInt(6, 10);
    const diffC = getRandomInt(4, 7);
    const ysC = [0, 1, 2, 3].map(k => startC + k * diffC);

    // One nonlinear table: exponential doubling (constant ratio of 2).
    const startD = getRandomInt(3, 8);
    const ysD = [1, 2, 4, 8].map(m => startD * m);

    // Assemble the four data tables; exactly one (the exponential) is correct.
    const tables = [
      { ys: ysA, isCorrect: false },
      { ys: ysB, isCorrect: false },
      { ys: ysC, isCorrect: false },
      { ys: ysD, isCorrect: true }
    ];

    // Shuffle, then assign captions A-D by final position so each caption a
    // student reads lines up with its choice letter.
    const shuffledOptions = shuffle(tables).map((opt, index) => {
      const letter = String.fromCharCode(65 + index);
      return {
        ...opt,
        letter,
        text: `Table ${letter}<br/>${buildTable(`Table ${letter}`, opt.ys)}`
      };
    });

    const correctIndex = shuffledOptions.findIndex(o => o.isCorrect);
    const correctOption = shuffledOptions[correctIndex];
    const correctLetter = correctOption.letter;
    const dSeq = ysD.join(", ");

    return {
      questionText:
        "In which of the following tables is the relationship between the values of $x$ and their corresponding $y$-values nonlinear?",
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctIndex,
      explanation:
        `Choice ${correctLetter} is correct. A relationship is linear when the ` +
        `$y$-values change by a constant amount for each unit increase in $x$. ` +
        `In Table ${correctLetter} the $y$-values are ${dSeq}: each value is ` +
        `double the previous one (a constant ratio of 2, not a constant ` +
        `difference), so the relationship is exponential and therefore ` +
        `nonlinear. Every other table increases by the same fixed amount at ` +
        `each step, so those relationships are linear.`
    };
  }
};
