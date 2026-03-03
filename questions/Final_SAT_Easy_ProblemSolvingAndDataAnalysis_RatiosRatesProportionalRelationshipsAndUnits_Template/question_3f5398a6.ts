import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 3f5398a6
*
* ORIGINAL ANALYSIS:
* - Number ranges: [ratio part 1: 1 (single-digit), ratio part 2: 5 (single-digit), time: 25 (result of ratio × 5)]
* - Difficulty factors: [Setting up proportion, solving for unknown, ratio interpretation]
* - Distractor patterns: [A: 10 (wrong ratio 2:5), B: 9 (random/unrelated), C: 6 (arithmetic error), D: 5 (correct)]
* - Constraints: [Ratio must simplify to small integers, answer must be integer]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None - word problem]
*/

export const generator_3f5398a6 = {
  metadata: {
    // id: "3f5398a6",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const ratioPart1 = getRandomInt(1, 3);
    const ratioPart2 = getRandomInt(3, 8);
    const multiplier = getRandomInt(3, 6);
    const timeInterval = ratioPart2 * multiplier;
    const correctDistance = ratioPart1 * multiplier;

    const distractor1 = ratioPart2 + multiplier;
    const distractor2 = Math.abs(ratioPart1 - ratioPart2) + multiplier;
    const distractor3 = Math.floor(timeInterval / ratioPart1);

    const optionsData = [
      { text: distractor3.toString(), isCorrect: false, reason: "results from incorrectly setting up the ratio or miscalculating" },
      { text: distractor2.toString(), isCorrect: false, reason: "is incorrect and does not follow from the given ratio" },
      { text: distractor1.toString(), isCorrect: false, reason: "is close but incorrect; perhaps from an arithmetic error" },
      { text: correctDistance.toString(), isCorrect: true, reason: null }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `The problem gives us a ratio of miles ($m$) to seconds ($k$) as ${ratioPart1} to ${ratioPart2}. This can be written as the proportion: $$\\frac{m}{k} = \\frac{${ratioPart1}}{${ratioPart2}}$$ We are given that the time interval $k$ is ${timeInterval} seconds. We need to find the number of miles, $m$. We can substitute $k = ${timeInterval}$ into our proportion: $$\\frac{m}{${timeInterval}} = \\frac{${ratioPart1}}{${ratioPart2}}$$ To solve for $m$, multiply both sides of the equation by $${timeInterval}$: $$m = \\frac{${ratioPart1}}{${ratioPart2}} \\times ${timeInterval}$$ $$m = ${ratioPart1} \\times ${multiplier}$$ $$m = ${correctDistance}$$ So, the person is $${correctDistance}$ miles away from the flash of lightning. Why other options are incorrect: Choice ${incorrectOptions[0].letter} is incorrect and ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect and ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect and ${incorrectOptions[2].reason}.`;

    return {
      questionText: `For a person $m$ miles from a flash of lightning, the length of the time interval from the moment the person sees the lightning to the moment the person hears the thunder is $k$ seconds. The ratio of $m$ to $k$ can be estimated to be $${ratioPart1}$ to $${ratioPart2}$. According to this estimate, the person is how many miles from a flash of lightning if the time interval is $${timeInterval}$ seconds?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctDistance.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: 86636d8f
*
* ORIGINAL ANALYSIS:
* - Number ranges: [total cost: 27 (double-digit), unit cost: 3 (single-digit), answer: 9]
* - Difficulty factors: [Division, unit rate understanding]
* - Distractor patterns: [None - fill in blank, but common errors: 81 (multiplied), 24 (subtracted), 30 (added), 9 (correct)]
* - Constraints: [total cost must be divisible by unit cost for integer answer]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None - word problem]
*/
