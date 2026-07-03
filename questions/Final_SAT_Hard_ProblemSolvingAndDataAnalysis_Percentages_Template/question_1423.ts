import { getRandomInt, shuffle, round } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1423
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [14%, 4% (small percentages)]
 * - Difficulty factors: [Compound percentage growth, multiplicative vs additive thinking]
 * - Distractor patterns: [Adding percentages, multiplying percentages incorrectly]
 * - Constraints: [Must compound correctly: 1.14 * 1.04]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - compound percentage problem]
 */

export const generator_1423 = {
  metadata: {
    id: "1423",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Two successive percent increases compound multiplicatively:
    //   y = (1 + P1/100)(1 + P2/100).
    // P1, P2 are integers, so each factor has at most 2 decimals and the
    // product has at most 4 decimals -> every value below is exact (no float
    // artifacts) once rounded to 4 dp.
    const P1 = getRandomInt(8, 20); // first-year increase
    const P2 = getRandomInt(3, 12); // second-year increase

    const multiplier1 = round(1 + P1 / 100, 2); // e.g. 1.14 (exact)
    const multiplier2 = round(1 + P2 / 100, 2); // e.g. 1.05 (exact)
    const totalMultiplier = round(multiplier1 * multiplier2, 4); // correct y

    // Distractors (each a specific misconception), all rounded to 4 dp so no
    // value can show a float artifact. Verified collision-free over the range.
    const additiveError = round(1 + (P1 + P2) / 100, 4);   // add the percents
    const multiplyPcts = round(1 + (P1 * P2) / 10000, 4);  // multiply the percents as decimals
    const smallError = round(1 + (P1 * P2) / 100, 4);      // multiply the whole-number percents

    const optionsData = [
      { text: smallError.toString(), isCorrect: false, reason: "comes from multiplying the two whole-number percentages together" },
      { text: multiplyPcts.toString(), isCorrect: false, reason: "comes from multiplying the two percentages as decimals" },
      { text: additiveError.toString(), isCorrect: false, reason: "comes from adding the percentages instead of compounding them" },
      { text: totalMultiplier.toString(), isCorrect: true, reason: "" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption?.letter || 'D';
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In 2008, an employee earned ${P1}% more than in 2007, and in 2009 the employee earned ${P2}% more than in 2008. If the employee earned $y$ times as much in 2009 as in 2007, what is the value of $y$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: totalMultiplier.toString(),
      explanation: `Choice ${correctLetter} is correct. Let the 2007 earnings be $x$. Increasing by ${P1}% makes the 2008 earnings $(${multiplier1})x$, and increasing that by a further ${P2}% makes the 2009 earnings $(${multiplier2})(${multiplier1})x = ${totalMultiplier}x$. So $y = ${totalMultiplier}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
