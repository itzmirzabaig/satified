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
      { text: `The estimated height, in cm, of the fluid at the end of the experiment`, isCorrect: false, reason: "the end height depends on the duration" },
      { text: `The estimated change in the height, in cm, of the fluid each day`, isCorrect: false, reason: "describes the slope, not the intercept" },
      { text: `The estimated number of days for all the fluid to evaporate`, isCorrect: false, reason: "requires solving for x when f(x)=0" }
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
      explanation: `Choice ${correctOption.letter} is correct. In $f(x)=${initialHeight}-${rate}x$, the value ${initialHeight} is the y-intercept, representing the height when $x=0$ (the start of the experiment). Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
