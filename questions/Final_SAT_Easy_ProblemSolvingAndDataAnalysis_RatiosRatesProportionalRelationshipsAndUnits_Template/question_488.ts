import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 488
*
* ORIGINAL ANALYSIS:
* - Number ranges: [ratio part 1: 1 (single-digit), ratio part 2: 5 (single-digit), time: 25 (result of ratio × 5)]
* - Difficulty factors: [Setting up proportion, solving for unknown, ratio interpretation]
* - Distractor patterns: [A: 10 (wrong ratio 2:5), B: 9 (random/unrelated), C: 6 (arithmetic error), D: 5 (correct)]
* - Constraints: [Ratio must simplify to small integers, answer must be integer]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None - word problem]
*/

export const generator_488 = {
  metadata: {
    id: "488",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Sound travels about 1 mile in 5 seconds, so the ratio of m to k is
    // about 1/5 (the official question's estimate). The ratio used to be
    // random, up to 3/3, which put a storm 18 miles away after 30 seconds.
    // The distance is never 5, so it differs from the "5" choice.
    let correctDistance = 0;
    do { correctDistance = getRandomInt(2, 9); } while (correctDistance === 5);
    const timeInterval = 5 * correctDistance;

    // Wrong choices are real slips: the time used as the distance, the ratio
    // used upside down (5 miles per second), and the 5 seconds per mile from
    // the ratio. The old reasons were tied to fixed slots, so after a value
    // was nudged to avoid a repeat, its reason no longer matched it.
    const optionsData = [
      { text: `${timeInterval}`, isCorrect: false, reason: `${timeInterval} is the time interval, $k$, in seconds, not the distance in miles` },
      { text: `${5 * timeInterval}`, isCorrect: false, reason: `${5 * timeInterval} results from using the ratio upside down, multiplying the ${timeInterval} seconds by 5 instead of multiplying by $\\frac{1}{5}$` },
      { text: `5`, isCorrect: false, reason: `5 is the number of seconds per mile given by the ratio, not the distance for a time interval of ${timeInterval} seconds` },
      { text: `${correctDistance}`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The ratio of $m$ to $k$ is estimated to be $\\frac{1}{5}$, so $\\frac{m}{k} = \\frac{1}{5}$. Substituting $k = ${timeInterval}$ gives $\\frac{m}{${timeInterval}} = \\frac{1}{5}$. Multiplying both sides by ${timeInterval} gives $m = \\frac{${timeInterval}}{5} = ${correctDistance}$. So the person is ${correctDistance} miles from the flash of lightning. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `For a person $m$ miles from a flash of lightning, the length of the time interval from the moment the person sees the lightning to the moment the person hears the thunder is $k$ seconds. The ratio of $m$ to $k$ can be estimated to be 1 to 5. According to this estimate, the person is how many miles from a flash of lightning if the time interval is ${timeInterval} seconds?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: `${correctDistance}`,
      explanation: explanation
    };
  }
};
