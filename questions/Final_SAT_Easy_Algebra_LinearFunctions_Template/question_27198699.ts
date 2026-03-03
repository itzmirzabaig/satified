import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 27198699
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initialHeight: 25-45, rate: 0.10-0.25]
 * - Difficulty factors: [Interpreting y-intercept in context]
 * - Distractor patterns: [end height, rate of change, time to zero]
 * - Constraints: [None]
 * - Question type: [Interpretation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_27198699 = {
  metadata: {
    // id: "27198699",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initialHeight = getRandomInt(25, 45);

    const rate = (getRandomInt(10, 25) / 100);

    const optionA = `The estimated height, in cm, of the fluid at the start of the experiment`;

    const optionB = `The estimated height, in cm, of the fluid at the end of the experiment`;

    const optionC = `The estimated change in the height, in cm, of the fluid each day`;

    const optionD = `The estimated number of days for all the fluid to evaporate`;

    const optionsData = [
      { text: optionA, isCorrect: true },
      { text: optionB, isCorrect: false, reason: "the end height depends on when the experiment ends" },
      { text: optionC, isCorrect: false, reason: "describes the rate of change, not the initial value" },
      { text: optionD, isCorrect: false, reason: "would require solving for when height equals zero" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `As part of a science project on evaporation, Amaya measured the height of a liquid in a container over a period of time. The function $f(x) = ${initialHeight} - ${rate}x$ gives the estimated height, in centimeters (cm), of the liquid in the container $x$ days after the start of the experiment. Which of the following is the best interpretation of ${initialHeight} in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: optionA,
      explanation: `Choice ${correctOption.letter} is correct. In the function $f(x) = ${initialHeight} - ${rate}x$, the value ${initialHeight} is the y-intercept, which represents the height when $x = 0$ (the start of the experiment). Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: bf36c815
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: non-zero, intercept: 5-15]
 * - Difficulty factors: [Evaluating at zero - y-intercept]
 * - Distractor patterns: [sign error, input value, half value]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

