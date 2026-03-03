import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 4347a032
*
* ORIGINAL ANALYSIS:
* - Number ranges: [44 tablespoons, conversion: 3 tsp/tbsp, answer: 132 teaspoons]
* - Difficulty factors: [Unit conversion, multiplication]
* - Distractor patterns: [A: 47 (44+3), B: 88 (44×2), C: 132 (correct, 44×3), D: 176 (44×4)]
* - Constraints: [Simple multiplication]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_4347a032 = {
  metadata: {
    // id: "4347a032",
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

/**
* Question ID: 763e6769
*
* ORIGINAL ANALYSIS:
* - Number ranges: [ratio x:y = 12:t, x=156, answer: y=13t]
* - Difficulty factors: [Proportion with variables, solving for expression]
* - Distractor patterns: [A: 13t (correct), B: 12t (no division), C: 144t (156-12), D: 168t (156+12)]
* - Constraints: [156/12 = 13 must be integer]
* - Question type: [Multiple Choice Text with algebraic expressions]
* - Figure generation: [None]
*/
