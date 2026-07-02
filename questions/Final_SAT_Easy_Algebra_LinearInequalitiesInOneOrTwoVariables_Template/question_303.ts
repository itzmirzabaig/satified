import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 303
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scores: 85, 78, 98, target mean: 90]
 * - Difficulty factors: [Mean formula setup, inequality construction]
 * - Distractor patterns: [A=incorrect rearrangement, B=4G error, C=correct mean formula, D=wrong average base]
 * - Constraints: [Must use sum/4 >= target format]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_303 = {
  metadata: {
    id: "303",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const score1 = getRandomInt(70, 95);
    const score2 = getRandomInt(70, 95);
    const score3 = getRandomInt(70, 95);
    const targetMean = getRandomInt(85, 95);

    const optionsData = [
      { text: `$${targetMean} - (${score1} + ${score2} + ${score3}) \\leq 4G$`, isCorrect: false, reason: "incorrectly rearranges the mean formula" },
      { text: `$4G + ${score1} + ${score2} + ${score3} \\ge ${targetMean * 4}$`, isCorrect: false, reason: "adds 4G instead of just G" },
      { text: `$\\frac{(G + ${score1} + ${score2} + ${score3})}{4} \\ge ${targetMean}$`, isCorrect: true },
      { text: `$\\frac{(${score1} + ${score2} + ${score3})}{4} \\ge ${targetMean} - 4G$`, isCorrect: false, reason: "averages only the first three exams" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The mean of four scores is the sum divided by 4. For the mean to be at least ${targetMean}: $\\frac{G + ${score1} + ${score2} + ${score3}}{4} \\ge ${targetMean}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `Tom scored ${score1}, ${score2}, and ${score3} on his first three exams in history class. Solving which inequality gives the score, $G$, on Tom's fourth exam that will result in a mean score on all four exams of at least ${targetMean}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
