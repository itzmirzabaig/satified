import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: de6fe450
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initialWage: 8-12 + 0.25, increase: 0.3-0.7, years: 4-6]
 * - Difficulty factors: [Modeling from rate/intercept]
 * - Distractor patterns: [subtraction, initial wage as rate]
 * - Constraints: [Fixed starting cents]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_de6fe450 = {
  metadata: {
    // id: "de6fe450",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initialWageNum = getRandomInt(8, 12) + 0.25;

    const initialWage = initialWageNum.toFixed(2);

    const increaseNum = getRandomInt(3, 7) / 10;

    const increase = increaseNum.toFixed(2);

    const years = getRandomInt(4, 6);

    const correctEquation = `f(x)=${initialWage}+${increase}x`;

    const distractorA = `f(x)=${initialWage}-${increase}x`;

    const distractorB = `f(x)=${initialWage}x-${increase}`;

    const distractorD = `f(x)=${initialWage}x+${increase}`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "subtracts the increase instead of adding" },
      { text: distractorB, isCorrect: false, reason: "incorrectly applies the initial wage as a rate" },
      { text: correctEquation, isCorrect: true },
      { text: distractorD, isCorrect: false, reason: "incorrectly applies the initial wage as a rate" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `On January 1, 2015, a city's minimum hourly wage was $${initialWage}$. It will increase by $${increase}$ on the first day of the year for the next ${years} years. Which of the following functions best models the minimum hourly wage, in dollars, $x$ years after January 1, 2015, where $x = 1, 2, 3, 4, 5$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. The initial wage is $${initialWage}$ and it increases by $${increase}$ each year, giving $f(x) = ${initialWage} + ${increase}x$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 4f89e4d4
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [profitPerPoster: 4-7, fixedCost: 180-250]
 * - Difficulty factors: [Solving linear equation for target]
 * - Constraints: [Ensure clean result]
 * - Question type: [Solve for x→Fill in blank]
 * - Figure generation: null
 */

