import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: aad7e1b9
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [intercept: 2-5 negative]
 * - Difficulty factors: [Finding y-intercept from equation]
 * - Distractor patterns: [x-intercept, slope as intercept]
 * - Constraints: [None]
 * - Question type: [Find intercept→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_aad7e1b9 = {
  metadata: {
    // id: "aad7e1b9",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const numerator = getRandomInt(1, 3);

    const denominator = getRandomInt(5, 15);

    const intercept = -getRandomInt(2, 5);

    const optionsData = [
      { text: `(${intercept}, 0)`, isCorrect: false, reason: "is the x-intercept, not the y-intercept" },
      { text: `(0, ${intercept})`, isCorrect: true },
      { text: `(0, \\frac{1}{${denominator}})`, isCorrect: false, reason: "uses the reciprocal of the denominator" },
      { text: `(\\frac{1}{${denominator}}, 0)`, isCorrect: false, reason: "uses the reciprocal as an x-coordinate" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x) = \\frac{${numerator}}{${denominator}}x - ${Math.abs(intercept)}$. What is the $y$-intercept of the graph of $y = f(x)$ in the $xy$-plane?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `(0, ${intercept})`,
      explanation: `Choice ${correctOption.letter} is correct. The $y$-intercept occurs when $x=0$, so $f(0) = \\frac{${numerator}}{${denominator}}(0) - ${Math.abs(intercept)} = ${intercept}$. The $y$-intercept is $(0, ${intercept})$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 6efcc0a3
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [intercept: 35-50]
 * - Difficulty factors: [Constructing equation from two points]
 * - Distractor patterns: [omitted intercept, intercept as slope, constant function]
 * - Constraints: [Slope is -1]
 * - Question type: [Find equation→Multiple Choice Text]
 * - Figure generation: null
 */

