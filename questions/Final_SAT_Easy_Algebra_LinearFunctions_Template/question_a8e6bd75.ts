import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: a8e6bd75
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-4, intercept: 3-8 negative]
 * - Difficulty factors: [Identifying graph from equation]
 * - Distractor patterns: [sign of slope/intercept variations]
 * - Constraints: [Ensure negative intercept]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_a8e6bd75 = {
  metadata: {
    // id: "a8e6bd75",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(2, 4);

    const intercept = -getRandomInt(3, 8);

    const correctDescription = `A line with positive slope and negative y-intercept`;

    const optionsData = [
      { text: "A line with positive slope and positive y-intercept", isCorrect: false },
      { text: "A line with negative slope and positive y-intercept", isCorrect: false },
      { text: correctDescription, isCorrect: true },
      { text: "A line with negative slope and negative y-intercept", isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `Which of the following describes the graph of the equation $y=${slope}x - ${Math.abs(intercept)}$ in the $xy$-plane?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctDescription,
      explanation: `Choice ${correctOption.letter} is correct. The equation $y=${slope}x - ${Math.abs(intercept)}$ is in slope-intercept form $y=mx+b$, with slope $m=${slope}$ (positive) and y-intercept $b=${intercept}$ (negative).`
    };
  }
};

/**
 * Question ID: 3f5375d9
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 1-4, intercept: 2-5]
 * - Difficulty factors: [Calculating slope from graph]
 * - Distractor patterns: [miscalculation, y-intercept as slope, total cost for one mile]
 * - Constraints: [None]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 */

