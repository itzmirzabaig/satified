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

    const cube = Math.pow(xVal, 3);
    const result = cube + cVal;

    // Distractors: multiplying by the exponent instead of cubing (3x + c),
    // squaring instead of cubing (x^2 + c), and an off-by-one slip (result + 1).
    // 3x equals x^2 exactly when x = 3, so use 2x + c in that case; for every
    // x in [2, 5] the four values are then pairwise distinct.
    const squareErr = xVal * xVal + cVal;
    let multiplyErr = 3 * xVal + cVal;
    if (multiplyErr === squareErr) multiplyErr = 2 * xVal + cVal;

    const optionsData = [
      { text: `$${result}$`, isCorrect: true },
      { text: `$${multiplyErr}$`, isCorrect: false },
      { text: `$${squareErr}$`, isCorrect: false },
      { text: `$${result + 1}$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The function $f$ is defined by $f(x) = x^3 + ${cVal}$. What is the value of $f(${xVal})$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The value of $f(${xVal})$ is found by substituting $x=${xVal}$ into $f(x)=x^3+${cVal}$, which gives $f(${xVal})=(${xVal})^3+${cVal}=${cube}+${cVal}=${result}$. The other choices result from common errors, such as multiplying $x$ by the exponent instead of cubing, squaring instead of cubing, or making a small arithmetic mistake.`
    };
  }
};
