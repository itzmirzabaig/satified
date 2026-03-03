import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 83f2c3bf
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 1-3, intercept: 1-6]
 * - Difficulty factors: [Verifying table values against equation]
 * - Question type: [Table Matching → Multiple Choice with Tables]
 */

export const generator_83f2c3bf = {
  metadata: {
    // id: "83f2c3bf",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(1, 3);
    const intercept = getRandomInt(1, 6);
    const xVals = [0, 1, 2];

    const yValsCorrect = xVals.map(x => slope * x + intercept);
    const yValsD1 = xVals.map(x => -slope * x + (intercept + 2));
    const yValsD2 = xVals.map(x => slope * x + (intercept - 2));

    const createTable = (yValues: number[]) => `<table style="border-collapse: collapse; background: transparent;"><tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">x</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">y</td></tr>${xVals.map((x, i) => `<tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">${x}</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">${yValues[i]}</td></tr>`).join('')}</table>`;

    const optionsData = [
      { text: "Table A", tableCode: createTable(yValsCorrect), isCorrect: true },
      { text: "Table B", tableCode: createTable(yValsD1), isCorrect: false, reason: "shows a decreasing relationship" },
      { text: "Table C", tableCode: createTable(yValsD2), isCorrect: false, reason: "has an incorrect y-intercept" },
      { text: "Table D", tableCode: createTable(xVals.map((x, i) => i * slope)), isCorrect: false, reason: "does not match the equation values" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Which table gives three values of $x$ and their corresponding values of $y$ for the given equation $y = ${slope === 1 ? '' : slope}x + ${intercept}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.tableCode),
      correctAnswer: shuffledOptions.find(o => o.isCorrect)!.tableCode,
      explanation: `Choice ${correctLetter} is correct. Substituting $x=0$ yields $y=${intercept}$. Substituting $x=1$ yields $y=${slope + intercept}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.`
    };
  }
};

/**
 * Question ID: 9f848c96
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentages: 2-5, 90-98, final: 5-15, total: 20-50]
 * - Difficulty factors: [Converting percentages to decimals, setting up mixture equation]
 * - Question type: [Word Problem → Multiple Choice Text]
 */