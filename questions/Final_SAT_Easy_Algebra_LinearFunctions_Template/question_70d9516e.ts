import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 70d9516e
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [speed: 25-40, time: 2-5]
 * - Difficulty factors: [Simple evaluation]
 * - Distractor patterns: [speed as distance, addition instead of multiplication, extra second]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_70d9516e = {
  metadata: {
    // id: "70d9516e",
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
      { text: distractor1.toString(), isCorrect: false, reason: "is the speed, not the distance" },
      { text: distractor2.toString(), isCorrect: false, reason: "results from adding instead of multiplying" },
      { text: distance.toString(), isCorrect: true },
      { text: distractor4.toString(), isCorrect: false, reason: "calculates distance for one extra second" }
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
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${time} for $t$: $d = ${speed}(${time}) = ${distance}$ feet. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 720e51ac
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 1-3, intercept: 80-120, xValue: 50-70]
 * - Difficulty factors: [Reading value from graph]
 * - Distractor patterns: [fixed cost, arbitrary value, overestimate]
 * - Constraints: [None]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 */

