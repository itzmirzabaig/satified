import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 168
 *
 * ORIGINAL ANALYSIS: [Slope-intercept from given m and b]
 */

export const generator_168 = {
  metadata: {
    id: "168",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // b is chosen from its declared range 3-12 EXCLUDING m: if m === b the
    // swapped distractor equals the correct equation and the two multiplied
    // distractors collide with each other. With m !== b (and m, b >= 3) all
    // four option strings are provably distinct.
    const m = getRandomInt(3, 9);
    const b = getRandomElement([3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter(v => v !== m));

    const correctText = `$y = ${m}x + ${b}$`;

    const optionsData = [
      { text: correctText, isCorrect: true, reason: "" },
      { text: `$y = ${m}x + ${m * b}$`, isCorrect: false, reason: `multiplies the slope and the $y$-intercept to get the constant term` },
      { text: `$y = ${b}x + ${m}$`, isCorrect: false, reason: `swaps the slope and the $y$-intercept` },
      { text: `$y = ${b}x + ${m * b}$`, isCorrect: false, reason: `swaps the slope and the $y$-intercept and also multiplies them for the constant term` }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;
    const incorrect = shuffled.filter(o => !o.isCorrect);

    return {
      questionText: `A line has slope ${m} and passes through $(0, ${b})$. Which equation represents the line?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. In slope-intercept form $y = mx + b$, the slope is $m = ${m}$ and, because the line passes through $(0, ${b})$, the $y$-intercept is $b = ${b}$. Substituting gives $y = ${m}x + ${b}$. ${incorrect.map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`).join(' ')}`
    };
  }
};
