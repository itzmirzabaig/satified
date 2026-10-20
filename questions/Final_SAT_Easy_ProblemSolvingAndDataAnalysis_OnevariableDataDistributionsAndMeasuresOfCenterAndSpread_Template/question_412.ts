import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 412
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base values: 8-20, outlier: 25-40]
 * - Difficulty factors: [Comparing means, outlier effect]
 * - Distractor patterns: [A=X>Y, B=X < Y]
 * - Constraints: [Outlier must pull mean up]
 * - Question type: [Raw Data→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_412 = {
  metadata: {
    id: "412",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate base set with 4 values
    const baseStart = getRandomInt(8, 15);
    const setX = [baseStart, baseStart + 2, baseStart + 4, baseStart + 6];
    // Generate outlier that's significantly larger
    // Data set Y is X plus one more value. The correct comparison used to be
    // "X is less than Y" on every draw; now the extra value is a large value,
    // a small value, or exactly the mean of X.
    const meanX = baseStart + 3;
    const kind = getRandomElement(['high', 'low', 'equal'] as const);
    const extra = kind === 'high' ? baseStart + getRandomInt(15, 25)
      : kind === 'low' ? getRandomInt(1, baseStart - 5)
      : meanX;
    const setY = [...setX, extra].sort((a, b) => a - b);
    const sumX = setX.reduce((a, b) => a + b, 0);
    const sumY = sumX + extra;
    const meanY = sumY / 5;

    const statements = {
      greater: "The mean of data set X is greater than the mean of data set Y.",
      less: "The mean of data set X is less than the mean of data set Y.",
      equal: "The means of data set X and data set Y are equal.",
      unknown: "There is not enough information to compare the means."
    };
    const correctKey = kind === 'high' ? 'less' : kind === 'low' ? 'greater' : 'equal';
    const reasons: Record<string, string> = {
      greater: `the mean of data set X, ${meanX}, is not greater than the mean of data set Y, ${meanY}`,
      less: `the mean of data set X, ${meanX}, is not less than the mean of data set Y, ${meanY}`,
      equal: `the mean of data set X, ${meanX}, is not equal to the mean of data set Y, ${meanY}`,
      unknown: `both data sets are given, so both means can be calculated and compared`
    };
    const optionsData = (Object.keys(statements) as (keyof typeof statements)[]).map(k => ({
      text: statements[k],
      isCorrect: k === correctKey,
      reason: k === correctKey ? '' : reasons[k]
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    const why = kind === 'high' ? `Data set Y has the same values as data set X plus ${extra}, which is greater than the mean of X, so the mean of Y is greater.`
      : kind === 'low' ? `Data set Y has the same values as data set X plus ${extra}, which is less than the mean of X, so the mean of Y is less.`
      : `Data set Y has the same values as data set X plus ${extra}, which equals the mean of X, so the mean does not change.`;

    return {
      questionText: `Data set X: ${setX.join(', ')}\nData set Y: ${setY.join(', ')}\n\nWhich statement correctly compares the mean of data set X and the mean of data set Y?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The mean of data set X is $\\frac{${sumX}}{4} = ${meanX}$, and the mean of data set Y is $\\frac{${sumY}}{5} = ${meanY}$. ${why} ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
