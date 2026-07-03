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
    const ratioPart1 = getRandomInt(1, 3);
    const ratioPart2 = getRandomInt(3, 8);
    const multiplier = getRandomInt(3, 6);
    const timeInterval = ratioPart2 * multiplier;      // = k
    const correctDistance = ratioPart1 * multiplier;   // = m = (r1/r2) * k

    // Build three plausible-but-wrong integer distractors, then guarantee they
    // are distinct from the answer and from each other with a bounded guard.
    const used = new Set<number>([correctDistance]);
    const distractors: number[] = [];
    const candidates = [
      timeInterval,                       // used the time value k as the distance
      ratioPart1 + timeInterval,          // added r1 to the time instead of scaling
      correctDistance + multiplier,       // one extra scaling step, (r1+1)*multiplier
      ratioPart2 * multiplier + ratioPart1, // proportion set up upside down
      correctDistance + ratioPart2,       // added r2 after finding m
    ];
    let ci = 0;
    while (distractors.length < 3) {
      let v = ci < candidates.length ? candidates[ci] : correctDistance + distractors.length + 1;
      ci++;
      let guard = 0;
      while (used.has(v) && guard++ < 50) v += 1;
      if (used.has(v)) continue;
      used.add(v);
      distractors.push(v);
    }

    const optionsData = [
      { text: distractors[0].toString(), isCorrect: false, reason: "confuses the time value with the number of miles rather than scaling the ratio." },
      { text: distractors[1].toString(), isCorrect: false, reason: "comes from adding values in the problem instead of solving the proportion." },
      { text: distractors[2].toString(), isCorrect: false, reason: "results from an error while scaling the ratio to the given time." },
      { text: correctDistance.toString(), isCorrect: true, reason: null }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The ratio of miles $m$ to seconds $k$ is $\\frac{${ratioPart1}}{${ratioPart2}}$, so $\\frac{m}{k} = \\frac{${ratioPart1}}{${ratioPart2}}$. Substituting the given time $k = ${timeInterval}$ gives $\\frac{m}{${timeInterval}} = \\frac{${ratioPart1}}{${ratioPart2}}$. Multiplying both sides by the time gives $m = \\frac{${ratioPart1}}{${ratioPart2}} \\times ${timeInterval} = ${ratioPart1} \\times ${multiplier} = ${correctDistance}$. So the person is $m = ${correctDistance}$ miles from the flash of lightning. Choice ${incorrectOptions[0].letter} is incorrect because it ${incorrectOptions[0].reason} Choice ${incorrectOptions[1].letter} is incorrect because it ${incorrectOptions[1].reason} Choice ${incorrectOptions[2].letter} is incorrect because it ${incorrectOptions[2].reason}`;

    return {
      questionText: `For a person $m$ miles from a flash of lightning, the length of the time interval from the moment the person sees the lightning to the moment the person hears the thunder is $k$ seconds. The ratio of $m$ to $k$ can be estimated to be $\\frac{${ratioPart1}}{${ratioPart2}}$. According to this estimate, the person is how many miles from a flash of lightning if the time interval is $k = ${timeInterval}$ seconds?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctDistance.toString(),
      explanation: explanation
    };
  }
};
