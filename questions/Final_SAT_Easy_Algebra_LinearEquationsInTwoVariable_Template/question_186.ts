import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 186
 *
 * ORIGINAL ANALYSIS: [Budget subtraction relationship]
 */

export const generator_186 = {
  metadata: {
    id: "186",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const other = getRandomInt(100, 300);

    const optionsData = [
      { text: `$x - y = ${other}$`, isCorrect: true, reason: '' },
      { text: `$x + y = ${other}$`, isCorrect: false, reason: `it adds the department expenses to the total budget, but the total budget already includes the department expenses` },
      { text: `$2x - y = ${other}$`, isCorrect: false, reason: `it counts the total budget twice` },
      { text: `$y - x = ${other}$`, isCorrect: false, reason: `it subtracts the total budget from the department expenses, which would make the department expenses greater than the total budget` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `An office has a total budget of $x$ dollars. The entire budget is spent on department expenses of $y$ dollars and other expenses of \\$${other}. Which equation relates $x$ and $y$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$x - y = ${other}$`,
      explanation: `Choice ${correctLetter} is correct. The total budget equals the department expenses plus the other expenses, so $x = y + ${other}$. Subtracting $y$ from both sides of this equation yields $x - y = ${other}$. ${shuffledOptions.filter(o => !o.isCorrect).map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
