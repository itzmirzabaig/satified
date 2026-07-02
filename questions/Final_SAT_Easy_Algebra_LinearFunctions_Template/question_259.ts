import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 259
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ratio: 1.5-2.0, baseArea: 2000-3000]
 * - Difficulty factors: [Determining proportional relationship]
 * - Distractor patterns: [incorrect ratio, arbitrary coefficient, initial value as coefficient]
 * - Constraints: [Ensure proportional through origin]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_259 = {
  metadata: {
    id: "259",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const ratioNum = (getRandomInt(15, 20) / 10);

    const ratio = ratioNum.toFixed(1);

    const baseArea = getRandomInt(2000, 3000);

    const baseWater = Math.round(baseArea * parseFloat(ratio));

    const tableCode = `<table><thead><tr><th>Area (sq ft)</th><th>Water (gal)</th></tr></thead><tbody><tr><td>${baseArea}</td><td>${baseWater}</td></tr><tr><td>${Math.round(baseArea * 1.5)}</td><td>${Math.round(baseWater * 1.5)}</td></tr><tr><td>${baseArea * 2}</td><td>${baseWater * 2}</td></tr></tbody></table>`;

    const correctEquation = `f(x) = ${ratio}x`;

    const distractorA = `f(x) = 0.6x`;

    const distractorC = `f(x) = ${Math.round(baseWater / 2)}x`;

    const distractorD = `f(x) = ${baseWater}x`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "uses an incorrect ratio" },
      { text: correctEquation, isCorrect: true },
      { text: distractorC, isCorrect: false, reason: "uses an arbitrary large coefficient" },
      { text: distractorD, isCorrect: false, reason: "uses the initial water value as a coefficient" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The table above shows the relationship between the area $x$, in square feet, of a roof and the amount of water $f(x)$, in gallons, drained from the roof. Which equation could define $f$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. Dividing water by area for each row gives ${baseWater}/${baseArea} = ${ratio}. Therefore, $f(x) = ${ratio}x$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
