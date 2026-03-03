import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: cee5b352
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [growthRate: 4.8, initialLength: 140-180]
 * - Difficulty factors: [Modeling growth]
 * - Distractor patterns: [no intercept, length as slope, growth as intercept]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_cee5b352 = {
  metadata: {
    // id: "cee5b352",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const growthRate = (getRandomInt(4, 6) + 0.8).toFixed(1);

    const initialLength = getRandomInt(140, 180);

    const correctEquation = `y = ${growthRate}x + ${initialLength}`;

    const distractorA = `y = ${initialLength}x`;

    const distractorB = `y = ${initialLength}x + ${initialLength}`;

    const distractorC = `y = ${growthRate}x + ${growthRate}`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "uses initial length as slope with no intercept" },
      { text: distractorB, isCorrect: false, reason: "incorrectly uses initial length as both slope and intercept" },
      { text: distractorC, isCorrect: false, reason: "uses growth rate as both slope and intercept" },
      { text: correctEquation, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The length, $y$, of a white whale was ${initialLength} centimeters (cm) when it was born and increased an average of ${growthRate} cm per month for the first 12 months after it was born. Which equation best represents this situation, where $x$ is the number of months after the whale was born and $y$ is the length, in cm, of the whale?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. The initial length is ${initialLength} cm and it grows at ${growthRate} cm per month, giving $y = ${growthRate}x + ${initialLength}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

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

