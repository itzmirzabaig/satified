import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 287
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentages: 30% and 70%, threshold: 400]
 * - Difficulty factors: [Percentage to decimal conversion, linear combination]
 * - Distractor patterns: [B=swapped percentages with wrong sign, C=fraction misunderstanding, D=percentage scaling error]
 * - Constraints: [Must use decimal form 0.3 and 0.7, not 30 and 70]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_287 = {
  metadata: {
    id: "287",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const pct1 = getRandomInt(20, 40);
    const pct2 = getRandomInt(60, 80);
    const threshold = getRandomInt(200, 600);
    // Exact two-decimal conversion: an integer percent p is p/100, which always
    // has an exact two-decimal form (e.g. 22% -> "0.22"). No float artifacts.
    const dec1 = (pct1 / 100).toFixed(2);
    const dec2 = (pct2 / 100).toFixed(2);
    const den1 = Math.floor(pct1 / 10);
    const den2 = Math.floor(pct2 / 10);

    const optionsData = [
      {
        text: `$${dec1}x + ${dec2}y \\ge ${threshold}$`,
        isCorrect: true
      },
      {
        text: `$${dec2}x + ${dec1}y \\le ${threshold}$`,
        isCorrect: false,
        reason: "swaps the two percentages and uses the wrong inequality direction"
      },
      {
        text: `$\\frac{x}{${den1}} + \\frac{y}{${den2}} \\le ${threshold}$`,
        isCorrect: false,
        reason: "incorrectly represents the percentages as dividing by a single digit"
      },
      {
        text: `$${pct1}x + ${pct2}y \\ge ${threshold}$`,
        isCorrect: false,
        reason: `uses whole-number percentages instead of decimals, which would compare against ${threshold * 100} rather than ${threshold}`
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Writing each percentage as a decimal, ${pct1}% of the first container's beads is ${dec1} times x, and ${pct2}% of the second container's beads is ${dec2} times y. The total number of red beads is at least ${threshold}, so $${dec1}x + ${dec2}y \\ge ${threshold}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A student bought two containers of beads. In the first container, ${pct1}% of the beads are red, and in the second container, ${pct2}% of the beads are red. Together, the two containers have at least ${threshold} red beads. Which inequality represents this relationship, where $x$ is the total number of beads in the first container and $y$ is the total number of beads in the second container?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
