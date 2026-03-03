import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 96924
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [15 horses, weight adjustment: -10 pounds]
 * - Difficulty factors: [Understanding which statistic is robust to outlier changes]
 * - Distractor patterns: [Thinking all change, confusing range/mean/std dev effects]
 * - Constraints: [Only median of ordered data is unchanged by extreme value adjustment]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_96924 = {
  metadata: {
    // id: "96924",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const numHorses = 15;
    const weightAdjustment = getRandomInt(5, 15);
    
    const optionsData = [
      { text: `Mean`, isCorrect: false },
      { text: `Median`, isCorrect: true },
      { text: `Range`, isCorrect: false },
      { text: `Standard deviation`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `The weights, in pounds, for ${numHorses} horses in a stable were reported, and the mean, median, range, and standard deviation for the data were found. The horse with the lowest reported weight was found to actually weigh ${weightAdjustment} pounds less than its reported weight. What value remains unchanged if the four values are reported using the corrected weight?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The median weight is found by ordering the horses' weights from least to greatest and then determining the middle value from this list of weights. Decreasing the value for the horse with the lowest weight doesn't affect the median since it's still the lowest value and the middle position remains unchanged. Choice ${incorrectOptions[0].letter} is incorrect because the mean is calculated using all values and would decrease when the minimum decreases. Choice ${incorrectOptions[1].letter} is incorrect because decreasing the minimum increases the range (Max - Min). Choice ${incorrectOptions[2].letter} is incorrect because standard deviation depends on the mean, which changes when any value changes.`
    };
  }
};

/**
 * Question ID: 9110c120
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base value: 5, outlier: 100]
 * - Difficulty factors: [Comparing mean and median with/without outlier]
 * - Distractor patterns: [Thinking both change, thinking neither changes]
 * - Constraints: [Same values plus outlier changes mean but not median]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */