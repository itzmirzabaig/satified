import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 52f9a246
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [data values: 4, 8, 13 with frequencies 4, 3, 2]
 * - Difficulty factors: [Creating frequency table from raw data]
 * - Distractor patterns: [B=swapped values, C=multiplied, D=completely wrong]
 * - Constraints: [Frequencies must sum to 9]
 * - Question type: [Raw Data→Frequency Table Selection]
 * - Figure generation: [HTML tables for options]
 */

export const generator_52f9a246 = {
  metadata: {
    // id: "52f9a246",
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

    const tableStyle = `style="border-collapse: collapse; margin: 10px;"`;
    const cellStyle = `style="border: 1px solid #ccc; padding: 6px;"`;

    const createTable = (v1: number, f1: number, v2: number, f2: number, v3: number, f3: number) => `
      <table ${tableStyle}>
        <tr><th ${cellStyle}>Number</th><th ${cellStyle}>Frequency</th></tr>
        <tr><td ${cellStyle}>${v1}</td><td ${cellStyle}>${f1}</td></tr>
        <tr><td ${cellStyle}>${v2}</td><td ${cellStyle}>${f2}</td></tr>
        <tr><td ${cellStyle}>${v3}</td><td ${cellStyle}>${f3}</td></tr>
      </table>
    `;

    const tableA = createTable(val1, freq1, val2, freq2, val3, freq3);
    const tableB = createTable(freq1, val1, freq2, val2, freq3, val3);
    const tableC = createTable(val1 * freq1, val1, val2 * freq2, val2, val3 * freq3, val3);
    const tableD = createTable(val1 * 4, freq1 * 2, val2 * 3, freq2 * 3, val3 * 2, freq3 * 4);

    const optionsData = [
      { text: "Table A", figureCode: tableA, isCorrect: true },
      { text: "Table B", figureCode: tableB, isCorrect: false },
      { text: "Table C", figureCode: tableC, isCorrect: false },
      { text: "Table D", figureCode: tableD, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `Which frequency table correctly represents the data listed?\n\n${rawData.join(', ')}`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text, figureCode: o.figureCode })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. In the data listed, ${val1} occurs ${freq1} times, ${val2} occurs ${freq2} times, and ${val3} occurs ${freq3} times. This matches the frequency table in option ${correctOption.letter}.`
    };
  }
};

/**
 * Question ID: 15d87c0f
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [values: 30-50 range]
 * - Difficulty factors: [Reading bar graph, subtraction]
 * - Distractor patterns: [30=chess value alone, 40=drama alone, 70=sum]
 * - Constraints: [Two distinct categories with 10-difference]
 * - Question type: [Bar Graph→Multiple Choice Text]
 * - Figure generation: [Mafs bar chart]
 */