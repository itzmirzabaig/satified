import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 551c52b9
*
* ORIGINAL ANALYSIS:
* - Number ranges: [earns p dollars per w hours, asks for 39w hours, answer: 39p]
* - Difficulty factors: [Proportional reasoning with variables, algebraic expression]
* - Distractor patterns: [A: 39p (correct), B: p/39 (divided), C: p+39 (added), D: p-39 (subtracted)]
* - Constraints: [Must recognize 39w is 39 times w]
* - Question type: [Multiple Choice Text with algebraic expressions]
* - Figure generation: [None]
*/

export const generator_551c52b9 = {
  metadata: {
    // id: "551c52b9",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const multiplier = getRandomInt(25, 50);
    const correctExpression = `${multiplier}p`;

    const distractor1 = `\\frac{p}{${multiplier}}`;
    const distractor2 = `p + ${multiplier}`;
    const distractor3 = `p - ${multiplier}`;

    const optionsData = [
      { text: correctExpression, isCorrect: true, reason: null },
      { text: distractor1, isCorrect: false, reason: "dividing instead of multiplying" },
      { text: distractor2, isCorrect: false, reason: "adding instead of multiplying" },
      { text: distractor3, isCorrect: false, reason: "subtracting instead of multiplying" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `If Tilly works $${multiplier}$ times as long, she will earn $${multiplier}$ times as much money. Earnings = $${multiplier} \\times p = ${multiplier}p$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; it results from ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it results from ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it results from ${incorrectOptions[2].reason}.`;

    return {
      questionText: `Tilly earns $p$ dollars for every $w$ hours of work. Which expression represents the amount of money, in dollars, Tilly earns for $${multiplier}w$ hours of work?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctExpression,
      explanation: explanation
    };
  }
};

/**
* Question ID: 94660ba8
*
* ORIGINAL ANALYSIS:
* - Number ranges: [speed: 24816 yards/hour, conversion: 1760 yards/mile, answer: 14.1 mph]
* - Difficulty factors: [Large number division with decimal result]
* - Distractor patterns: [None - fill in blank, common errors would be decimal placement]
* - Constraints: [yards must be divisible by 1760 for clean decimal]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/
