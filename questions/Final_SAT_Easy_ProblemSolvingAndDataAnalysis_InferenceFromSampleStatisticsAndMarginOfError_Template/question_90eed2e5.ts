import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 90eed2e5
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [50 total, 20 sample, 6 supporters (small integers, double-digit)]
 * - Difficulty factors: [Proportion setup and solving, cross-multiplication]
 * - Distractor patterns: A is the sample count (6), B is a calculation error, C is Correct (15), D assumes 60% instead of 30%
 * - Constraints: [Sample must divide evenly into population for clean integer answer]
 * - Question type: [Proportion→Multiple Choice Text]
 * - Figure generation: [None - calculation-based question]
 */

export const generator_90eed2e5 = {
  metadata: {
    // id: "90eed2e5",
    assessment: "SAT",
    domain: "Problem-Solving and Data Analysis",
    skill: "Inference from sample statistics and margin of error",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const sampleSize = getRandomInt(15, 30);
    const scaleFactor = getRandomInt(2, 4);
    const totalPopulation = sampleSize * scaleFactor;
    const supporterRatio = getRandomInt(1, 3) / 5;
    const supportersInSample = Math.round(sampleSize * supporterRatio);
    const correctAnswer = supportersInSample * scaleFactor;

    const groupTypes = ["city council members", "state representatives", "school board members", "planning committee members"];
    const group = getRandomElement(groupTypes);
    const billTypes = ["specific bill", "new ordinance", "budget proposal", "zoning change"];
    const bill = getRandomElement(billTypes);
    const observerTypes = ["reporter", "analyst", "researcher", "pollster"];
    const observer = getRandomElement(observerTypes);

    const distractorA = supportersInSample;
    const distractorB = Math.round(correctAnswer * 0.6);
    const distractorD = Math.round(totalPopulation * 0.6);

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: "uses just the number of supporters in the sample" },
      { text: `${distractorB}`, isCorrect: false, reason: "results from a calculation error" },
      { text: `${correctAnswer}`, isCorrect: true },
      { text: `${distractorD}`, isCorrect: false, reason: "assumes 60% support rather than the actual sample proportion" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Set up a proportion: $\\frac{${supportersInSample}}{${sampleSize}} = \\frac{x}{${totalPopulation}}$. Simplifying gives $x = \\frac{${supportersInSample}}{${sampleSize}} \\times ${totalPopulation} = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A city has $${totalPopulation}$ ${group}. A ${observer} polled a random sample of $${sampleSize}$ ${group} and found that $${supportersInSample}$ of those polled supported a ${bill}. Based on the sample, which of the following is the best estimate of the number of ${group} in the city who support the ${bill}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

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