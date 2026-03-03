import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: a1696f3e
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4-8, xValue: 3-6, aValue: 5-15]
 * - Difficulty factors: [Solving for parameter in linear function]
 * - Distractor patterns: [calculation error, subtracting slope, sign error]
 * - Constraints: [None]
 * - Question type: [Find parameter→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_a1696f3e = {
  metadata: {
    // id: "a1696f3e",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(4, 8);

    const xValue = getRandomInt(3, 6);

    const aValue = getRandomInt(5, 15);

    const result = (slope * xValue) + aValue;

    const optionsData = [
      { text: (result - 1).toString(), isCorrect: false, reason: "results from a calculation error" },
      { text: (result - slope).toString(), isCorrect: false, reason: "subtracts the slope instead of solving correctly" },
      { text: aValue.toString(), isCorrect: true },
      { text: (-aValue).toString(), isCorrect: false, reason: "has a sign error" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $g$ is defined as $g(x)=${slope}x+a$, where $a$ is a constant. If $g(${xValue})=${result}$, what is the value of $a$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: aValue.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$: $g(${xValue}) = ${slope}(${xValue}) + a = ${slope * xValue} + a$. Setting this equal to ${result}: ${slope * xValue} + a = ${result}$, so $a = ${aValue}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 2ecce641
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 1-4, intercept: 15-25]
 * - Difficulty factors: [Reading y-intercept from graph]
 * - Constraints: [None]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Plot.OfX]
 */

