import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 920
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [5 numbers, sum and mean relationship]
 * - Difficulty factors: [Understanding mean as fraction of sum]
 * - Distractor patterns: [1/4, 1/6, 5/1 as distractors]
 * - Constraints: [Mean = Sum / n, so Mean/Sum = 1/n]
 * - Question type: [Text→Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_920 = {
  metadata: {
    id: "920",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate 5 numbers. The answer (1/n) does not depend on their
    // values — that invariance is exactly the concept being tested.
    const numbers = [
      getRandomInt(1, 5),
      getRandomInt(5, 15),
      getRandomInt(1, 5),
      getRandomInt(3, 10),
      getRandomInt(3, 10)
    ];

    const n = numbers.length;                          // always 5
    const sum = numbers.reduce((a, b) => a + b, 0);    // 13..45
    const mean = sum / n;                              // exact 1-decimal (den = 5)

    // Fill-in answer: plain a/b fraction (grader normalizes 1/5 and 0.2 alike).
    const answer = `1/${n}`;

    return {
      questionText: `The mean of the list of numbers ${numbers.join(', ')} is what fraction of the sum of the five numbers? (Enter your answer as a fraction or a decimal.)`,
      figureCode: null,
      options: [],
      correctAnswer: answer,
      explanation: `The correct answer is $\\frac{1}{${n}}$. The mean of a list is the sum of the values divided by how many values there are. Here the sum is ${sum} and there are ${n} numbers, so the mean is $\\frac{${sum}}{${n}} = ${mean}$. Comparing the mean to the sum gives $\\frac{${mean}}{${sum}} = \\frac{1}{${n}}$. In general the mean equals the sum divided by ${n}, so the mean is always $\\frac{1}{${n}}$ of the sum.`
    };
  }
};
