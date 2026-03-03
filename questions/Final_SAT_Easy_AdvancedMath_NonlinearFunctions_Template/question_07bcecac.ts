import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 07bcecac
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [yearsAfter: 5-15, population: 20-40, baseYear: 1980-2000]
 * - Difficulty factors: [Function notation interpretation in a real-world context]
 * - Distractor patterns: [Misinterpreting t=0, swapping input/output]
 * - Constraints: [Population must be realistic]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_07bcecac = {
  metadata: {
    // id: "07bcecac",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const yearsAfter = getRandomInt(5, 15);
    const populationNum = Math.random() * 20 + 20;
    const population = Math.round(populationNum * 100) / 100;
    const populationStr = population.toFixed(2);
    const baseYear = getRandomInt(1980, 2000);

    const optionsData = [
      { text: `${yearsAfter} years after ${baseYear}, the predicted population of this country was approximately ${populationStr} million.`, isCorrect: true },
      { text: `In ${baseYear}, the predicted population of this country was approximately ${populationStr} million.`, isCorrect: false, reason: "misinterprets t=0" },
      { text: `In ${baseYear}, the predicted population of this country was approximately ${yearsAfter} million.`, isCorrect: false, reason: "swaps input and output" },
      { text: `${populationStr} years after ${baseYear}, the predicted population of this country was approximately ${yearsAfter} million.`, isCorrect: false, reason: "swaps input and output" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The function $P$ gives the predicted population, in millions, of a certain country where $t$ is the number of years after ${baseYear}. What is the best interpretation of the statement $P(${yearsAfter}) \\approx ${populationStr}$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. In function notation $P(t) = y$, $t$ is the input and $y$ is the output. Here, $t=${yearsAfter}$ represents the years after ${baseYear}, and $P(${yearsAfter})=${populationStr}$ represents the population in millions.`
    };
  }
};