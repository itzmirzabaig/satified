import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: ed856e9c
 *
 * ORIGINAL ANALYSIS: [Y-intercept point ID]
 * - Number ranges: [slope: 20-50, intercept: 50-100]
 * - Difficulty factors: [Identifying y-intercept from equation]
 * - Constraints: [Simple integers for Easy]
 */

export const generator_ed856e9c = {
  metadata: {
    // id: "ed856e9c",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize slope (20-50)
    const m = getRandomInt(20, 50);
    // Randomize y-intercept (50-100)
    const b = getRandomInt(50, 100);

    const optionsData = [
      { text: `(0, ${b})`, isCorrect: true },
      { text: `(0, ${m})`, isCorrect: false, reason: "uses slope" },
      { text: `(0, -${m})`, isCorrect: false, reason: "negative slope" },
      { text: `(0, -${b})`, isCorrect: false, reason: "negative intercept" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `What is the y-intercept of $y = ${m}x + ${b}$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: `(0, ${b})`,
      explanation: `Choice ${correctLetter} is correct. In the slope-intercept form $y=mx+b$, the y-intercept is $b=${b}$, so the point is $(0, ${b})$.`
    };
  }
};

/**
 * Question ID: eeebe166
 *
 * ORIGINAL ANALYSIS: [Y-intercept from Mafs graph value]
 */
