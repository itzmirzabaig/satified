import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 183
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 1-3, intercept: 1-6]
 * - Difficulty factors: [Verifying table values against equation]
 * - Question type: [Table Matching → Multiple Choice with Tables]
 */

export const generator_183 = {
  metadata: {
    id: "183",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(1, 3);
    const intercept = getRandomInt(1, 6);
    const xVals = [0, 1, 2];

    // Correct: y = slope*x + intercept.
    const yValsCorrect = xVals.map(x => slope * x + intercept);
    // D1: negative slope, same intercept → a decreasing relationship.
    const yValsD1 = xVals.map(x => -slope * x + intercept);
    // D2: correct slope but the y-intercept shifted up by 2.
    const yValsD2 = xVals.map(x => slope * x + (intercept + 2));
    // D3: a steeper slope (slope+1) with the same intercept.
    const yValsD3 = xVals.map(x => (slope + 1) * x + intercept);
    // These four value-triples are provably distinct for every slope in [1,3]
    // and intercept in [1,6]: D1 differs from Correct in the x=1 cell by
    // 2*slope (>=2); D2 differs everywhere by 2; D3 differs from Correct in
    // the x=1 cell by 1; and no two distractors coincide over the range.

    const createTable = (yValues: number[]) => `<table style="border-collapse: collapse; background: transparent;"><tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">x</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">y</td></tr>${xVals.map((x, i) => `<tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">${x}</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">${yValues[i]}</td></tr>`).join('')}</table>`;

    const optionsData = [
      { text: "Table A", tableCode: createTable(yValsCorrect), isCorrect: true },
      { text: "Table B", tableCode: createTable(yValsD1), isCorrect: false, reason: "shows a decreasing relationship" },
      { text: "Table C", tableCode: createTable(yValsD2), isCorrect: false, reason: "has an incorrect y-intercept" },
      { text: "Table D", tableCode: createTable(yValsD3), isCorrect: false, reason: "uses an incorrect slope" }
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
      explanation: `Choice ${correctLetter} is correct. Substituting $x=0$ yields $y=${intercept}$. Substituting $x=1$ yields $y=${slope + intercept}$, and substituting $x=2$ yields $y=${2 * slope + intercept}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.`
    };
  }
};
