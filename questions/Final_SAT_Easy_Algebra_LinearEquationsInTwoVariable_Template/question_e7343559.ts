import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: e7343559
 *
 * ORIGINAL ANALYSIS: [Table matching negative slope]
 */

export const generator_e7343559 = {
  metadata: {
    // id: "e7343559",
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
      { text: "Table A", code: createTable(yVals), isCorrect: true },
      { text: "Table B", code: createTable(xVals.map(x => -m * x + b)), isCorrect: false, reason: "positive slope" },
      { text: "Table C", code: createTable(xVals.map(x => b - x)), isCorrect: false, reason: "wrong slope magnitude" },
      { text: "Table D", code: createTable(xVals.map(x => m * x)), isCorrect: false, reason: "zero intercept" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Which table matches $y = ${m}x + ${b}$?`,
      figureCode: null,
      options: shuffled.map(o => o.code),
      correctAnswer: shuffled.find(o => o.isCorrect)!.code,
      explanation: `Choice ${correctLetter} is correct. $x=0 \\rightarrow y=${b}$ and $x=1 \\rightarrow y=${m+b}$.`
    };
  }
};

/**
 * Question ID: d1042cf8
 *
 * ORIGINAL ANALYSIS: [Cost equation with decimals]
 */