import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e7d9649f
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [50 sample, 14,878 population (5-digit), 7 successes (small integer)]
 * - Difficulty factors: [Large population proportion estimation, rounding to nearest option]
 * - Distractor patterns: A is 350 (wrong calculation), B is Correct/closest, C is 7,500 (too high), D is 10,500 (too high)
 * - Constraints: [Population must be large (thousands), proportion calculation must round to clean option]
 * - Question type: [Proportion with large numbers→Multiple Choice Text]
 * - Figure generation: [None - calculation-based question]
 */

export const generator_e7d9649f = {
  metadata: {
    // id: "e7d9649f",
    assessment: "SAT",
    domain: "Problem-Solving and Data Analysis",
    skill: "Inference from sample statistics and margin of error",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const sampleSize = 50;
    const populationThousands = getRandomInt(12, 18);
    const population = populationThousands * 1000 + getRandomInt(1, 999);
    const successesInSample = getRandomInt(6, 9);
    const proportion = successesInSample / sampleSize;
    const estimatedTotal = Math.round(proportion * population);
    const correctAnswerRounded = Math.round(estimatedTotal / 100) * 100;

    const locationTypes = ["town", "city", "village", "county"];
    const location = getRandomElement(locationTypes);
    const foodTypes = [
      { item: "ice cream", flavor: "chocolate" },
      { item: "yogurt", flavor: "strawberry" },
      { item: "pie", flavor: "apple" },
      { item: "cake", flavor: "vanilla" }
    ];
    const food = getRandomElement(foodTypes);

    const distractorA = Math.round((successesInSample / 100) * population / 100) * 100;
    const distractorC = Math.round(population * 0.5 / 100) * 100;
    const distractorD = Math.round(population * 0.7 / 100) * 100;

    const optionsData = [
      { text: `$${distractorA.toLocaleString()}$`, isCorrect: false, reason: "results from setting up the proportion incorrectly" },
      { text: `$${correctAnswerRounded.toLocaleString()}$`, isCorrect: true },
      { text: `$${distractorC.toLocaleString()}$`, isCorrect: false, reason: "is not supported by the sample data" },
      { text: `$${distractorD.toLocaleString()}$`, isCorrect: false, reason: "is not supported by the sample data" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Set up a proportion: $\\frac{${successesInSample}}{${sampleSize}} = \\frac{x}{${population.toLocaleString()}}$. This gives $x = \\frac{${successesInSample}}{${sampleSize}} \\times ${population.toLocaleString()} \\approx ${estimatedTotal.toLocaleString()}$, which rounds to $${correctAnswerRounded.toLocaleString()}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A random sample of $${sampleSize}$ people from a ${location} with a population of $${population.toLocaleString()}$ were asked to name their favorite flavor of ${food.item}. If $${successesInSample}$ people in the sample named ${food.flavor} as their favorite ${food.item} flavor, about how many people in the ${location} would be expected to name ${food.flavor}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: f4b3672a
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [253 acres (3-digit), 5 samples (single-digit), 51, 59, 45, 52, 73 (double-digit tree counts)]
 * - Difficulty factors: [Mean calculation, multiplication with 3-digit number, range selection]
 * - Distractor patterns: A is too low, B is lower than estimate, C is Correct (contains calculated value), D is too high
 * - Constraints: [Mean × total must fall cleanly within one range option, sample values should be varied]
 * - Question type: [Mean→Multiple Choice Range]
 * - Figure generation: [None - calculation-based question]
 */