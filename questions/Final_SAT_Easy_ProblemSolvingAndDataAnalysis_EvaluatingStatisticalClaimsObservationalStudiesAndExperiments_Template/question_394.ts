import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 394
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [200 (sample size, triple-digit), 95% (percentage, high)]
 * - Difficulty factors: [Understanding population limitations, generalization boundaries]
 * - Distractor patterns: [A/B: Wrong population generalization, C: Inference about non-sampled group]
 * - Constraints: [Percentage must be high to indicate "most"]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_394 = {
  metadata: {
    id: "394",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Evaluating Statistical Claims Observational Studies And Experiments",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const sampleSize = getRandomInt(150, 450);
    const dislikePercentage = getRandomInt(88, 97);
    // Each medium carries its own plurals and viewer phrase; the old text
    // built "television seriess" and "people who go see television seriess".
    const media = getRandomElement([
      { source: "book", sources: "books", adaptation: "movie", viewers: "people who go to see movies" },
      { source: "novel", sources: "novels", adaptation: "film", viewers: "people who go to see films" },
      { source: "comic book", sources: "comic books", adaptation: "movie", viewers: "people who go to see movies" },
      { source: "book", sources: "books", adaptation: "television series", viewers: "people who watch television series" }
    ]);
    const researcher = getRandomElement(["market researcher", "media studio", "polling firm", "production company"]);
    // Base forms follow "will"; past forms describe what people said. The old
    // text used past forms after "will" ("will did not enjoy", "will enjoyed").
    const v = getRandomElement([
      { like: "like", dislike: "dislike", liked: "liked", disliked: "disliked" },
      { like: "enjoy", dislike: "not enjoy", liked: "enjoyed", disliked: "did not enjoy" }
    ]);

    const optionsData = [
      {
        text: `At least ${dislikePercentage}% of ${media.viewers} will ${v.dislike} this ${media.adaptation}.`,
        isCorrect: false,
        reason: `it generalizes the result to all viewers of ${media.adaptation === 'television series' ? 'television series' : media.adaptation + 's'}, but the sample included only people who ${v.liked} the ${media.source}`
      },
      {
        text: `At least ${dislikePercentage}% of people who read ${media.sources} will ${v.dislike} this ${media.adaptation}.`,
        isCorrect: false,
        reason: `it generalizes the result to all readers of ${media.sources}, but the sample included only people who ${v.liked} this particular ${media.source}`
      },
      {
        text: `Most people who ${v.disliked} this ${media.source} will ${v.like} this ${media.adaptation}.`,
        isCorrect: false,
        reason: `it draws a conclusion about people who ${v.disliked} the ${media.source}, but the sample included only people who ${v.liked} the ${media.source}`
      },
      {
        text: `Most people who ${v.liked} this ${media.source} will ${v.dislike} this ${media.adaptation}.`,
        isCorrect: true,
        reason: ''
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The sample was selected at random from a group of people who indicated that they ${v.liked} the ${media.source}, so the result can be generalized only to that population. Since ${dislikePercentage}% of the people surveyed said they ${v.disliked} the ${media.adaptation}, it is appropriate to infer that most people who ${v.liked} the ${media.source} will ${v.dislike} the ${media.adaptation}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A ${researcher} selected ${sampleSize} people at random from a group of people who indicated that they ${v.liked} a certain ${media.source}. The ${sampleSize} people were shown a ${media.adaptation} based on the ${media.source} and then asked whether they ${v.liked} or ${v.disliked} the ${media.adaptation}. Of those surveyed, ${dislikePercentage}% said they ${v.disliked} the ${media.adaptation}. Which of the following inferences can appropriately be drawn from this survey result?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};