import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 266
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-4, intercept: 3-8 negative]
 * - Difficulty factors: [Identifying graph from equation]
 * - Distractor patterns: [sign of slope/intercept variations]
 * - Constraints: [Ensure negative intercept]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_266 = {
  metadata: {
    id: "266",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The signs of the slope and the y-intercept are both random. They used to
    // be fixed (positive slope, negative y-intercept), so every regeneration
    // had the same answer. The wrong choices had no explanations.
    const slopeSign = Math.random() < 0.5 ? 1 : -1;
    const interceptSign = Math.random() < 0.5 ? 1 : -1;
    const slope = slopeSign * getRandomInt(2, 4);
    const intercept = interceptSign * getRandomInt(3, 8);

    const word = (sign: number) => (sign > 0 ? 'positive' : 'negative');
    const describe = (ms: number, bs: number) => `A line with ${word(ms)} slope and ${word(bs)} $y$-intercept`;
    const equation = `y = ${slope}x ${intercept < 0 ? '-' : '+'} ${Math.abs(intercept)}`;

    const reasonFor = (ms: number, bs: number) => {
      const parts: string[] = [];
      if (ms !== slopeSign) parts.push(`the slope of the graph is $${slope}$, which is ${word(slopeSign)}, not ${word(ms)}`);
      if (bs !== interceptSign) parts.push(`the $y$-intercept of the graph is $(0, ${intercept})$, and $${intercept}$ is ${word(interceptSign)}, not ${word(bs)}`);
      return parts.join(', and ');
    };

    const optionsData = [[1, 1], [1, -1], [-1, 1], [-1, -1]].map(([ms, bs]) => ({
      text: describe(ms, bs),
      isCorrect: ms === slopeSign && bs === interceptSign,
      reason: reasonFor(ms, bs)
    }));
    const correctDescription = describe(slopeSign, interceptSign);

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Which of the following describes the graph of the equation $${equation}$ in the $xy$-plane?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctDescription,
      explanation: `Choice ${correctOption.letter} is correct. The equation $${equation}$ is in slope-intercept form, $y = mx + b$, where $m$ is the slope of the graph and $(0, b)$ is its $y$-intercept. Here the slope is $${slope}$, which is ${word(slopeSign)}, and the $y$-intercept is $(0, ${intercept})$, where $${intercept}$ is ${word(interceptSign)}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
