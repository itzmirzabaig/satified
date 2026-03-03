import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 6a305cd0
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [37 mean (double-digit), 3 margin (single-digit)]
 * - Difficulty factors: [Margin of error creates interval, directional interpretation]
 * - Distractor patterns: A is Less than 37, B is Greater than 37, C is Between 34 and 40 (correct), D is Outside interval
 * - Constraints: [Margin should be small enough that interval is tight, clean integer bounds]
 * - Question type: [Margin of error→Multiple Choice Text]
 * - Figure generation: [None - conceptual question]
 */

export const generator_6a305cd0 = {
  metadata: {
    // id: "6a305cd0",
    assessment: "SAT",
    domain: "Problem-Solving and Data Analysis",
    skill: "Inference from sample statistics and margin of error",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const sampleMean = getRandomInt(25, 50);
    const marginOfError = getRandomInt(2, 5);
    const lowerBound = sampleMean - marginOfError;
    const upperBound = sampleMean + marginOfError;

    const studyTypes = ["study", "survey", "poll", "analysis"];
    const study = getRandomElement(studyTypes);
    const metricTypes = ["mean", "average"];
    const metric = getRandomElement(metricTypes);
    const dataTypes = [
      { item: "test scores", unit: "points" },
      { item: "heights", unit: "inches" },
      { item: "weights", unit: "pounds" },
      { item: "ages", unit: "years" }
    ];
    const dataType = getRandomElement(dataTypes);

    const optionsData = [
      {
        text: `It is less than $${sampleMean}$.`,
        isCorrect: false,
        reason: "while the true mean could be less, it could also be greater"
      },
      {
        text: `It is greater than $${sampleMean}$.`,
        isCorrect: false,
        reason: "while the true mean could be greater, it could also be less"
      },
      {
        text: `It is between $${lowerBound}$ and $${upperBound}$.`,
        isCorrect: true
      },
      {
        text: `It is less than $${lowerBound}$ or greater than $${upperBound}$.`,
        isCorrect: false,
        reason: "describes values outside the confidence interval where the mean is unlikely to be"
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The margin of error defines a range around the sample mean where the true population mean likely falls: $${sampleMean} - ${marginOfError} = ${lowerBound}$ to $${sampleMean} + ${marginOfError} = ${upperBound}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `In a ${study}, the data from a random sample of a population had a ${metric} of $${sampleMean}$, with an associated margin of error of $${marginOfError}$. Which of the following is the most appropriate conclusion that can be made about the population ${metric}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 8173f32b
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [30 locations (sample), $4.23 mean (currency), $0.08 margin (small currency)]
 * - Difficulty factors: [Currency calculations with decimals, interval interpretation]
 * - Distractor patterns: A is Between $4.15 and $4.31 (correct), B reverses confidence, C is less than 4.15, D is greater than 4.31
 * - Constraints: [Decimals must align for clean subtraction/addition, currency format]
 * - Question type: [Margin of error with currency→Multiple Choice Text]
 * - Figure generation: [None - calculation-based question]
 */