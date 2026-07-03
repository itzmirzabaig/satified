import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1422
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [140, 10]
 * - Difficulty factors: ["Percent greater than" formulation]
 * - Distractor patterns: [Confusing percentage with absolute difference]
 * - Constraints: [140 = (1 + p/100) * 10, so p = 1300]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_1422 = {
  metadata: {
    id: "1422",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // result = (1 + p/100) * baseValue, with result = baseValue * multiplier.
    // => p = (multiplier - 1) * 100  (a clean integer for every draw).
    // multiplier starts at 11 so the "inverted ratio" distractor
    // round(10000/multiplier) can never equal multiplier*100 (they only
    // collide at multiplier = 10). Verified 0 collisions over the whole grid.
    let baseValue = getRandomInt(8, 25);
    let multiplier = getRandomInt(11, 25); // large multiplier for a "hard" feel

    let result = baseValue * multiplier;
    let percentGreater = (multiplier - 1) * 100; // correct value of p

    // Distractors (each a specific misconception)
    let simpleMultiple = multiplier * 100;                        // multiplier read as the percent
    let absoluteDiff = result - baseValue;                        // absolute difference, not percent
    let invertedPct = Math.round((baseValue / result) * 10000);  // inverted ratio

    // Defensive: guarantee four distinct values (already collision-free over the
    // declared range, but keep a bounded resample so no draw can ever dup).
    let tries = 0;
    while (
      tries++ < 50 &&
      new Set([percentGreater, simpleMultiple, absoluteDiff, invertedPct]).size < 4
    ) {
      baseValue = getRandomInt(8, 25);
      multiplier = getRandomInt(11, 25);
      result = baseValue * multiplier;
      percentGreater = (multiplier - 1) * 100;
      simpleMultiple = multiplier * 100;
      absoluteDiff = result - baseValue;
      invertedPct = Math.round((baseValue / result) * 10000);
    }

    const optionsData = [
      { text: simpleMultiple.toString(), isCorrect: false, reason: "confuses the multiplier with the percentage" },
      { text: percentGreater.toString(), isCorrect: true, reason: "" },
      { text: absoluteDiff.toString(), isCorrect: false, reason: "gives the absolute difference instead of the percentage" },
      { text: invertedPct.toString(), isCorrect: false, reason: "inverts the ratio" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption?.letter || 'B';
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `${result} is $p$% greater than ${baseValue}. What is the value of $p$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: percentGreater.toString(),
      explanation: `Choice ${correctLetter} is correct. Saying ${result} is $p$% greater than ${baseValue} means ${result} $= \\left(1 + \\frac{p}{100}\\right)(${baseValue})$. Dividing both sides by ${baseValue} gives $\\frac{${result}}{${baseValue}} = 1 + \\frac{p}{100}$, so $\\frac{p}{100} + 1 = ${multiplier}$. Then $\\frac{p}{100} = ${multiplier - 1}$, so $p = ${percentGreater}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
