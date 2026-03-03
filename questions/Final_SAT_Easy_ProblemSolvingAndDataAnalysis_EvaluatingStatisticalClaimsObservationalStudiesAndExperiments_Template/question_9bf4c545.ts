import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9bf4c545
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [500 (sample size, triple-digit)]
 * - Difficulty factors: [Conceptual understanding of sampling bias, representativeness]
 * - Distractor patterns: [A: Generalizes to population, B: Larger biased sample, C: Opposite biased sample]
 * - Constraints: [Conceptual question, no calculations]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_9bf4c545 = {
  metadata: {
    // id: "9bf4c545",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Evaluating Statistical Claims Observational Studies And Experiments",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const sampleSize = getRandomInt(400, 700);
    const location = getRandomElement(["open field", "vacant lot", "undeveloped plot", "empty meadow"]);
    const project = getRandomElement(["dog park", "community garden", "nature trail", "skate park"]);
    const council = getRandomElement(["city council", "town council", "neighborhood association", "parks department"]);

    const optionsData = [
      {
        text: `It shows that the majority of city residents are in favor of the ${project}.`,
        isCorrect: false,
        reason: "incorrectly generalizes a biased sample to the entire population"
      },
      {
        text: `The survey sample should have included more residents who are dog owners.`,
        isCorrect: false,
        reason: "incorrectly assumes a larger biased sample would correct the sampling bias"
      },
      {
        text: `The survey sample should have consisted entirely of residents who do not own dogs.`,
        isCorrect: false,
        reason: "incorrectly suggests using an oppositely biased sample would solve the problem"
      },
      {
        text: `The survey sample is biased because it is not representative of all city residents.`,
        isCorrect: true,
        reason: "correctly identifies the sampling bias"
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The members of the ${council} wanted to assess opinions of all city residents. To gather an unbiased sample, the council should have used a random sampling design to select subjects from all city residents. The given survey introduced a sampling bias because the ${sampleSize} city residents surveyed were all dog owners. This sample is not representative of all city residents because not all city residents are dog owners. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The members of a ${council} wanted to assess the opinions of all city residents about converting an ${location} into a ${project}. The council surveyed a sample of ${sampleSize} city residents who own dogs. The survey showed that the majority of those sampled were in favor of the ${project}. Which of the following is true about the ${council}'s survey?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 82dfb646
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [200 (sample size, triple-digit), 95% (percentage, high)]
 * - Difficulty factors: [Understanding population limitations, generalization boundaries]
 * - Distractor patterns: [A/B: Wrong population generalization, C: Inference about non-sampled group]
 * - Constraints: [Percentage must be high to indicate "most"]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */