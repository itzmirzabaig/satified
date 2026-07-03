import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 454
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 5-95, base: 100 (special number)]
 * - Difficulty factors: [Percentage of 100 is trivial but tests understanding]
 * - Distractor patterns: [2*p = doubled percentage, 100-p = complement, 100+p = increase]
 * - Constraints: [Base is 100 making answer = percentage; percentage != 50 so the complement 100-p never collides with the answer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_454 = {
  metadata: {
    id: "454",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Avoid percentage === 50, where the complement distractor (100 - p) would
    // equal the correct answer p. Every other integer in [5,95] keeps all four
    // options distinct: 2p, 100-p, 100+p are pairwise distinct from p and from
    // each other (2p=100-p needs p=100/3, 2p=100+p needs p=100, 100-p=100+p
    // needs p=0 — none are integers in range).
    let percentage = getRandomInt(5, 95);
    let tries = 0;
    while (percentage === 50 && tries++ < 50) {
      percentage = getRandomInt(5, 95);
    }

    const base = 100;
    const result = percentage;

    const distractorB = percentage * 2;
    const distractorC = base - percentage;
    const distractorD = base + percentage;

    const optionsData = [
      { text: `${result}`, isCorrect: true },
      { text: `${distractorB}`, isCorrect: false, reason: `this is ${percentage * 2}%, not ${percentage}%, of 100` },
      { text: `${distractorC}`, isCorrect: false, reason: `this is ${percentage}% less than 100, not ${percentage}% of 100` },
      { text: `${distractorD}`, isCorrect: false, reason: `this is ${percentage}% greater than 100, not ${percentage}% of 100` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is $${percentage}\\%$ of $${base}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. ${percentage}% of ${base} can be calculated by multiplying $\\frac{${percentage}}{100}$ by ${base}, which yields $\\left(\\frac{${percentage}}{100}\\right)\\times${base}$, or ${result}. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
