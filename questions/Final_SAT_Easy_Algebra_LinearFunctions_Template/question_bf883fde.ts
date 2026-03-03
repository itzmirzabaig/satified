import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: bf883fde
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, intercept: 5-12 negative]
 * - Difficulty factors: [Constructing equation from m and b]
 * - Distractor patterns: [omitted intercept, incorrect intercept]
 * - Constraints: [None]
 * - Question type: [Find equation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_bf883fde = {
  metadata: {
    // id: "bf883fde",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(2, 5);

    const intercept = -getRandomInt(5, 12);

    const correctEquation = `f(x) = ${slope}x - ${Math.abs(intercept)}`;

    const distractorA = `f(x) = ${slope}x`;

    const distractorC = `f(x) = ${slope}x + ${intercept + 5}`;

    const distractorD = `f(x) = ${slope}x + ${intercept + slope}`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "omits the y-intercept" },
      { text: correctEquation, isCorrect: true },
      { text: distractorC, isCorrect: false, reason: "uses an incorrect y-intercept" },
      { text: distractorD, isCorrect: false, reason: "uses an incorrect y-intercept" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For the function $f$, the graph of $y = f(x)$ in the $xy$-plane has a slope of $${slope}$ and passes through the point $(0, ${intercept})$. Which equation defines $f$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. Using slope-intercept form with slope $m=${slope}$ and y-intercept $b=${intercept}$ gives $f(x) = ${slope}x - ${Math.abs(intercept)}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 3462d850
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [speed: 40-60, time: 2-4]
 * - Difficulty factors: [Interpreting slope as rate]
 * - Distractor patterns: [count of trips, total distance, time interpretation]
 * - Constraints: [None]
 * - Question type: [Interpretation→Multiple Choice Text]
 * - Figure generation: null
 */

