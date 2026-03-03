import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 9e2bf782
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [tank A: 8-12, tank B range: 5-15]
 * - Difficulty factors: [Finding possible median given grouped constraints]
 * - Distractor patterns: [Values outside possible median range]
 * - Constraints: [Median position must be in tank B range]
 * - Question type: [Text→Multiple Choice Text]
 */

export const generator_9e2bf782 = {
  metadata: {
    // id: "9e2bf782",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Tank counts
    const tankA = getRandomInt(8, 12);
    const tankB = getRandomInt(10, 14);
    const tankC = getRandomInt(11, 15);
    const total = tankA + tankB + tankC;
    const medianPosition = Math.ceil(total / 2);

    // Tank B contains positions (tankA+1) to (tankA+tankB)
    const tankBMin = getRandomInt(5, 8);
    const tankBMax = tankBMin + getRandomInt(6, 10);

    // Median must be in tank B range
    const correctMedian = getRandomInt(tankBMin + 1, tankBMax - 1);

    // Distractors: below tank B range, above tank B range
    const distractorLow = tankBMin - 1;
    const distractorHigh1 = tankBMax + 1;
    const distractorHigh2 = tankBMax + 3;

    const optionsData = [
      { text: distractorLow.toString(), isCorrect: false },
      { text: correctMedian.toString(), isCorrect: true },
      { text: distractorHigh1.toString(), isCorrect: false },
      { text: distractorHigh2.toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `A fish hatchery has three tanks for holding fish before they are introduced into the wild. ${tankA} fish weighing less than $${tankBMin}$ ounces are placed in tank A. ${tankB} fish weighing at least $${tankBMin}$ ounces but no more than $${tankBMax}$ ounces are placed in tank B. ${tankC} fish weighing more than $${tankBMax}$ ounces are placed in tank C. Which of the following could be the median of the weights, in ounces, of these $${total}$ fish?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctMedian.toString(),
      explanation: `Choice ${correctOption.letter} is correct. With ${total} fish, the median is the ${medianPosition}th value when sorted. Since tank A has ${tankA} fish and tank B has ${tankB} fish, the ${medianPosition}th value falls in tank B, which contains values from ${tankBMin} to ${tankBMax}. Therefore, the median must be in this range.`
    };
  }
};

/**
 * Question ID: d94018fd
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [mean, median comparison]
 * - Difficulty factors: [Comparing mean and median from distribution]
 */
