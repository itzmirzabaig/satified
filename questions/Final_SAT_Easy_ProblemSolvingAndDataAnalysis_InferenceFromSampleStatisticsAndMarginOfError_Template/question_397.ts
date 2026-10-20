import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 397
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [37 mean (double-digit), 3 margin (single-digit)]
 * - Difficulty factors: [Margin of error creates interval, directional interpretation]
 * - Distractor patterns: A is Less than 37, B is Greater than 37, C is Between 34 and 40 (correct), D is Outside interval
 * - Constraints: [Margin should be small enough that interval is tight, clean integer bounds]
 * - Question type: [Margin of error→Multiple Choice Text]
 * - Figure generation: [None - conceptual question]
 */

export const generator_397 = {
  metadata: {
    id: "397",
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
      { item: "plant heights", unit: "inches" },  // values are 25 to 50, which suits plants and dogs
      { item: "dog weights", unit: "pounds" },
      { item: "ages", unit: "years" }
    ];
    const dataType = getRandomElement(dataTypes);

    // "a" or "an" to match the next word; the old text read "In a analysis"
    // and "had a average".
    const art = (w: string) => (/^[aeiou]/i.test(w) ? 'an' : 'a');

    const optionsData = [
      {
        text: `It is less than $${sampleMean}$.`,
        isCorrect: false,
        reason: `the population ${metric} could be less than ${sampleMean}, but it could also be greater; the plausible values extend from ${lowerBound} to ${upperBound}`
      },
      {
        text: `It is greater than $${sampleMean}$.`,
        isCorrect: false,
        reason: `the population ${metric} could be greater than ${sampleMean}, but it could also be less; the plausible values extend from ${lowerBound} to ${upperBound}`
      },
      {
        text: `It is between $${lowerBound}$ and $${upperBound}$.`,
        isCorrect: true,
        reason: ''
      },
      {
        text: `It is less than $${lowerBound}$ or greater than $${upperBound}$.`,
        isCorrect: false,
        reason: `it describes the values outside the interval of plausible values, which is where the population ${metric} is not likely to be`
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The margin of error gives a range of plausible values for the population ${metric} around the sample ${metric}: from $${sampleMean} - ${marginOfError} = ${lowerBound}$ to $${sampleMean} + ${marginOfError} = ${upperBound}$. So the most appropriate conclusion is that the population ${metric} is between ${lowerBound} and ${upperBound} ${dataType.unit}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `In ${art(study)} ${study}, the ${dataType.item} from a random sample of a population had ${art(metric)} ${metric} of $${sampleMean}$ ${dataType.unit}, with an associated margin of error of $${marginOfError}$ ${dataType.unit}. Which of the following is the most appropriate conclusion that can be made about the population ${metric}, in ${dataType.unit}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
