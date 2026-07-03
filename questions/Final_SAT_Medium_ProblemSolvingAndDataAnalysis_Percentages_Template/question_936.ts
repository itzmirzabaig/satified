import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 936
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [multiplier: 1.13, base: 100, percent greater: 13%]
 * - Difficulty factors: [Given multiplier, find percent increase]
 * - Distractor patterns: [A: 11.3 (confusing with 0.113), C: 130 (using 1.3), D: 213 (random error)]
 * - Constraints: [Percent greater = (multiplier - 1) * 100]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_936 = {
  metadata: {
    id: "936",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: 1.13 times 100, find percent greater.
    // percentIncrease is an integer, so with base = 100 the value z = base + p
    // is an exact integer and the multiplier 1 + p/100 has exactly 2 decimals.
    const percentIncrease = getRandomInt(5, 35);
    const base = 100; // Keep base at 100 for clean calculation.

    // Exact integer value of z; no float artifact from base * (1 + p/100).
    const z = base + percentIncrease;
    const multiplierStr = (1 + percentIncrease / 100).toFixed(2); // e.g. "1.13"

    // STEP 2: Build options (answer is the percent, a plain number).
    // Distractors verified distinct for every p in [5, 35] by exhaustive check.
    const correctText = percentIncrease.toString();
    const decimalStr = (percentIncrease / 100).toFixed(2).replace(/\.?0+$/, ''); // 0.13

    const optionsData = [
      { text: decimalStr, isCorrect: false, reason: `is the decimal form of the increase, not the percent` },
      { text: correctText, isCorrect: true },
      { text: (percentIncrease * 10).toString(), isCorrect: false, reason: "results from misplacing the decimal point" },
      { text: (100 + percentIncrease).toString(), isCorrect: false, reason: "is the value of $z$ itself, not how much greater it is than 100" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 3: Return question data
    return {
      questionText: `The value of $z$ is ${multiplierStr} times ${base}. The value of $z$ is what percent greater than ${base}?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. If $z = ${multiplierStr} \\times ${base}$, then $z = ${z}$. The percent by which $z$ is greater than ${base} is $\\frac{${z - base}}{${base}} \\times 100$, which equals ${percentIncrease}. So $z$ is ${percentIncrease}\\% greater than ${base}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
