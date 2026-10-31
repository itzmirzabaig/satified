import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 496
*
* ORIGINAL ANALYSIS:
* - Number ranges: [speed: 12 cm/s (double-digit), distance: 108 cm (triple-digit), answer: 9 seconds]
* - Difficulty factors: [Time = Distance / Speed formula]
* - Distractor patterns: [A: 9 (correct), B: 96 (108-12), C: 120 (108+12), D: 972 (108×12)]
* - Constraints: [distance divisible by speed for integer time]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_496 = {
  metadata: {
    id: "496",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const speed = getRandomInt(8, 15);
    const time = getRandomInt(5, 12);
    const distance = speed * time;
    const correctTime = distance / speed;
    const fmt = (n: number) => n.toLocaleString('en-US');

    const optionsData = [
      { text: `${correctTime}`, isCorrect: true, reason: '' },
      { text: `${distance - speed}`, isCorrect: false, reason: `${distance - speed} results from subtracting the speed from the distance instead of dividing` },
      { text: `${distance + speed}`, isCorrect: false, reason: `${distance + speed} results from adding the speed to the distance instead of dividing` },
      { text: fmt(distance * speed), isCorrect: false, reason: `${fmt(distance * speed)} results from multiplying the distance by the speed instead of dividing` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Standard format: the correct choice first, one sentence per wrong
    // choice. It used to open without naming the correct choice, list the
    // others under "Why other options are incorrect:", and write 98 * 14.
    const explanation = `Choice ${correctOption.letter} is correct. Distance equals speed times time, so the time is the distance divided by the speed: $\\frac{${distance}}{${speed}} = ${correctTime}$. So it would take ${correctTime} seconds. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `An object travels at a constant speed of ${speed} centimeters per second. At this speed, what is the time, in seconds, that it would take for the object to travel ${distance} centimeters?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: `${correctTime}`,
      explanation: explanation
    };
  }
};
