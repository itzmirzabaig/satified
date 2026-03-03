import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: 3ea87153
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cVal: 5-15, xSol: 2-8, target: xSol^2 + cVal]
 * - Difficulty factors: [Solving a basic quadratic equation for x]
 * - Distractor patterns: [Using root value, using x+1, using target y, using x squared]
 * - Constraints: [Only one solution in options]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_3ea87153 = {
  metadata: {
    // id: "3ea87153",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const cVal = getRandomInt(5, 15);

    const xSol = getRandomInt(2, 8);

    const target = xSol * xSol + cVal;

    const optionsData = [
      { text: `${xSol}`, isCorrect: true },
      { text: `${xSol + 1}`, isCorrect: false },
      { text: `${target}`, isCorrect: false },
      { text: `${xSol * xSol}`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The function $g$ is defined by $g(x)=x^2+${cVal}$. For which value of $x$ is $g(x)=${target}$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Setting $g(x)=${target}$ gives $x^2+${cVal}=${target}$. Subtracting ${cVal} gives $x^2=${target - cVal}$, so $x^2=${xSol * xSol}$. Taking the square root gives $x=\\pm${xSol}$. Since ${xSol} is one of the choices, it is correct.`
    };
  }
};

/**
 * Question ID: d46da42c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [k: 1-9]
 * - Difficulty factors: [Identifying the graph of a quadratic from its equation]
 * - Distractor patterns: [Wrong vertex, downward opening, wrong intercept]
 * - Constraints: [Parabola vertex at (0, k)]
 * - Question type: [Multiple Choice Figure]
 * - Figure generation: [Parabola plots]
 */

