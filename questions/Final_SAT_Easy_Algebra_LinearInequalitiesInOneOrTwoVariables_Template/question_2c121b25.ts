import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2c121b25
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentages: 30% and 70%, threshold: 400]
 * - Difficulty factors: [Percentage to decimal conversion, linear combination]
 * - Distractor patterns: [B=swapped percentages with wrong sign, C=fraction misunderstanding, D=percentage scaling error]
 * - Constraints: [Must use decimal form 0.3 and 0.7, not 30 and 70]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_2c121b25 = {
  metadata: {
    // id: "2c121b25",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const pct1 = getRandomInt(20, 40);
    const pct2 = getRandomInt(60, 80);
    const threshold = getRandomInt(200, 600);
    const dec1 = (pct1 / 100).toFixed(1);
    const dec2 = (pct2 / 100).toFixed(1);

    const optionsData = [
      { text: `$${dec1}x + ${dec2}y \\ge ${threshold}$`, isCorrect: true },
      { text: `$${dec2}x + ${dec1}y \\le ${threshold}$`, isCorrect: false, reason: "swaps the percentages and uses the wrong inequality direction" },
      { text: `$\\frac{x}{${Math.floor(pct1/10)}} + \\frac{y}{${Math.floor(pct2/10)}} \\le ${threshold}$`, isCorrect: false, reason: "incorrectly represents percentages as dividing by single digits" },
      { text: `$${pct1}x + ${pct2}y \\ge ${threshold}$`, isCorrect: false, reason: "uses whole numbers instead of decimals, which would require the right side to be ${threshold * 100}" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The first container has ${pct1}% red beads ($${dec1}x$) and the second has ${pct2}% red beads ($${dec2}y$). Together they have at least ${threshold} red beads: $${dec1}x + ${dec2}y \\ge ${threshold}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `Valentina bought two containers of beads. In the first container $${pct1}% of the beads are red, and in the second container $${pct2}% of the beads are red. Together, the containers have at least $${threshold}$ red beads. Which inequality shows this relationship, where $x$ is the total number of beads in the first container and $y$ is the total number of beads in the second container?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 563407e5
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min: 50, max: 60, trays: 4]
 * - Difficulty factors: [Range multiplication, bounds checking]
 * - Distractor patterns: [A=below minimum, B=within range, C=just above max, D=way above max]
 * - Constraints: [Total must be between 200 and 240]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */