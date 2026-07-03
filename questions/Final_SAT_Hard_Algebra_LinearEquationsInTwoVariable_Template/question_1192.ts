import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1192
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [line k: x+y=0 (slope -1), y-intercept of line j: (0, yInt), yInt in 2..6]
 * - Difficulty factors: [Finding a perpendicular line's equation with a given y-intercept]
 * - Distractor patterns: [x+y=yInt, x+y=-yInt, x-y=yInt, x-y=-yInt (correct)]
 * - Constraints: [Perpendicular to slope -1 has slope +1; y = x + yInt <=> x - y = -yInt]
 * - Question type: [Text -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * Answer derivation: line k is x + y = 0, i.e. y = -x, slope = -1. A line
 * perpendicular to it has slope = +1 (negative reciprocal). With y-intercept
 * (0, yInt) the equation is y = x + yInt, i.e. x - y = -yInt. Because yInt is
 * always >= 2, the four option strings x±y=±yInt are pairwise distinct for
 * every draw, so no collision guard is needed.
 */

export const generator_1192 = {
  metadata: {
    id: "1192",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: y-intercept of line j (always positive, so the four options differ).
    const yInt = getRandomInt(2, 6);

    // Line k: x + y = 0 -> slope -1. Perpendicular slope = +1.
    // Line j: y = x + yInt  <=>  x - y = -yInt  (the correct answer).
    const optionsData = [
      { text: `$x+y=${yInt}$`, isCorrect: false, reason: `keeps line $k$'s slope of $-1$ instead of using the perpendicular slope $+1$, so it is parallel to line $k$` },
      { text: `$x+y=-${yInt}$`, isCorrect: false, reason: `also keeps the slope $-1$ of line $k$ and has the wrong $y$-intercept, $(0,-${yInt})$` },
      { text: `$x-y=${yInt}$`, isCorrect: false, reason: `has the correct slope $+1$ but its $y$-intercept is $(0,-${yInt})$, not $(0,${yInt})$` },
      { text: `$x-y=-${yInt}$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const displayOptions = shuffledOptions.map(o => ({ text: `${o.letter}. ${o.text}` }));

    return {
      questionText: `In the $xy$-plane, line $k$ is defined by $x+y=0$. Line $j$ is perpendicular to line $k$, and the $y$-intercept of line $j$ is $(0,${yInt})$. Which of the following is an equation of line $j$?`,
      figureCode: null,
      options: displayOptions,
      correctAnswer: `${correctOption.letter}. ${correctOption.text}`,
      explanation: `Choice ${correctLetter} is correct. Line $k$, $x+y=0$, can be written as $y=-x$, so it has slope $-1$. A line perpendicular to it has slope $+1$ (the negative reciprocal). With $y$-intercept $(0,${yInt})$, line $j$ is $y = x + ${yInt}$, which rearranges to $x - y = -${yInt}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
