import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';





/**
 * Question 1411
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [400%, 60 (result)]
 * - Difficulty factors: ["Increasing by" vs "of", algebraic setup]
 * - Distractor patterns: [Treating as multiplication, forgetting to add original]
 * - Constraints: [x + 4x = 60, so 5x = 60, x = 12]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_1411 = {
  metadata: {
    id: "1411",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Answer-first construction. "Increasing x by p% gives result" means
    //   x * (1 + p/100) = result,  so  x = result / (1 + p/100).
    // Pick an integer multiplier m = 1 + p/100 (so p is a clean multiple of 100)
    // and an integer x; then result = x * m is exact and x is exactly correct.
    // Distractors are built from x/m/result and re-drawn (bounded) until all
    // four options are distinct positive integers.
    let increasePct = 0;
    let result = 0;
    let x = 0;
    let multiplier = 3;
    // Wrong: took result as p% of x, i.e. x = result / (p/100).
    let forgotOriginal = 0;
    // Wrong: multiplied by the growth factor instead of dividing.
    let multiplied = 0;
    // Wrong: reported the amount of the increase (result - x) instead of x.
    let increaseAmount = 0;

    let tries = 0;
    do {
      multiplier = getRandomElement([3, 4, 5, 6]); // p = 200%, 300%, 400%, 500%
      increasePct = (multiplier - 1) * 100;
      x = getRandomInt(6, 30);
      result = x * multiplier;

      forgotOriginal = Math.round(result / (increasePct / 100)); // = result*100/p
      multiplied = result * multiplier;                          // result * growth factor
      increaseAmount = result - x;                               // = x*(m-1)
      tries++;
    } while (
      tries < 50 &&
      new Set([x, forgotOriginal, multiplied, increaseAmount]).size !== 4
    );

    const optionsData = [
      { value: x, isCorrect: true, reason: "" },
      { value: forgotOriginal, isCorrect: false, reason: `results from finding ${increasePct}% of ${result} instead of dividing by $\\left(1 + \\frac{${increasePct}}{100}\\right)$` },
      { value: multiplied, isCorrect: false, reason: "results from multiplying by the growth factor instead of dividing by it" },
      { value: increaseAmount, isCorrect: false, reason: `is the amount of the increase, ${result} - ${x}, rather than the original quantity $x$` },
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      text: opt.value.toString(),
      letter: String.fromCharCode(65 + index),
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The result of increasing the quantity $x$ by ${increasePct}% is ${result}. What is the value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. Increasing $x$ by ${increasePct}% means $x + \\frac{${increasePct}}{100}x = ${result}$, which is $\\left(1 + \\frac{${increasePct}}{100}\\right)x = ${result}$, or $x \\cdot ${multiplier} = ${result}$. Dividing both sides by ${multiplier} gives $x = \\frac{${result}}{${multiplier}} = ${x}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
