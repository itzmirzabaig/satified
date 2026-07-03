import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 944
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [increase: 6%, result: 318, original: 300]
 * - Difficulty factors: [Working backwards from increased value to original]
 * - Distractor patterns: [A: 199 (wrong formula), B: 299 (off by 1), D: 337 (increased instead of decreased)]
 * - Constraints: [n = result / (1 + percent/100)]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_944 = {
  metadata: {
    id: "944",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Answer-first construction so the result is an EXACT integer and
    // n = result / (1 + percent/100) recovers the original exactly.
    //
    // For an integer increase we need original*percent divisible by 100, so we
    // pick a percent and draw the original as a multiple of 100/gcd(percent,100).
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

    let percent = 0, original = 0, result = 0;
    let distractorDown = 0, distractorUp = 0, distractorNaive = 0;
    let tries = 0;
    do {
      percent = getRandomElement([4, 5, 8, 10, 12, 15, 20, 25]);
      const step = 100 / gcd(percent, 100); // original must be a multiple of this
      const lo = Math.ceil(150 / step);
      const hi = Math.floor(400 / step);
      original = getRandomInt(lo, hi) * step; // clean integer in [150, 400]

      result = original + (original * percent) / 100; // exact integer

      // Distractors (each a genuine student error):
      // - reverse a % increase by taking a % decrease of the result
      distractorDown = Math.round(result * (1 - percent / 100));
      // - increase the result again instead of undoing the increase
      distractorUp = Math.round(result * (1 + percent / 100));
      // - subtract the percentage as a raw amount from the result
      distractorNaive = result - percent;
    } while (
      tries++ < 50 &&
      new Set([original, distractorDown, distractorUp, distractorNaive]).size !== 4
    );

    // Multiplier shown in the explanation, e.g. 1.10 -> "1.1", 1.25 -> "1.25".
    const multiplierStr = (1 + percent / 100).toFixed(2).replace(/\.?0+$/, '');

    const correctText = original.toString();

    const optionsData = [
      { text: distractorDown.toString(), isCorrect: false, reason: `reverses the increase by taking ${percent}% off the result instead of dividing by $\\left(1 + \\frac{${percent}}{100}\\right)$` },
      { text: distractorNaive.toString(), isCorrect: false, reason: `subtracts ${percent} from the result instead of removing the ${percent}% increase` },
      { text: correctText, isCorrect: true },
      { text: distractorUp.toString(), isCorrect: false, reason: `increases the result by ${percent}% instead of finding the original value` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 3: Return question data
    return {
      questionText: `A number $n$ is increased by ${percent}%. If the result is ${result}, what is the value of $n$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Increasing $n$ by ${percent}% gives $n\\left(1 + \\frac{${percent}}{100}\\right) = ${result}$. Solving for $n$: $n = \\frac{${result}}{${multiplierStr}} = ${correctText}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
