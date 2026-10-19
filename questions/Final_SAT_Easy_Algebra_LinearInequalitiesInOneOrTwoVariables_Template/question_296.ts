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
    // Thousands commas (the distances used to print as 2221 and 3731), and
    // the wrong choices used to have no explanations.
    const fmt = (n: number) => n.toLocaleString('en-US');
    const lo = fmt(minDist), hi = fmt(maxDist), sum = fmt(minDist + maxDist);
    const optionsData = [
      { text: `$${lo} \\le d \\le ${hi}$`, isCorrect: true, reason: '' },
      { text: `$d \\le ${lo}$`, isCorrect: false, reason: `${lo} miles was the minimum distance, so $d$ is at least ${lo}, not at most ${lo}` },
      { text: `$d \\ge ${hi}$`, isCorrect: false, reason: `${hi} miles was the maximum distance, so $d$ is at most ${hi}, not at least ${hi}` },
      { text: `$${hi} \\le d \\le ${sum}$`, isCorrect: false, reason: `${sum} is the sum of the minimum and maximum distances, and the distance $d$ can be as small as ${lo} miles, which is less than ${hi}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The distance $d$ is at least ${lo} miles, so $d \\ge ${lo}$, and at most ${hi} miles, so $d \\le ${hi}$. Combining these bounds gives the compound inequality $${lo} \\le d \\le ${hi}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `During spring migration, a dragonfly traveled a minimum of ${lo} miles and a maximum of ${hi} miles between stopover locations. Which inequality represents this situation, where $d$ is a possible distance, in miles, this dragonfly traveled between stopover locations during spring migration?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
