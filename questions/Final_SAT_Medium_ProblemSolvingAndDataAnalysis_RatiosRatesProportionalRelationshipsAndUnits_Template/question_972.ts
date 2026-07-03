import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 972
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [furlongs, yards/furlong, feet/yard]
 * - Difficulty factors: [Two-step conversion, large number result]
 * - Distractor patterns: [subtraction combo, addition combo, divide instead of multiply]
 * - Constraints: [Must multiply through both conversion factors]
 * - Question type: [Text -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * REPAIR NOTES:
 * - Distractor "reason" strings were plain double-quoted strings containing
 *   `$${feetPerYard}$`, so the interpolation was emitted literally
 *   (TEMPLATE_LEFTOVER) and its three `$` produced an odd dollar count
 *   (TEX_UNBALANCED). Reasons are now backticked template literals with live
 *   values, and the divide-distractor amount is described in prose.
 * - Added a bounded retry that resamples the inputs until all four option
 *   values are pairwise distinct (guards the small subtraction/addition
 *   distractors from colliding).
 */

export const generator_972 = {
  metadata: {
    id: "972",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    let furlongs = 0, yardsPerFurlong = 0, feetPerYard = 0;
    let totalYards = 0, totalFeet = 0;
    let distractorA = 0, distractorB = 0, distractorC = 0;

    // Bounded retry: guarantee four distinct option values.
    let tries = 0;
    do {
      furlongs = getRandomInt(200, 500);
      yardsPerFurlong = getRandomInt(180, 250);
      feetPerYard = getRandomInt(2, 5);

      totalYards = furlongs * yardsPerFurlong;
      totalFeet = totalYards * feetPerYard;

      distractorA = Math.abs(furlongs - yardsPerFurlong - feetPerYard); // subtracts the values
      distractorB = furlongs + Math.floor(yardsPerFurlong / feetPerYard); // adds a partial conversion
      distractorC = Math.floor(totalYards / feetPerYard); // divides by feet/yard instead of multiplying
    } while (
      tries++ < 50 &&
      new Set([distractorA, distractorB, distractorC, totalFeet]).size !== 4
    );

    const optionsData = [
      { text: distractorA.toLocaleString(), isCorrect: false, reason: `results from subtracting the given numbers instead of multiplying by the conversion factors` },
      { text: distractorB.toLocaleString(), isCorrect: false, reason: `results from adding a partial conversion instead of multiplying through both units` },
      { text: distractorC.toLocaleString(), isCorrect: false, reason: `divides by $${feetPerYard}$ instead of multiplying, undoing the yards-to-feet step` },
      { text: totalFeet.toLocaleString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `A distance of $${furlongs}$ furlongs is equivalent to how many feet? ($1\\text{ furlong} = ${yardsPerFurlong}\\text{ yards}$ and $1\\text{ yard} = ${feetPerYard}\\text{ feet}$)`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: totalFeet.toLocaleString(),
      explanation: `Choice ${correctLetter} is correct. Convert in two steps. First convert furlongs to yards: $${furlongs} \\times ${yardsPerFurlong} = ${totalYards.toLocaleString()}$ yards. Then convert yards to feet: $${totalYards.toLocaleString()} \\times ${feetPerYard} = ${totalFeet.toLocaleString()}$ feet. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
