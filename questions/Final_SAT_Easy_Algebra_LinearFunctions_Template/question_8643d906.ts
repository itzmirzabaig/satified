import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 8643d906
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initialPop: 200-300, growthRate: 8-12, years: 30]
 * - Difficulty factors: [Interpreting function evaluation in context]
 * - Distractor patterns: [reversing input/output, wrong year]
 * - Constraints: [Base year 1990]
 * - Question type: [Interpretation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_8643d906 = {
  metadata: {
    // id: "8643d906",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initialPop = getRandomInt(200, 300);

    const growthRate = getRandomInt(8, 12);

    const years = 30;

    const finalPop = initialPop + growthRate * years;

    const correctYear = 1990 + years;

    const correctInterpretation = `The snow leopard population in this area is predicted to be ${finalPop} in the year ${correctYear}.`;

    const optionsData = [
      { text: `The snow leopard population in this area is predicted to be ${years} in the year ${correctYear}.`, isCorrect: false, reason: "reverses the interpretation of input and output" },
      { text: `The snow leopard population in this area is predicted to be ${years} in the year ${correctYear + 10}.`, isCorrect: false, reason: "reverses the interpretation and uses wrong year" },
      { text: correctInterpretation, isCorrect: true },
      { text: `The snow leopard population in this area is predicted to be ${finalPop} in the year ${correctYear + 10}.`, isCorrect: false, reason: "uses the wrong year" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The population of snow leopards in a certain area can be modeled by the function $P(t)=${initialPop}+${growthRate}t$, where $P(t)$ is the population $t$ years after 1990. Of the following, which is the best interpretation of the equation $P(${years})=${finalPop}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctInterpretation,
      explanation: `Choice ${correctOption.letter} is correct. $P(${years})=${finalPop}$ means that ${years} years after 1990 (in year ${correctYear}), the population is predicted to be ${finalPop}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: a4d6fbec
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4-8, intercept: 5-15, xValue: 6-12]
 * - Difficulty factors: [Simple evaluation]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Fill in blank]
 * - Figure generation: null
 */

