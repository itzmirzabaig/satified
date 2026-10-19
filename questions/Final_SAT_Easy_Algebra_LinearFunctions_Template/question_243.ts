import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 243
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rate: 15-40, constant: 5-20]
 * - Difficulty factors: [Modeling linear relationship from word problem]
 * - Distractor patterns: [missing constant, added coefficients, swapped parameters]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_243 = {
  metadata: {
    id: "243",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    let ratePerPound = 0;
    let constantCalories = 0;

    // Bounded retry: the "swapped rate and constant" distractor (c = <const>x + <rate>)
    // collides with the correct equation exactly when rate === constant, so require
    // them to differ. All four equation strings are then distinct for every draw.
    let tries = 0;
    do {
      ratePerPound = getRandomInt(15, 40);
      constantCalories = getRandomInt(5, 20);
      tries++;
    } while (ratePerPound === constantCalories && tries < 50);

    const correctEquation = `$c = ${ratePerPound}x + ${constantCalories}$`;

    const distractorA = `$c = ${ratePerPound}x$`;

    const distractorB = `$c = ${ratePerPound + constantCalories}x$`;

    const distractorC = `$c = ${constantCalories}x + ${ratePerPound}$`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: `it leaves out the additional ${constantCalories} calories the rabbit should eat each day` },
      { text: distractorB, isCorrect: false, reason: `it adds ${constantCalories} to the rate of ${ratePerPound} calories per pound; the additional ${constantCalories} calories do not depend on the weight, so they are not multiplied by $x$` },
      { text: distractorC, isCorrect: false, reason: `it gives ${constantCalories} calories per pound plus an additional ${ratePerPound} calories, which reverses the two values` },
      { text: correctEquation, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `A veterinarian recommends that each day a certain rabbit should eat ${ratePerPound} calories per pound of the rabbit's weight, plus an additional ${constantCalories} calories. Which equation represents this situation, where $c$ is the total number of calories the veterinarian recommends the rabbit should eat each day if the rabbit's weight is $x$ pounds?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. The rabbit should eat ${ratePerPound} calories for each of its $x$ pounds, or $${ratePerPound}x$ calories, plus an additional ${constantCalories} calories each day. The total number of calories is therefore $c = ${ratePerPound}x + ${constantCalories}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
