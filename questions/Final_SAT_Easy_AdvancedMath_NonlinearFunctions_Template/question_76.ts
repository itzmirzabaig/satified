import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 76
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cVal: 5-20, xVal: 2-5]
 * - Difficulty factors: [Evaluation of a cubic function with substitution]
 * - Distractor patterns: [Multiplicative error, squared error, result plus one]
 * - Constraints: [Evaluation results in integer]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_76 = {
  metadata: {
    id: "76",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const cVal = getRandomInt(5, 20);

    const xVal = getRandomInt(2, 5);

    const result = Math.pow(xVal, 3) + cVal;

    const optionsData = [
      { text: `$${result}$`, isCorrect: true },
      { text: `$${3 * xVal + cVal}$`, isCorrect: false },
      { text: `$${Math.pow(xVal, 2) + cVal}$`, isCorrect: false },
      { text: `$${result + 1}$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The function $f$ is defined by $f(x) = x^3 + ${cVal}$. What is the value of $f(${xVal})$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Substituting $${xVal}$ for $x$ in $f(x)=x^3+${cVal}$ yields $f(${xVal})=(${xVal})^3+${cVal}=${Math.pow(xVal, 3)}+${cVal}=${result}$.`
    };
  }
};
