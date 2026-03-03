import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: a9039591
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, intercept: 25-35]
 * - Difficulty factors: [Modeling from table]
 * - Distractor patterns: [swapped m and b, incorrect slope, incorrect values]
 * - Constraints: [None]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_a9039591 = {
  metadata: {
    // id: "a9039591",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(2, 5);

    const intercept = getRandomInt(25, 35);

    const tableCode = `<table><thead><tr><th>$x$</th><th>$f(x)$</th></tr></thead><tbody><tr><td>0</td><td>${intercept}</td></tr><tr><td>1</td><td>${slope + intercept}</td></tr><tr><td>2</td><td>${2 * slope + intercept}</td></tr></tbody></table>`;

    const correctEquation = `f(x) = ${slope}x + ${intercept}`;

    const distractorB = `f(x) = ${intercept}x + ${slope + intercept}`;

    const distractorC = `f(x) = ${2 * slope}x + ${intercept}`;

    const distractorD = `f(x) = ${slope + intercept}x + ${2 * slope + intercept}`;

    const optionsData = [
      { text: correctEquation, isCorrect: true },
      { text: distractorB, isCorrect: false, reason: "swaps the slope and intercept values" },
      { text: distractorC, isCorrect: false, reason: "uses an incorrect slope" },
      { text: distractorD, isCorrect: false, reason: "uses incorrect values from the table" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For the linear function $f$, the table shows three values of $x$ and their corresponding values of $f(x)$. Which equation defines $f(x)$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. When $x=0$, $f(x)=${intercept}$, so $b=${intercept}$. When $x=1$, $f(x)=${slope + intercept}$, so the slope is ${slope + intercept} - ${intercept} = ${slope}$. Thus $f(x) = ${slope}x + ${intercept}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: a396ed75
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rate: decimal 4.0-8.9]
 * - Difficulty factors: [Modeling from rate]
 * - Distractor patterns: [divides by rate, adds rate, subtracts rate]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

