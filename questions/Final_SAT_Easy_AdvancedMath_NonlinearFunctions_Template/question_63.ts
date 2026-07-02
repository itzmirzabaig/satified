import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 63
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [num: 10-30, xVal: num +/- 5]
 * - Difficulty factors: [Evaluating a rational function at a point]
 * - Distractor patterns: [Flipped fraction, using numerator only, using x only]
 * - Constraints: [Evaluation results in a fraction]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_63 = {
  metadata: {
    id: "63",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const numeratorVal = getRandomInt(10, 30);

    const xVal = getRandomInt(numeratorVal - 5, numeratorVal + 5);

    const resStr = `\\frac{${numeratorVal}}{${xVal}}`;

    const optionsData = [
      { text: `$${resStr}$`, isCorrect: true },
      { text: `$\\frac{${xVal}}{${numeratorVal}}$`, isCorrect: false },
      { text: `$${numeratorVal}$`, isCorrect: false },
      { text: `$${xVal}$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The function $f$ is defined by $f(x)=\\frac{${numeratorVal}}{x}$. What is the value of $f(x)$ when $x=${xVal}$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xVal} for $x$ in $f(x)=\\frac{${numeratorVal}}{x}$ gives $f(${xVal})=\\frac{${numeratorVal}}{${xVal}}$.`
    };
  }
};
