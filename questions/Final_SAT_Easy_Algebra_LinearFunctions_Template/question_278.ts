import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 278
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initialSpeed: 35-45, acceleration: 2-5, time: 4-7]
 * - Difficulty factors: [Linear model evaluation]
 * - Distractor patterns: [initial speed, added rate and time, multiplied both terms by time]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_278 = {
  metadata: {
    id: "278",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initialSpeed = getRandomInt(35, 45);

    // The rate and the time differ so the explanation never reads
    // "multiplying 5 by 5".
    let acceleration = 2, time = 4;
    do {
      acceleration = getRandomInt(2, 5);
      time = getRandomInt(4, 7);
    } while (acceleration === time);

    const finalSpeed = initialSpeed + acceleration * time;

    // Every wrong choice is a real evaluation slip; the old ones were the speed
    // after 1 second and after 2 seconds. The four values are always distinct:
    // initial < initial + a + t < initial + a * t < (initial + a) * t, since a
    // is at least 2 and t is at least 4.
    const optionsData = [
      { text: initialSpeed.toString(), isCorrect: false, reason: `${initialSpeed} is the speed when $t = 0$, when the car began to accelerate, not ${time} seconds later` },
      { text: (initialSpeed + acceleration + time).toString(), isCorrect: false, reason: `it results from adding ${time} to ${acceleration} instead of multiplying ${acceleration} by ${time}` },
      { text: ((initialSpeed + acceleration) * time).toString(), isCorrect: false, reason: `it results from multiplying both ${initialSpeed} and ${acceleration} by ${time}, which gives $(${initialSpeed} + ${acceleration})(${time})$; only ${acceleration} is multiplied by ${time}` },
      { text: finalSpeed.toString(), isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The equation $s = ${initialSpeed} + ${acceleration}t$ gives the speed $s$, in miles per hour, of a certain car $t$ seconds after it began to accelerate. What is the speed, in miles per hour, of the car ${time} seconds after it began to accelerate?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: finalSpeed.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${time} for $t$ in the given equation yields $s = ${initialSpeed} + ${acceleration}(${time})$, or $s = ${initialSpeed} + ${acceleration * time} = ${finalSpeed}$. Therefore, the speed of the car ${time} seconds after it began to accelerate is ${finalSpeed} miles per hour. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
