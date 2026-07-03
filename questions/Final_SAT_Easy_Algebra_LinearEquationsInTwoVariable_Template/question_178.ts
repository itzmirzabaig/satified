import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 178
 *
 * ORIGINAL ANALYSIS: [Line from slope and point]
 */

export const generator_178 = {
  metadata: {
    id: "178",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const m = getRandomInt(2, 8);
    let b = getRandomInt(2, 10);
    // Guard: if b === m, the correct option "y = mx + b" and the
    // swapped-coefficients distractor "y = bx + m" would be identical.
    // Nudging b keeps it within [2, 10] because m <= 8.
    if (b === m) b = b + 1;

    const optionsData = [
      { text: `$y = ${m}x + ${b}$`, isCorrect: true, reason: "" },
      { text: `$y = -${b}x + ${m}$`, isCorrect: false, reason: "swaps the slope and the $y$-intercept and negates the slope" },
      { text: `$y = ${b}x + ${m}$`, isCorrect: false, reason: "swaps the slope and the $y$-intercept" },
      { text: `$y = ${m}x - ${b}$`, isCorrect: false, reason: "uses the wrong sign on the $y$-intercept" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrect = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Line $r$ has slope ${m} and passes through the point $(0, ${b})$ in the $xy$-plane. Which equation defines line $r$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$y = ${m}x + ${b}$`,
      explanation: `Choice ${correctLetter} is correct. The slope-intercept form of a line is $y = mx + b$, where $m$ is the slope and $b$ is the $y$-intercept. The slope of line $r$ is ${m}, and because the line passes through $(0, ${b})$, its $y$-intercept is ${b}. So the equation is $y = ${m}x + ${b}$. Choice ${incorrect[0].letter} is incorrect; it ${incorrect[0].reason}. Choice ${incorrect[1].letter} is incorrect; it ${incorrect[1].reason}. Choice ${incorrect[2].letter} is incorrect; it ${incorrect[2].reason}.`
    };
  }
};
