import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 287
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentages: 20-40% and 60-80%, threshold: 200-600]
 * - Difficulty factors: [Percentage to decimal conversion, linear combination]
 * - Distractor patterns: [wrong inequality direction, divided by percents, percents not converted to decimals]
 * - Constraints: [Percents written as two-place decimals]
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
    // Each wrong choice is a single real slip. The old ones divided x and y by
    // the tens digit of each percent (for example x/3 for 38%) and combined two
    // errors in one choice.
    const optionsData = [
      {
        text: `$${dec1}x + ${dec2}y \\ge ${threshold}$`,
        isCorrect: true,
        reason: ''
      },
      {
        text: `$${dec1}x + ${dec2}y \\le ${threshold}$`,
        isCorrect: false,
        reason: `it says the containers have at most ${threshold} red beads; "at least" means the total is greater than or equal to ${threshold}`
      },
      {
        text: `$\\frac{x}{${pct1}} + \\frac{y}{${pct2}} \\ge ${threshold}$`,
        isCorrect: false,
        reason: `it divides the numbers of beads by ${pct1} and ${pct2}; ${pct1}% of $x$ is $${dec1}x$, not $\\frac{x}{${pct1}}$`
      },
      {
        text: `$${pct1}x + ${pct2}y \\ge ${threshold}$`,
        isCorrect: false,
        reason: `it uses ${pct1} and ${pct2} instead of ${dec1} and ${dec2}; ${pct1}% of $x$ is $${dec1}x$, so $${pct1}x$ is 100 times the number of red beads in the first container`
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Writing each percent as a decimal, the first container has ${pct1}% of $x$, or $${dec1}x$, red beads, and the second container has ${pct2}% of $y$, or $${dec2}y$, red beads. Together they have at least ${threshold} red beads, so $${dec1}x + ${dec2}y \\ge ${threshold}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A student bought two containers of beads. In the first container, ${pct1}% of the beads are red, and in the second container, ${pct2}% of the beads are red. Together, the two containers have at least ${threshold} red beads. Which inequality represents this relationship, where $x$ is the total number of beads in the first container and $y$ is the total number of beads in the second container?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
