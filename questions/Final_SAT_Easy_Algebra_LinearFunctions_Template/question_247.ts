import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 247
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [speed: 25-40, time: 2-5]
 * - Difficulty factors: [Simple evaluation]
 * - Distractor patterns: [speed as distance, addition instead of multiplication, extra second]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_247 = {
  metadata: {
    id: "247",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const speed = getRandomInt(25, 40);

    const time = getRandomInt(2, 5);

    const distance = speed * time;

    const distractor1 = speed;

    const distractor2 = speed + time;

    const distractor4 = speed * (time + 1);

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: `${speed} is the number of feet the bus travels each second, which is its distance from the marker 1 second after passing it, not ${time} seconds after` },
      { text: distractor2.toString(), isCorrect: false, reason: `it results from adding ${time} to ${speed} instead of multiplying ${speed} by ${time}` },
      { text: distance.toString(), isCorrect: true, reason: '' },
      { text: distractor4.toString(), isCorrect: false, reason: `it is the distance from the marker ${time + 1} seconds after passing it, $${speed}(${time + 1})$, not ${time} seconds after` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `A bus is traveling at a constant speed along a straight portion of road. The equation $d = ${speed}t$ gives the distance $d$, in feet from a road marker, that the bus will be $t$ seconds after passing the marker. How many feet from the marker will the bus be ${time} seconds after passing the marker?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: distance.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${time} for $t$ in the given equation yields $d = ${speed}(${time})$, or $d = ${distance}$. Therefore, ${time} seconds after passing the marker, the bus will be ${distance} feet from the marker. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
