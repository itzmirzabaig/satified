import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 802549ac
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [a: 2-4, b: 3-5, c: 8-20]
 * - Difficulty factors: [Expanding binomials, simplifying, linear solution]
 * - Distractor patterns: [0, -a, random wrong]
 * - Constraints: [Must simplify to linear equation with integer solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_802549ac = {
  metadata: {
    // id: "802549ac",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Generate equation (x+a)(x+b) = (x-a)(x-b) + c
    // Expand: x² + (a+b)x + ab = x² - (a+b)x + ab + c
    // Simplify: 2(a+b)x = c => x = c/(2(a+b))
    const a = getRandomInt(2, 4);
    const b = getRandomInt(3, 5);
    // Choose c to ensure integer solution
    const xSol = getRandomInt(1, 3);
    const c = 2 * (a + b) * xSol;

    // Create options
    const optionsData = [
      { text: `$${xSol}$`, isCorrect: true },
      { text: `$0$`, isCorrect: false },
      { text: `-$${a}$`, isCorrect: false },
      { text: `-$${c - a}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption.letter;

    return {
      questionText: `$$(x+${a})(x+${b})=(x-${a})(x-${b})+${c}$$
Which of the following is a solution to the given equation?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: xSol.toString(),
      explanation: `Expand both sides: $x^2+${a+b}x+${a*b}=x^2-${a+b}x+${a*b}+${c}$. Simplify: $${2*(a+b)}x=${c}$. $x=${xSol}$.`
    };
  }
};

/**
 * Question ID: 75a32330
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 1.5-2.5 (decimal)]
 * - Difficulty factors: [Matching system to graph, parabola properties, line slope]
 */
