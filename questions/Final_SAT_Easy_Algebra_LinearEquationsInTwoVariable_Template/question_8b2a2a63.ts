import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 8b2a2a63
 *
 * ORIGINAL ANALYSIS: [Y-intercept value extraction]
 * - Number ranges: [slope: -8 to -2, y-intercept: -50 to -10]
 * - Difficulty factors: [Reading y-intercept from slope-intercept form]
 * - Constraints: [Easy difficulty - single digit slope, 2-digit intercept, both negative]
 * - Question type: [Fill in the blank]
 */

export const generator_8b2a2a63 = {
  metadata: {
    // id: "8b2a2a63",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const m = -getRandomInt(2, 8);  // negative slope
    const b = -getRandomInt(10, 50); // negative y-intercept

    return {
      questionText: `The y-intercept of $y = ${m}x ${b < 0 ? b : `+ ${b}`}$ is $(0, y)$. What is $y$?`,
      figureCode: null,
      options: null,
      correctAnswer: b.toString(),
      explanation: `Set $x=0$ to find $y=${b}$.`
    };
  }
};

