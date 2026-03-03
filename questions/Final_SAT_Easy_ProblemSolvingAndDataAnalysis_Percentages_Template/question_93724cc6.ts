import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 93724cc6
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [part: 21 (double-digit), percentage: 21% (same number as part)]
 * - Difficulty factors: [Finding the whole from part and percentage, algebra setup]
 * - Distractor patterns: [0 = zero, 1 = decimal error, 42 = doubled]
 * - Constraints: [Part equals percentage number for elegant solution]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_93724cc6 = {
  metadata: {
    // id: "93724cc6",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const value = getRandomInt(10, 50);
    const whole = 100;

    const distractorA = 0;
    const distractorB = 1;
    const distractorC = value * 2;

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: "${value}% of 0 is 0, not ${value}" },
      { text: `${distractorB}`, isCorrect: false, reason: "${value}% of 1 is ${(value/100).toFixed(2)}, not ${value}" },
      { text: `${distractorC}`, isCorrect: false, reason: "${value}% of ${distractorC} is ${(distractorC * value / 100).toFixed(2)}, not ${value}" },
      { text: `${whole}`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `$${value}$ is ${value}% of what number?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${whole}`,
      explanation: `Choice ${correctOption.letter} is correct. To find the number, set up the equation $${value} = 0.${value.toString().padStart(2, '0')} \\times x$ and solve for $x$: $x = \\frac{${value}}{0.${value.toString().padStart(2, '0')}} = ${whole}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: bb7c8186
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 23%, base: 100 (special number)]
 * - Difficulty factors: [Percentage of 100 is trivial but tests understanding]
 * - Distractor patterns: [46 = doubled percentage, 77 = 100-23, 123 = 100+23]
 * - Constraints: [Base is 100 making answer = percentage]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */