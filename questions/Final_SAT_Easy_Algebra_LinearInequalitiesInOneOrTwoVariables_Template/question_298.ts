import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 298
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min temp: 97.8, max temp: 99.0]
 * - Difficulty factors: [Decimal range, inclusive bounds, real-world context]
 * - Distractor patterns: [A=below range, B=just below min, C=within range, D=above max]
 * - Constraints: [Must test decimal values against inclusive range]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_298 = {
  metadata: {
    id: "298",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Work in tenths of a degree to avoid float drift. The normal range is now
    // about 1 degree wide (it used to be up to 3.9 degrees, such as 97.8 to
    // 101.7), and the correct temperature can be anywhere strictly inside it
    // instead of always 0.1 degree above the minimum.
    const minT = getRandomInt(970, 980);
    const maxT = minT + getRandomInt(8, 14);
    const correctT = getRandomInt(minT + 1, maxT - 1);
    const tooLow1T = minT - getRandomInt(12, 25);
    const tooLow2T = minT - getRandomInt(1, 3);
    const tooHighT = maxT + getRandomInt(3, 9);
    const t = (v: number) => (v / 10).toFixed(1);
    const minTemp = t(minT), maxTemp = t(maxT), correctTemp = t(correctT);
    const deg = (v: string) => `$${v}^{\\circ}\\text{F}$`;

    const below = (v: string) => `${deg(v)} is less than ${deg(minTemp)}, the lowest normal temperature`;
    const optionsData = [
      { text: deg(t(tooLow1T)), isCorrect: false, reason: below(t(tooLow1T)) },
      { text: deg(t(tooLow2T)), isCorrect: false, reason: below(t(tooLow2T)) },
      { text: deg(correctTemp), isCorrect: true, reason: '' },
      { text: deg(t(tooHighT)), isCorrect: false, reason: `${deg(t(tooHighT))} is greater than ${deg(maxTemp)}, the highest normal temperature` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. A normal temperature $T$, in degrees Fahrenheit, satisfies $${minTemp} \\le T \\le ${maxTemp}$. Since $${minTemp} \\le ${correctTemp} \\le ${maxTemp}$, ${deg(correctTemp)} could be the patient's body temperature. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `Normal body temperature for an adult is between $${minTemp}^{\\circ}\\text{F}$ and $${maxTemp}^{\\circ}\\text{F}$, inclusive. If a patient has a body temperature that is considered to be normal, which of the following could be the patient's body temperature?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
