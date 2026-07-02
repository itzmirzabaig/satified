import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 92
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 40-70]
 * - Difficulty factors: [Constructing an exponential growth equation]
 * - Distractor patterns: [Linear growth, swapped parameters, incorrect grouping]
 * - Constraints: [Doubling period is constant]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_92 = {
  metadata: {
    id: "92",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initial = getRandomInt(40, 70);

    const growth = 2;

    const optionsData = [
      { text: `$n = ${initial}(${growth})^d$`, isCorrect: true },
      { text: `$n = ${initial} + ${growth}d$`, isCorrect: false },
      { text: `$n = ${growth}(${initial})^d$`, isCorrect: false },
      { text: `$n = (${initial} \\cdot ${growth})^d$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `At the time of posting a video, a social media channel had $${initial}$ subscribers. Each day for five days after the video was posted, the number of subscribers doubled from the number the previous day. Which equation gives the total number of subscribers, $n$, to the channel $d$ days after the video was posted?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Doubling represents exponential growth with a factor of $2$. The general form is $n = a(b)^d$, where $a$ is the initial value ($${initial}$) and $b$ is the growth factor ($2$). Substituting these gives $n = ${initial}(2)^d$.`
    };
  }
};
