import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

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

export const generator_3462d850 = {
  metadata: {
    // id: "3462d850",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const speed = getRandomInt(40, 60);

    const time = getRandomInt(2, 4);

    const correctInterpretation = `Marisol drove at an average speed of about ${speed} miles per hour.`;

    const optionsData = [
      { text: `Marisol took ${speed} trips from City A to City B.`, isCorrect: false, reason: "confuses the rate with a count of trips" },
      { text: `The distance between City A and City B is ${speed} miles.`, isCorrect: false, reason: "confuses the rate with the total distance" },
      { text: correctInterpretation, isCorrect: true },
      { text: `It took Marisol ${speed} hours to drive from City A to City B.`, isCorrect: false, reason: "confuses the rate with the time" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Marisol drove ${time} hours from City A to City B. The equation below estimates the distance $d$, in miles, Marisol traveled after driving for $t$ hours. $d = ${speed}t$. Which of the following does ${speed} represent in the equation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctInterpretation,
      explanation: `Choice ${correctOption.letter} is correct. In the equation $d = ${speed}t$, the coefficient ${speed} represents the rate of change of distance with respect to time, which is ${speed} miles per hour. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: fe6f9678
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [intercept: 15-25]
 * - Difficulty factors: [Identifying constant function]
 * - Distractor patterns: [reciprocal constant, unitary constant, doubled constant]
 * - Constraints: [Slope is zero]
 * - Question type: [Find equation→Multiple Choice Text]
 * - Figure generation: null
 */

