import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 494
*
* ORIGINAL ANALYSIS:
* - Number ranges: [speed: 16 m/s (double-digit), time: 4 seconds, answer: 64 meters]
* - Difficulty factors: [Distance = Speed × Time formula]
* - Distractor patterns: [A: 64 (correct), B: 20 (16+4), C: 16 (just speed), D: 12 (16-4)]
* - Constraints: [Simple multiplication]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_494 = {
  metadata: {
    id: "494",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const speed = getRandomInt(12, 20);
    const time = getRandomInt(3, 6);
    const distance = speed * time;

    const distractor1 = speed + time;
    const distractor2 = speed;
    const distractor3 = speed - time;

    const optionsData = [
      { text: distance.toString(), isCorrect: true, reason: '' },
      { text: distractor1.toString(), isCorrect: false, reason: `${distractor1} results from adding ${speed} and ${time} instead of multiplying them` },
      { text: distractor2.toString(), isCorrect: false, reason: `${distractor2} is the distance the bird flies in 1 second, not in ${time} seconds` },
      { text: distractor3.toString(), isCorrect: false, reason: `${distractor3} results from subtracting ${time} from ${speed} instead of multiplying` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. To find the total distance flown, we can use the formula: $$ \\text{Distance} = \\text{Speed} \\times \\text{Time} $$ Substitute the values: $$ \\text{Distance} = ${speed} \\times ${time} = ${distance} \\text{ meters} $$ ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A certain bird species can fly at an average speed of $${speed}$ meters per second when in continuous flight. At this rate, how many meters would this bird species fly in $${time}$ seconds?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: distance.toString(),
      explanation: explanation
    };
  }
};
