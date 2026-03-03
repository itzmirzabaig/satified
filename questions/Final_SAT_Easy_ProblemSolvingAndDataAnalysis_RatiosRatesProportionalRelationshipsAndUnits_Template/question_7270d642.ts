import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 7270d642
*
* ORIGINAL ANALYSIS:
* - Number ranges: [speed: 16 m/s (double-digit), time: 4 seconds, answer: 64 meters]
* - Difficulty factors: [Distance = Speed × Time formula]
* - Distractor patterns: [A: 64 (correct), B: 20 (16+4), C: 16 (just speed), D: 12 (16-4)]
* - Constraints: [Simple multiplication]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_7270d642 = {
  metadata: {
    // id: "7270d642",
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
      { text: distance.toString(), isCorrect: true, reason: null },
      { text: distractor1.toString(), isCorrect: false, reason: "This is incorrect. It likely results from adding the numbers instead of multiplying them." },
      { text: distractor2.toString(), isCorrect: false, reason: "This is incorrect. It is just the speed per second, not the total distance." },
      { text: distractor3.toString(), isCorrect: false, reason: "This is incorrect. It likely results from subtracting the numbers instead of multiplying them." }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `To find the total distance flown, we can use the formula: $$ \\text{Distance} = \\text{Speed} \\times \\text{Time} $$ Substitute the values: $$ \\text{Distance} = ${speed} \\times ${time} = ${distance} \\text{ meters} $$ Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason} Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason} Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}`;

    return {
      questionText: `A certain bird species can fly at an average speed of $${speed}$ meters per second when in continuous flight. At this rate, how many meters would this bird species fly in $${time}$ seconds?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: distance.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: 8bf3f67a
*
* ORIGINAL ANALYSIS:
* - Number ranges: [depth: 39 fathoms, conversion: 6 feet/fathom, answer: 234 feet]
* - Difficulty factors: [Unit conversion, multiplication]
* - Distractor patterns: [A: 234 (correct), B: 117 (39×3), C: 45 (39+6), D: 7 (39/6)]
* - Constraints: [Simple multiplication]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/
