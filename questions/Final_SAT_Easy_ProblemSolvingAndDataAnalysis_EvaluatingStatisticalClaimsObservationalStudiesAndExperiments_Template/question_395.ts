import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 395
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [500 (sample size, triple-digit)]
 * - Difficulty factors: [Conceptual understanding of sampling bias, representativeness]
 * - Distractor patterns: [A: Generalizes to population, B: Larger biased sample, C: Opposite biased sample]
 * - Constraints: [Conceptual question, no calculations]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_395 = {
  metadata: {
    id: "395",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Evaluating Statistical Claims Observational Studies And Experiments",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const sampleSize = getRandomInt(400, 700);
    // "an" was hard-coded before the location, giving "an vacant lot".
    const location = getRandomElement(["an open field", "a vacant lot", "an undeveloped plot", "an empty meadow"]);
    // Each project is paired with the group most likely to favor it; the old
    // version always surveyed dog owners, even about a skate park.
    const { project, who, group, notWho } = getRandomElement([
      { project: "dog park", who: "who own dogs", group: "dog owners", notWho: "who do not own dogs" },
      { project: "community garden", who: "who belong to a gardening club", group: "gardening club members", notWho: "who do not belong to a gardening club" },
      { project: "nature trail", who: "who belong to a hiking club", group: "hiking club members", notWho: "who do not belong to a hiking club" },
      { project: "skate park", who: "who skateboard", group: "skateboarders", notWho: "who do not skateboard" }
    ]);
    const council = getRandomElement(["city council", "town council", "neighborhood association", "parks department"]);

    const optionsData = [
      {
        text: `It shows that the majority of city residents are in favor of the ${project}.`,
        isCorrect: false,
        reason: `the sample is not representative of all city residents, so its result cannot be generalized to all city residents`
      },
      {
        text: `The survey sample should have included more residents ${who}.`,
        isCorrect: false,
        reason: `surveying more ${group} would not make the sample representative of all city residents`
      },
      {
        text: `The survey sample should have consisted entirely of residents ${notWho}.`,
        isCorrect: false,
        reason: `a sample with no ${group} would also not be representative of all city residents`
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

    const explanation = `Choice ${correctOption.letter} is correct. The members of the ${council} wanted to assess the opinions of all city residents. To gather an unbiased sample, the ${council} should have selected residents at random from all city residents. Instead, the ${sampleSize} city residents surveyed were all ${group}, who may be more likely than other residents to favor a ${project}. This sample is not representative of all city residents, so the survey is biased. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `The members of a ${council} wanted to assess the opinions of all city residents about converting ${location} into a ${project}. The ${council} surveyed a sample of ${sampleSize} city residents ${who}. The survey showed that the majority of those sampled were in favor of the ${project}. Which of the following is true about the ${council}'s survey?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
