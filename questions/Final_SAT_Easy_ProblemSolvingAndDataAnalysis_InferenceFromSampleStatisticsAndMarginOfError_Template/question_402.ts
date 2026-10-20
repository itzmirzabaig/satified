import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 402
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [50 sample, 14,878 population (5-digit), 7 successes (small integer)]
 * - Difficulty factors: [Large population proportion estimation, rounding to nearest option]
 * - Distractor patterns: A is 350 (wrong calculation), B is Correct/closest, C is 7,500 (too high), D is 10,500 (too high)
 * - Constraints: [Population must be large (thousands), proportion calculation must round to clean option]
 * - Question type: [Proportion with large numbers→Multiple Choice Text]
 * - Figure generation: [None - calculation-based question]
 */

export const generator_402 = {
  metadata: {
    id: "402",
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

    // Each wrong choice is a real slip; two of the old ones were 50% and 70%
    // of the population, explained only as "not supported by the sample data".
    const percentInSample = (successesInSample * 100) / sampleSize;            // 12 to 18, exact (7 / 50 * 100 gave 14.000000000000002)
    const distractorA = Math.round((successesInSample / 100) * population / 100) * 100;   // 6 to 9 percent: under 1,800
    const distractorC = Math.round(((sampleSize - successesInSample) / sampleSize) * population / 100) * 100; // at least 82 percent
    const fmt = (n: number) => n.toLocaleString('en-US');

    const optionsData = [
      { text: `$${fmt(distractorA)}$`, isCorrect: false, reason: `it results from treating ${successesInSample} out of ${sampleSize} as ${successesInSample}%; ${successesInSample} out of ${sampleSize} is ${percentInSample}%` },
      { text: `$${fmt(correctAnswerRounded)}$`, isCorrect: true, reason: '' },
      { text: `$${fmt(distractorC)}$`, isCorrect: false, reason: `it estimates the number of people who would not name ${food.flavor}, using $\\frac{${sampleSize - successesInSample}}{${sampleSize}}$ instead of $\\frac{${successesInSample}}{${sampleSize}}$` },
      { text: `$${percentInSample}$`, isCorrect: false, reason: `${percentInSample} is the percent of the people in the sample who named ${food.flavor}, not the number of people in the ${location}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Set up a proportion: $\\frac{${successesInSample}}{${sampleSize}} = \\frac{x}{${population.toLocaleString('en-US')}}$. This gives $x = \\frac{${successesInSample}}{${sampleSize}} \\times ${population.toLocaleString('en-US')} \\approx ${estimatedTotal.toLocaleString('en-US')}$, which is about ${correctAnswerRounded.toLocaleString('en-US')}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A random sample of $${sampleSize}$ people from a ${location} with a population of $${population.toLocaleString('en-US')}$ were asked to name their favorite flavor of ${food.item}. If $${successesInSample}$ people in the sample named ${food.flavor} as their favorite ${food.item} flavor, about how many people in the ${location} would be expected to name ${food.flavor}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
