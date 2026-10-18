import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 235
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [speed: 40-60, time: 2-4]
 * - Difficulty factors: [Interpreting slope as rate]
 * - Distractor patterns: [count of trips, total distance, time interpretation]
 * - Constraints: [None]
 * - Question type: [Interpretation→Multiple Choice Text]
 * - Figure generation: null
 *
 * FIXED:
 * - Removed the personal name; use generic role "a driver" + pronoun "they".
 * - Distractors are four distinct interpretation sentences (rate / trips /
 *   distance / time), so no two options can ever collide for any draw.
 */

export const generator_235 = {
  metadata: {
    id: "235",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const speed = getRandomInt(40, 60);

    const correctInterpretation = `The driver traveled at an average speed of about ${speed} miles per hour.`;

    const optionsData = [
      { text: `The driver took ${speed} trips from City A to City B.`, isCorrect: false, reason: `nothing in the equation counts trips; $d$ is a distance in miles and $t$ is a time in hours, so ${speed} is the number of miles traveled per hour` },
      { text: `The distance between City A and City B is ${speed} miles.`, isCorrect: false, reason: `${speed} is the distance traveled in 1 hour, since $d = ${speed}$ when $t = 1$; the distance between the cities is the value of $d$ at the end of the trip, which is not given` },
      { text: correctInterpretation, isCorrect: true, reason: '' },
      { text: `It took the driver ${speed} hours to drive from City A to City B.`, isCorrect: false, reason: `the time the trip took is a value of $t$, the number of hours, not the coefficient of $t$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `A driver traveled from City A to City B. The equation below estimates the distance $d$, in miles, they traveled after driving for $t$ hours. $$d = ${speed}t$$ Which of the following does ${speed} represent in the equation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctInterpretation,
      explanation: `Choice ${correctOption.letter} is correct. In the equation $d = ${speed}t$, the coefficient of $t$, ${speed}, is the number of miles traveled for each hour of driving. Therefore, the driver traveled at an average speed of about ${speed} miles per hour. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
