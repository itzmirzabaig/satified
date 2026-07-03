import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 461
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [60 marbles, 0.35 probability]
 * - Difficulty factors: [Reverse probability - find count from probability]
 * - Distractor patterns: [B: wrong calc, C: confuses prob with %, D: wrong calc]
 * - Constraints: [Must result in integer count]
 * - Question type: [No figure → Integer options]
 * - Figure generation: [None]
 */

export const generator_461 = {
  metadata: {
    id: "461",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    // Answer-first construction so the stated probability equals blue/total
    // EXACTLY (no rounding, no float artifacts) and blue is a whole number.
    // Each probability is num/den with a small denominator; totalMarbles is a
    // multiple of den, so blueMarbles = num * groups is an exact integer and
    // P = blueMarbles / totalMarbles = num/den exactly.
    // 0.5 is excluded so the "non-blue count" distractor (total - blue) can
    // never equal blue.
    const probChoices = [
      { prob: 0.25, num: 1, den: 4 },
      { prob: 0.75, num: 3, den: 4 },
      { prob: 0.2, num: 1, den: 5 },
      { prob: 0.4, num: 2, den: 5 },
      { prob: 0.6, num: 3, den: 5 },
      { prob: 0.8, num: 4, den: 5 },
    ];
    const { prob: selectedProb, num, den } = probChoices[getRandomInt(0, probChoices.length - 1)];

    // Redraw the multiplier (and the calc-error offset) until all four option
    // values are pairwise distinct. totalMarbles stays in a natural 40-80 range.
    let groups = 0;
    let totalMarbles = 0;
    let blueMarbles = 0;
    let notBlue = 0;
    let percentValue = Math.round(selectedProb * 100);
    let offsetDistractor = 0;
    let tries = 0;
    do {
      groups = getRandomInt(Math.ceil(40 / den), Math.floor(80 / den));
      totalMarbles = den * groups;
      blueMarbles = num * groups;
      notBlue = totalMarbles - blueMarbles;
      percentValue = Math.round(selectedProb * 100);
      offsetDistractor = blueMarbles + getRandomInt(3, 8);
    } while (
      tries++ < 50 &&
      new Set([blueMarbles, offsetDistractor, percentValue, notBlue]).size !== 4
    );

    const correctText = blueMarbles.toString();

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: offsetDistractor.toString(), isCorrect: false, reason: "results from a calculation error when multiplying the probability by the total" },
      { text: percentValue.toString(), isCorrect: false, reason: "confuses the probability with a percentage out of 100" },
      { text: notBlue.toString(), isCorrect: false, reason: "gives the number of marbles that are not blue instead" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The number of blue marbles equals the probability times the total number of marbles, so $x = ${selectedProb} \\times ${totalMarbles} = ${blueMarbles}$. You can check that $\\frac{${blueMarbles}}{${totalMarbles}} = ${selectedProb}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A bag contains a total of ${totalMarbles} marbles. A marble is to be chosen at random from the bag. If the probability that a blue marble will be chosen is ${selectedProb}, how many marbles in the bag are blue?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
