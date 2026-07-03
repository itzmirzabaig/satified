import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1405
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [20%, 360 marbles]
 * - Difficulty factors: [Reverse percentage problem, careful reading required]
 * - Distractor patterns: [20% of remaining, using 360 as total, wrong percentage]
 * - Constraints: [80% of original = 360, so original = 450, removed = 90]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - word problem]
 */

export const generator_1405 = {
  metadata: {
    id: "1405",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Answer-first construction so every value is an exact integer and the
    // displayed equation 0.<remainingPct>x = remaining is literally true.
    // Pick pctRemoved, then choose `original` as a multiple of 100/gcd(pct,100)
    // so that both `removed` and `remaining` come out as whole marbles.
    const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

    const pctRemoved = getRandomInt(15, 35);       // 15-35% removed
    const remainingPct = 100 - pctRemoved;         // percent that stayed
    const step = 100 / gcd(pctRemoved, 100);       // keeps removed/remaining integral
    const loK = Math.ceil(200 / step);
    const hiK = Math.floor(800 / step);
    const k = getRandomInt(loK, hiK);
    const original = k * step;                     // original number of marbles
    const removed = (original * pctRemoved) / 100; // exact integer
    const remaining = original - removed;          // exact integer

    // Distractors (all provably distinct from `removed` and each other across
    // the full range — verified over every draw):
    const pctOfRemaining = Math.round((remaining * pctRemoved) / 100); // % of what's left
    const wrongCalc = Math.round((remaining * 100) / pctRemoved);      // divides by wrong %

    const optionsData = [
      { text: pctOfRemaining.toString(), isCorrect: false, reason: "incorrectly takes the percentage of the marbles that remained instead of the original amount" },
      { text: removed.toString(), isCorrect: true, reason: "" },
      { text: original.toString(), isCorrect: false, reason: "gives the original number of marbles rather than the number removed" },
      { text: wrongCalc.toString(), isCorrect: false, reason: "divides the remaining count by the percentage removed instead of the percentage that remained" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption?.letter || 'B';
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `After ${pctRemoved}% of the original number of marbles in a group were removed from the group, ${remaining} marbles remained in the group. How many marbles were removed from the group?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: removed.toString(),
      explanation: `Choice ${correctLetter} is correct. If ${pctRemoved}% of the marbles were removed, then ${remainingPct}% of the marbles remained. Let $x$ be the original number of marbles. Then $\\frac{${remainingPct}}{100}\\,x = ${remaining}$, so $x = ${remaining} \\times \\frac{100}{${remainingPct}} = ${original}$. The number removed is $x - ${remaining} = ${original} - ${remaining} = ${removed}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
