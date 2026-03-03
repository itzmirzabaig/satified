import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: be35c117
*
* ORIGINAL ANALYSIS:
* - Number ranges: [revolutions: 900 (triple-digit), minutes: 50 (double-digit), answer: 18 (double-digit)]
* - Difficulty factors: [Rate calculation, division]
* - Distractor patterns: [A: 18 (correct), B: 850 (900-50, subtraction), C: 950 (900+50, addition), D: 1400 (random)]
* - Constraints: [revolutions divisible by minutes for integer rate]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_be35c117 = {
  metadata: {
    // id: "be35c117",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const rate = getRandomInt(12, 25);
    const minutes = getRandomInt(30, 60);
    const totalRevolutions = rate * minutes;
    const correctRate = totalRevolutions / minutes;

    const distractorSubtract = totalRevolutions - minutes;
    const distractorAdd = totalRevolutions + minutes;
    const distractorRandom = totalRevolutions + getRandomInt(400, 600);

    const optionsData = [
      { text: correctRate.toString(), isCorrect: true, reason: null },
      { text: distractorSubtract.toString(), isCorrect: false, reason: "This result comes from subtracting the minutes from the revolutions, which is an incorrect operation for finding a rate." },
      { text: distractorAdd.toString(), isCorrect: false, reason: "This result comes from adding the minutes to the revolutions, which is an incorrect operation." },
      { text: distractorRandom.toString(), isCorrect: false, reason: "This number does not result from a standard arithmetic mistake but is significantly off. It might result from a multiplication error or miscalculation, but it is not the correct rate." }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `To find the number of revolutions per minute, you need to divide the total number of revolutions by the total number of minutes.\\n\\nGiven:\\nTotal revolutions $= ${totalRevolutions}$\\nTotal time $= ${minutes}$ minutes\\n\\nFormula for rate:\\n$$\\text{Rate} = \\frac{\\text{Total revolutions}}{\\text{Total time}}$$\\n\\nCalculation:\\n$$\\text{Rate} = \\frac{${totalRevolutions}}{${minutes}}$$\\n$$\\text{Rate} = ${correctRate}$$\\n\\nSo, the turbine completes $${correctRate}$ revolutions per minute.\\n\\nWhy other options are incorrect:\\nChoice ${incorrectOptions[0].letter}: ${incorrectOptions[0].reason}\\nChoice ${incorrectOptions[1].letter}: ${incorrectOptions[1].reason}\\nChoice ${incorrectOptions[2].letter}: ${incorrectOptions[2].reason}`;

    return {
      questionText: `A wind turbine completes $${totalRevolutions}$ revolutions in $${minutes}$ minutes. At this rate, how many revolutions per minute does this turbine complete?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctRate.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: e3d49511
*
* ORIGINAL ANALYSIS:
* - Number ranges: [area: 131 sq miles (triple-digit), population: 2358 (4-digit), answer: 18 (double-digit)]
* - Difficulty factors: [Population density formula, division]
* - Distractor patterns: [A: 18 (correct), B: 131 (just the area), C: 149 (random), D: 2376 (pop + 18)]
* - Constraints: [population divisible by area for integer density]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/
