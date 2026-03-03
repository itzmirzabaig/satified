import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 7cd1c6db
*
* ORIGINAL ANALYSIS:
* - Number ranges: [speed: 12 cm/s (double-digit), distance: 108 cm (triple-digit), answer: 9 seconds]
* - Difficulty factors: [Time = Distance / Speed formula]
* - Distractor patterns: [A: 9 (correct), B: 96 (108-12), C: 120 (108+12), D: 972 (108×12)]
* - Constraints: [distance divisible by speed for integer time]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_7cd1c6db = {
  metadata: {
    // id: "7cd1c6db",
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

    const distractor1 = distance - speed;
    const distractor2 = distance + speed;
    const distractor3 = distance * speed;

    const optionsData = [
      { text: correctTime.toString(), isCorrect: true, reason: null },
      { text: distractor1.toString(), isCorrect: false, reason: `results from subtracting the speed from the distance (${distance} - ${speed}), which is an incorrect operation for this relationship.` },
      { text: distractor2.toString(), isCorrect: false, reason: `results from adding the speed to the distance (${distance} + ${speed}), which is incorrect.` },
      { text: distractor3.toString(), isCorrect: false, reason: `results from multiplying the distance by the speed (${distance} * ${speed}), which would calculate distance given rate and a time of ${distance} seconds, not time.` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Fixed: Proper template literals and accessing array elements correctly
    const explanation = `To find the time it takes to travel a certain distance at a constant speed, we use the formula: $t = d/r$ where $d$ is the distance and $r$ is the rate. Substitute the given values: $t = ${distance}/${speed} = ${correctTime}$. So, it would take ${correctTime} seconds. Why other options are incorrect: Choice ${incorrectOptions[0].letter} (${incorrectOptions[0].text}): ${incorrectOptions[0].reason} Choice ${incorrectOptions[1].letter} (${incorrectOptions[1].text}): ${incorrectOptions[1].reason} Choice ${incorrectOptions[2].letter} (${incorrectOptions[2].text}): ${incorrectOptions[2].reason}`;

    return {
      questionText: `An object travels at a constant speed of ${speed} centimeters per second. At this speed, what is the time, in seconds, that it would take for the object to travel ${distance} centimeters?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctTime.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: 24ad9dcb
*
* ORIGINAL ANALYSIS:
* - Number ranges: [Venus: 9/10, Jupiter: 23/10, Earth: 100 lbs, answer: 140 lbs]
* - Difficulty factors: [Fraction multiplication, subtraction of weights]
* - Distractor patterns: [A: 90 (Venus weight), B: 111 (random), C: 140 (correct), D: 230 (Jupiter weight)]
* - Constraints: [Fractions must multiply cleanly with 100]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/