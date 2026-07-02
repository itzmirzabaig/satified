import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 489
*
* ORIGINAL ANALYSIS:
* - Number ranges: [44 tablespoons, conversion: 3 tsp/tbsp, answer: 132 teaspoons]
* - Difficulty factors: [Unit conversion, multiplication]
* - Distractor patterns: [A: 47 (44+3), B: 88 (44×2), C: 132 (correct, 44×3), D: 176 (44×4)]
* - Constraints: [Simple multiplication]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_489 = {
  metadata: {
    id: "489",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const tablespoons = getRandomInt(30, 60);
    const tspPerTbsp = 3;
    const teaspoons = tablespoons * tspPerTbsp;

    const distractor1 = tablespoons + tspPerTbsp;
    const distractor2 = tablespoons * 2;
    const distractor3 = tablespoons * 4;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: "adding instead of multiplying" },
      { text: distractor2.toString(), isCorrect: false, reason: "multiplying by 2" },
      { text: teaspoons.toString(), isCorrect: true, reason: null },
      { text: distractor3.toString(), isCorrect: false, reason: "multiplying by 4" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `To convert tablespoons to teaspoons, multiply by ${tspPerTbsp}. ${tablespoons} \\times ${tspPerTbsp} = ${teaspoons}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; it results from ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it results from ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it results from ${incorrectOptions[2].reason}.`;

    return {
      questionText: `How many teaspoons are equivalent to ${tablespoons} tablespoons? (${tspPerTbsp} teaspoons = 1 tablespoon)`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: teaspoons.toString(),
      explanation: explanation
    };
  }
};
