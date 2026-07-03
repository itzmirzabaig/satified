import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 222
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-8, xValue: 3-10]
 * - Difficulty factors: [Finding y-intercept given function value]
 * - Distractor patterns: [arbitrary value, slope as b, xValue as b]
 * - Constraints: [b must be 0 for consistency with original SAT question]
 * - Question type: [Find parameter→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_222 = {
  metadata: {
    id: "222",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(2, 8);

    // xValue must differ from slope so the "slope-as-b" and "input-as-b"
    // distractors never collide (both lie in the overlapping range 3-8).
    let xValue = getRandomInt(3, 10);
    let tries = 0;
    while (xValue === slope && tries++ < 50) {
      xValue = getRandomInt(3, 10);
    }

    const targetValue = slope * xValue;

    const distractor1 = 1;

    const distractor2 = slope;

    const distractor3 = xValue;

    const optionsData = [
      { text: "0", isCorrect: true },
      { text: distractor1.toString(), isCorrect: false, reason: "is an arbitrary value with no mathematical basis" },
      { text: distractor2.toString(), isCorrect: false, reason: "confuses the slope with the y-intercept" },
      { text: distractor3.toString(), isCorrect: false, reason: "confuses the input value with the y-intercept" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For the linear function $f$, $f(x) = ${slope}x + b$, where $b$ is a constant and $f(${xValue}) = ${targetValue}$. What is the value of $b$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: "0",
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$ and ${targetValue} for $f(${xValue})$ in the equation gives ${targetValue} = ${slope}(${xValue}) + b$, which simplifies to ${targetValue} = ${targetValue} + b$. Subtracting ${targetValue} from both sides yields $b = 0$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
