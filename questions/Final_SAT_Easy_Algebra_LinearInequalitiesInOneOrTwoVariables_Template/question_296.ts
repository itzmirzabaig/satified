import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 296
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min: 1510, max: 4130]
 * - Difficulty factors: [Large number compound inequality, real-world context]
 * - Distractor patterns: [A=only lower bound, B=correct compound, C=only upper bound, D=shifted range]
 * - Constraints: [Must be inclusive range]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - Balanced the explanation's math: the final compound inequality is now inside
 *   a single $...$ pair (previously an unpaired closing $ -> TEX_UNBALANCED).
 * - Removed math-mode wrapping around the plain quantities in the prose so no
 *   bare "$number$" reads as currency (DOLLAR_RISK).
 * - Distractors are provably distinct from the answer for every draw.
 */

export const generator_296 = {
  metadata: {
    id: "296",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const minDist = getRandomInt(1000, 3000);
    const maxDist = minDist + getRandomInt(1000, 3000); // strictly > minDist

    // Distractors: lower-only, upper-only, and a shifted range. All differ from
    // the correct compound inequality because maxDist > minDist and
    // minDist + maxDist > maxDist for every draw.
    const optionsData = [
      { text: `$${minDist} \\le d \\le ${maxDist}$`, isCorrect: true },
      { text: `$d \\le ${minDist}$`, isCorrect: false },
      { text: `$d \\ge ${maxDist}$`, isCorrect: false },
      { text: `$${maxDist} \\le d \\le ${minDist + maxDist}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const explanation = `Choice ${correctLetter} is correct. The distance $d$ is at least ${minDist} miles, so $d \\ge ${minDist}$, and at most ${maxDist} miles, so $d \\le ${maxDist}$. Combining these bounds gives the compound inequality $${minDist} \\le d \\le ${maxDist}$.`;

    return {
      questionText: `During spring migration, a dragonfly traveled a minimum of ${minDist} miles and a maximum of ${maxDist} miles between stopover locations. Which inequality represents this situation, where $d$ is a possible distance, in miles, this dragonfly traveled between stopover locations during spring migration?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
