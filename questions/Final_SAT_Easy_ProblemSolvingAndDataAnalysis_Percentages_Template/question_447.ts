import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 447
 * Percentages — find a part (red marbles) as a whole-number percent of a total.
 *
 * FIXED:
 * - LaTeX: `$${percentage}%` left a `$` unclosed -> odd $ count (TEX_UNBALANCED).
 *   Percent is now plain prose; only the numeric quantities sit inside $...$.
 * - Correctness: the old range let `pct/100 * roundedTotal` be non-integer
 *   (e.g. 11% of 350 = 38.5) and then Math.round'd it, so the explanation
 *   equation was a rounded lie. Total is now a multiple of 100, so
 *   `result = pct * (total/100)` is an EXACT integer for every draw.
 * - Distractors verified distinct for all draws (0 collisions over the range).
 *
 * ORIGINAL ANALYSIS:
 * - Distractor patterns: complement (not red), the total, a 10% increase.
 * - Question type: Text -> Multiple Choice Text. Figure: none.
 */

export const generator_447 = {
  metadata: {
    id: "447",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Total is a multiple of 100 so any integer percent yields a whole part.
    const total = getRandomInt(2, 5) * 100;
    const percentage = getRandomInt(5, 25);
    const result = percentage * (total / 100); // exact integer

    const complementCount = total - result;              // the "not red" count
    const increasedTotal = Math.round(total * 1.1);      // a 10% increase

    // Two-digit decimal string for the multiplier (0.05 .. 0.25).
    const multiplier = `0.${percentage.toString().padStart(2, '0')}`;

    const optionsData = [
      { text: `${result}`, isCorrect: true },
      { text: `${complementCount}`, isCorrect: false, reason: "is the number of marbles that are *not* red" },
      { text: `${total}`, isCorrect: false, reason: "is the total number of marbles" },
      { text: `${increasedTotal}`, isCorrect: false, reason: "represents a 10% increase rather than a part of the whole" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `There are $${total}$ marbles in a container. Of these marbles, ${percentage}% are red. How many marbles in the container are red?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. To find the number of red marbles, calculate ${percentage}% of $${total}$: $${total} \\times ${multiplier} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
