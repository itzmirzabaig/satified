import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 246
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [intercept: 35-50]
 * - Difficulty factors: [Constructing equation from two points]
 * - Distractor patterns: [omitted intercept, intercept as slope, constant function]
 * - Constraints: [Slope is -1]
 * - Question type: [Find equation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_246 = {
  metadata: {
    id: "246",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const intercept = getRandomInt(35, 50);

    const correctEquation = `h(x) = -x + ${intercept}`;

    const distractorB = `h(x) = -x`;

    const distractorC = `h(x) = -${intercept}x`;

    const distractorD = `h(x) = -${intercept}`;

    const optionsData = [
      { text: correctEquation, isCorrect: true },
      { text: distractorB, isCorrect: false, reason: "omits the y-intercept" },
      { text: distractorC, isCorrect: false, reason: "uses the intercept as the slope" },
      { text: distractorD, isCorrect: false, reason: "creates a constant function with an incorrect value" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the linear function $h$, $h(0) = ${intercept}$ and $h(1) = ${intercept - 1}$. Which equation defines $h$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. The slope is $\\frac{${intercept - 1} - ${intercept}}{1 - 0} = -1$ and the y-intercept is ${intercept}, giving $h(x) = -x + ${intercept}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
