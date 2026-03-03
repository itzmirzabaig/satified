import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 12983c1e
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, intercept: 1-5]
 * - Difficulty factors: [Finding linear equation from table]
 * - Distractor patterns: [sum of m and b as coeff, swapped m and b, wrong slope]
 * - Constraints: [None]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_12983c1e = {
  metadata: {
    // id: "12983c1e",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(2, 5);
    const intercept = getRandomInt(1, 5);

    const tableCode = `<table style="border-collapse: collapse; background: transparent;"><thead><tr><th style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">$x$</th><th style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">$f(x)$</th></tr></thead><tbody><tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">1</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">${slope + intercept}</td></tr><tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">3</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">${3 * slope + intercept}</td></tr><tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">5</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">${5 * slope + intercept}</td></tr></tbody></table>`;

    const correctEquation = `f(x)=${slope}x+${intercept}`;
    const distractorA = `f(x)=${slope + intercept}x`;
    const distractorB = `f(x)=${intercept}x+${slope + intercept}`;
    const distractorC = `f(x)=${5 * slope}x+${intercept}`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "incorrectly adds slope and intercept for the coefficient" },
      { text: distractorB, isCorrect: false, reason: "swaps slope and intercept values" },
      { text: distractorC, isCorrect: false, reason: "uses an incorrect slope value" },
      { text: correctEquation, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Some values of the linear function $f$ are shown in the table above. Which of the following defines $f$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. The slope is $\\frac{${3 * slope + intercept} - ${slope + intercept}}{3 - 1} = ${slope}$. Using point $(1, ${slope + intercept})$: ${slope + intercept} = ${slope}(1) + b$, so $b = ${intercept}$. Thus $f(x) = ${slope}x + ${intercept}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: aeaba0b6
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [baseCost: 10-20, perGame: 3-6]
 * - Difficulty factors: [Solving linear equation]
 * - Constraints: [None]
 * - Question type: [Solve for x→Fill in blank]
 * - Figure generation: null
 */