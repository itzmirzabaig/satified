import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 490
*
* ORIGINAL ANALYSIS:
* - Number ranges: [speed: 6 cm/s, distance: 24 cm, answer: 4 seconds]
* - Difficulty factors: [Time = Distance / Speed formula]
* - Distractor patterns: [None - fill in blank, common errors: division errors]
* - Constraints: [distance divisible by speed for integer time]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_490 = {
  metadata: {
    id: "490",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const speed = getRandomInt(4, 8);
    const time = getRandomInt(3, 6);
    const distance = speed * time;
    const correctTime = distance / speed;

    const questionText = `An object travels at a constant speed of ${speed} centimeters per second. At this speed, what is the time, in seconds, that it would take for the object to travel ${distance} centimeters?`;
    const explanation = `The correct answer is ${correctTime}. The time can be calculated by solving the equation $${speed}=\\frac{${distance}}{x}$. Multiplying each side by $x$ yields $${speed}x=${distance}$, and dividing by ${speed} yields $x=${correctTime}$.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: correctTime.toString(),
      explanation: explanation
    };
  }
};
