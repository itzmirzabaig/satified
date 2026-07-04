import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 492
*
* ORIGINAL ANALYSIS:
* - Number ranges: [earns p dollars per w hours, asks for 39w hours, answer: 39p]
* - Difficulty factors: [Proportional reasoning with variables, algebraic expression]
* - Distractor patterns: [A: 39p (correct), B: p/39 (divided), C: p+39 (added), D: p-39 (subtracted)]
* - Constraints: [Must recognize 39w is 39 times w]
* - Question type: [Multiple Choice Text with algebraic expressions]
* - Figure generation: [None]
*/

export const generator_492 = {
  metadata: {
    id: "492",
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

    const explanation = `If the worker works $${multiplier}$ times as long, they will earn $${multiplier}$ times as much money. Earnings = $${multiplier} \\times p = ${multiplier}p$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; it results from ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it results from ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it results from ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A worker earns $p$ dollars for every $w$ hours of work. Which expression represents the amount of money, in dollars, the worker earns for $${multiplier}w$ hours of work?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctExpression,
      explanation: explanation
    };
  }
};
