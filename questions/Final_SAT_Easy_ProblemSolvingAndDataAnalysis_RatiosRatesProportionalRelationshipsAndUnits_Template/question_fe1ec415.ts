import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: fe1ec415
*
* ORIGINAL ANALYSIS:
* - Number ranges: [12 pounds/3 min = 4 lb/min, target: 96 pounds, answer: 24 minutes]
* - Difficulty factors: [Rate calculation, proportion setup, solving for time]
* - Distractor patterns: [A: 8 (96/12, missing time factor), B: 15 (random), C: 24 (correct), D: 36 (random)]
* - Constraints: [Rate must divide evenly into target for clean answer]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_fe1ec415 = {
  metadata: {
    // id: "fe1ec415",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const ratePerMinute = getRandomInt(3, 6);
    const initialTime = getRandomInt(2, 4);
    const initialPounds = ratePerMinute * initialTime;
    const targetMultiplier = getRandomInt(6, 10);
    const targetPounds = initialPounds * targetMultiplier;
    const correctTime = initialTime * targetMultiplier;

    const distractor1 = targetMultiplier;
    const distractor2 = correctTime - getRandomInt(5, 10);
    const distractor3 = correctTime + getRandomInt(10, 15);

    // Fixed: Template literals (backticks) for reason strings with ${}
    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: `This answer might result from dividing ${targetPounds} by ${initialPounds}, which gives the ratio of the amounts of cherries (${targetMultiplier} times as much), but this is not the time in minutes.` },
      { text: distractor2.toString(), isCorrect: false, reason: `This answer is incorrect and may result from a miscalculation or misunderstanding of the relationship.` },
      { text: correctTime.toString(), isCorrect: true, reason: null },
      { text: distractor3.toString(), isCorrect: false, reason: `This answer is incorrect and may result from a miscalculation.` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Fixed: Plain text for words, $...$ only for math, proper array access [0], [1], [2]
    const explanation = `The correct answer is ${correctLetter}. The machine pits cherries at a rate of ${initialPounds} pounds / ${initialTime} minutes = ${ratePerMinute} pounds per minute. To find out how long it takes to pit ${targetPounds} pounds, divide the total pounds by the rate: ${targetPounds} / ${ratePerMinute} = ${correctTime} minutes. Alternatively, you can set up a proportion: $${initialPounds}/${initialTime} = ${targetPounds}/x$. Cross-multiply to solve for $x$: $${initialPounds}x = ${initialTime} \\times ${targetPounds}$, $${initialPounds}x = ${initialTime * targetPounds}$, $x = ${initialTime * targetPounds}/${initialPounds}$, $x = ${correctTime}$. Why other options are incorrect: Choice ${incorrectOptions[0].letter}: ${incorrectOptions[0].reason} Choice ${incorrectOptions[1].letter}: ${incorrectOptions[1].reason} Choice ${incorrectOptions[2].letter}: ${incorrectOptions[2].reason}`;

    return {
      questionText: `A cherry pitting machine pits ${initialPounds} pounds of cherries in ${initialTime} minutes. At this rate, how many minutes does it take the machine to pit ${targetPounds} pounds of cherries?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctTime.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: ba62b0b0
*
* ORIGINAL ANALYSIS:
* - Number ranges: [28 kg (double-digit), conversion: 1000 g/kg, answer: 28000]
* - Difficulty factors: [Metric conversion, multiplication by 1000]
* - Distractor patterns: [A: 28000 (correct), B: 1028 (added), C: 972 (subtracted), D: 784 (random)]
* - Constraints: [Simple multiplication by 1000]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/