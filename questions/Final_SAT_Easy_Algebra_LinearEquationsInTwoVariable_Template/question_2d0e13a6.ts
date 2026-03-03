import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2d0e13a6
 *
 * ORIGINAL ANALYSIS: [Parallel slope fraction value]
 */

export const generator_2d0e13a6 = {
  metadata: {
    // id: "2d0e13a6",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const m = "1/4";

    return {
      questionText: `Line $k$ is $y = \\frac{1}{4}x + 1$. Line $j$ is parallel. What is the slope of $j$?`,
      figureCode: null,
      options: null,
      correctAnswer: "1/4",
      explanation: `Parallel lines have equal slopes. Since $k$ has slope $1/4$, $j$ does too.`
    };
  }
};

/**
 * Question ID: c8e0f511
 *
 * ORIGINAL ANALYSIS: [Water bottle mixture equation]
 */