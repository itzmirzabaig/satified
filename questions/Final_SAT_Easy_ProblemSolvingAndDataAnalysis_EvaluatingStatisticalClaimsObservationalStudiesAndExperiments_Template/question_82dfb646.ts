import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_82dfb646 = {
  metadata: {
    // id: "82dfb646",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Evaluating Statistical Claims Observational Studies And Experiments",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const sampleSize = getRandomInt(150, 450);
    const dislikePercentage = getRandomInt(88, 97);
    const media = getRandomElement([
      { source: "book", adaptation: "movie" },
      { source: "novel", adaptation: "film" },
      { source: "comic book", adaptation: "movie" },
      { source: "book", adaptation: "television series" }
    ]);
    const researcher = getRandomElement(["market researcher", "media studio", "polling firm", "production company"]);
    const v = getRandomElement([
      { like: "liked", dislike: "disliked", liked: "liked", disliked: "disliked" },
      { like: "enjoyed", dislike: "did not enjoy", liked: "enjoyed", disliked: "did not enjoy" }
    ]);

    const optionsData = [
      {
        text: `At least ${dislikePercentage}% of people who go see ${media.adaptation}s will ${v.dislike} this ${media.adaptation}.`,
        isCorrect: false,
        reason: `generalizes results to all viewers of ${media.adaptation}s, but the sample only included people who ${v.liked} the ${media.source}`
      },
      {
        text: `At least ${dislikePercentage}% of people who read ${media.source}s will ${v.dislike} this ${media.adaptation}.`,
        isCorrect: false,
        reason: `generalizes results to all readers of ${media.source}s, but the sample only included people who ${v.liked} this specific ${media.source}`
      },
      {
        text: `Most people who ${v.dislike} this ${media.source} will ${v.like} this ${media.adaptation}.`,
        isCorrect: false,
        reason: `draws a conclusion about people who ${v.dislike} the ${media.source}, but the sample only included people who ${v.liked} the ${media.source}`
      },
      {
        text: `Most people who ${v.like} this ${media.source} will ${v.dislike} this ${media.adaptation}.`,
        isCorrect: true,
        reason: `correctly limits the inference to the sampled population (those who ${v.liked} the ${media.source})`
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The sample was selected from a group of people who indicated that they ${v.liked} the ${media.source}. It is inappropriate to generalize the result of the survey beyond the population from which the participants were selected. Choice ${correctOption.letter} is the most appropriate inference because it describes a conclusion about people who ${v.liked} the ${media.source}, which matches the sampled population where ${dislikePercentage}% ${v.disliked} the ${media.adaptation}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A ${researcher} selected ${sampleSize} people at random from a group of people who indicated that they ${v.liked} a certain ${media.source}. The ${sampleSize} people were shown a ${media.adaptation} based on the ${media.source} and then asked whether they ${v.liked} or ${v.disliked} the ${media.adaptation}. Of those surveyed, ${dislikePercentage}% said they ${v.disliked} the ${media.adaptation}. Which of the following inferences can appropriately be drawn from this survey result?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};