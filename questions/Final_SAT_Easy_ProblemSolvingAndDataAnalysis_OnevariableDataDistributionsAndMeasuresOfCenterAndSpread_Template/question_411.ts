import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 411
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [data values: 4, 8, 13 with frequencies 4, 3, 2]
 * - Difficulty factors: [Creating frequency table from raw data]
 * - Distractor patterns: [B=swapped values, C=multiplied, D=completely wrong]
 * - Constraints: [Frequencies must sum to 9]
 * - Question type: [Raw Data→Frequency Table Selection]
 * - Figure generation: [HTML tables for options]
 *
 * FIXED (tables not visible in options):
 * - The option renderer injects only each option's `text` as HTML; it ignores
 *   `figureCode` on options (same pipeline fact established in Question 85).
 *   The tables lived in figureCode, so every option rendered only its text
 *   label. The table HTML now goes in `text`, with correctAnswer set to the
 *   correct option's text — the validated Q85 pattern.
 * - Dropped the "Table A"–"Table D" labels: the platform assigns A–D by
 *   position after the shuffle, so a fixed "Table A" label could sit under
 *   letter C and mismatch the explanation's letter. The tables themselves are
 *   the option content.
 * - Tables restyled to the house table style (currentColor borders, compact,
 *   centered) so they render on both light and dark themes.
 * - Generation logic untouched: same ranges, data, and distractor tables.
 */

export const generator_411 = {
  metadata: {
    id: "411",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const val1 = getRandomInt(2, 6);
    const val2 = val1 + getRandomInt(3, 6);
    const val3 = val2 + getRandomInt(4, 8);

    const freq1 = getRandomInt(3, 6);
    const freq2 = getRandomInt(2, 5);
    const freq3 = getRandomInt(1, 4);

    const rawData = [
      ...Array(freq1).fill(val1),
      ...Array(freq2).fill(val2),
      ...Array(freq3).fill(val3)
    ];

    // House-style table: currentColor adapts to theme; compact for option rows.
    const cell = 'style="border:1px solid currentColor;padding:3px 10px;text-align:center;"';
    const head = 'style="border:1px solid currentColor;padding:3px 10px;text-align:center;font-style:italic;"';

    const createTable = (v1: number, f1: number, v2: number, f2: number, v3: number, f3: number) =>
      `<div style="width:100%;max-width:200px;margin:6px auto;"><table style="width:100%;border-collapse:collapse;font-size:14px;">` +
      `<tr><th ${head}>Number</th><th ${head}>Frequency</th></tr>` +
      `<tr><td ${cell}>${v1}</td><td ${cell}>${f1}</td></tr>` +
      `<tr><td ${cell}>${v2}</td><td ${cell}>${f2}</td></tr>` +
      `<tr><td ${cell}>${v3}</td><td ${cell}>${f3}</td></tr>` +
      `</table></div>`;

    const tableA = createTable(val1, freq1, val2, freq2, val3, freq3);
    const tableB = createTable(freq1, val1, freq2, val2, freq3, val3);
    const tableC = createTable(val1 * freq1, val1, val2 * freq2, val2, val3 * freq3, val3);
    const tableD = createTable(val1 * 4, freq1 * 2, val2 * 3, freq2 * 3, val3 * 2, freq3 * 4);

    const optionsData = [
      { text: tableA, isCorrect: true },
      { text: tableB, isCorrect: false },
      { text: tableC, isCorrect: false },
      { text: tableD, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `Which frequency table correctly represents the data listed?\n\n${rawData.join(', ')}`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. In the data listed, ${val1} occurs ${freq1} times, ${val2} occurs ${freq2} times, and ${val3} occurs ${freq3} times. This matches the frequency table in option ${correctOption.letter}.`
    };
  }
};