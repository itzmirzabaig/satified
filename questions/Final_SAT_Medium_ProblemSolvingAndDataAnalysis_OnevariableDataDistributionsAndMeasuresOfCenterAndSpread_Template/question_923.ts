import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 923
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [15 horses, weight adjustment: -10 pounds]
 * - Difficulty factors: [Understanding which statistic is robust to outlier changes]
 * - Distractor patterns: [Thinking all change, confusing range/mean/std dev effects]
 * - Constraints: [Only median of ordered data is unchanged by extreme value adjustment]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_923 = {
  metadata: {
    id: "923",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const numHorses = 15;
    const weightAdjustment = getRandomInt(5, 15);
    
    // Each distractor carries its OWN reason so the justification travels with
    // the option through the shuffle (reasons are measure-specific).
    const optionsData = [
      { text: `Mean`, isCorrect: false, reason: `the mean is calculated using all values and would decrease when the minimum decreases` },
      { text: `Median`, isCorrect: true, reason: `` },
      { text: `Range`, isCorrect: false, reason: `decreasing the minimum increases the range (Max - Min)` },
      { text: `Standard deviation`, isCorrect: false, reason: `standard deviation depends on the mean, which changes when any value changes` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    // Emit distractor reasons in display (letter) order, each tied to its own option.
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    const distractorSentences = incorrectOptions
      .map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`)
      .join(' ');

    return {
      questionText: `The weights, in pounds, for ${numHorses} horses in a stable were reported, and the mean, median, range, and standard deviation for the data were found. The horse with the lowest reported weight was found to actually weigh ${weightAdjustment} pounds less than its reported weight. What value remains unchanged if the four values are reported using the corrected weight?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The median weight is found by ordering the horses' weights from least to greatest and then determining the middle value from this list of weights. Decreasing the value for the horse with the lowest weight doesn't affect the median since it's still the lowest value and the middle position remains unchanged. ${distractorSentences}`
    };
  }
};
