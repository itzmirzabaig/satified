import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 4e375d1f
*
* ORIGINAL ANALYSIS:
* - Number ranges: [2300 cm, conversion: 100 cm/meter, answer: 23 meters]
* - Difficulty factors: [Metric conversion, division by 100]
* - Distractor patterns: [A: 0.043 (inverted), B: 23 (correct), C: 2400 (2300+100), D: 230000 (2300×100)]
* - Constraints: [Simple division by 100]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_4e375d1f = {
  metadata: {
    // id: "4e375d1f",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const meters = getRandomInt(15, 35);
    const cmPerMeter = 100;
    const centimeters = meters * cmPerMeter;
    const correctMeters = centimeters / cmPerMeter;

    const distractor1 = parseFloat((cmPerMeter / centimeters).toFixed(3));
    const distractor2 = centimeters + cmPerMeter;
    const distractor3 = centimeters * cmPerMeter;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: "incorrect calculation" },
      { text: correctMeters.toString(), isCorrect: true, reason: null },
      { text: distractor2.toString(), isCorrect: false, reason: "adding instead of dividing" },
      { text: distractor3.toString(), isCorrect: false, reason: "multiplying instead of dividing" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `To convert centimeters to meters, divide by ${cmPerMeter}. ${centimeters} \\div ${cmPerMeter} = ${correctMeters}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; it results from ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it results from ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it results from ${incorrectOptions[2].reason}.`;

    return {
      questionText: `How many meters are equivalent to ${centimeters} centimeters? (${cmPerMeter} centimeters = 1 meter)`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctMeters.toString(),
      explanation: explanation
    };
  }
};