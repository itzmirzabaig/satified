import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 89541f9b
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 5, -3, constant: 4]
 * - Difficulty factors: [Linear inequality testing, multiple point verification]
 * - Distractor patterns: [I only, II only, I and II only, I and III only]
 * - Constraints: [Must test each ordered pair]
 * - Question type: [Multiple Choice Text with roman numerals]
 * - Figure generation: [None]
 */

export const generator_89541f9b = {
  metadata: {
    // id: "89541f9b",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(3, 7);
    const b = getRandomInt(-5, -2);
    const c = getRandomInt(3, 8);
    const x1 = 1;
    const y1 = 1;
    const x2 = 2;
    const y2 = Math.floor((a * x2 - c) / Math.abs(b)) + 2;
    const x3 = 3;
    const y3 = 2;
    const check1 = a * x1 + b * y1 < c;
    const check2 = a * x2 + b * y2 < c;
    const check3 = a * x3 + b * y3 < c;

    let resultPattern = "C";
    if (check1 && check2 && !check3) resultPattern = "C";
    else if (check1 && !check2 && check3) resultPattern = "D";
    else if (!check1 && check2 && check3) resultPattern = "B";
    else if (check1 && !check2 && !check3) resultPattern = "A";

    const optionsData = [
      { text: `I only`, isCorrect: resultPattern === "A" },
      { text: `II only`, isCorrect: resultPattern === "B" },
      { text: `I and II only`, isCorrect: resultPattern === "C" },
      { text: `I and III only`, isCorrect: resultPattern === "D" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const val1 = a * x1 + b * y1;
    const val2 = a * x2 + b * y2;
    const val3 = a * x3 + b * y3;

    const explanation = `Choice ${correctLetter} is correct. Testing each point in $${a}x ${b >= 0 ? '+' : '-'}${Math.abs(b)}y < ${c}$: I. (${x1}, ${y1}): ${val1} < ${c} is ${val1 < c}. II. (${x2}, ${y2}): ${val2} < ${c} is ${val2 < c}. III. (${x3}, ${y3}): ${val3} < ${c} is ${val3 < c}. Therefore, ${correctOption.text}.`;

    return {
      questionText: `Which of the following ordered pairs $(x, y)$ satisfies the inequality $${a}x ${b >= 0 ? '+' : '-'}${Math.abs(b)}y < ${c}$ ?\nI. $(${x1}, ${y1})$\nII. $(${x2}, ${y2})$\nIII. $(${x3}, ${y3})$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 84d0d07e
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [shirt: $15, pants: $25, budget: $120]
 * - Difficulty factors: [Cost modeling, "at most" interpretation]
 * - Distractor patterns: [A=correct with <=, B=wrong sign >=, C=swapped prices, D=swapped prices with wrong sign]
 * - Constraints: [Must match price to correct variable]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */