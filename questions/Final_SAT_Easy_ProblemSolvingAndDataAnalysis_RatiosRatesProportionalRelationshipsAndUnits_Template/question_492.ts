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
    const k = multiplier;
    const correctExpression = `${k}p`;

    // Wrong choices: dividing by the multiplier, adding it, and using the
    // hourly rate p/w times the multiplier alone (forgetting the w in the
    // hours). The last replaced "p minus the multiplier."
    const optionsData = [
      { text: correctExpression, isCorrect: true, reason: '' },
      { text: `\\frac{p}{${k}}`, isCorrect: false, reason: `$\\frac{p}{${k}}$ is the amount earned for $\\frac{w}{${k}}$ hours of work, not $${k}w$ hours` },
      { text: `p + ${k}`, isCorrect: false, reason: `$p + ${k}$ adds ${k} dollars to $p$ instead of multiplying $p$ by ${k}` },
      { text: `\\frac{${k}p}{w}`, isCorrect: false, reason: `$\\frac{${k}p}{w}$ is the hourly rate, $\\frac{p}{w}$ dollars per hour, times ${k} hours; the number of hours is $${k}w$, not ${k}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The worker earns $p$ dollars for every $w$ hours, so the hourly rate is $\\frac{p}{w}$ dollars per hour. For $${k}w$ hours, the worker earns $\\frac{p}{w} \\cdot ${k}w = ${k}p$ dollars. In other words, working ${k} times as many hours earns ${k} times as much money. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A worker earns $p$ dollars for every $w$ hours of work. Which expression represents the amount of money, in dollars, the worker earns for $${k}w$ hours of work?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctExpression,
      explanation: explanation
    };
  }
};
