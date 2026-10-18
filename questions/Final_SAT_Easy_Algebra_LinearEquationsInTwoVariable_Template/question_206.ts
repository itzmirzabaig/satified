import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 206
 *
 * ORIGINAL ANALYSIS: [Table matching negative slope]
 */

export const generator_206 = {
  metadata: {
    id: "206",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const m = -getRandomInt(2, 5);
    const b = getRandomInt(30, 60);
    const xVals = [0, 1, 2];
    const yVals = xVals.map(x => m * x + b);

    const createTable = (ys: number[]) => `<table style="border-collapse: collapse; background: transparent;"><tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">x</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">y</td></tr>${xVals.map((x, i) => `<tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">${x}</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">${ys[i]}</td></tr>`).join('')}</table>`;

    const optionsData = [
      { text: "Table A", code: createTable(yVals), isCorrect: true, reason: '' },
      { text: "Table B", code: createTable(xVals.map(x => -m * x + b)), isCorrect: false, reason: `its values of $y$ increase by ${-m} each time $x$ increases by 1, so it corresponds to a slope of ${-m}, not $${m}$` },
      { text: "Table C", code: createTable(xVals.map(x => b - x)), isCorrect: false, reason: `its values of $y$ decrease by 1 each time $x$ increases by 1, so it corresponds to a slope of $-1$, not $${m}$` },
      { text: "Table D", code: createTable(xVals.map(x => m * x)), isCorrect: false, reason: `its value of $y$ when $x = 0$ is 0, not ${b}` }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Which table gives three values of $x$ and their corresponding values of $y$ for the equation $y = ${m}x + ${b}$?`,
      figureCode: null,
      options: shuffled.map(o => o.code),
      correctAnswer: shuffled.find(o => o.isCorrect)!.code,
      explanation: `Choice ${correctLetter} is correct. Substituting $x = 0$, $x = 1$, and $x = 2$ into the given equation yields $y = ${b}$, $y = ${m + b}$, and $y = ${2 * m + b}$, respectively, which are the values in this table. ${shuffled.filter(o => !o.isCorrect).map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
