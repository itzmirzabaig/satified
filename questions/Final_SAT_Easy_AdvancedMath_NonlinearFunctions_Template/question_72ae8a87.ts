import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: 72ae8a87
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 100000-300000, rate: 1.15-1.25, year: 4-8]
 * - Difficulty factors: [Interpreting function notation P(t) = y in an exponential context]
 * - Distractor patterns: [Increase interpretation, multiplicative interpretation, percent interpretation]
 * - Constraints: [Context is annual revenue]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_72ae8a87 = {
  metadata: {
    // id: "72ae8a87",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initial = getRandomInt(100, 300) * 1000;

    const rate = (Math.random() * 0.1 + 1.15).toFixed(2);

    const year = getRandomInt(4, 8);

    const value = Math.floor(initial * Math.pow(parseFloat(rate), year));

    const optionsData = [
      { text: `${year} years after the company started selling light bulbs online, its predicted annual revenue is approximately ${value.toLocaleString()} dollars.`, isCorrect: true },
      { text: `${year} years after the company started selling light bulbs online, its predicted annual revenue will have increased by a total of approximately ${value.toLocaleString()} dollars.`, isCorrect: false },
      { text: `When the company's predicted annual revenue is approximately ${value.toLocaleString()} dollars, it is ${year} times the predicted annual revenue for the previous year.`, isCorrect: false },
      { text: `When the company's predicted annual revenue is approximately ${value.toLocaleString()} dollars, it is ${year}% greater than the predicted annual revenue for the previous year.`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The function $f(x)=${initial.toLocaleString()}(${rate})^{x}$ gives a company's predicted annual revenue, in dollars, $x$ years after the company started selling light bulbs online, where $0 < x < 10$. What is the best interpretation of the statement "$f(${year})$ is approximately equal to ${value.toLocaleString()}$"?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. $f(${year})$ represents the revenue at $x=${year}$ years. The statement means that ${year} years after the start, the predicted annual revenue is approximately ${value.toLocaleString()} dollars.`
    };
  }
};

/**
 * Question ID: 2269899c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [c: 4-8, base: 4-10]
 * - Difficulty factors: [Substituting and evaluating square root functions]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [x must be a perfect square]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

