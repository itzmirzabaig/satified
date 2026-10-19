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
    // Redraw until the score needed on the fourth exam is possible (at most
    // 100); targets such as a mean of 95 after scores of 70, 72 and 75 used to
    // require a score of 163.
    let score1 = 70, score2 = 70, score3 = 70, targetMean = 85;
    do {
      score1 = getRandomInt(70, 95);
      score2 = getRandomInt(70, 95);
      score3 = getRandomInt(70, 95);
      targetMean = getRandomInt(85, 95);
    } while (4 * targetMean - (score1 + score2 + score3) > 100);
    const scores = `${score1} + ${score2} + ${score3}`;
    const total = 4 * targetMean;

    const optionsData = [
      { text: `$${targetMean} - (${scores}) \\leq 4G$`, isCorrect: false, reason: `it subtracts the sum of the first three scores from the target mean, ${targetMean}; the mean of the four scores is their sum, $G + ${scores}$, divided by 4` },
      { text: `$4G + ${scores} \\ge ${total}$`, isCorrect: false, reason: `it multiplies the fourth score by 4; the sum of the four scores is $G + ${scores}$, not $4G + ${scores}$` },
      { text: `$\\frac{(G + ${scores})}{4} \\ge ${targetMean}$`, isCorrect: true, reason: '' },
      { text: `$\\frac{(${scores})}{4} \\ge ${targetMean} - 4G$`, isCorrect: false, reason: `multiplying both sides by 4 gives $${scores} + 16G \\ge ${total}$, which counts the fourth score 16 times instead of once` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The mean of the four exam scores is the sum of the scores, $G + ${scores}$, divided by 4. For this mean to be at least ${targetMean}, $\\frac{(G + ${scores})}{4} \\ge ${targetMean}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A student scored ${score1}, ${score2}, and ${score3} on their first three exams in history class. Solving which inequality gives the score, $G$, on their fourth exam that will result in a mean score on all four exams of at least ${targetMean}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
