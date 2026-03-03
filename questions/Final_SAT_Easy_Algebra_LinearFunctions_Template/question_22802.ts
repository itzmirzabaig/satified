import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 22802
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rate: 10-25]
 * - Difficulty factors: [Interpreting linear model coefficient]
 * - Distractor patterns: [total distance, distance formula, reciprocal rate]
 * - Constraints: [None]
 * - Question type: [Interpretation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_22802 = {
  metadata: {
    // id: "22802",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const rate = getRandomInt(10, 25);

    const optionA = `The object moved a total of $${rate}$ inches.`;

    const optionB = `The object moved a total of $${rate}t$ inches.`;

    const optionC = `The object is moving at a rate of $${rate}$ inches per second.`;

    const optionD = `The object is moving at a rate of $\\frac{1}{${rate}}$ inches per second.`;

    const optionsData = [
      { text: optionA, isCorrect: false, reason: "confuses the rate with a total distance" },
      { text: optionB, isCorrect: false, reason: "describes the total distance formula" },
      { text: optionC, isCorrect: true },
      { text: optionD, isCorrect: false, reason: "uses the reciprocal of the correct rate" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The equation $d = ${rate}t$ represents the distance $d$, in inches, where $t$ represents the number of seconds since an object started moving. Which of the following is the best interpretation of $${rate}$ in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: optionC,
      explanation: `Choice ${correctOption.letter} is correct. In the equation $d = ${rate}t$, the coefficient $${rate}$ represents the rate of change of distance with respect to time, which is $${rate}$ inches per second. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 0b332f00
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeff: 4-12, ans: 5-15]
 * - Difficulty factors: [Solving for input given output]
 * - Constraints: [Clean division]
 * - Question type: [Solve for x→Fill in blank]
 * - Figure generation: null
 */

