import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 255
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initialPop: 200-300, growthRate: 8-12, years: 30]
 * - Difficulty factors: [Interpreting function evaluation in context]
 * - Distractor patterns: [reversing input/output, wrong year]
 * - Constraints: [Base year 1990]
 * - Question type: [Interpretation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_255 = {
  metadata: {
    id: "255",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initialPop = getRandomInt(200, 300);

    const growthRate = getRandomInt(8, 12);

    // The number of years used to be fixed at 30.
    const years = [20, 25, 30][getRandomInt(0, 2)];

    const finalPop = initialPop + growthRate * years;

    const correctYear = 1990 + years;

    const correctInterpretation = `The snow leopard population in this area is predicted to be ${finalPop} in the year ${correctYear}.`;

    const optionsData = [
      { text: `The snow leopard population in this area is predicted to be ${years} in the year ${correctYear}.`, isCorrect: false, reason: `${years} is the number of years after 1990, the value of $t$, not the population; the predicted population is the output, ${finalPop}` },
      { text: `The snow leopard population in this area is predicted to be ${years} in the year ${correctYear + 10}.`, isCorrect: false, reason: `${years} is the number of years after 1990, not the population, and ${years} years after 1990 is the year ${correctYear}, not ${correctYear + 10}` },
      { text: correctInterpretation, isCorrect: true, reason: '' },
      { text: `The snow leopard population in this area is predicted to be ${finalPop} in the year ${correctYear + 10}.`, isCorrect: false, reason: `${years} years after 1990 is the year ${correctYear}, not ${correctYear + 10}` }
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
      explanation: `Choice ${correctOption.letter} is correct. In the equation $P(${years}) = ${finalPop}$, the input ${years} is the value of $t$, the number of years after 1990, and the output ${finalPop} is the predicted population. Since ${years} years after 1990 is the year ${correctYear}, the equation means that the snow leopard population in this area is predicted to be ${finalPop} in the year ${correctYear}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
