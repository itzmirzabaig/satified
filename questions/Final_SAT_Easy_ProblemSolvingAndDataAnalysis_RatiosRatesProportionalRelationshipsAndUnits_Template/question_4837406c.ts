import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 4837406c
*
* ORIGINAL ANALYSIS:
* - Number ranges: [speed: 6 cm/s, distance: 24 cm, answer: 4 seconds]
* - Difficulty factors: [Time = Distance / Speed formula]
* - Distractor patterns: [None - fill in blank, common errors: division errors]
* - Constraints: [distance divisible by speed for integer time]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_4837406c = {
  metadata: {
    // id: "4837406c",
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
      options: null,
      correctAnswer: correctTime.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: 99550621
*
* ORIGINAL ANALYSIS:
* - Number ranges: [room: 5400 sq ft, space per person: 8 sq ft, answer: 675 people]
* - Difficulty factors: [Division with larger numbers, integer constraint (floor)]
* - Distractor patterns: [A: 588 (random/estimation), B: 675 (correct), C: 15274 (random), D: 43200 (5400×8)]
* - Constraints: [Area must be divisible by space per person for integer result]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/
