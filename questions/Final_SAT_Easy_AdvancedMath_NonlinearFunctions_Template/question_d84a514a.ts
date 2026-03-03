import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: d84a514a
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 100000-300000, growthRate: 1.15-1.25, years: 3-8]
 * - Difficulty factors: [Interpreting exponential function notation in a revenue context]
 * - Distractor patterns: [Total increase interpretation, multiplicative factor, percentage interpretation]
 * - Constraints: [Evaluation results in realistic revenue]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_d84a514a = {
  metadata: {
    // id: "d84a514a",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initial = getRandomInt(2, 6) * 50000;
    const growthRate = getRandomInt(115, 125) / 100;
    const years = getRandomInt(3, 8);
    const finalVal = Math.round(initial * Math.pow(growthRate, years));

    const optionsData = [
      { text: `${years} years after the company started selling jewelry online, its predicted annual revenue is approximately ${finalVal.toLocaleString()} dollars.`, isCorrect: true },
      { text: `${years} years after the company started selling jewelry online, its predicted annual revenue will have increased by a total of approximately ${finalVal.toLocaleString()} dollars.`, isCorrect: false },
      { text: `When the company's predicted annual revenue is approximately ${finalVal.toLocaleString()} dollars, it is ${years} times the predicted annual revenue for the previous year.`, isCorrect: false },
      { text: `When the company's predicted annual revenue is approximately ${finalVal.toLocaleString()} dollars, it is ${years}% greater than the predicted annual revenue for the previous year.`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The function $f(x)=${initial.toLocaleString()}(${growthRate.toFixed(2)})^{x}$ gives a company's predicted annual revenue, in dollars, $x$ years after the company started selling jewelry online, where $0 < x < 10$. What is the best interpretation of the statement $f(${years}) \\approx ${finalVal.toLocaleString()}$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. $f(${years})$ gives the revenue when $x=${years}$. Therefore, the value represents the predicted annual revenue ${years} years after the company started selling jewelry online.`
    };
  }
};

/**
 * Question ID: ebe4bde0
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [vertexX: 500-1500, vertexY: 8000-15000]
 * - Difficulty factors: [Identifying the x-coordinate of the vertex in context]
 * - Distractor patterns: [Vertex y-coordinate, lowest table x-coordinate, unrelated x-coordinate]
 * - Constraints: [Function is a downward-opening parabola]
 * - Question type: [Figure+Table→Multiple Choice Text]
 * - Figure generation: [Parabola plot and HTML Table]
 */