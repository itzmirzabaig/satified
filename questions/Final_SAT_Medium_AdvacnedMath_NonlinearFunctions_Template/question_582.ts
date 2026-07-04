import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 582
 *
 * ORIGINAL ANALYSIS:
 * - Type: Exponential function table evaluation
 * - Number ranges: base coefficient a in [2,5], shift b in [1,5]; x = 1,2,3
 *   giving y values in [11,43]
 * - Difficulty: Medium - evaluating an exponential function at a table value
 * - Distractor patterns: forgot the shift, forgot the coefficient, added
 *   instead of multiplied
 * - Figure generation: HTML table showing (x, y) for x = 1, 2, 3
 */

export const generator_582 = {
  metadata: {
    id: "582",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Coefficient and shift for y = a(2^x) + b
    const a = getRandomInt(2, 5);
    const b = getRandomInt(1, 5);

    // Table values for x = 1, 2, 3
    const y1 = a * Math.pow(2, 1) + b;
    const y2 = a * Math.pow(2, 2) + b;
    const y3 = a * Math.pow(2, 3) + b;

    // Build the table the stem refers to (encodes the actual values).
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">$x$</th><th style="border: 1px solid currentColor; padding: 8px;">$y$</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">1</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">2</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">3</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y3}</td></tr></tbody></table>`;

    const questionText = `The table shows three values of $x$ and their corresponding values of $y$ for the equation $y=${a}(2)^{x}+${b}$. What is the value of $y$ when $x=3$?`;

    const correctAnswer = y3.toString();

    // Distractors from common errors. Across a in [2,5], b in [1,5] each is
    // distinct from the correct answer and from one another:
    //   d1 = 8a      (differs from y3 = 8a + b by b >= 1)
    //   d2 = a + b   (<= 10, well below y3 >= 17)
    //   d3 = 8 + b   (equals y3 only if a = 1, but a >= 2)
    const distractor1 = (a * Math.pow(2, 3)).toString();       // forgot to add the shift b
    const distractor2 = (a + b).toString();                     // added instead of multiplied
    const distractor3 = (Math.pow(2, 3) + b).toString();        // dropped the coefficient a

    const optionsData = [
      { text: distractor1, isCorrect: false, reason: "forgets to add the constant term" },
      { text: distractor2, isCorrect: false, reason: "adds the coefficient and constant instead of multiplying" },
      { text: distractor3, isCorrect: false, reason: "drops the coefficient of the power" },
      { text: correctAnswer, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Substituting $x=3$ into $y=${a}(2)^{x}+${b}$: $y=${a}(2)^{3}+${b}=${a}(8)+${b}=${a * 8}+${b}=${y3}$, which matches the table. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer,
      explanation
    };
  }
};
