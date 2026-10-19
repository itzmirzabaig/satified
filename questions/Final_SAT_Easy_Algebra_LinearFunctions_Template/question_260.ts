import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 260
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initialHeight: 30-50, rate: decimal 0.10-0.25]
 * - Difficulty factors: [Interpreting y-intercept]
 * - Distractor patterns: [end height, rate of change, time to evaporate]
 * - Constraints: [None]
 * - Question type: [Interpretation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_260 = {
  metadata: {
    id: "260",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initialHeight = getRandomInt(30, 50);

    const rate = (getRandomInt(10, 25) / 100);

    const optionA = `The estimated height, in cm, of the fluid at the start of the experiment`;

    const optionsData = [
      { text: optionA, isCorrect: true },
      { text: `The estimated height, in cm, of the fluid at the end of the experiment`, isCorrect: false, reason: `the height at the end of the experiment is the value of $f(x)$ on the last day, which would be less than ${initialHeight} because the height decreases each day` },
      { text: `The estimated change in the height, in cm, of the fluid each day`, isCorrect: false, reason: `the change in the height each day is given by the coefficient of $x$, $-${rate}$, not by ${initialHeight}` },
      { text: `The estimated number of days for all the fluid to evaporate`, isCorrect: false, reason: `the number of days for all the fluid to evaporate is the value of $x$ for which $f(x) = 0$, not ${initialHeight}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In science class, a student conducted an experiment to learn about evaporation. The student measured the height of fluid in a beaker over a period of time. The function $f(x)=${initialHeight}-${rate}x$ gives the estimated height, in centimeters (cm), of the fluid in the beaker $x$ days after the start of the experiment. Which of the following is the best interpretation of ${initialHeight} in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: optionA,
      explanation: `Choice ${correctOption.letter} is correct. Substituting 0 for $x$ in the given function yields $f(0) = ${initialHeight} - ${rate}(0)$, or $f(0) = ${initialHeight}$. Since $x = 0$ is the start of the experiment, ${initialHeight} is the estimated height, in cm, of the fluid at the start of the experiment. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
