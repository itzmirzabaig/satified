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

    // Wrong choices are real slips: dividing by 3 instead of multiplying,
    // adding 3, and subtracting 3. Two used to be "multiplying by 2" and
    // "multiplying by 4," which no likely slip produces.
    const g = tablespoons % 3 === 0;
    const dividedText = g ? `${tablespoons / 3}` : `\\frac{${tablespoons}}{3}`;
    const optionsData = [
      { text: dividedText, isCorrect: false, reason: `$${dividedText}$ results from dividing ${tablespoons} by ${tspPerTbsp} instead of multiplying; each tablespoon is more than one teaspoon, so the number of teaspoons must be greater than ${tablespoons}` },
      { text: `${tablespoons + tspPerTbsp}`, isCorrect: false, reason: `${tablespoons + tspPerTbsp} results from adding ${tspPerTbsp} to ${tablespoons} instead of multiplying` },
      { text: `${teaspoons}`, isCorrect: true, reason: '' },
      { text: `${tablespoons - tspPerTbsp}`, isCorrect: false, reason: `${tablespoons - tspPerTbsp} results from subtracting ${tspPerTbsp} from ${tablespoons} instead of multiplying` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // The multiplication is inside $...$; it used to be a bare "\times",
    // which made the whole explanation render as one italic math line.
    const explanation = `Choice ${correctOption.letter} is correct. Since 1 tablespoon is equivalent to ${tspPerTbsp} teaspoons, ${tablespoons} tablespoons is equivalent to $${tablespoons} \\times ${tspPerTbsp} = ${teaspoons}$ teaspoons. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `How many teaspoons are equivalent to ${tablespoons} tablespoons? (${tspPerTbsp} teaspoons = 1 tablespoon)`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: `${teaspoons}`,
      explanation: explanation
    };
  }
};
