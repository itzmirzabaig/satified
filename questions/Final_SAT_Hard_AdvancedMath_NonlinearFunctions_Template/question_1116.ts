import { getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1116
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [exponential model, base 1+r]
 * - Difficulty factors: [Growth factor interpretation, inequality for r]
 * - Distractor patterns: [A: r<-1, B: -1<r<0, C: 0<r<1, D: r>1]
 * - Constraints: [Decreasing: 0<1+r<1; slow growth: 1<1+r<2; more than doubling: 1+r>2]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * Before, the draw never changed (answer always -1 < r < 0), P_0 was undefined,
 * "could be the value of r" did not fit choices that are ranges, and no wrong
 * choice had a reason. Now the growth behavior is drawn, so the answer varies.
 */

export const generator_1116 = {
  metadata: {
    id: "1116",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const place = getRandomElement(['city', 'town', 'county']);
    const scenario = getRandomElement([
      {
        key: 'dec',
        condition: 'the population decreases each year',
        work: `For the population to decrease each year, the factor must be between 0 and 1, so $0 < 1+r < 1$. Subtracting 1 from each part gives $-1 < r < 0$.`
      },
      {
        key: 'slow',
        condition: 'the population increases each year, but by less than 100% per year',
        work: `For the population to increase by less than 100% per year, the factor must be between 1 and 2, so $1 < 1+r < 2$. Subtracting 1 from each part gives $0 < r < 1$.`
      },
      {
        key: 'fast',
        condition: 'the population more than doubles each year',
        work: `For the population to more than double each year, the factor must be greater than 2, so $1+r > 2$. Subtracting 1 from each side gives $r > 1$.`
      }
    ]);

    const optionsData = [
      { text: `$r < -1$`, isCorrect: false, reason: `$r < -1$ makes the factor $1+r$ negative, so $P$ would alternate between positive and negative values, which is impossible for a population` },
      { text: `$-1 < r < 0$`, isCorrect: scenario.key === 'dec', reason: `$-1 < r < 0$ makes the factor $1+r$ between 0 and 1, so the population would decrease each year` },
      { text: `$0 < r < 1$`, isCorrect: scenario.key === 'slow', reason: `$0 < r < 1$ makes the factor $1+r$ between 1 and 2, so the population would increase by less than 100% per year` },
      { text: `$r > 1$`, isCorrect: scenario.key === 'fast', reason: `$r > 1$ makes the factor $1+r$ greater than 2, so the population would more than double each year` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The population $P$ of a ${place} $y$ years after the last census is modeled by $P=P_0(1+r)^y$, where $P_0$ is the population at the last census and $r$ is a constant. If ${scenario.condition}, which of the following must be true?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Each year the population is multiplied by the factor $1+r$. ${scenario.work} ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
