import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 187
 *
 * ORIGINAL ANALYSIS: [Y-intercept value extraction]
 * - Number ranges: [slope: -8 to -2, y-intercept: -50 to -10]
 * - Difficulty factors: [Reading y-intercept from slope-intercept form]
 * - Constraints: [Easy difficulty - single digit slope, 2-digit intercept, both negative]
 * - Question type: [Fill in the blank]
 */

export const generator_187 = {
  metadata: {
    id: "187",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const m = -getRandomInt(2, 8);  // negative slope
    const b = -getRandomInt(10, 50); // negative y-intercept

    return {
      questionText: `The graph of $y = ${m}x - ${-b}$ in the $xy$-plane has a $y$-intercept at $(0, b)$. What is the value of $b$?`,
      figureCode: null,
      options: [],
      correctAnswer: b.toString(),
      explanation: `The $y$-intercept of a graph is the point where $x = 0$. Substituting 0 for $x$ in the given equation yields $y = ${m}(0) - ${-b}$, or $y = ${b}$. So the $y$-intercept is $(0, ${b})$, and the value of $b$ is $${b}$.`
    };
  }
};

