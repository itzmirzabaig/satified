import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 941
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [first percent: 40%, second percent: 30%, result: 12%]
 * - Difficulty factors: [Successive percentage of a percentage, compound percentage calculation]
 * - Distractor patterns: [A: 10% (subtraction), C: 70% (addition), D: 75% (division)]
 * - Constraints: [Must multiply percentages: 0.40 * 0.30 = 0.12 = 12%]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_941 = {
  metadata: {
    id: "941",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (percentages that are multiples of 10).
    // Original: 40% and 30% -> 12%. Redraw until the correct answer and all
    // three distractors are pairwise distinct (guaranteed to terminate: only
    // 1 of the 16 combinations collides, so the retry almost never fires).
    let percent1 = 0, percent2 = 0, result = 0;
    let distractorAdd = 0, distractorSub = 0, distractorSecond = 0;
    let tries = 0;
    do {
      percent1 = getRandomInt(2, 5) * 10; // 20, 30, 40, 50
      percent2 = getRandomInt(2, 5) * 10; // 20, 30, 40, 50
      result = (percent1 * percent2) / 100;   // compound percentage (correct answer)
      distractorAdd = percent1 + percent2;    // adding the percentages
      distractorSub = Math.abs(percent1 - percent2); // subtracting the percentages
      distractorSecond = percent2;            // reporting only the second percentage
    } while (
      tries++ < 50 &&
      new Set([result, distractorAdd, distractorSub, distractorSecond]).size !== 4
    );

    // STEP 2: Build display strings.
    const correctText = `${result}\\%`;
    // Decimal form of the answer, e.g. 12 -> "0.12", 4 -> "0.04". Always a
    // clean two-place decimal because result is a multiple of 1 in [4, 25].
    const productDecimal = (result / 100).toFixed(2); // "0.04" .. "0.25"
    const p1Decimal = (percent1 / 100).toFixed(2);    // "0.20" .. "0.50"
    const p2Decimal = (percent2 / 100).toFixed(2);    // "0.20" .. "0.50"

    // STEP 3: Options.
    const optionsData = [
      { text: `${distractorSub}\\%`, isCorrect: false, reason: "results from subtracting the percentages instead of multiplying them" },
      { text: correctText, isCorrect: true },
      { text: `${distractorAdd}\\%`, isCorrect: false, reason: "results from adding the percentages instead of multiplying them" },
      { text: `${distractorSecond}\\%`, isCorrect: false, reason: "gives only the second percentage without applying it to the first group" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 4: Return question data
    return {
      questionText: `In a group, ${percent1}% of the items are red. Of all the red items in the group, ${percent2}% also have stripes. What percentage of the items in the group are red with stripes?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. To find the percentage of items that are both red and have stripes, take ${percent2}\\% of ${percent1}\\%. In decimal form: $${p1Decimal} \\times ${p2Decimal} = ${productDecimal}$, which equals ${result}\\%. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
