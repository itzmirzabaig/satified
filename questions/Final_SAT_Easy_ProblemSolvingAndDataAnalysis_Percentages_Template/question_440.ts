import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 440
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 10%, base: 470 (triple-digit)]
 * - Difficulty factors: [10% calculation = divide by 10]
 * - Distractor patterns: [37 = 10% of 370, 423 = 90% of 470, 460 = 470-10]
 * - Constraints: [10% for easy mental math]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_440 = {
  metadata: {
    id: "440",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // roundedBase is a multiple of 10 in [200, 900], so 10% is a clean integer.
    const base = getRandomInt(200, 900);
    const roundedBase = Math.floor(base / 10) * 10;
    const result = roundedBase / 10; // 10% of roundedBase, integer in [20, 90]

    // Distractors are all distinct from the answer and from each other for every
    // draw in this range:
    //   A = 10% of (roundedBase - 100)  (uses the wrong base)
    //   C = roundedBase - result        (90% of roundedBase)
    //   D = roundedBase - 10            (subtracts 10 instead of taking 10%)
    const distractorA = (roundedBase - 100) / 10;
    const distractorC = roundedBase - result;
    const distractorD = roundedBase - 10;

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: `is 10% of ${roundedBase - 100}, not 10% of ${roundedBase}` },
      { text: `${result}`, isCorrect: true },
      { text: `${distractorC}`, isCorrect: false, reason: `is 90% of ${roundedBase}, not 10% of ${roundedBase}` },
      { text: `${distractorD}`, isCorrect: false, reason: `is ${roundedBase} minus 10, not 10% of ${roundedBase}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is 10% of $${roundedBase}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. Taking 10% of a quantity means multiplying it by $\\frac{10}{100}$. Therefore, 10% of ${roundedBase} is $\\frac{10}{100} \\times ${roundedBase} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
