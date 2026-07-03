import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1417
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [large percentage increase (multiple of 100%), mid-range result]
 * - Difficulty factors: [Very large percentage increase, careful algebraic setup]
 * - Distractor patterns: [Dividing by (P/100) instead of (1 + P/100), multiplying
 *   instead of dividing, giving the amount of increase instead of the original]
 * - Constraints: [x·(1 + P/100) = result, solve for x]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - algebraic percentage problem]
 *
 * NUMBER CONSTRUCTION (answer-first, exact integers):
 *   Draw the multiplier m = 1 + P/100 as an integer in [11, 26], so the percentage
 *   increase P = (m − 1)·100 is a multiple of 100% in [1000%, 2500%] (a "very large"
 *   increase, matching the intent). Draw x as a small integer and set
 *   result = x·m, which is exact. Then x = result / m is provably the answer for
 *   every draw. Distractors are the three classic wrong methods; a bounded retry
 *   guarantees all four options are pairwise distinct.
 */

export const generator_1417 = {
  metadata: {
    id: "1417",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    let x = 0;
    let multiplier = 0;      // m = 1 + P/100  (integer 11..26)
    let increasePct = 0;     // P = (m-1)*100  (1000..2500)
    let result = 0;          // x * m
    let wrongMultiply = 0;   // result * m   (multiplied instead of divided)
    let wrongDivideDecimal = 0; // round(result / (m-1))  (divided by P/100)
    let increaseAmount = 0;  // result - x   (the increase itself, not the original)

    let tries = 0;
    do {
      multiplier = getRandomInt(11, 26);         // 1 + P/100
      increasePct = (multiplier - 1) * 100;      // 1000 .. 2500, always a multiple of 100
      x = getRandomInt(12, 40);                  // the value the student solves for
      result = x * multiplier;                   // exact integer

      wrongMultiply = result * multiplier;
      wrongDivideDecimal = Math.round(result / (multiplier - 1));
      increaseAmount = result - x;               // = x*(m-1)
      tries++;
    } while (
      // Ensure the four option VALUES are pairwise distinct.
      (new Set([x, wrongMultiply, wrongDivideDecimal, increaseAmount]).size !== 4) &&
      tries < 50
    );

    const optionsData = [
      { text: wrongMultiply.toString(), isCorrect: false, reason: "results from multiplying by the factor $\\left(1 + \\frac{P}{100}\\right)$ instead of dividing by it" },
      { text: wrongDivideDecimal.toString(), isCorrect: false, reason: "results from dividing by $\\frac{P}{100}$ instead of by $\\left(1 + \\frac{P}{100}\\right)$" },
      { text: increaseAmount.toString(), isCorrect: false, reason: "is the amount of the increase, $r - x$, rather than the original value $x$" },
      { text: x.toString(), isCorrect: true, reason: "" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The result of increasing the quantity $x$ by ${increasePct}% is ${result}. What is the value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: x.toString(),
      explanation: `Choice ${correctLetter} is correct. Increasing $x$ by ${increasePct}% gives $x + \\frac{${increasePct}}{100}\\,x = ${result}$. Since $\\frac{${increasePct}}{100} = ${multiplier - 1}$, this becomes $x + ${multiplier - 1}x = ${multiplier}x = ${result}$. Solving gives $x = \\frac{${result}}{${multiplier}} = ${x}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
